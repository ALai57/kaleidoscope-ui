# Recipe Timeline-First Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the cook timeline the focus of the Recipe page, add Timeline/Shopping/Raw views, and show a focused step's ingredients beside a scrollable full-method window.

**Architecture:** `RecipePage` gains a view toggle and conditionally renders `CookTimeline`, a new `ShoppingList`, or a new `RawRecipe`. The old always-on `RecipeSections` is removed. `CookTimeline` loses its stat cards, uses relative timing, splits its detail panel into an ingredient checklist + a scrollable grouped-instructions window with a custom-eased auto-scroll, and branches to a mobile layout (schematic overview + section filter + shared ingredient panel + tap-to-expand schedule). Checked-ingredient state is lifted into `RecipePage` and shared across views.

**Tech Stack:** React 19 + TypeScript, MUI 9 (`styled`, `ToggleButtonGroup`, `useMediaQuery`), Emotion, theme tokens (`theme.tokens.*`), Vitest + Testing Library + jsdom.

## Global Constraints

- TypeScript throughout; import from `@/…` (aliased to `src/`).
- All colors/spacing/typography via `theme.tokens.*` — no hardcoded hex. Section/lane colors come from `pickLaneColors(count, theme.tokens.color.categorical)`.
- Styled components use `styled(el)(({ theme }) => ({ … }))`; component bodies read tokens via `const theme = useTheme()`.
- Every feature needs a co-located `*.test.tsx`/`*.test.ts` (Vitest + Testing Library, jsdom). API mocked with MSW where needed.
- No backend or `src/types/recipe.ts` changes. No new npm dependency.
- Run `npm run ci` (typecheck + lint + test) before finishing; commit frequently.
- Node 22; install/verify with the repo's existing scripts.

---

## File structure

**New files**
- `src/utils/animateScroll.ts` — `animateScrollTo(el, to, opts?)` rAF eased scroll helper.
- `src/components/recipes/RecipeViewToggle.tsx` — Timeline/Shopping/Raw `ToggleButtonGroup`.
- `src/components/recipes/ShoppingList.tsx` — whole-recipe checkable ingredient list.
- `src/components/recipes/RawRecipe.tsx` — plain color-coded section cards.
- `src/components/recipes/timeline/MobileCookTimeline.tsx` — mobile schematic + schedule layout.
- Plus a `*.test.tsx`/`*.test.ts` beside each.

**Modified files**
- `src/utils/cookTimeline.ts` — add `ingredientKey`, `sectionForComponent`; remove dead `timelineStats`/`backPlanStart`/`fmtClock`.
- `src/components/recipes/timeline/constants.ts` — `GUTTER` 158 → 132.
- `src/components/recipes/timeline/TimelineGantt.tsx` — relative ruler labels.
- `src/components/recipes/timeline/TimelineDetailPanel.tsx` — ingredient column + scrollable grouped-instructions window + auto-scroll.
- `src/components/recipes/timeline/CookTimeline.tsx` — drop `TimelineStats`; new props flow; desktop/mobile branch; own checked-state plumb-through.
- `src/pages/RecipePage.tsx` — view toggle + conditional render; drop `RecipeSections`.
- Tests: `RecipePage.test.tsx`, `CookTimeline.test.tsx`, `TimelineDetailPanel.test.tsx`, `cookTimeline.test.ts`.

**Deleted files**
- `src/components/recipes/timeline/TimelineStats.tsx` + `TimelineStats.test.tsx`.
- `src/components/recipes/RecipeSections.tsx`.

**Shared contracts (defined in Task 1, used throughout)**
- `ingredientKey(sectionIndex: number, ingredientIndex: number): string` → `"{s}:{i}"`.
- Checklist props on consumers: `checked: ReadonlySet<string>`, `onToggleIngredient: (key: string) => void`, `onClearChecked?: () => void`.
- `sectionForComponent(component: TimelineComponent, sections: RecipeSection[]): { section: RecipeSection; index: number } | null`.

---

### Task 1: cookTimeline helpers — `ingredientKey` + `sectionForComponent`

**Files:**
- Modify: `src/utils/cookTimeline.ts`
- Test: `src/utils/cookTimeline.test.ts`

**Interfaces:**
- Produces: `ingredientKey(sectionIndex: number, ingredientIndex: number): string`; `sectionForComponent(component: TimelineComponent, sections: RecipeSection[]): { section: RecipeSection; index: number } | null`.
- Consumes: existing `componentId(section, index)`.

- [ ] **Step 1: Write the failing tests**

Add to `src/utils/cookTimeline.test.ts`:

```ts
import { ingredientKey, sectionForComponent } from './cookTimeline';

describe('ingredientKey', () => {
  it('joins section and ingredient indices', () => {
    expect(ingredientKey(0, 3)).toBe('0:3');
    expect(ingredientKey(2, 0)).toBe('2:0');
  });
});

describe('sectionForComponent', () => {
  const sections = [
    { name: 'Butter Chicken', ingredients: ['a'], steps: ['s1'] },
    { name: 'Basmati Rice', ingredients: ['b'], steps: ['s2'] },
  ];
  it('matches a component to its section by componentId', () => {
    const comp = { name: 'basmati-rice', steps_hash: 'x', phases: [] };
    const res = sectionForComponent(comp, sections);
    expect(res).toEqual({ section: sections[1], index: 1 });
  });
  it('returns null when no section matches', () => {
    const comp = { name: 'nope', steps_hash: 'x', phases: [] };
    expect(sectionForComponent(comp, sections)).toBeNull();
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- src/utils/cookTimeline.test.ts`
Expected: FAIL — `ingredientKey`/`sectionForComponent` are not exported.

- [ ] **Step 3: Implement**

Add to `src/utils/cookTimeline.ts` (imports for `TimelineComponent`/`RecipeSection` already present):

```ts
export const ingredientKey = (sectionIndex: number, ingredientIndex: number): string =>
  `${sectionIndex}:${ingredientIndex}`;

export function sectionForComponent(
  component: TimelineComponent,
  sections: RecipeSection[],
): { section: RecipeSection; index: number } | null {
  for (let i = 0; i < sections.length; i++) {
    if (componentId(sections[i], i) === component.name) {
      return { section: sections[i], index: i };
    }
  }
  return null;
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- src/utils/cookTimeline.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/utils/cookTimeline.ts src/utils/cookTimeline.test.ts
git commit -m "feat(recipes): add ingredientKey + sectionForComponent helpers"
```

---

### Task 2: `animateScrollTo` utility

**Files:**
- Create: `src/utils/animateScroll.ts`
- Test: `src/utils/animateScroll.test.ts`

**Interfaces:**
- Produces: `animateScrollTo(el: HTMLElement, to: number, opts?: { reduced?: boolean }): void` — eases `el.scrollTop` to `to` (easeInOutCubic, 340–720ms scaled to distance). When `reduced`, jumps instantly. Guards against overlapping animations on the same element.

- [ ] **Step 1: Write the failing test**

`src/utils/animateScroll.test.ts`:

```ts
import { animateScrollTo } from './animateScroll';

describe('animateScrollTo', () => {
  it('jumps instantly when reduced motion is requested', () => {
    const el = { scrollTop: 0 } as HTMLElement;
    animateScrollTo(el, 120, { reduced: true });
    expect(el.scrollTop).toBe(120);
  });

  it('snaps immediately for sub-pixel distances', () => {
    const el = { scrollTop: 100 } as HTMLElement;
    animateScrollTo(el, 101, { reduced: false });
    expect(el.scrollTop).toBe(101);
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- src/utils/animateScroll.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

`src/utils/animateScroll.ts`:

```ts
interface AnimatedEl extends HTMLElement {
  _scrollAnim?: number;
}

const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function animateScrollTo(
  el: HTMLElement,
  to: number,
  opts: { reduced?: boolean } = {},
): void {
  const target = el as AnimatedEl;
  const from = target.scrollTop;
  const dist = to - from;
  if (opts.reduced || Math.abs(dist) < 2) {
    target.scrollTop = to;
    return;
  }
  const dur = Math.min(720, Math.max(340, Math.abs(dist) * 0.9));
  const token = (target._scrollAnim ?? 0) + 1;
  target._scrollAnim = token;
  const start = performance.now();
  const step = (now: number) => {
    if (target._scrollAnim !== token) return; // superseded by a newer scroll
    const t = Math.min(1, (now - start) / dur);
    target.scrollTop = from + dist * easeInOutCubic(t);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- src/utils/animateScroll.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/utils/animateScroll.ts src/utils/animateScroll.test.ts
git commit -m "feat: add animateScrollTo rAF easing helper"
```

---

### Task 3: `RecipeViewToggle`

**Files:**
- Create: `src/components/recipes/RecipeViewToggle.tsx`
- Test: `src/components/recipes/RecipeViewToggle.test.tsx`

**Interfaces:**
- Produces: `export type RecipeView = 'timeline' | 'shopping' | 'raw';` and `RecipeViewToggle: React.FC<{ value: RecipeView; onChange: (v: RecipeView) => void }>`.

Pattern reference: `src/components/recipes/RecipeSourceChooser.tsx` (existing `ToggleButtonGroup` usage).

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecipeViewToggle } from './RecipeViewToggle';
import { renderWithTheme } from '@/test/renderWithTheme'; // use existing test helper if present; otherwise wrap in ThemeProvider

it('renders three views and reports changes', async () => {
  const onChange = vi.fn();
  renderWithTheme(<RecipeViewToggle value="timeline" onChange={onChange} />);
  expect(screen.getByRole('button', { name: /timeline/i })).toHaveAttribute('aria-pressed', 'true');
  await userEvent.click(screen.getByRole('button', { name: /shopping/i }));
  expect(onChange).toHaveBeenCalledWith('shopping');
});
```

> If `@/test/renderWithTheme` does not exist, import `{ ThemeProvider }` and the app theme the other component tests use (check `CookTimeline.test.tsx` for the exact wrapper) and reuse that.

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- src/components/recipes/RecipeViewToggle.test.tsx`
Expected: FAIL — component not found.

- [ ] **Step 3: Implement**

```tsx
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export type RecipeView = 'timeline' | 'shopping' | 'raw';

const OPTIONS: { value: RecipeView; label: string }[] = [
  { value: 'timeline', label: 'Timeline' },
  { value: 'shopping', label: 'Shopping list' },
  { value: 'raw', label: 'Raw recipe' },
];

export const RecipeViewToggle: React.FC<{
  value: RecipeView;
  onChange: (v: RecipeView) => void;
}> = ({ value, onChange }) => (
  <ToggleButtonGroup
    exclusive
    size="small"
    value={value}
    onChange={(_, next) => {
      if (next) onChange(next as RecipeView);
    }}
    aria-label="Recipe view"
    sx={{ mb: 2 }}
  >
    {OPTIONS.map((o) => (
      <ToggleButton key={o.value} value={o.value}>
        {o.label}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
);
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- src/components/recipes/RecipeViewToggle.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/RecipeViewToggle.tsx src/components/recipes/RecipeViewToggle.test.tsx
git commit -m "feat(recipes): add Timeline/Shopping/Raw view toggle"
```

---

### Task 4: `RawRecipe` — color-coded section cards

**Files:**
- Create: `src/components/recipes/RawRecipe.tsx`
- Test: `src/components/recipes/RawRecipe.test.tsx`

**Interfaces:**
- Consumes: `RecipeContent` (`src/types/recipe.ts`), `pickLaneColors`, `componentId` (`@/utils/cookTimeline`).
- Produces: `RawRecipe: React.FC<{ content: RecipeContent }>`.

Color rule: section `i` uses `laneColors[i]` from `pickLaneColors(content.sections.length, theme.tokens.color.categorical)` — same array the Gantt cycles, so a section reads one color everywhere.

- [ ] **Step 1: Write the failing test**

```tsx
it('renders every section, ingredient, and step', () => {
  const content = {
    title: 'Test Dish',
    sections: [
      { name: 'Sauce', ingredients: ['2 tomatoes'], steps: ['Simmer sauce'] },
      { name: 'Pasta', ingredients: ['200g pasta'], steps: ['Boil pasta'] },
    ],
  };
  renderWithTheme(<RawRecipe content={content as any} />);
  expect(screen.getByText('Sauce')).toBeInTheDocument();
  expect(screen.getByText('2 tomatoes')).toBeInTheDocument();
  expect(screen.getByText('Simmer sauce')).toBeInTheDocument();
  expect(screen.getByText('Boil pasta')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- src/components/recipes/RawRecipe.test.tsx`
Expected: FAIL — component not found.

- [ ] **Step 3: Implement**

```tsx
import { styled, useTheme } from '@mui/material/styles';
import type { RecipeContent } from '@/types/recipe';
import { pickLaneColors } from '@/utils/cookTimeline';

const Card = styled('section')<{ sec: string }>(({ theme, sec }) => ({
  background: theme.tokens.color.surface.raised,
  border: `1px solid ${theme.tokens.color.border.subtle}`,
  borderLeft: `3px solid ${sec}`,
  borderRadius: theme.tokens.radius.md,
  boxShadow: theme.tokens.elevation.md,
  padding: '15px 18px 18px',
  '& + &': { marginTop: 16 },
}));

const Name = styled('h3')<{ sec: string }>(({ theme, sec }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontFamily: theme.tokens.typography.mono,
  fontWeight: 600,
  fontSize: 16,
  margin: '0 0 4px',
  color: sec,
  '& .sdot': { width: 11, height: 11, borderRadius: 3, background: sec, flex: '0 0 auto' },
}));

const Label = styled('h5')(({ theme }) => ({
  fontFamily: theme.tokens.typography.mono,
  fontSize: 10.5,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: theme.tokens.color.text.disabled,
  margin: '16px 0 8px',
  paddingTop: 12,
  borderTop: `1px solid ${theme.tokens.color.border.subtle}`,
  '&:first-of-type': { paddingTop: 8, borderTop: 0 },
}));

export const RawRecipe: React.FC<{ content: RecipeContent }> = ({ content }) => {
  const theme = useTheme();
  const colors = pickLaneColors(content.sections.length, theme.tokens.color.categorical);
  return (
    <div>
      {content.sections.map((s, i) => (
        <Card key={i} sec={colors[i]}>
          <Name sec={colors[i]}>
            <span className="sdot" />
            {s.name ?? content.title}
          </Name>
          <Label>Ingredients</Label>
          <ul>{s.ingredients.map((ing, j) => <li key={j}>{ing}</li>)}</ul>
          <Label>Instructions</Label>
          <ol>{s.steps.map((step, j) => <li key={j}>{step}</li>)}</ol>
        </Card>
      ))}
    </div>
  );
};
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- src/components/recipes/RawRecipe.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/RawRecipe.tsx src/components/recipes/RawRecipe.test.tsx
git commit -m "feat(recipes): add color-coded raw recipe view"
```

---

### Task 5: `ShoppingList` — whole-recipe checkable list

**Files:**
- Create: `src/components/recipes/ShoppingList.tsx`
- Test: `src/components/recipes/ShoppingList.test.tsx`

**Interfaces:**
- Consumes: `RecipeContent`, `pickLaneColors`, `ingredientKey`; checklist props `checked: ReadonlySet<string>`, `onToggleIngredient: (key: string) => void`, `onClearChecked: () => void`.
- Produces: `ShoppingList: React.FC<{ content: RecipeContent; checked: ReadonlySet<string>; onToggleIngredient: (key: string) => void; onClearChecked: () => void }>`.

- [ ] **Step 1: Write the failing test**

```tsx
it('lists ingredients per section, reports checks, and shows a running count', async () => {
  const content = {
    title: 'T',
    sections: [
      { name: 'Sauce', ingredients: ['2 tomatoes', 'basil'], steps: [] },
      { name: 'Pasta', ingredients: ['200g pasta'], steps: [] },
    ],
  };
  const onToggle = vi.fn();
  renderWithTheme(
    <ShoppingList content={content as any} checked={new Set(['0:0'])}
      onToggleIngredient={onToggle} onClearChecked={vi.fn()} />,
  );
  expect(screen.getByText(/1\s*\/\s*3/)).toBeInTheDocument();  // summary count
  await userEvent.click(screen.getByLabelText('basil'));
  expect(onToggle).toHaveBeenCalledWith('0:1');
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- src/components/recipes/ShoppingList.test.tsx`
Expected: FAIL — component not found.

- [ ] **Step 3: Implement**

```tsx
import { Checkbox, FormControlLabel } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import type { RecipeContent } from '@/types/recipe';
import { ingredientKey, pickLaneColors } from '@/utils/cookTimeline';

const Summary = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  marginBottom: 16,
  fontFamily: theme.tokens.typography.mono,
  fontSize: 12,
  color: theme.tokens.color.text.secondary,
  '& .big': { color: theme.tokens.color.text.primary, fontSize: 20, fontWeight: 600 },
}));

const Grid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: 14,
});

const SectionCard = styled('div')(({ theme }) => ({
  background: theme.tokens.color.surface.base,
  border: `1px solid ${theme.tokens.color.border.subtle}`,
  borderRadius: theme.tokens.radius.md,
  overflow: 'hidden',
}));

export const ShoppingList: React.FC<{
  content: RecipeContent;
  checked: ReadonlySet<string>;
  onToggleIngredient: (key: string) => void;
  onClearChecked: () => void;
}> = ({ content, checked, onToggleIngredient, onClearChecked }) => {
  const theme = useTheme();
  const colors = pickLaneColors(content.sections.length, theme.tokens.color.categorical);
  const total = content.sections.reduce((n, s) => n + s.ingredients.length, 0);
  return (
    <div>
      <Summary>
        <span className="big">{checked.size}/{total}</span> ingredients checked
        <button onClick={onClearChecked} style={{ marginLeft: 'auto' }}>Reset list</button>
      </Summary>
      <Grid>
        {content.sections.map((s, i) => (
          <SectionCard key={i}>
            <header style={{ borderLeft: `3px solid ${colors[i]}` }}>{s.name ?? content.title}</header>
            {s.ingredients.map((ing, j) => {
              const key = ingredientKey(i, j);
              return (
                <FormControlLabel
                  key={j}
                  control={
                    <Checkbox
                      checked={checked.has(key)}
                      onChange={() => onToggleIngredient(key)}
                      inputProps={{ 'aria-label': ing }}
                    />
                  }
                  label={ing}
                />
              );
            })}
          </SectionCard>
        ))}
      </Grid>
    </div>
  );
};
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- src/components/recipes/ShoppingList.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/ShoppingList.tsx src/components/recipes/ShoppingList.test.tsx
git commit -m "feat(recipes): add whole-recipe shopping list view"
```

---

### Task 6: Relative Gantt ruler + compact gutter

**Files:**
- Modify: `src/components/recipes/timeline/constants.ts`
- Modify: `src/components/recipes/timeline/TimelineGantt.tsx`
- Test: `src/components/recipes/timeline/TimelineGantt.test.tsx`

**Interfaces:**
- Unchanged public props (`timeline`, `laneColors`, `selectedId`, `onSelect`). Only tick labels + gutter width change.

- [ ] **Step 1: Update the failing test**

In `TimelineGantt.test.tsx`, add:

```tsx
it('labels the ruler in relative elapsed minutes', () => {
  renderWithTheme(<TimelineGantt {...baseProps} />);
  // ruler shows "0m" and a later "10m" tick, not clock times
  expect(screen.getByText('0m')).toBeInTheDocument();
  expect(screen.getByText('10m')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- src/components/recipes/timeline/TimelineGantt.test.tsx`
Expected: FAIL — current labels are not `0m`/`10m`.

- [ ] **Step 3: Implement**

In `constants.ts`: `export const GUTTER = 132;` (was 158).

In `TimelineGantt.tsx`, change the tick label text to relative minutes. Find where `TickLabel` renders its content and set it to `` `${t}m` `` where `t` is the tick's minute value (the loop already steps in minutes). Remove any clock/serve-time formatting from the ruler.

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- src/components/recipes/timeline/TimelineGantt.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/timeline/constants.ts src/components/recipes/timeline/TimelineGantt.tsx src/components/recipes/timeline/TimelineGantt.test.tsx
git commit -m "feat(recipes): relative Gantt ruler + compact lane gutter"
```

---

### Task 7: `TimelineDetailPanel` — ingredients + scrollable full-method window

**Files:**
- Modify: `src/components/recipes/timeline/TimelineDetailPanel.tsx`
- Test: `src/components/recipes/timeline/TimelineDetailPanel.test.tsx`

**Interfaces:**
- Consumes: `animateScrollTo` (Task 2), `ingredientKey` (Task 1), `effectiveDuration`.
- Produces (new props):

```ts
interface PhaseGroup {
  id: string;          // phase id
  label: string;
  componentName: string;
  laneColor: string;
  kind: 'active' | 'passive';
  start: number;       // minutes from t0
  dur: number;
  steps: string[];
}
interface TimelineDetailPanelProps {
  selectedId: string | null;
  groups: PhaseGroup[];                 // ALL phases, reading order (built by CookTimeline)
  ingredients: string[];               // selected phase's section ingredients
  sectionIndex: number;                // for ingredient keys
  checked: ReadonlySet<string>;
  onToggleIngredient: (key: string) => void;
}
```

- [ ] **Step 1: Write the failing test**

```tsx
const groups = [
  { id: 'a/mix', label: 'Mix', componentName: 'A', laneColor: '#26A0BC', kind: 'active', start: 0, dur: 5, steps: ['Combine'] },
  { id: 'a/bake', label: 'Bake', componentName: 'A', laneColor: '#26A0BC', kind: 'passive', start: 5, dur: 20, steps: ['Bake it'] },
];

it('shows the focused section ingredients and every phase step', () => {
  renderWithTheme(
    <TimelineDetailPanel selectedId="a/bake" groups={groups as any}
      ingredients={['flour', 'sugar']} sectionIndex={0}
      checked={new Set()} onToggleIngredient={vi.fn()} />,
  );
  expect(screen.getByText('flour')).toBeInTheDocument();
  expect(screen.getByText('Combine')).toBeInTheDocument();   // step from a non-selected phase is still present
  expect(screen.getByText('Bake it')).toBeInTheDocument();
});

it('marks the selected phase group', () => {
  renderWithTheme(
    <TimelineDetailPanel selectedId="a/bake" groups={groups as any}
      ingredients={[]} sectionIndex={0} checked={new Set()} onToggleIngredient={vi.fn()} />,
  );
  expect(document.querySelector('[data-group="a/bake"]')).toHaveClass('sel');
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- src/components/recipes/timeline/TimelineDetailPanel.test.tsx`
Expected: FAIL — new props/markup not present.

- [ ] **Step 3: Implement**

Rewrite `TimelineDetailPanel.tsx` to a two-column layout: left = ingredient checklist (`FormControlLabel` + `Checkbox`, keyed with `ingredientKey(sectionIndex, j)`), right = a scroll container listing every `groups` entry as `<div className={`instr-group${g.id===selectedId?' sel':''}`} data-group={g.id}>` with a header (dot, label, `componentName · +{start}–{start+dur} min`, kind pill) and an ordered step list. Style with tokens (`surface.base`, `border.strong`, cyan-tinted `.sel` via `theme.tokens.color.brand.primary`). Scroll container `maxHeight: 320, overflowY: 'auto'`.

Add the auto-scroll effect (React keeps the scroll node across renders, so only animate on selection change):

```tsx
const winRef = useRef<HTMLDivElement>(null);
const reduced = useMemo(
  () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  [],
);
useEffect(() => {
  const win = winRef.current;
  if (!win || !selectedId) return;
  const tgt = win.querySelector<HTMLElement>(`[data-group="${selectedId}"]`);
  if (!tgt) return;
  const top = win.scrollTop + (tgt.getBoundingClientRect().top - win.getBoundingClientRect().top) - 8;
  animateScrollTo(win, top, { reduced });
}, [selectedId, reduced]);
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- src/components/recipes/timeline/TimelineDetailPanel.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/timeline/TimelineDetailPanel.tsx src/components/recipes/timeline/TimelineDetailPanel.test.tsx
git commit -m "feat(recipes): detail panel shows ingredients + scrollable full method"
```

---

### Task 8: `CookTimeline` desktop restructure (drop stats, wire new panel)

**Files:**
- Modify: `src/components/recipes/timeline/CookTimeline.tsx`
- Test: `src/components/recipes/timeline/CookTimeline.test.tsx`

**Interfaces:**
- Consumes: `sectionForComponent`, `ingredientKey`, `effectiveDuration`, `pickLaneColors`; new `TimelineDetailPanel` props (Task 7).
- Produces (updated props):

```ts
interface CookTimelineProps {
  timeline: Timeline;
  sections: RecipeSection[];
  checked: ReadonlySet<string>;
  onToggleIngredient: (key: string) => void;
}
```

- [ ] **Step 1: Update the failing test**

In `CookTimeline.test.tsx`, remove any assertions about the stat cards (total/hands-on/free) and add:

```tsx
it('does not render the removed stat cards', () => {
  renderWithTheme(<CookTimeline {...baseProps} checked={new Set()} onToggleIngredient={vi.fn()} />);
  expect(screen.queryByText(/hands-on/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/you're free/i)).not.toBeInTheDocument();
});

it('renders the full method (all phases) in the detail panel', () => {
  renderWithTheme(<CookTimeline {...baseProps} checked={new Set()} onToggleIngredient={vi.fn()} />);
  // every phase label from the fixture appears as a group header
  baseProps.timeline.components.flatMap((c) => c.phases).forEach((p) => {
    expect(screen.getByText(p.label)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- src/components/recipes/timeline/CookTimeline.test.tsx`
Expected: FAIL — stats still present / new props unknown.

- [ ] **Step 3: Implement**

In `CookTimeline.tsx`: remove the `TimelineStats` import and its `<TimelineStats>` render. Widen props to `CookTimelineProps` above. Build the `groups: PhaseGroup[]` array by iterating `timeline.components` in order, and for each phase resolving its section via `sectionForComponent` and steps via `resolvePhaseSteps`:

```tsx
const laneColors = pickLaneColors(timeline.components.length, theme.tokens.color.categorical);
const groups = timeline.components.flatMap((comp, ci) => {
  const sec = sectionForComponent(comp, sections);
  return comp.phases.map((phase) => ({
    id: phase.id,
    label: phase.label,
    componentName: sec?.section.name ?? comp.name,
    laneColor: laneColors[ci],
    kind: phase.kind,
    start: phase.start ?? 0,
    dur: effectiveDuration(phase, timeline.overrides),
    steps: sec ? resolvePhaseSteps(phase, comp, sections) : [],
  }));
});
```

Resolve the selected phase's section for the ingredient column:

```tsx
const selectedComp = timeline.components.find((c) => c.phases.some((p) => p.id === selectedId));
const selectedSection = selectedComp ? sectionForComponent(selectedComp, sections) : null;
```

Render:

```tsx
<TimelineDetailPanel
  selectedId={selectedId}
  groups={groups}
  ingredients={selectedSection?.section.ingredients ?? []}
  sectionIndex={selectedSection?.index ?? 0}
  checked={checked}
  onToggleIngredient={onToggleIngredient}
/>
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- src/components/recipes/timeline/CookTimeline.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/timeline/CookTimeline.tsx src/components/recipes/timeline/CookTimeline.test.tsx
git commit -m "feat(recipes): drop stat cards; wire ingredient + full-method panel"
```

---

### Task 9: `MobileCookTimeline` + breakpoint switch

**Files:**
- Create: `src/components/recipes/timeline/MobileCookTimeline.tsx`
- Test: `src/components/recipes/timeline/MobileCookTimeline.test.tsx`
- Modify: `src/components/recipes/timeline/CookTimeline.tsx`

**Interfaces:**
- Consumes: same `CookTimelineProps` as `CookTimeline`, plus `sectionForComponent`, `ingredientKey`, `pickLaneColors`, `effectiveDuration`.
- Produces: `MobileCookTimeline: React.FC<CookTimelineProps>`.

Sub-structure (state is local to this component):
- `section: 'all' | componentName` (default `'all'`)
- `openPhaseId: string | null` (which schedule row is expanded)
- `ingPanelOpen: boolean` (shared ingredient panel)

Renders, in order: **(a)** schematic mini-Gantt (one thin row per component, bars at `left = start/total*100%`, `width = dur/total*100%`, active solid / passive faded; row tap sets `section`); **(b)** section selector chips (`Whole timeline` + one per component); **(c)** shared collapsible ingredients panel (section-filtered; whole timeline groups all); **(d)** vertical schedule (phases filtered by `section`, ordered by `start`; each row: `+{start}m`, colored node, label/component, kind pill; tap toggles `openPhaseId` to reveal that phase's **instructions only**).

- [ ] **Step 1: Write the failing test**

```tsx
it('filters the schedule to the selected section', async () => {
  renderWithTheme(<MobileCookTimeline {...baseProps} checked={new Set()} onToggleIngredient={vi.fn()} />);
  // both sections' phases visible under "Whole timeline"
  expect(screen.getByText(baseProps.sections[0].name!)).toBeInTheDocument();
  // pick the second section chip
  await userEvent.click(screen.getByRole('button', { name: baseProps.sections[1].name! }));
  // a phase that belongs only to section 0 is now hidden
  expect(screen.queryByText(section0OnlyPhaseLabel)).not.toBeInTheDocument();
});

it('reveals a phase\'s instructions on tap', async () => {
  renderWithTheme(<MobileCookTimeline {...baseProps} checked={new Set()} onToggleIngredient={vi.fn()} />);
  await userEvent.click(screen.getByText(firstPhaseLabel));
  expect(screen.getByText(firstPhaseFirstStep)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- src/components/recipes/timeline/MobileCookTimeline.test.tsx`
Expected: FAIL — component not found.

- [ ] **Step 3: Implement**

Build `MobileCookTimeline.tsx` per the sub-structure above, styling every element through `theme.tokens.*` and the `pickLaneColors` array. Ingredient checklist items key with `ingredientKey(sectionIndex, j)` and use `checked`/`onToggleIngredient` (shared state). Reference the validated markup/logic in the prototype (`recipe-timeline.html`, `renderMobile`) — translate `mini()`, `secsel()`, `ingredients()`, `sched()` into React with `useState` for `section`/`openPhaseId`/`ingPanelOpen`.

Then in `CookTimeline.tsx` add the breakpoint switch at the top of the component:

```tsx
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
if (isMobile) return <MobileCookTimeline {...props} />;
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- src/components/recipes/timeline/MobileCookTimeline.test.tsx src/components/recipes/timeline/CookTimeline.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/timeline/MobileCookTimeline.tsx src/components/recipes/timeline/MobileCookTimeline.test.tsx src/components/recipes/timeline/CookTimeline.tsx
git commit -m "feat(recipes): mobile schematic overview + section-filtered schedule"
```

---

### Task 10: Wire `RecipePage` — view toggle, shared checked-state, drop RecipeSections

**Files:**
- Modify: `src/pages/RecipePage.tsx`
- Delete: `src/components/recipes/RecipeSections.tsx`
- Test: `src/pages/RecipePage.test.tsx`

**Interfaces:**
- Consumes: `RecipeViewToggle`/`RecipeView` (Task 3), `ShoppingList` (Task 5), `RawRecipe` (Task 4), `CookTimeline` (Tasks 8–9).

- [ ] **Step 1: Update the failing test**

In `RecipePage.test.tsx`: remove assertions that `RecipeSections` renders unconditionally. Add:

```tsx
it('defaults to the timeline view and switches views', async () => {
  renderRecipePage(recipeWithTimeline);           // existing helper/fixture in this file
  expect(screen.getByRole('button', { name: /timeline/i })).toHaveAttribute('aria-pressed', 'true');
  await userEvent.click(screen.getByRole('button', { name: /raw recipe/i }));
  // a raw-only element (section instructions heading) appears
  expect(screen.getAllByText(/instructions/i).length).toBeGreaterThan(0);
  await userEvent.click(screen.getByRole('button', { name: /shopping/i }));
  expect(screen.getByText(/ingredients checked/i)).toBeInTheDocument();
});
```

Keep the existing tests for header, import-lineage gating, wake-lock, and the no-timeline writer hint (the hint still shows when `recipe.timeline` is absent and the Timeline view is active).

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- src/pages/RecipePage.test.tsx`
Expected: FAIL — no toggle / RecipeSections still imported.

- [ ] **Step 3: Implement**

In `RecipePage.tsx`: remove the `RecipeSections` import and render. Add:

```tsx
const [view, setView] = useState<RecipeView>('timeline');
const [checked, setChecked] = useState<ReadonlySet<string>>(() => new Set());
const toggleIngredient = useCallback((key: string) => {
  setChecked((prev) => {
    const next = new Set(prev);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  });
}, []);
const clearChecked = useCallback(() => setChecked(new Set()), []);
```

Render after the header/labels/lineage strip:

```tsx
<RecipeViewToggle value={view} onChange={setView} />
{view === 'timeline' && (
  recipe.timeline
    ? <CookTimeline timeline={recipe.timeline} sections={recipe.content.sections}
        checked={checked} onToggleIngredient={toggleIngredient} />
    : <Typography>Save this recipe to generate a cook timeline.</Typography>  // keep existing hint text
)}
{view === 'shopping' && (
  <ShoppingList content={recipe.content} checked={checked}
    onToggleIngredient={toggleIngredient} onClearChecked={clearChecked} />
)}
{view === 'raw' && <RawRecipe content={recipe.content} />}
```

Then delete `src/components/recipes/RecipeSections.tsx`.

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- src/pages/RecipePage.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/RecipePage.tsx src/pages/RecipePage.test.tsx
git rm src/components/recipes/RecipeSections.tsx
git commit -m "feat(recipes): timeline-first RecipePage with Timeline/Shopping/Raw views"
```

---

### Task 11: Delete `TimelineStats` + dead helpers

**Files:**
- Delete: `src/components/recipes/timeline/TimelineStats.tsx`, `src/components/recipes/timeline/TimelineStats.test.tsx`
- Modify: `src/utils/cookTimeline.ts`, `src/utils/cookTimeline.test.ts`

**Interfaces:**
- Removes: `timelineStats`, `TimelineStats` interface, `backPlanStart`, private `fmtClock`. (`effectiveDuration`, `componentId`, `resolvePhaseSteps`, `pickLaneColors`, and the Task-1 helpers stay.)

- [ ] **Step 1: Delete the component + its test**

```bash
git rm src/components/recipes/timeline/TimelineStats.tsx src/components/recipes/timeline/TimelineStats.test.tsx
```

- [ ] **Step 2: Remove dead helpers**

In `src/utils/cookTimeline.ts`, delete the `timelineStats` function, the `TimelineStats` interface, `backPlanStart`, and the private `fmtClock`. In `src/utils/cookTimeline.test.ts`, delete the `describe('timelineStats' …)` and `describe('backPlanStart' …)` blocks.

- [ ] **Step 3: Verify nothing references them**

Run: `grep -rn "timelineStats\|backPlanStart\|TimelineStats" src`
Expected: no matches.

- [ ] **Step 4: Run the util + timeline suites**

Run: `npm test -- src/utils/cookTimeline.test.ts src/components/recipes/timeline`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A src/components/recipes/timeline src/utils/cookTimeline.ts src/utils/cookTimeline.test.ts
git commit -m "chore(recipes): remove TimelineStats and now-dead timeline helpers"
```

---

### Task 12: Full CI gate

- [ ] **Step 1: Typecheck + lint + unit suite**

Run: `npm run ci`
Expected: PASS (typecheck, lint, all Vitest tests green).

- [ ] **Step 2: Manual smoke (dev server)**

Run: `npm run dev`, open a recipe, verify: Timeline default with compact Gantt and no stat cards; clicking bars scrolls the method window smoothly; Shopping and Raw toggle correctly; check state is shared across Timeline↔Shopping; resize to mobile width for the schematic + section filter + shared ingredient panel + tap-to-expand.

- [ ] **Step 3: Commit any lint/format fixups**

```bash
git add -A && git commit -m "chore(recipes): lint/format fixups for timeline-first redesign"
```

---

## Self-review

**Spec coverage:**
- Timeline leads / drop vanity metrics → Tasks 8, 11. ✅
- Step focus includes ingredients → Tasks 6/7 (panel), 1/8 (section resolution). ✅
- Compact lanes → Task 6 (`GUTTER`). ✅
- Shopping view → Task 5. ✅ Raw view → Task 4. ✅
- Mobile first-class (schematic + selector + shared ingredients + schedule) → Task 9. ✅
- Relative timing (no serve widget) → Task 6 (ruler), Task 7 (panel timing), Task 8/11 (stats + back-planner removed). ✅
- Shared checked-state → Task 10 (lifted to `RecipePage`), consumed in 5/7/9. ✅
- Dead-code cleanup → Task 11. ✅
- Theming via tokens / lane colors → enforced per task + Global Constraints. ✅
- Deferred (serve-time read-only, dependency arrows, a11y, persistence) → correctly NOT tasked.

**Placeholder scan:** No TBD/TODO; every code step shows code. Modified-file steps that can't reproduce an entire large existing file (Gantt ruler, mobile translation) give exact edit targets + the prototype as the reference source rather than a vague "handle it."

**Type consistency:** `ingredientKey(sectionIndex, ingredientIndex)`, `PhaseGroup`, `RecipeView`, and `CookTimelineProps { checked, onToggleIngredient }` are used identically across Tasks 1, 5, 7, 8, 9, 10. `checked` is `ReadonlySet<string>` everywhere; `onToggleIngredient: (key: string) => void` everywhere.

> **Note for the executor:** confirm the exact test-render wrapper this repo uses (e.g. a `renderWithTheme`/ThemeProvider helper) by opening an existing `src/components/recipes/timeline/*.test.tsx` first, and match it — the test snippets above assume such a wrapper for `theme.tokens` access.
