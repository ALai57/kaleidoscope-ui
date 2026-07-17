# Recipe Page — Timeline-First Redesign

- **Date:** 2026-07-17
- **Status:** Design approved (prototype validated)
- **Prototype:** `https://claude.ai/code/artifact/1283afb5-bd75-4c55-a207-badec0c52aac`
- **Surfaces:** `src/pages/RecipePage.tsx` and `src/components/recipes/**`

## Context

The Recipe page today renders, top to bottom, a title/meta header, the full
`RecipeSections` body (ingredients + instructions), and then `CookTimeline` at the
bottom. The cook timeline — the schedule people actually cook from — is buried below a
long recipe body, and inside it three "vanity" stat cards (Total elapsed / Hands-on /
You're free) sit above the Gantt and crowd it. Focusing a step shows only its
instruction text, never the ingredients it needs. On mobile the horizontal Gantt and
tall stat strip are especially cramped.

## Goals

1. **Timeline leads.** The cook timeline is the primary content, at the top, given room.
2. **Drop the vanity metrics.** Remove the Total/Hands-on/Free stat cards.
3. **Step focus includes ingredients.** Focusing a step shows the section's ingredients
   alongside its instructions. (Each timeline phase maps to exactly one section, so the
   phase's ingredient list *is* that section's `ingredients` — no new data needed.)
4. **Compact lanes.** Trim the left lane gutter so the bars get the space.
5. **A whole-recipe shopping view.** A second view lists every ingredient as one
   checkable list for shopping/mise en place.
6. **A raw-recipe view.** A third, plain, unfoldable full-text view for reading.
7. **Mobile is first-class**, not a squeezed desktop: a schematic overview + a
   tappable vertical schedule.

## Non-goals

- No backend or `Recipe`/`Timeline` type changes. The redesign is presentational.
- No per-step ingredient linkage (ingredients stay section-level; see Data Model).
- No new dependency; reuse MUI + existing theme tokens.
- Persisting checked-ingredient state across reloads is out of scope (in-memory only).
- Accessibility hardening (focus management, ARIA for the Gantt, screen-reader labels)
  is a **deferred follow-up**, tracked but not built here.

## Design overview

`RecipePage` gains a **view toggle** — `Timeline · Shopping · Raw` — directly under the
header. One view is visible at a time; the toggle state is local UI state.

```
RecipePage
 ├─ header (title, meta, labels, WakeLockButton, Edit)   ← unchanged
 ├─ ImportLineageStrip (admin)                           ← unchanged
 ├─ RecipeViewToggle  [ Timeline | Shopping | Raw ]      ← new
 └─ one of:
      • <CookTimeline …/>        (Timeline)  ← restructured
      • <ShoppingList …/>        (Shopping)  ← new, extracted from RecipeSections checklist
      • <RawRecipe …/>           (Raw)       ← new
```

`RecipeSections` (the old always-on body) is **replaced** by the Shopping and Raw views;
it is removed from `RecipePage`. Its ingredient-checklist markup is the seed for
`ShoppingList`.

### Timeline view — desktop

`CookTimeline` is restructured:

- **Removed:** `<TimelineStats>` (and the serve-time back-planner inside it).
- **Ruler + timing become relative.** Without the serve-time anchor, the Gantt ruler
  labels read elapsed minutes (`0m … 60m`) and the detail panel reads `+20–30 min ·
  10 min long`. (See "Serve time" under Deferred for the read-only reintroduction path.)
- **Compact gutter.** Reduce `GUTTER` from `158` toward ~`132` and simplify the lane
  label to swatch + name.
- **Detail panel carries ingredients + a scrollable full-method window:**
  - **Left column — Ingredients:** the focused phase's section ingredients, as a
    checklist (shares checked-state with the Shopping view).
  - **Right column — Instructions:** a *scrollable window* containing **every phase's
    steps**, grouped by phase in component/reading order, each group labeled (color dot,
    phase name, component · timing, active/passive pill). The selected phase's group is
    highlighted.
  - **Clicking a Gantt bar** selects that phase and **eases the window** from its current
    scroll position to the selected group (custom rAF easeInOutCubic, 340–720ms scaled to
    distance; instant under `prefers-reduced-motion`). Re-renders that don't change the
    selection (e.g. checking an ingredient) preserve the reader's scroll position.

### Timeline view — mobile

The horizontal Gantt does not shrink to a phone; it is re-expressed:

1. **Schematic overview mini-Gantt.** A compressed, label-free chart — one thin row per
   component, bars positioned proportionally (`start/total`) — showing how sections
   overlap and hand off. Active bars solid; passive faded/hatched. Endpoints labeled
   `start → +N min`. Tapping a row focuses that section.
2. **Section selector.** Chips: `Whole timeline` + one per section (color-dotted).
   Selecting one filters the schedule and dims the other overview rows.
3. **Shared ingredients panel.** A single collapsible panel above the schedule (not
   per-step, since a section's steps all share its ingredients). It follows the selector:
   one section → that section's ingredients; whole timeline → all sections grouped.
   Collapsed by default; checked-state shared with Shopping.
4. **Vertical schedule.** Time-ordered phases as rail rows (relative clock `+Nm` + dur,
   colored node, active/passive styling). Tap a phase to expand its **instructions only**.

The mobile header is compact (title + Wake toggle + the 3-tab toggle), not the tall
desktop header.

### Shopping view

Whole-recipe ingredient list: one card per section (color-dotted heading + count), each a
checklist. A summary line shows `checked / total` and a Reset. Checked-state is shared
with the Timeline views' ingredient checklists (single in-memory source of truth).

### Raw view

Plain, unfoldable full recipe. One **color-coded card per section**: a raised surface with
a 3px left accent bar in the component color, the section title + swatch in that color,
and Ingredients then Instructions (all steps, in order) divided by an internal hairline,
with list markers tinted to the section color. No checkboxes, no collapsing.

## Data model

No changes. Relevant facts (from `src/types/recipe.ts`):

- A `RecipeSection` has `name?`, `ingredients: string[]`, `steps: string[]`.
- A `TimelinePhase` has `steps: number[]` — indices into one section's `steps` — and
  belongs to a `TimelineComponent` whose `name` matches a section via `componentId()`.
- **Each phase maps to exactly one section.** Therefore a focused step's ingredient list
  is simply that section's `ingredients`. No per-step ingredient association exists or is
  added.

## Shared state

Checked ingredients are a single `Set<string>` keyed `"{componentId}:{index}"`, lifted so
the Timeline ingredient checklist, the mobile shared-ingredients panel, and the Shopping
list all read/write the same set. In-memory only (component state or a small local store);
no persistence this pass.

## Theming

All new/changed surfaces use `theme.tokens.*` exactly as the existing timeline components
do (`styled(...)(({ theme }) => …)` reading `color.surface|border|text|brand`,
`typography.mono`, `radius`, `elevation`, `motion.easing`). Section/lane colors come from
the existing `pickLaneColors(count, theme.tokens.color.categorical)` array — Raw and
Shopping section cards reuse the **same** lane-color array as the Gantt so a section reads
the same color across all three views. No hardcoded hex.

## New / changed components

| Component | Change |
|---|---|
| `RecipePage.tsx` | Add view toggle + conditional render; drop always-on `RecipeSections`. |
| `RecipeViewToggle.tsx` | **New.** `ToggleButtonGroup` (Timeline/Shopping/Raw), mirroring `RecipeSourceChooser`'s pattern. |
| `CookTimeline.tsx` | Remove `TimelineStats`; add scrollable full-method window + ingredient column + rAF auto-scroll; relative timing. |
| `TimelineGantt.tsx` | Relative ruler labels; compact gutter. |
| `TimelineDetailPanel.tsx` | Split into Ingredients column + scrollable grouped Instructions window (was single steps list). |
| `TimelineStats.tsx` | **Deleted.** |
| `ShoppingList.tsx` | **New.** Per-section ingredient checklists + summary; extracted checklist from `RecipeSections`. |
| `RawRecipe.tsx` | **New.** Color-coded section cards, plain text. |
| `RecipeSections.tsx` | **Deleted** (superseded by Shopping + Raw). |
| `constants.ts` | `GUTTER` 158 → ~132. |

Mobile vs. desktop timeline layouts branch on a breakpoint (MUI `useMediaQuery` /
`theme.breakpoints`), consistent with how the app already handles responsive layout.

## Dead code cleanup

Removing `TimelineStats` + the serve-time back-planner makes these unused
(`src/utils/cookTimeline.ts`): `timelineStats` + its `TimelineStats` interface,
`backPlanStart`, and the private `fmtClock` (only caller is `backPlanStart`). Delete them
and their `describe` blocks in `cookTimeline.test.ts`, and delete `TimelineStats.test.tsx`.
`effectiveDuration`, `componentId`, `resolvePhaseSteps`, `pickLaneColors` stay live.

## Testing

Every feature needs a test (repo discipline). Planned coverage:

- **`RecipeViewToggle`** — renders three options; switching changes `RecipePage` body
  (update `RecipePage.test.tsx` to assert Timeline default and toggling to Shopping/Raw).
- **`CookTimeline`** — full-method window lists *all* phases' steps; clicking a Gantt bar
  marks the matching group selected. (Scroll offset math is jsdom-limited — assert the
  `.sel` group and DOM order, not pixel scrollTop.)
- **`TimelineDetailPanel`** — renders the focused section's ingredients *and* its
  instructions; ingredient checkbox toggles reflect shared checked-state.
- **`ShoppingList`** — one checklist per section; summary count updates on check; Reset
  clears.
- **`RawRecipe`** — every section, every ingredient, every step rendered in order; section
  cards carry the component color.
- **Mobile timeline** — section selector filters the schedule; shared ingredients panel
  reflects the selection; tapping a phase reveals its instructions.
- **`cookTimeline.test.ts`** — remove dead `timelineStats`/`backPlanStart` blocks; keep
  the rest green.
- Run `npm run ci` (typecheck + lint + test) before finishing.

## Deferred / open

- **Serve-time, reintroduced read-only.** The serve-time back-planner did one genuinely
  useful thing: "eat at 7pm → start by 5:54." If wanted later, reintroduce it as a single
  read-only line driven off the device clock, not an input, above the timeline. Not built
  now.
- **Dependency arrows.** The current Gantt draws dashed bezier dependency links; the
  redesign relies on the detail panel's "↳ starts after X" line. Keeping vs. restoring the
  drawn arrows is an open call; default is to keep the drawn links as they exist.
- **Accessibility pass.** Focus order, keyboard operation of the Gantt bars/section chips,
  ARIA roles for the toggle and schedule — a dedicated follow-up (consistent with the
  broader Prism a11y debt already tracked).
- **Persisted checklist.** Remembering checked ingredients across reloads/devices.
