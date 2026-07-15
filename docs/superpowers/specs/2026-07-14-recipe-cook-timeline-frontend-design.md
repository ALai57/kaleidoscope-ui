# Recipe Cook Timeline — Frontend Design

The **frontend** for the Recipe Cook Timeline: a Prism, Gantt-style view rendered
inline on the recipe page. Each recipe *component* (dish part) is a lane; each
*phase* (a timed group of that component's steps) is a bar on a real-minute axis.
Solid bars are hands-on (active); hatched bars run themselves (passive). The view
lets a cook see *when* to do each step — and when to kick off a hands-off step so
it lands on time.

The backend is **already shipped**; this spec covers only the kaleidoscope-ui
render + integration layer against its fixed data contract.

- Backend design (data model, generation, packer): `../kaleidoscope/plans/2026-07-14-recipe-cook-timeline/DESIGN.md`
- Visual reference: approved Prism artifact **"Cook Timeline — Miso-Glazed Salmon Bowls"**
  (`0315a6b3-c5bd-44cb-a823-bf590629d841`).
- Related UI: `PrismThemeProvider` + `ImportLineageStrip` (the inline dark-Prism precedent on `RecipePage`).

---

## Terminology

`content.sections` is overloaded, so (matching the backend spec):

| Term | Definition | In the data |
|---|---|---|
| **Component** | A dish part pairing ingredients with steps ("Salmon", "Rice") | `content.sections[i]`; timeline `components[i]` |
| **Lane** | One horizontal Gantt row | = one component |
| **Phase** | The atomic timed block — a contiguous group of a component's steps with one duration ("Marinate", "Sear & glaze") | `component.phases[j]`; **derived, not in `content`** |

A component (lane) holds one or more phases. The **phase** is the atomic bar.

---

## Scope (settled decisions)

- **Placement:** rendered **inline** on `RecipePage`, below the recipe content, as
  a self-contained dark-Prism section wrapped in `PrismThemeProvider` — the same
  pattern already used for `ImportLineageStrip`.
- **Interactivity — static-first:** lanes, active/passive bars, dependency links,
  click-to-expand detail panel, legend, stat tiles, and the back-planned start
  clock. **No** animated playhead / scrub / "cook along" transport (deferred).
- **Authoring — render + auto-regen after save:** the timeline is read-only for
  everyone; after a **writer** saves a recipe edit, the editor fires
  `POST /timeline` **fire-and-forget** so the schedule refreshes. No duration-nudge
  (PUT overrides) UI and no standalone "Regenerate" button in v1.
- **Render tech:** absolute-positioned CSS on a **px-per-minute** axis (as in the
  prototype), plain React + Emotion — **no chart/gantt library**. Framework-agnostic
  (aligns with the possible MUI migration); pixel-level control to match Prism.

---

## Data contract

The backend returns the timeline on the existing recipe `GET`. Types mirror the
backend Malli schema, in the repo's **snake_case** JSON convention (like
`recipe_url`, `prep_time_minutes`).

### Types — add to `src/types/recipe.ts`

```ts
export type TimelineKind = 'active' | 'passive';

export interface TimelinePhase {
  id: string;            // stable key "{component-id}/{label}"
  label: string;         // unique within its component
  kind: TimelineKind;
  steps: number[];       // indices into THIS component's section steps
  estimate: number;      // LLM minutes
  deps: string[];        // phase ids this phase waits on
  start?: number | null; // packer output — minutes from t0
}

export interface TimelineComponent {
  name: string;          // the component-id / lane label
  steps_hash: string;
  phases: TimelinePhase[];
}

export interface TimelineOverride {
  phase: string;         // a TimelinePhase.id
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

`Recipe` gains: `timeline?: Timeline | null;` (absent/null ⇒ not yet generated).

### Component ↔ section mapping (load-bearing)

The backend derives a component's id as (`api/recipe_timeline.clj` `component-id`):

> `section.name` if non-blank, else `"Section {index+1}"`, in **section order**.

The frontend **mirrors this exactly** so it can resolve a phase's `steps`
(indices) back to the recipe's step *text*. This is the one place the derived
timeline is joined to authored content; getting it wrong silently shows the wrong
steps, so it is unit-tested including the unnamed / blank / whitespace-name and
duplicate-name cases.

---

## API — `src/api/recipes.ts`

Add one client function (POST only; PUT/overrides deferred with the nudge UI):

```ts
export function regenerateTimeline(slug: string, token?: string): Promise<Timeline> {
  return request<{ timeline: Timeline }>(`/recipes/${slug}/timeline`, {
    method: 'POST', token,
  }).then((r) => r.timeline);
}
```

Contract (from the backend):
- **Writer-only.** Non-writers get `404`.
- Runs the LLM only when a component's steps changed; otherwise short-circuits
  instantly and returns the stored timeline.
- Failure modes: `502` generation-failed, `503`/`429` rate-limited. On any
  failure **the recipe stays saved** and the stored timeline is untouched.

---

## Pure helpers — `src/utils/cookTimeline.ts`

Pure, framework-free, heavily unit-tested. No React, no layout px here beyond
plain math — these are the testable core.

- `componentId(section, index): string` — mirrors the backend id rule.
- `resolvePhaseSteps(phase, component, sections): string[]` — maps a phase to its
  section (via `componentId`) and returns the step strings for `phase.steps`.
  Tolerates out-of-range indices (skips them) so a stale timeline never throws.
- `effectiveDuration(phase, overrides): number` — `override.minutes ?? phase.estimate`
  (used for bar widths; server `start` already reflects overrides).
- `backPlanStart(serveTimeHHMM: string, totalMinutes: number): string` — returns a
  "5:40 PM"-style start clock (serve − total). Pure clock math.
- `timelineStats(timeline)` — derives the stat tiles:
  `{ totalMinutes, handsOnMinutes, freeMinutes, activeCount, passiveWindows }`.
  Free minutes = span not covered by any active phase.

---

## Render components — `src/components/recipes/timeline/`

Each is a focused unit with one purpose; Prism primitives (`prism/Card`, `Chip`)
reused where they fit.

- **`CookTimeline.tsx`** — orchestrator. Props: `{ timeline: Timeline; sections: RecipeSection[] }`.
  Owns only *selected phase id* + *serve-time* UI state. Lays out: stat strip →
  Gantt → legend → detail panel. Preselects the first phase so the panel isn't empty.
- **`TimelineGantt.tsx`** — the axis. Renders the ruler (5-/10-min ticks, start/serve
  end-caps), one lane per component, absolute-positioned bars (px = minutes ×
  `PX_PER_MIN`), and an SVG overlay of dependency links (cubic Béziers between a
  dep's end and the phase's start). Active bars filled with the lane color; passive
  bars hatched/outlined. Bars are `<button>`s → select on click; keyboard-focusable.
- **`TimelineDetailPanel.tsx`** — the selected phase's resolved steps as an ordered
  list, with lane color, kind badge, and its `+start–end min` window. Empty state
  when nothing is selected.
- **`TimelineStats.tsx`** — stat tiles (total elapsed / hands-on / free) + the
  back-planned start card with a `serve-time` input driving `backPlanStart`.
- **`TimelineLegend.tsx`** — active / passive / depends-on key.

### Layout constants

Per-minute pixel scale, lane height, gutter, colors live as module constants
(mirroring the artifact's CSS variables). Lane colors come from a fixed Prism
categorical spectrum, assigned by lane order (cycled if a recipe has more
components than colors).

---

## Integration

### `RecipePage.tsx`

Below `<RecipeSections>`, when `recipe.timeline` is present:

```tsx
<PrismThemeProvider>
  <CookTimeline timeline={recipe.timeline} sections={recipe.content.sections} />
</PrismThemeProvider>
```

- **Reader, no timeline (`null`)** → render nothing.
- **Writer, no timeline (`null`)** → a subtle hint that saving the recipe generates
  the timeline (no standalone generate button in v1). Gated on the **same
  condition as the existing Edit button** (`isAuthenticated`), so the hint appears
  exactly to those who can act on it. (The server enforces writer-only on the POST
  regardless; a merely-authenticated non-writer would get a harmless `404` on save,
  swallowed by the fire-and-forget.)

### `RecipeEditorPage.tsx`

In the existing `saveMutation.onSuccess(saved)`, before navigating, fire the
regenerate **fire-and-forget**:

```ts
onSuccess: (saved) => {
  void queryClient.invalidateQueries({ queryKey: ['recipes'] });
  // Fire-and-forget: a save never fails because the LLM did.
  void regenerateTimeline(saved.recipe_url, token)
    .then(() => queryClient.invalidateQueries({ queryKey: ['recipe', saved.recipe_url] }))
    .catch(() => {}); // recipe is already saved; timeline just won't refresh
  navigate(`/recipes/${saved.recipe_url}`);
},
```

- The POST is issued through the app-level `queryClient`, so its
  `invalidateQueries` still lands after the editor unmounts on navigate.
- Unchanged steps → the backend short-circuits, so the extra call is cheap.
- Any failure is swallowed: the recipe is saved; the timeline shows its prior value
  (or the writer empty-state) until a future successful regen.

---

## Testing

Per the repo rule (every feature ships with tests), co-located `*.test.ts(x)`,
Vitest + Testing Library + MSW.

- **Unit — `cookTimeline.test.ts`:** `componentId` (named / blank / whitespace /
  duplicate → ordinal fallback); `resolvePhaseSteps` (correct section join,
  out-of-range index tolerance); `backPlanStart` (AM/PM, cross-midnight);
  `timelineStats` (hands-on vs free, overlapping passive windows);
  `effectiveDuration` (override wins over estimate).
- **Component — `CookTimeline.test.tsx`:** from a `salmonTimeline` fixture — lanes
  and bars render; active vs passive styling distinguished; dependency links
  present; clicking a bar shows its steps in the detail panel; changing serve-time
  recomputes the start clock; first phase preselected.
- **Integration:**
  - `RecipePage.test.tsx` — timeline renders when `recipe.timeline` present; hidden
    when `null`; writer empty-state hint when `null` + writer.
  - `RecipeEditorPage.test.tsx` — a successful save issues `POST /recipes/:slug/timeline`
    (MSW) and invalidates `['recipe', slug]`; a `502` from that POST does **not**
    surface a save error (save still succeeds, user still navigates).
- **Storybook — `CookTimeline.stories.tsx`:** the miso-salmon fixture (matches the
  recent "Storybook Prism variants" precedent for the editor/table).

### Fixtures

A `salmonTimeline` fixture (the artifact's schedule expressed in the real
`Timeline` shape) plus its parent `RecipeContent`, shared by component tests and
Storybook.

---

## Out of scope (v1 — deferred follow-ups)

- Playhead / scrub / play-pause "cook along" transport + live now-readout.
- Duration-nudge UI and `PUT /timeline` overrides + local re-pack.
- A standalone manual "Regenerate timeline" button / on-demand generation for
  recipes with a `null` timeline (only path in v1 is edit → save).
- Equipment/resource lanes (stove/oven contention) — lanes are dish/component.
- Accessibility hardening beyond focusable/labeled bars (tracked with the broader
  recipes-Prism a11y follow-up).
