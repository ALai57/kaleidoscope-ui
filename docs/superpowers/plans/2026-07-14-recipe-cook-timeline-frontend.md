# Recipe Cook Timeline (Frontend) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render a Prism, Gantt-style cook timeline inline on the recipe page from the backend-supplied `timeline` payload, and auto-regenerate it after a writer saves.

**Architecture:** A read-only render layer over a shipped backend contract. Pure helpers (`src/utils/cookTimeline.ts`) do the content-join and derivations; focused React components under `src/components/recipes/timeline/` draw the lanes/bars/deps/detail on an absolute-positioned px-per-minute axis using the Prism design tokens. `RecipePage` mounts the view inline (wrapped in `PrismThemeProvider`, like the existing lineage strip); `RecipeEditorPage` fires `POST /timeline` fire-and-forget on save.

**Tech Stack:** React 18 + TypeScript, MUI `styled()` + Prism `theme.tokens`, TanStack Query, MSW + Vitest + Testing Library, Storybook 8.

## Global Constraints

- **Language/imports:** TypeScript throughout; import from `@/…` (aliased to `src/`) or relative as the neighboring files do. Node 22.
- **State:** server state → TanStack Query; local UI state → component state. No new Zustand store.
- **API access only through `src/api/*`** typed clients — never `fetch` in a component. The client auto-converts casing: backend kebab-case JSON arrives as **snake_case**, request bodies convert back. So all timeline types are **snake_case**.
- **Theming through `theme.tokens`** (Prism dark preset), never hardcoded colors. Lane colors come from `theme.tokens.color.categorical`.
- **Styling idiom:** `styled('div'|'button', …)(({ theme }) => ({ … }))` reading `theme.tokens`; dynamic positions (`left`/`width`/per-lane color) via inline `style`.
- **Tests co-located** as `*.test.ts(x)`; render via `render` from `src/test/testUtils`. Every task ends green.
- **Before pushing:** `npm run ci` (typecheck + lint + test).
- **Reduced motion:** honor `@media (prefers-reduced-motion: reduce)` on any transition (match `Card`/`Chip`).

**Backend contract (fixed, do not change):**
- `GET /recipes/:slug` → recipe with optional `timeline` (nullable).
- `POST /recipes/:slug/timeline` → `{ timeline }`, writer-only (404 for non-writers), LLM only if steps changed, `502`/`503` on failure — **recipe stays saved**.
- Component id = `section.name` if non-blank else `"Section {index+1}"`, in section order (`../kaleidoscope` `api/recipe_timeline.clj` `component-id`).

---

### Task 1: Timeline types + content-join helpers

**Files:**
- Modify: `src/types/recipe.ts` (append timeline types; add `timeline?` to `Recipe`)
- Create: `src/utils/cookTimeline.ts`
- Test: `src/utils/cookTimeline.test.ts`

**Interfaces:**
- Produces (types): `TimelineKind`, `TimelinePhase`, `TimelineComponent`, `TimelineOverride`, `Timeline`; `Recipe.timeline?: Timeline | null`.
- Produces (fns): `componentId(section: { name?: string | null }, index: number): string`; `resolvePhaseSteps(phase: TimelinePhase, component: TimelineComponent, sections: RecipeSection[]): string[]`; `effectiveDuration(phase: TimelinePhase, overrides: TimelineOverride[]): number`.

- [ ] **Step 1: Add the types**

In `src/types/recipe.ts`, after the existing `RecipeContent`/`Recipe` blocks, append:

```ts
export type TimelineKind = 'active' | 'passive';

export interface TimelinePhase {
  id: string; // "{component-id}/{label}"
  label: string; // unique within its component
  kind: TimelineKind;
  steps: number[]; // indices into THIS component's section steps
  estimate: number; // LLM minutes
  deps: string[]; // phase ids this phase waits on
  start?: number | null; // packer output — minutes from t0
}

export interface TimelineComponent {
  name: string; // component-id / lane label
  steps_hash: string;
  phases: TimelinePhase[];
}

export interface TimelineOverride {
  phase: string; // a TimelinePhase.id
  minutes: number;
}

export interface Timeline {
  version: number;
  generator_version: number;
  generated_at: string;
  total_minutes: number;
  overrides: TimelineOverride[];
  components: TimelineComponent[];
}
```

Then add `timeline` to the `Recipe` interface (after `scrape_processing_run_id`):

```ts
  // Derived cook timeline (nullable until generated). See cook-timeline plan.
  timeline?: Timeline | null;
```

- [ ] **Step 2: Write the failing test**

Create `src/utils/cookTimeline.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { componentId, resolvePhaseSteps, effectiveDuration } from './cookTimeline';
import type { RecipeSection } from '../types/recipe';
import type { TimelineComponent, TimelinePhase } from '../types/recipe';

describe('componentId', () => {
  it('uses a non-blank name', () => {
    expect(componentId({ name: 'Salmon' }, 0)).toBe('Salmon');
  });
  it('falls back to a 1-based ordinal for blank/whitespace/missing names', () => {
    expect(componentId({ name: '' }, 0)).toBe('Section 1');
    expect(componentId({ name: '   ' }, 1)).toBe('Section 2');
    expect(componentId({ name: null }, 2)).toBe('Section 3');
    expect(componentId({}, 3)).toBe('Section 4');
  });
});

describe('resolvePhaseSteps', () => {
  const sections: RecipeSection[] = [
    { name: 'Salmon', ingredients: [], steps: ['Whisk miso', 'Coat fillets', 'Rest'] },
    { name: 'Rice', ingredients: [], steps: ['Rinse', 'Boil'] },
  ];
  const comp: TimelineComponent = { name: 'Rice', steps_hash: 'x', phases: [] };
  const phase: TimelinePhase = {
    id: 'Rice/Cook', label: 'Cook', kind: 'active', steps: [0, 1], estimate: 5, deps: [],
  };
  it('joins a component back to its section by id and returns step text', () => {
    expect(resolvePhaseSteps(phase, comp, sections)).toEqual(['Rinse', 'Boil']);
  });
  it('tolerates out-of-range indices (stale timeline)', () => {
    expect(resolvePhaseSteps({ ...phase, steps: [0, 9] }, comp, sections)).toEqual(['Rinse']);
  });
  it('returns [] when no section matches the component id', () => {
    const orphan: TimelineComponent = { name: 'Ghost', steps_hash: 'x', phases: [] };
    expect(resolvePhaseSteps(phase, orphan, sections)).toEqual([]);
  });
});

describe('effectiveDuration', () => {
  const phase: TimelinePhase = {
    id: 'Salmon/Sear', label: 'Sear', kind: 'active', steps: [], estimate: 10, deps: [],
  };
  it('returns the estimate when no override targets the phase', () => {
    expect(effectiveDuration(phase, [])).toBe(10);
  });
  it('prefers a matching override', () => {
    expect(effectiveDuration(phase, [{ phase: 'Salmon/Sear', minutes: 12 }])).toBe(12);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/utils/cookTimeline.test.ts`
Expected: FAIL — cannot find module `./cookTimeline`.

- [ ] **Step 4: Write minimal implementation**

Create `src/utils/cookTimeline.ts`:

```ts
import type {
  RecipeSection,
  TimelineComponent,
  TimelineOverride,
  TimelinePhase,
} from '../types/recipe';

/** A component's stable id (lane label): its trimmed name, else a 1-based
 *  ordinal. Mirrors the backend `component-id` so phase.steps can be joined
 *  back to `content.sections`. */
export function componentId(section: { name?: string | null }, index: number): string {
  const name = section.name?.trim();
  return name ? name : `Section ${index + 1}`;
}

/** The step strings a phase covers: find the section whose id matches the
 *  component, then map the phase's step indices to that section's steps
 *  (skipping any out-of-range index from a stale timeline). */
export function resolvePhaseSteps(
  phase: TimelinePhase,
  component: TimelineComponent,
  sections: RecipeSection[]
): string[] {
  const section = sections.find((s, i) => componentId(s, i) === component.name);
  if (!section) return [];
  return phase.steps
    .map((i) => section.steps[i])
    .filter((s): s is string => s !== undefined);
}

/** The duration used for layout/stats: an authored override wins over the
 *  LLM estimate. */
export function effectiveDuration(phase: TimelinePhase, overrides: TimelineOverride[]): number {
  const hit = overrides.find((o) => o.phase === phase.id);
  return hit ? hit.minutes : phase.estimate;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/utils/cookTimeline.test.ts`
Expected: PASS (all cases).

- [ ] **Step 6: Commit**

```bash
git add src/types/recipe.ts src/utils/cookTimeline.ts src/utils/cookTimeline.test.ts
git commit -m "feat(recipes): timeline types + content-join helpers"
```

---

### Task 2: Derivation helpers — back-plan clock + stats

**Files:**
- Modify: `src/utils/cookTimeline.ts`
- Test: `src/utils/cookTimeline.test.ts`

**Interfaces:**
- Consumes: `effectiveDuration`, `Timeline`, `TimelinePhase`.
- Produces: `backPlanStart(serveTimeHHMM: string, totalMinutes: number): string`; `timelineStats(timeline: Timeline): TimelineStats` where `interface TimelineStats { totalMinutes: number; handsOnMinutes: number; freeMinutes: number; activeCount: number; passiveWindows: number }`.

- [ ] **Step 1: Write the failing test**

Append to `src/utils/cookTimeline.test.ts`:

```ts
import { backPlanStart, timelineStats } from './cookTimeline';
import type { Timeline } from '../types/recipe';

describe('backPlanStart', () => {
  it('subtracts total minutes from a serve time and formats 12-hour', () => {
    expect(backPlanStart('18:30', 50)).toBe('5:40 PM');
  });
  it('formats midnight and noon boundaries', () => {
    expect(backPlanStart('00:20', 30)).toBe('11:50 PM'); // wraps back a day
    expect(backPlanStart('12:00', 0)).toBe('12:00 PM');
  });
  it('returns empty string for an unparseable serve time', () => {
    expect(backPlanStart('', 50)).toBe('');
  });
});

describe('timelineStats', () => {
  const tl: Timeline = {
    version: 1, generator_version: 1, generated_at: 'now', total_minutes: 50, overrides: [],
    components: [
      { name: 'A', steps_hash: 'x', phases: [
        { id: 'A/p1', label: 'p1', kind: 'passive', steps: [], estimate: 24, deps: [], start: 0 },
        { id: 'A/a1', label: 'a1', kind: 'active', steps: [], estimate: 10, deps: [], start: 30 },
      ] },
      { name: 'B', steps_hash: 'x', phases: [
        { id: 'B/a1', label: 'a1', kind: 'active', steps: [], estimate: 6, deps: [], start: 0 },
        { id: 'B/a2', label: 'a2', kind: 'active', steps: [], estimate: 4, deps: [], start: 46 },
      ] },
    ],
  };
  it('derives hands-on = sum of active durations and free = total - hands-on', () => {
    const s = timelineStats(tl);
    expect(s.totalMinutes).toBe(50);
    expect(s.handsOnMinutes).toBe(20); // 10 + 6 + 4
    expect(s.freeMinutes).toBe(30);
    expect(s.activeCount).toBe(3);
  });
  it('counts hands-off windows as gaps in active coverage', () => {
    // active intervals: [0,6], [30,40], [46,50] -> free gaps [6,30] and [40,46] = 2
    expect(timelineStats(tl).passiveWindows).toBe(2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/utils/cookTimeline.test.ts`
Expected: FAIL — `backPlanStart`/`timelineStats` not exported.

- [ ] **Step 3: Write minimal implementation**

Append to `src/utils/cookTimeline.ts`:

```ts
/** Format minutes-since-midnight as "h:mm AM/PM". */
function fmtClock(mins: number): string {
  const norm = ((mins % 1440) + 1440) % 1440;
  let h = Math.floor(norm / 60);
  const m = norm % 60;
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')} ${ap}`;
}

/** Back-plan the start clock: serve time (HH:MM) minus the total run. */
export function backPlanStart(serveTimeHHMM: string, totalMinutes: number): string {
  const [h, m] = serveTimeHHMM.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return '';
  return fmtClock(h * 60 + m - totalMinutes);
}

export interface TimelineStats {
  totalMinutes: number;
  handsOnMinutes: number;
  freeMinutes: number;
  activeCount: number;
  passiveWindows: number;
}

/** Stat tiles. Active phases never overlap (packer invariant), so hands-on =
 *  sum of active durations and free windows are the gaps in active coverage. */
export function timelineStats(timeline: Timeline): TimelineStats {
  const active = timeline.components
    .flatMap((c) => c.phases)
    .filter((p) => p.kind === 'active')
    .map((p) => {
      const start = p.start ?? 0;
      return { start, end: start + effectiveDuration(p, timeline.overrides) };
    })
    .sort((a, b) => a.start - b.start);

  const handsOnMinutes = active.reduce((sum, i) => sum + (i.end - i.start), 0);
  const total = timeline.total_minutes;

  let cursor = 0;
  let passiveWindows = 0;
  for (const i of active) {
    if (i.start > cursor) passiveWindows += 1; // a gap before this active block
    cursor = Math.max(cursor, i.end);
  }
  if (cursor < total) passiveWindows += 1; // trailing free window

  return {
    totalMinutes: total,
    handsOnMinutes,
    freeMinutes: total - handsOnMinutes,
    activeCount: active.length,
    passiveWindows,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/utils/cookTimeline.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/utils/cookTimeline.ts src/utils/cookTimeline.test.ts
git commit -m "feat(recipes): timeline back-plan clock + stat derivations"
```

---

### Task 3: `regenerateTimeline` API client

**Files:**
- Modify: `src/api/recipes.ts`
- Test: `src/api/recipes.test.ts`

**Interfaces:**
- Consumes: `request` (from `./client`), `Timeline`.
- Produces: `regenerateTimeline(slug: string, token?: string): Promise<Timeline>`.

- [ ] **Step 1: Write the failing test**

Append to `src/api/recipes.test.ts` (follow the file's existing MSW/import style; add `regenerateTimeline` to the import from `./recipes` and ensure `http`, `HttpResponse`, and the shared `server` are already imported at the top of the file):

```ts
describe('regenerateTimeline', () => {
  it('POSTs to the timeline route and unwraps { timeline }', async () => {
    let method = '';
    server.use(
      http.post('/recipes/miso-salmon/timeline', ({ request }) => {
        method = request.method;
        return HttpResponse.json({
          timeline: {
            version: 1, generator_version: 1, generated_at: 'now', total_minutes: 12,
            overrides: [], components: [],
          },
        });
      })
    );
    const tl = await regenerateTimeline('miso-salmon', 'tok');
    expect(method).toBe('POST');
    expect(tl.total_minutes).toBe(12);
    expect(tl.components).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/api/recipes.test.ts -t regenerateTimeline`
Expected: FAIL — `regenerateTimeline` is not exported.

- [ ] **Step 3: Write minimal implementation**

In `src/api/recipes.ts`, add `Timeline` to the type import from `../types/recipe`, then add after `getRecipeLineage`:

```ts
/** Regenerate + persist a recipe's cook timeline from current content
 *  (writer-only; LLM only when steps changed). Non-writers get 404. */
export function regenerateTimeline(slug: string, token?: string): Promise<Timeline> {
  return request<{ timeline: Timeline }>(`/recipes/${slug}/timeline`, {
    method: 'POST',
    token,
  }).then((r) => r.timeline);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/api/recipes.test.ts -t regenerateTimeline`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/api/recipes.ts src/api/recipes.test.ts
git commit -m "feat(recipes): regenerateTimeline API client (POST /timeline)"
```

---

### Task 4: Layout constants, lane-color picker, and shared fixture

**Files:**
- Create: `src/components/recipes/timeline/constants.ts`
- Create: `src/test/fixtures/salmonTimeline.ts`
- Modify: `src/utils/cookTimeline.ts` (add `pickLaneColors`)
- Test: `src/utils/cookTimeline.test.ts`

**Interfaces:**
- Produces: constants `PX_PER_MIN`, `RULER_H`, `ROW_H`, `ROW_GAP`, `GUTTER` (numbers).
- Produces: `pickLaneColors(count: number, palette: readonly string[]): string[]`.
- Produces (fixture): `salmonContent: RecipeContent`, `salmonTimeline: Timeline` (miso-salmon schedule in the real shape).

- [ ] **Step 1: Write the failing test for `pickLaneColors`**

Append to `src/utils/cookTimeline.test.ts`:

```ts
import { pickLaneColors } from './cookTimeline';

describe('pickLaneColors', () => {
  it('assigns palette colors by index', () => {
    expect(pickLaneColors(3, ['#a', '#b', '#c', '#d'])).toEqual(['#a', '#b', '#c']);
  });
  it('cycles when there are more lanes than palette entries', () => {
    expect(pickLaneColors(4, ['#a', '#b'])).toEqual(['#a', '#b', '#a', '#b']);
  });
  it('returns [] for a zero count', () => {
    expect(pickLaneColors(0, ['#a'])).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/utils/cookTimeline.test.ts -t pickLaneColors`
Expected: FAIL — `pickLaneColors` not exported.

- [ ] **Step 3: Implement `pickLaneColors`**

Append to `src/utils/cookTimeline.ts`:

```ts
/** One color per lane, cycling the categorical palette if a recipe has more
 *  components than palette entries. */
export function pickLaneColors(count: number, palette: readonly string[]): string[] {
  return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/utils/cookTimeline.test.ts -t pickLaneColors`
Expected: PASS.

- [ ] **Step 5: Create the layout constants**

Create `src/components/recipes/timeline/constants.ts`:

```ts
/** Pixels per minute — the horizontal scale of the time axis. */
export const PX_PER_MIN = 23;
/** Ruler (tick strip) height, px. */
export const RULER_H = 34;
/** Lane (bar row) height, px. */
export const ROW_H = 52;
/** Vertical gap between lanes, px. */
export const ROW_GAP = 12;
/** Sticky left gutter that holds lane labels, px. */
export const GUTTER = 158;
```

- [ ] **Step 6: Create the shared fixture**

Create `src/test/fixtures/salmonTimeline.ts`:

```ts
import type { RecipeContent, Timeline } from '../../types/recipe';

export const salmonContent: RecipeContent = {
  title: 'Miso-Glazed Salmon Rice Bowls',
  servings: '2',
  sections: [
    { name: 'Salmon', ingredients: ['2 salmon fillets', 'miso', 'mirin'], steps: [
      'Whisk miso, mirin, soy sauce & grated ginger',
      'Coat the fillets, flesh-side down',
      'Leave at room temp so it cooks evenly',
      'Pat salmon dry, season lightly',
      'Sear skin-side down, 4 min',
      'Flip, spoon glaze over, 3 min',
      'Rest 2 min off the heat',
    ] },
    { name: 'Rice', ingredients: ['1 cup rice'], steps: [
      'Rinse rice until the water runs clear',
      'Add water 1 : 1.25, bring to a boil',
      'Cover, drop to lowest heat, 18–20 min',
      'Do not lift the lid',
      'Off heat, keep covered, 10 min',
      'Fluff with a fork before plating',
    ] },
    { name: 'Greens & sauce', ingredients: ['bok choy', 'scallions'], steps: [
      'Whisk soy, rice vinegar, sesame oil & honey',
      'Set aside for drizzling',
      'Halve the baby bok choy',
      'Slice scallions & chili',
      'Mince the garlic',
      'Garlic in hot oil, 30 sec',
      'Bok choy cut-side down, 2 min',
      'Splash of water, cover, 2 min',
    ] },
    { name: 'Assembly', ingredients: [], steps: [
      'Bowl of rice, salmon on top',
      'Bok choy alongside',
      'Drizzle sauce, scatter scallion & sesame',
    ] },
  ],
};

export const salmonTimeline: Timeline = {
  version: 1,
  generator_version: 1,
  generated_at: '2026-07-14T00:00:00Z',
  total_minutes: 50,
  overrides: [],
  components: [
    { name: 'Salmon', steps_hash: 'sha256:salmon', phases: [
      { id: 'Salmon/Marinate', label: 'Marinate', kind: 'passive', steps: [0, 1, 2], estimate: 24, deps: [], start: 0 },
      { id: 'Salmon/Sear & glaze', label: 'Sear & glaze', kind: 'active', steps: [3, 4, 5, 6], estimate: 10, deps: ['Salmon/Marinate'], start: 30 },
    ] },
    { name: 'Rice', steps_hash: 'sha256:rice', phases: [
      { id: 'Rice/Start rice', label: 'Start rice', kind: 'active', steps: [0, 1], estimate: 5, deps: [], start: 6 },
      { id: 'Rice/Simmer', label: 'Simmer', kind: 'passive', steps: [2, 3], estimate: 20, deps: ['Rice/Start rice'], start: 11 },
      { id: 'Rice/Rest', label: 'Rest', kind: 'passive', steps: [4, 5], estimate: 10, deps: ['Rice/Simmer'], start: 31 },
    ] },
    { name: 'Greens & sauce', steps_hash: 'sha256:greens', phases: [
      { id: 'Greens & sauce/Whisk sauce', label: 'Whisk sauce', kind: 'active', steps: [0, 1], estimate: 6, deps: [], start: 0 },
      { id: 'Greens & sauce/Prep greens', label: 'Prep greens', kind: 'active', steps: [2, 3, 4], estimate: 5, deps: [], start: 22 },
      { id: 'Greens & sauce/Sauté greens', label: 'Sauté greens', kind: 'active', steps: [5, 6, 7], estimate: 6, deps: ['Greens & sauce/Prep greens'], start: 40 },
    ] },
    { name: 'Assembly', steps_hash: 'sha256:assembly', phases: [
      { id: 'Assembly/Plate up', label: 'Plate up', kind: 'active', steps: [0, 1, 2], estimate: 4, deps: ['Salmon/Sear & glaze', 'Rice/Rest', 'Greens & sauce/Sauté greens'], start: 46 },
    ] },
  ],
};
```

- [ ] **Step 7: Commit**

```bash
git add src/components/recipes/timeline/constants.ts src/test/fixtures/salmonTimeline.ts src/utils/cookTimeline.ts src/utils/cookTimeline.test.ts
git commit -m "feat(recipes): timeline layout constants, lane colors, fixture"
```

---

### Task 5: `TimelineDetailPanel` component

**Files:**
- Create: `src/components/recipes/timeline/TimelineDetailPanel.tsx`
- Test: `src/components/recipes/timeline/TimelineDetailPanel.test.tsx`

**Interfaces:**
- Consumes: `TimelinePhase`.
- Produces: `TimelineDetailPanel` with props `{ phase: TimelinePhase | null; componentName: string; laneColor: string; steps: string[] }`.

- [ ] **Step 1: Write the failing test**

Create `src/components/recipes/timeline/TimelineDetailPanel.test.tsx`:

```tsx
import { it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../../../test/testUtils';
import { PrismThemeProvider } from '../../prism';
import { TimelineDetailPanel } from './TimelineDetailPanel';
import type { TimelinePhase } from '../../../types/recipe';

const phase: TimelinePhase = {
  id: 'Salmon/Marinate', label: 'Marinate', kind: 'passive',
  steps: [0, 1, 2], estimate: 24, deps: [], start: 0,
};

it('shows an empty-state prompt when nothing is selected', () => {
  render(
    <PrismThemeProvider>
      <TimelineDetailPanel phase={null} componentName="" laneColor="#45D6E8" steps={[]} />
    </PrismThemeProvider>
  );
  expect(screen.getByText(/pick a block/i)).toBeInTheDocument();
});

it('renders the selected phase heading, kind, window, and steps', () => {
  render(
    <PrismThemeProvider>
      <TimelineDetailPanel
        phase={phase}
        componentName="Salmon"
        laneColor="#26A0BC"
        steps={['Whisk miso', 'Coat the fillets', 'Leave at room temp']}
      />
    </PrismThemeProvider>
  );
  expect(screen.getByRole('heading', { name: /Salmon · Marinate/ })).toBeInTheDocument();
  expect(screen.getByText('passive')).toBeInTheDocument();
  expect(screen.getByText(/\+0–24 min/)).toBeInTheDocument();
  expect(screen.getByText('Coat the fillets')).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/recipes/timeline/TimelineDetailPanel.test.tsx`
Expected: FAIL — cannot find `./TimelineDetailPanel`.

- [ ] **Step 3: Write minimal implementation**

Create `src/components/recipes/timeline/TimelineDetailPanel.tsx`:

```tsx
import { styled } from '@mui/material/styles';
import type { TimelinePhase } from '../../../types/recipe';
import { effectiveDuration } from '../../../utils/cookTimeline';

const Panel = styled('div')(({ theme }) => {
  const { color, radius, typography } = theme.tokens;
  return {
    marginTop: 16,
    background: color.surface.sunken,
    border: `1px solid ${color.border.subtle}`,
    borderRadius: radius.lg,
    padding: '18px 20px',
    minHeight: 96,
    fontFamily: typography.mono,
    color: color.text.primary,
  };
});

const Head = styled('div')({ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' });
const Badge = styled('span')<{ c: string }>(({ c }) => ({
  width: 11, height: 11, borderRadius: 3, flex: 'none', background: c,
}));
const Kind = styled('span')(({ theme }) => ({
  fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase',
  padding: '2px 8px', borderRadius: 999,
  border: `1px solid ${theme.tokens.color.border.strong}`, color: theme.tokens.color.text.secondary,
}));
const When = styled('span')(({ theme }) => ({
  fontSize: 11.5, color: theme.tokens.color.text.secondary, marginLeft: 'auto',
  fontVariantNumeric: 'tabular-nums',
}));
const Steps = styled('ol')({
  margin: '14px 0 0', padding: 0, listStyle: 'none',
  display: 'flex', flexDirection: 'column', gap: 9, counterReset: 'step',
});
const Step = styled('li')(({ theme }) => ({
  position: 'relative', paddingLeft: 30, fontSize: 14, color: theme.tokens.color.text.primary,
  '&::before': {
    counterIncrement: 'step', content: 'counter(step)',
    position: 'absolute', left: 0, top: -1, width: 20, height: 20, borderRadius: 6,
    background: theme.tokens.color.surface.raised,
    border: `1px solid ${theme.tokens.color.border.strong}`,
    fontSize: 11, color: theme.tokens.color.text.secondary,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
}));
const Hint = styled('p')(({ theme }) => ({
  marginTop: 12, color: theme.tokens.color.text.secondary, fontSize: 13,
}));

export interface TimelineDetailPanelProps {
  phase: TimelinePhase | null;
  componentName: string;
  laneColor: string;
  steps: string[];
}

export const TimelineDetailPanel: React.FC<TimelineDetailPanelProps> = ({
  phase, componentName, laneColor, steps,
}) => {
  if (!phase) {
    return (
      <Panel>
        <Head>
          <Badge c={laneColor} />
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Pick a block to see its steps</h3>
        </Head>
        <Hint>Each block expands into the exact steps for that part of the recipe.</Hint>
      </Panel>
    );
  }
  const start = phase.start ?? 0;
  const end = start + effectiveDuration(phase, []);
  return (
    <Panel style={{ borderColor: laneColor }}>
      <Head>
        <Badge c={laneColor} />
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{componentName} · {phase.label}</h3>
        <Kind>{phase.kind}</Kind>
        <When>+{start}–{end} min · {end - start} min</When>
      </Head>
      <Steps>{steps.map((s, i) => <Step key={i}>{s}</Step>)}</Steps>
    </Panel>
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/recipes/timeline/TimelineDetailPanel.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/timeline/TimelineDetailPanel.tsx src/components/recipes/timeline/TimelineDetailPanel.test.tsx
git commit -m "feat(recipes): timeline detail panel"
```

---

### Task 6: `TimelineStats` component (stat tiles + back-planned start)

**Files:**
- Create: `src/components/recipes/timeline/TimelineStats.tsx`
- Test: `src/components/recipes/timeline/TimelineStats.test.tsx`

**Interfaces:**
- Consumes: `Timeline`, `timelineStats`, `backPlanStart`.
- Produces: `TimelineStats` component with props `{ timeline: Timeline }`. Owns the serve-time input state internally (default `18:30`).

- [ ] **Step 1: Write the failing test**

Create `src/components/recipes/timeline/TimelineStats.test.tsx`:

```tsx
import { it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test/testUtils';
import { PrismThemeProvider } from '../../prism';
import { TimelineStats } from './TimelineStats';
import { salmonTimeline } from '../../../test/fixtures/salmonTimeline';

it('shows total, hands-on, and free minutes', () => {
  render(
    <PrismThemeProvider>
      <TimelineStats timeline={salmonTimeline} />
    </PrismThemeProvider>
  );
  expect(screen.getByText('Total elapsed')).toBeInTheDocument();
  expect(screen.getByText('50')).toBeInTheDocument(); // total
  expect(screen.getByText('Hands-on')).toBeInTheDocument();
  expect(screen.getByText("You're free")).toBeInTheDocument();
});

it('back-plans a start clock from the serve time and updates on change', async () => {
  render(
    <PrismThemeProvider>
      <TimelineStats timeline={salmonTimeline} />
    </PrismThemeProvider>
  );
  expect(screen.getByTestId('start-clock')).toHaveTextContent('5:40 PM'); // 18:30 - 50
  const input = screen.getByLabelText(/serving at/i);
  await userEvent.clear(input);
  await userEvent.type(input, '19:00');
  expect(screen.getByTestId('start-clock')).toHaveTextContent('6:10 PM'); // 19:00 - 50
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/recipes/timeline/TimelineStats.test.tsx`
Expected: FAIL — cannot find `./TimelineStats`.

- [ ] **Step 3: Write minimal implementation**

Create `src/components/recipes/timeline/TimelineStats.tsx`:

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import type { Timeline } from '../../../types/recipe';
import { timelineStats, backPlanStart } from '../../../utils/cookTimeline';

const Strip = styled('div')({
  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) 1.5fr', gap: 12, margin: '26px 0 22px',
  '@media (max-width: 760px)': { gridTemplateColumns: '1fr 1fr' },
});
const Tile = styled('div')(({ theme }) => ({
  background: theme.tokens.color.surface.raised,
  border: `1px solid ${theme.tokens.color.border.subtle}`,
  borderRadius: theme.tokens.radius.lg, padding: '15px 17px',
  fontFamily: theme.tokens.typography.mono,
}));
const K = styled('div')(({ theme }) => ({
  fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
  color: theme.tokens.color.text.disabled,
}));
const V = styled('div')(({ theme }) => ({
  fontSize: 26, fontWeight: 600, marginTop: 8, fontVariantNumeric: 'tabular-nums',
  color: theme.tokens.color.text.primary,
}));
const N = styled('div')(({ theme }) => ({ fontSize: 12, color: theme.tokens.color.text.secondary, marginTop: 4 }));
const Small = styled('small')(({ theme }) => ({ fontSize: 13, color: theme.tokens.color.text.secondary, fontWeight: 500 }));

const StartCard = styled('div')(({ theme }) => ({
  background: theme.tokens.color.surface.raised,
  border: `1px solid ${theme.tokens.color.brand.primary}`,
  borderRadius: theme.tokens.radius.lg, padding: '15px 17px',
  display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 9,
  fontFamily: theme.tokens.typography.mono,
}));
const StartRow = styled('div')({ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' });
const Big = styled('span')(({ theme }) => ({
  fontSize: 26, fontWeight: 600, color: theme.tokens.color.text.primary, fontVariantNumeric: 'tabular-nums',
}));
const Label = styled('label')(({ theme }) => ({
  fontSize: 11, color: theme.tokens.color.text.secondary, display: 'flex', alignItems: 'center', gap: 8,
}));
const TimeInput = styled('input')(({ theme }) => ({
  background: theme.tokens.color.surface.sunken, color: theme.tokens.color.text.primary,
  border: `1px solid ${theme.tokens.color.border.strong}`, borderRadius: theme.tokens.radius.sm,
  padding: '5px 8px', fontFamily: theme.tokens.typography.mono, fontSize: 13, colorScheme: 'dark',
}));

export const TimelineStats: React.FC<{ timeline: Timeline }> = ({ timeline }) => {
  const [serve, setServe] = React.useState('18:30');
  const s = timelineStats(timeline);
  const startClock = backPlanStart(serve, s.totalMinutes);
  return (
    <Strip>
      <Tile><K>Total elapsed</K><V>{s.totalMinutes}<Small> min</Small></V><N>start → serve</N></Tile>
      <Tile><K>Hands-on</K><V>{s.handsOnMinutes}<Small> min</Small></V><N>across {s.activeCount} active steps</N></Tile>
      <Tile><K>You're free</K><V>{s.freeMinutes}<Small> min</Small></V><N>{s.passiveWindows} hands-off windows</N></Tile>
      <StartCard>
        <K>Back-planned start</K>
        <StartRow>
          <Big data-testid="start-clock">{startClock}</Big>
          <span>→ serve</span>
          <Label>
            Serving at
            <TimeInput
              type="time" step={300} value={serve}
              onChange={(e) => setServe(e.target.value)}
            />
          </Label>
        </StartRow>
      </StartCard>
    </Strip>
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/recipes/timeline/TimelineStats.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/timeline/TimelineStats.tsx src/components/recipes/timeline/TimelineStats.test.tsx
git commit -m "feat(recipes): timeline stat tiles + back-planned start"
```

---

### Task 7: `TimelineGantt` component (ruler + lanes + bars + dependency links)

**Files:**
- Create: `src/components/recipes/timeline/TimelineGantt.tsx`
- Test: `src/components/recipes/timeline/TimelineGantt.test.tsx`

**Interfaces:**
- Consumes: `Timeline`, `TimelinePhase`, `effectiveDuration`, constants (`PX_PER_MIN`, `RULER_H`, `ROW_H`, `ROW_GAP`, `GUTTER`).
- Produces: `TimelineGantt` with props `{ timeline: Timeline; laneColors: string[]; selectedId: string | null; onSelect: (id: string) => void }`. Each bar is a `<button>` labeled `"{component} · {label}"` that calls `onSelect(phase.id)`.

- [ ] **Step 1: Write the failing test**

Create `src/components/recipes/timeline/TimelineGantt.test.tsx`:

```tsx
import { it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test/testUtils';
import { PrismThemeProvider } from '../../prism';
import { TimelineGantt } from './TimelineGantt';
import { salmonTimeline } from '../../../test/fixtures/salmonTimeline';

const colors = ['#26A0BC', '#9085E9', '#C98500', '#2E9E5B'];

it('renders a bar button per phase and calls onSelect on click', async () => {
  const onSelect = vi.fn();
  render(
    <PrismThemeProvider>
      <TimelineGantt timeline={salmonTimeline} laneColors={colors} selectedId={null} onSelect={onSelect} />
    </PrismThemeProvider>
  );
  // 2 + 3 + 3 + 1 = 9 phases
  expect(screen.getAllByRole('button')).toHaveLength(9);
  await userEvent.click(screen.getByRole('button', { name: /Salmon · Marinate/ }));
  expect(onSelect).toHaveBeenCalledWith('Salmon/Marinate');
});

it('draws a dependency link path for each resolvable dep', () => {
  const { container } = render(
    <PrismThemeProvider>
      <TimelineGantt timeline={salmonTimeline} laneColors={colors} selectedId={null} onSelect={() => {}} />
    </PrismThemeProvider>
  );
  // deps: Sear←Marinate, Simmer←Start rice, Rest←Simmer, Sauté←Prep,
  //       Plate←(Sear, Rest, Sauté) = 3 -> 7 links total
  expect(container.querySelectorAll('svg path')).toHaveLength(7);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/recipes/timeline/TimelineGantt.test.tsx`
Expected: FAIL — cannot find `./TimelineGantt`.

- [ ] **Step 3: Write minimal implementation**

Create `src/components/recipes/timeline/TimelineGantt.tsx`:

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import type { Timeline, TimelinePhase } from '../../../types/recipe';
import { effectiveDuration } from '../../../utils/cookTimeline';
import { PX_PER_MIN, RULER_H, ROW_H, ROW_GAP, GUTTER } from './constants';

const Scroller = styled('div')({ overflowX: 'auto', overflowY: 'hidden' });
const Canvas = styled('div')({ position: 'relative' });

const Ruler = styled('div')(({ theme }) => ({
  position: 'relative', height: RULER_H, borderBottom: `1px solid ${theme.tokens.color.border.subtle}`,
}));
const Tick = styled('div')<{ major?: boolean }>(({ theme, major }) => ({
  position: 'absolute', top: 0, bottom: 0,
  borderLeft: `1px solid ${major ? theme.tokens.color.border.strong : theme.tokens.color.border.subtle}`,
}));
const TickLabel = styled('span')(({ theme }) => ({
  position: 'absolute', top: 9, left: 7, fontFamily: theme.tokens.typography.mono, fontSize: 10.5,
  color: theme.tokens.color.text.disabled, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums',
}));

const Lane = styled('div')({ position: 'relative', height: ROW_H, marginTop: ROW_GAP });
const LaneLabel = styled('div')(({ theme }) => ({
  position: 'sticky', left: 0, zIndex: 5, width: GUTTER, height: '100%',
  display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, padding: '0 14px 0 22px',
  background: `linear-gradient(90deg, ${theme.tokens.color.surface.raised} 82%, transparent)`,
  fontFamily: theme.tokens.typography.mono,
}));
const Swatch = styled('span')<{ c: string }>(({ c }) => ({ width: 9, height: 9, borderRadius: 2, background: c, flex: 'none' }));
const Track = styled('div')({ position: 'absolute', left: GUTTER, top: 0, bottom: 0, right: 0 });

const Bar = styled('button')<{ kind: 'active' | 'passive'; selected: boolean; c: string }>(
  ({ theme, kind, selected, c }) => ({
    position: 'absolute', top: 7, height: ROW_H - 14, borderRadius: 5,
    display: 'flex', alignItems: 'center', gap: 7, padding: '0 10px', overflow: 'hidden',
    cursor: 'pointer', fontFamily: theme.tokens.typography.mono, fontSize: 11.5, fontWeight: 600,
    transition: `transform .25s ${theme.tokens.motion.easing.springSettle}, box-shadow .25s`,
    outline: selected ? `2px solid ${theme.tokens.color.brand.primary}` : '2px solid transparent',
    outlineOffset: 2,
    ...(kind === 'active'
      ? { background: c, border: 'none', color: '#08121a' }
      : {
          background: 'transparent', border: `1.5px dashed ${c}`, color: c,
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent, transparent 6px, rgba(255,255,255,.05) 6px, rgba(255,255,255,.05) 7px)',
        }),
    '&:hover': { transform: 'translateY(-2px)', boxShadow: theme.tokens.elevation.md, zIndex: 6 },
    '&:focus-visible': { outline: `2px solid ${theme.tokens.color.brand.primary}` },
    '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
  })
);

const Links = styled('svg')({
  position: 'absolute', left: GUTTER, top: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'visible',
});

interface Placed { phase: TimelinePhase; laneIndex: number; component: string; color: string; }

export interface TimelineGanttProps {
  timeline: Timeline;
  laneColors: string[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const TimelineGantt: React.FC<TimelineGanttProps> = ({
  timeline, laneColors, selectedId, onSelect,
}) => {
  const total = timeline.total_minutes;
  const trackW = total * PX_PER_MIN;

  const placed: Placed[] = timeline.components.flatMap((c, laneIndex) =>
    c.phases.map((phase) => ({ phase, laneIndex, component: c.name, color: laneColors[laneIndex] }))
  );
  const byId = new Map(placed.map((p) => [p.phase.id, p]));
  const laneCenterY = (i: number) => RULER_H + ROW_GAP + i * (ROW_H + ROW_GAP) + ROW_H / 2;

  const ticks: number[] = [];
  for (let m = 0; m <= total; m += 5) ticks.push(m);

  const links = placed.flatMap((p) =>
    p.phase.deps
      .map((depId) => byId.get(depId))
      .filter((from): from is Placed => Boolean(from))
      .map((from) => {
        const x1 = ((from.phase.start ?? 0) + effectiveDuration(from.phase, timeline.overrides)) * PX_PER_MIN;
        const y1 = laneCenterY(from.laneIndex);
        const x2 = (p.phase.start ?? 0) * PX_PER_MIN;
        const y2 = laneCenterY(p.laneIndex);
        const mx = x1 + Math.max(14, (x2 - x1) / 2);
        return { d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`, key: `${from.phase.id}->${p.phase.id}` };
      })
  );

  const svgH = laneCenterY(timeline.components.length);

  return (
    <Scroller>
      <Canvas style={{ width: GUTTER + trackW + 20 }}>
        <Ruler style={{ marginLeft: GUTTER }}>
          {ticks.map((m) => (
            <Tick key={m} major={m % 10 === 0} style={{ left: m * PX_PER_MIN }}>
              {m % 10 === 0 && m !== 0 && <TickLabel>{m}m</TickLabel>}
            </Tick>
          ))}
        </Ruler>

        {timeline.components.map((c, laneIndex) => (
          <Lane key={c.name}>
            <LaneLabel>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                <Swatch c={laneColors[laneIndex]} />{c.name}
              </span>
            </LaneLabel>
            <Track>
              {c.phases.map((phase) => {
                const start = phase.start ?? 0;
                const dur = effectiveDuration(phase, timeline.overrides);
                return (
                  <Bar
                    key={phase.id}
                    kind={phase.kind}
                    selected={selectedId === phase.id}
                    c={laneColors[laneIndex]}
                    style={{ left: start * PX_PER_MIN, width: dur * PX_PER_MIN - 2 }}
                    title={`${c.name} · ${phase.label} · +${start}–${start + dur} min`}
                    onClick={() => onSelect(phase.id)}
                  >
                    {`${c.name} · ${phase.label}`}
                  </Bar>
                );
              })}
            </Track>
          </Lane>
        ))}

        <Links style={{ height: svgH }}>
          {links.map((l) => (
            <path key={l.key} d={l.d} fill="none" stroke="currentColor"
              strokeWidth={1.4} strokeDasharray="2 4" opacity={0.7} />
          ))}
        </Links>
      </Canvas>
    </Scroller>
  );
};
```

Note: the accessible name of each `Bar` button is its text content `"{component} · {label}"`, which the test matches; the `title` is a redundant hover tooltip.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/recipes/timeline/TimelineGantt.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/timeline/TimelineGantt.tsx src/components/recipes/timeline/TimelineGantt.test.tsx
git commit -m "feat(recipes): timeline gantt (ruler, lanes, bars, dep links)"
```

---

### Task 8: `CookTimeline` orchestrator + legend

**Files:**
- Create: `src/components/recipes/timeline/TimelineLegend.tsx`
- Create: `src/components/recipes/timeline/CookTimeline.tsx`
- Create: `src/components/recipes/timeline/index.ts`
- Test: `src/components/recipes/timeline/CookTimeline.test.tsx`

**Interfaces:**
- Consumes: `Timeline`, `RecipeSection`, `TimelineStats`, `TimelineGantt`, `TimelineDetailPanel`, `TimelineLegend`, `resolvePhaseSteps`, `pickLaneColors`, `theme.tokens.color.categorical`.
- Produces: `CookTimeline` with props `{ timeline: Timeline; sections: RecipeSection[] }`; barrel `index.ts` re-exports `CookTimeline`.

- [ ] **Step 1: Write the failing test**

Create `src/components/recipes/timeline/CookTimeline.test.tsx`:

```tsx
import { it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test/testUtils';
import { PrismThemeProvider } from '../../prism';
import { CookTimeline } from './CookTimeline';
import { salmonTimeline, salmonContent } from '../../../test/fixtures/salmonTimeline';

function setup() {
  return render(
    <PrismThemeProvider>
      <CookTimeline timeline={salmonTimeline} sections={salmonContent.sections} />
    </PrismThemeProvider>
  );
}

it('preselects the first phase so the detail panel is not empty', () => {
  setup();
  expect(screen.getByRole('heading', { name: /Salmon · Marinate/ })).toBeInTheDocument();
  // first phase steps resolved from the content
  expect(screen.getByText('Coat the fillets, flesh-side down')).toBeInTheDocument();
});

it('shows a clicked phase’s resolved steps in the detail panel', async () => {
  setup();
  await userEvent.click(screen.getByRole('button', { name: /Rice · Start rice/ }));
  expect(screen.getByRole('heading', { name: /Rice · Start rice/ })).toBeInTheDocument();
  expect(screen.getByText('Rinse rice until the water runs clear')).toBeInTheDocument();
});

it('renders the legend', () => {
  setup();
  expect(screen.getByText(/hands-on/i)).toBeInTheDocument();
  expect(screen.getByText(/hands-off/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/recipes/timeline/CookTimeline.test.tsx`
Expected: FAIL — cannot find `./CookTimeline`.

- [ ] **Step 3: Create the legend**

Create `src/components/recipes/timeline/TimelineLegend.tsx`:

```tsx
import { styled } from '@mui/material/styles';

const Row = styled('div')(({ theme }) => ({
  display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'center', margin: '18px 2px 0',
  fontFamily: theme.tokens.typography.mono, fontSize: 11, color: theme.tokens.color.text.secondary,
}));
const Item = styled('span')({ display: 'flex', alignItems: 'center', gap: 8 });
const Sw = styled('span')(({ theme }) => ({ width: 26, height: 12, borderRadius: 3, background: theme.tokens.color.text.secondary }));
const SwPassive = styled('span')(({ theme }) => ({
  width: 26, height: 12, borderRadius: 3, border: `1.5px dashed ${theme.tokens.color.border.strong}`,
  backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 4px, rgba(255,255,255,.12) 4px, rgba(255,255,255,.12) 5px)',
}));
const Dep = styled('span')(({ theme }) => ({ width: 26, height: 0, borderTop: `1.4px dashed ${theme.tokens.color.text.disabled}` }));

export const TimelineLegend: React.FC = () => (
  <Row>
    <Item><Sw />Active — hands-on</Item>
    <Item><SwPassive />Passive — hands-off (marinate · simmer · rest)</Item>
    <Item><Dep />Depends on</Item>
  </Row>
);
```

- [ ] **Step 4: Create the orchestrator + barrel**

Create `src/components/recipes/timeline/CookTimeline.tsx`:

```tsx
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import type { RecipeSection, Timeline } from '../../../types/recipe';
import { pickLaneColors, resolvePhaseSteps } from '../../../utils/cookTimeline';
import { TimelineStats } from './TimelineStats';
import { TimelineGantt } from './TimelineGantt';
import { TimelineLegend } from './TimelineLegend';
import { TimelineDetailPanel } from './TimelineDetailPanel';

const Board = styled('div')(({ theme }) => ({
  background: theme.tokens.color.surface.base,
  border: `1px solid ${theme.tokens.color.border.subtle}`,
  borderRadius: theme.tokens.radius.lg,
  padding: '24px 22px',
  marginTop: 32,
  color: theme.tokens.color.text.primary,
}));
const Eyebrow = styled('p')(({ theme }) => ({
  fontFamily: theme.tokens.typography.mono, fontSize: 11, letterSpacing: '.28em',
  textTransform: 'uppercase', color: theme.tokens.color.brand.primary, margin: '0 0 12px',
}));
const GanttShell = styled('div')(({ theme }) => ({
  background: theme.tokens.color.surface.raised,
  border: `1px solid ${theme.tokens.color.border.subtle}`,
  borderRadius: theme.tokens.radius.lg, boxShadow: theme.tokens.elevation.md,
  padding: '6px 0 14px', overflow: 'hidden',
}));

export interface CookTimelineProps {
  timeline: Timeline;
  sections: RecipeSection[];
}

const firstPhaseId = (t: Timeline): string | null => t.components[0]?.phases[0]?.id ?? null;

export const CookTimeline: React.FC<CookTimelineProps> = ({ timeline, sections }) => {
  const theme = useTheme();
  const laneColors = pickLaneColors(timeline.components.length, theme.tokens.color.categorical);
  const [selectedId, setSelectedId] = React.useState<string | null>(() => firstPhaseId(timeline));

  const selected = React.useMemo(() => {
    for (let i = 0; i < timeline.components.length; i += 1) {
      const comp = timeline.components[i];
      const phase = comp.phases.find((p) => p.id === selectedId);
      if (phase) {
        return {
          phase, componentName: comp.name, laneColor: laneColors[i],
          steps: resolvePhaseSteps(phase, comp, sections),
        };
      }
    }
    return null;
  }, [selectedId, timeline, sections, laneColors]);

  return (
    <Board>
      <Eyebrow>Cook Timeline</Eyebrow>
      <TimelineStats timeline={timeline} />
      <GanttShell>
        <TimelineGantt
          timeline={timeline}
          laneColors={laneColors}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </GanttShell>
      <TimelineLegend />
      <TimelineDetailPanel
        phase={selected?.phase ?? null}
        componentName={selected?.componentName ?? ''}
        laneColor={selected?.laneColor ?? theme.tokens.color.brand.primary}
        steps={selected?.steps ?? []}
      />
    </Board>
  );
};
```

Create `src/components/recipes/timeline/index.ts`:

```ts
export { CookTimeline } from './CookTimeline';
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/recipes/timeline/CookTimeline.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/recipes/timeline/TimelineLegend.tsx src/components/recipes/timeline/CookTimeline.tsx src/components/recipes/timeline/index.ts src/components/recipes/timeline/CookTimeline.test.tsx
git commit -m "feat(recipes): CookTimeline orchestrator + legend"
```

---

### Task 9: Mount the timeline inline on `RecipePage`

**Files:**
- Modify: `src/pages/RecipePage.tsx`
- Test: `src/pages/RecipePage.test.tsx`

**Interfaces:**
- Consumes: `CookTimeline`, `PrismThemeProvider`, `Recipe.timeline`, `useAuth`.
- Produces: inline timeline section; writer empty-state hint when `timeline` is null.

- [ ] **Step 1: Write the failing test**

Append to `src/pages/RecipePage.test.tsx`. Add a fixture recipe with a timeline to the MSW server (a new `http.get` handler in the file's `server`), then:

```tsx
// Handler to add to the RecipePage test server setup:
//   http.get('/recipes/timed-dish', () => HttpResponse.json({
//     id: 'r9', recipe_url: 'timed-dish', hostname: 'andrewslai.com',
//     content: { title: 'Timed Dish', sections: [
//       { name: 'Salmon', ingredients: [], steps: ['Whisk miso, mirin', 'Sear it'] } ] },
//     labels: [], public_visibility: true,
//     created_at: '2026-01-01T00:00:00Z', modified_at: '2026-01-01T00:00:00Z',
//     timeline: { version: 1, generator_version: 1, generated_at: 'now', total_minutes: 10,
//       overrides: [], components: [ { name: 'Salmon', steps_hash: 'x', phases: [
//         { id: 'Salmon/Prep', label: 'Prep', kind: 'active', steps: [0, 1], estimate: 10, deps: [], start: 0 } ] } ] },
//   }))

it('renders the cook timeline when the recipe has one', async () => {
  renderRecipe('timed-dish'); // use the file's existing render helper + route
  expect(await screen.findByText('Cook Timeline')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Salmon · Prep/ })).toBeInTheDocument();
});

it('does not render the timeline for a recipe without one', async () => {
  renderRecipe('layer-cake'); // existing handler has no timeline
  await screen.findByText('Layer Cake');
  expect(screen.queryByText('Cook Timeline')).not.toBeInTheDocument();
});
```

(If the file has no `renderRecipe` helper, mirror its existing render+route setup for these two cases.)

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/RecipePage.test.tsx -t 'cook timeline'`
Expected: FAIL — "Cook Timeline" not found.

- [ ] **Step 3: Write minimal implementation**

In `src/pages/RecipePage.tsx`, add the import:

```tsx
import { CookTimeline } from '../components/recipes/timeline';
```

Then, after `<RecipeSections content={recipe.content} />`, add:

```tsx
{recipe.timeline && (
  <PrismThemeProvider>
    <CookTimeline timeline={recipe.timeline} sections={recipe.content.sections} />
  </PrismThemeProvider>
)}
{!recipe.timeline && isAuthenticated && (
  <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
    Save this recipe to generate a cook timeline.
  </Typography>
)}
```

(`PrismThemeProvider` and `Typography` are already imported in this file.)

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/pages/RecipePage.test.tsx`
Expected: PASS (new cases and existing cases).

- [ ] **Step 5: Commit**

```bash
git add src/pages/RecipePage.tsx src/pages/RecipePage.test.tsx
git commit -m "feat(recipes): mount cook timeline inline on RecipePage"
```

---

### Task 10: Auto-regenerate the timeline after a writer saves

**Files:**
- Modify: `src/pages/RecipeEditorPage.tsx`
- Test: `src/pages/RecipeEditorPage.test.tsx`

**Interfaces:**
- Consumes: `regenerateTimeline`, `queryClient`, existing `saveMutation`.
- Produces: fire-and-forget `POST /timeline` on save success + `['recipe', slug]` invalidation; failures swallowed.

- [ ] **Step 1: Write the failing test**

Append to `src/pages/RecipeEditorPage.test.tsx` (follow the file's existing render/auth/MSW harness). Two cases:

```tsx
it('regenerates the timeline after a successful save', async () => {
  let timelineCalled = false;
  server.use(
    http.put('/recipes/miso-salmon', () => HttpResponse.json({
      id: 'r1', recipe_url: 'miso-salmon', hostname: 'andrewslai.com',
      content: { title: 'Miso Salmon', sections: [{ ingredients: [], steps: [] }] },
      labels: [], public_visibility: true,
      created_at: 'now', modified_at: 'now',
    })),
    http.post('/recipes/miso-salmon/timeline', () => {
      timelineCalled = true;
      return HttpResponse.json({ timeline: {
        version: 1, generator_version: 1, generated_at: 'now', total_minutes: 5,
        overrides: [], components: [],
      } });
    })
  );
  renderEditor('miso-salmon'); // existing edit-mode render helper
  await userEvent.click(await screen.findByRole('button', { name: /save/i }));
  await waitFor(() => expect(timelineCalled).toBe(true));
});

it('still navigates and shows no save error when timeline regeneration fails', async () => {
  server.use(
    http.put('/recipes/miso-salmon', () => HttpResponse.json({
      id: 'r1', recipe_url: 'miso-salmon', hostname: 'andrewslai.com',
      content: { title: 'Miso Salmon', sections: [{ ingredients: [], steps: [] }] },
      labels: [], public_visibility: true, created_at: 'now', modified_at: 'now',
    })),
    http.post('/recipes/miso-salmon/timeline', () =>
      HttpResponse.json({ reason: 'generation-failed' }, { status: 502 })
    )
  );
  renderEditor('miso-salmon');
  await userEvent.click(await screen.findByRole('button', { name: /save/i }));
  await waitFor(() => expect(navigateSpy).toHaveBeenCalledWith('/recipes/miso-salmon'));
  expect(screen.queryByText(/could not save the recipe/i)).not.toBeInTheDocument();
});
```

(Use the file's existing navigation spy; if it mocks `useNavigate`, reuse that mock as `navigateSpy`.)

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/RecipeEditorPage.test.tsx -t 'regenerat'`
Expected: FAIL — `POST /timeline` never called (`timelineCalled` stays false).

- [ ] **Step 3: Write minimal implementation**

In `src/pages/RecipeEditorPage.tsx`, add `regenerateTimeline` to the import from `../api/recipes`, then change `saveMutation.onSuccess` to:

```tsx
    onSuccess: (saved) => {
      void queryClient.invalidateQueries({ queryKey: ['recipes'] });
      // Fire-and-forget: a save never fails because the LLM did. Issued through
      // the app-level queryClient so the invalidate lands after we navigate away.
      void regenerateTimeline(saved.recipe_url, token)
        .then(() => queryClient.invalidateQueries({ queryKey: ['recipe', saved.recipe_url] }))
        .catch(() => {});
      navigate(`/recipes/${saved.recipe_url}`);
    },
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/pages/RecipeEditorPage.test.tsx`
Expected: PASS (both new cases and existing cases).

- [ ] **Step 5: Commit**

```bash
git add src/pages/RecipeEditorPage.tsx src/pages/RecipeEditorPage.test.tsx
git commit -m "feat(recipes): auto-regenerate timeline after save (fire-and-forget)"
```

---

### Task 11: Storybook story for `CookTimeline`

**Files:**
- Create: `src/components/recipes/timeline/CookTimeline.stories.tsx`

**Interfaces:**
- Consumes: `CookTimeline`, `PrismThemeProvider`, `salmonTimeline`, `salmonContent`.

- [ ] **Step 1: Write the story**

Create `src/components/recipes/timeline/CookTimeline.stories.tsx` (mirror the decorator/format of an existing Prism story such as `src/components/prism/Button.stories.tsx`):

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { PrismThemeProvider } from '../../prism';
import { CookTimeline } from './CookTimeline';
import { salmonTimeline, salmonContent } from '../../../test/fixtures/salmonTimeline';

const meta: Meta<typeof CookTimeline> = {
  title: 'Recipes/CookTimeline',
  component: CookTimeline,
  decorators: [
    (Story) => (
      <PrismThemeProvider>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: 24 }}>
          <Story />
        </div>
      </PrismThemeProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CookTimeline>;

export const MisoSalmon: Story = {
  args: { timeline: salmonTimeline, sections: salmonContent.sections },
};
```

- [ ] **Step 2: Verify the story builds**

Run: `npx storybook build --quiet` (or `npm run storybook` and open Recipes/CookTimeline)
Expected: builds without error; the story renders the salmon timeline.

- [ ] **Step 3: Commit**

```bash
git add src/components/recipes/timeline/CookTimeline.stories.tsx
git commit -m "test(recipes): Storybook story for CookTimeline"
```

---

### Task 12: Full CI gate

**Files:** none (verification only).

- [ ] **Step 1: Typecheck, lint, and the full unit suite**

Run: `npm run ci`
Expected: PASS (typecheck + lint + test). Fix any issues surfaced, then re-run until green.

- [ ] **Step 2: Commit any fixes**

```bash
git add -A
git commit -m "chore(recipes): satisfy CI for cook timeline"
```

(If `npm run ci` is already green with nothing to fix, skip this commit.)

---

## Self-Review

**1. Spec coverage:**
- Types + `Recipe.timeline` → Task 1. ✅
- `componentId`/`resolvePhaseSteps`/`effectiveDuration` → Task 1. ✅
- `backPlanStart`/`timelineStats` → Task 2. ✅
- `regenerateTimeline` (POST only; PUT deferred) → Task 3. ✅
- Layout constants + lane colors + fixture → Task 4. ✅
- Detail panel / stats / gantt / legend / orchestrator → Tasks 5–8. ✅
- Inline mount on RecipePage + writer empty-state → Task 9. ✅
- Fire-and-forget regen after save, failure swallowed → Task 10. ✅
- Storybook story → Task 11. ✅
- CI gate → Task 12. ✅
- Out-of-scope (playhead, PUT/nudge, manual regen button, equipment lanes) → not built, per spec. ✅

**2. Placeholder scan:** No TBD/TODO; every code step shows complete code; every test step shows assertions.

**3. Type consistency:** `Timeline`/`TimelineComponent`/`TimelinePhase`/`TimelineOverride` used identically across tasks; `regenerateTimeline(slug, token)` signature matches its call site in Task 10; `CookTimeline` props `{ timeline, sections }` match the mount in Task 9; `TimelineGantt` props `{ timeline, laneColors, selectedId, onSelect }` match Task 8's usage; `effectiveDuration(phase, overrides)` called with the timeline's `overrides` everywhere.

**Note for the implementer:** Test files reference each page's existing render/auth/MSW helpers (e.g. `renderRecipe`, `renderEditor`, `navigateSpy`, the shared `server`). Before writing a page test, read the top of that test file and reuse its established harness rather than reconstructing it — the snippets above show the assertions, not a full standalone file.
