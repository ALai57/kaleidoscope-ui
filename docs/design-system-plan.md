# Design System Plan

Goals (in priority order, per project decision):
1. User-customizable, contrast-safe theming (finish the color-wheel/palette work)
2. A consistent, documented component library
3. Styling consolidation

Audience: both internal (Storybook as the team's shared component catalog) and
external (the theme picker is a real, shippable end-user feature).
MUI stays as the base, but we're open to overriding or replacing parts of it
where its defaults fight the adaptive-color goal.

## Where things stand today

- **Theming**: `src/theme/index.ts` derives a 3-color HSL palette (`primary`,
  `secondary`, `tertiary`) from `ThemeParams` (`hue/saturation/lightness/angle/theta`)
  and feeds it into `createTheme()`. Dark mode is a naive `lightness: 100 - lightness`
  flip, not a real adaptive recompute.
- **Contrast-safe color generation**: `ColorFamily.tsx` already wires up
  `@adobe/leonardo-contrast-colors` to generate WCAG-ratio-targeted color
  scales from a seed + background. It's dynamically imported and treated as
  optional/experimental — this is the right engine, it's just not connected
  to the actual app theme yet. `ColorWheel` / `ColorPicker` / `SaturationLightnessGrid`
  are the picker UI half of this, also not wired to `main.tsx`.
- **Component library**: 94 components across 12 folders. `layout` (18
  components, 10 stories) and `colors` (4/4) have real Storybook coverage.
  `workflows` (17 components), `projects` (8), and `tasks` (7) have **zero**
  stories despite being the newest, most actively developed areas (per recent
  commit history: "Updating UI for autonomous workflow(s)").
- **Duplication**: 7-8 components across `workflows`/`projects` independently
  implement a "Card" pattern (`WorkflowCard`, `RoundCard`, `TeamLeadCard`,
  `AdvisorReviewCard`, `ProjectCard`, `ScoreRunCard`, ...), and ~20 components
  implement their own status/chip/badge treatment. No shared `StatusChip` or
  card primitive exists yet — each one likely hand-rolls color and spacing.
- **Styling approaches**: contrary to what `package.json` suggests,
  `styled-components` and `@emotion/styled` are **declared dependencies but
  unused** in `src/` — zero imports found. The app already consistently uses
  MUI's `sx` prop (82 files) plus MUI's `styled()` (3 files, all in
  `components/colors`). The real inconsistency is 12 files using raw
  `style={{ ... }}` with hardcoded values (e.g. `DarkModeToggle.tsx` hardcodes
  `rgba(0, 0, 0, 0.18)` instead of a theme token). This is a much smaller
  problem than a 3-library split — good news.

## Phase 0 — Clean up the foundation (~1-2 days)

Cheap wins that remove noise before building on top of it:
- Drop unused `styled-components` and `@emotion/styled`/`@emotion/react`
  dependencies (confirm emotion isn't a transitive MUI requirement first —
  MUI v6 uses emotion internally by default, so check `@mui/styled-engine`
  before removing `@emotion/react`; `styled-components` itself is safe to drop).
- Write down the styling rule now, while it's still true: **`sx` for one-off
  layout/spacing, `styled()` for reusable styled primitives, no raw `style={{}}`,
  no hardcoded colors** — put it in a short `docs/styling-conventions.md` or a
  Storybook "Guidelines" page.
- Sweep the 12 `style={{}}` offenders (`DarkModeToggle.tsx` is one) onto theme
  tokens/`sx` as Phase 1 tokens land, not before — no point migrating twice.

## Phase 1 — Design tokens (~1 week)

Introduce a token layer between raw color math and MUI's theme object, so
both the component library and the theming engine consume the same source of
truth instead of components picking arbitrary MUI palette keys or hex values.

- Formalize tokens for: color roles (surface, border, status colors —
  success/warning/error/info — currently ad hoc per component), spacing scale
  (confirm against MUI's default 8px unit or override), typography scale
  (currently only `body1.fontSize` is customized in `makeTheme`), radius, and
  elevation/shadow steps.
- Extend `ThemeParams`/`makeTheme` to emit these as part of the MUI theme
  (`theme.palette`, a custom `theme.tokens` namespace, or MUI's
  `components.MuiX.styleOverrides` — pick one pattern and document it).
- This phase is a prerequisite for Phase 2 (the picker needs to *drive*
  tokens) and Phase 3 (shared components need to *consume* tokens instead of
  hardcoding).

## Phase 2 — Finish the adaptive theming engine (~1-2 weeks)

This is the highest-priority goal, and the groundwork already exists — it
needs to be connected end-to-end and made production-grade rather than
experimental.

- Replace the naive `lightness: 100 - lightness` dark-mode flip in
  `makeTheme` with a real recompute through `leonardo-contrast-colors`
  (already proven out in `ColorFamily.tsx`) so dark mode is contrast-checked,
  not just inverted.
- Wire `ColorWheel`/`ColorPicker` into `main.tsx` as an actual theme-picker UI
  (behind a settings panel, not just a Storybook story), with the seed color
  persisted (localStorage now, user profile/API later since `src/api` and
  `src/store` already exist for this app).
- Un-experimental-ize `ColorFamily.tsx`: make the `leonardo-contrast-colors`
  import a normal top-level dependency rather than a try/catch'd dynamic
  import, once you're committing to it as core infrastructure rather than a
  spike.
- Decide explicitly where MUI's own theming model conflicts with adaptive
  contrast-driven color (e.g. MUI computes its own `contrastText` via simple
  luminance thresholds, which will disagree with leonardo's ratio-targeted
  pairs). Likely resolution: stop relying on MUI's auto-contrast and inject
  leonardo's computed pairs directly into each palette slot's `contrastText`.
- Add an automated contrast-ratio check (unit test or Storybook a11y addon)
  that runs against generated palettes so a bad seed color can't ship a
  low-contrast theme.

## Phase 3 — Component library consolidation (~2-3 weeks)

Target the highest-duplication, zero-story folders first since that's where
new work is actively happening and drifting.

- Extract shared primitives from the 7-8 existing "Card" implementations
  (`WorkflowCard`, `RoundCard`, `TeamLeadCard`, `AdvisorReviewCard`,
  `ProjectCard`, `ScoreRunCard`, ...) into one themed `Card` (or a small
  family: e.g. `EntityCard` + slots) that consumes Phase 1 tokens.
- Same for the status/chip pattern repeated across ~20 files — one
  `StatusChip`/`StatusBadge` with a fixed set of semantic variants
  (success/warning/error/pending/etc.) instead of each component choosing its
  own color.
- Backfill Storybook stories for `workflows`, `projects`, and `tasks` as each
  component is touched during extraction — don't do a separate "write all the
  stories" pass, fold it into the refactor so stories stay accurate.
- Once 2-3 shared primitives exist, write the one doc that matters most for a
  living design system: "when to use X vs Y vs a one-off," since that's what
  prevents next quarter's `WorkflowCard`-style re-duplication.

## Phase 4 — Documentation & governance (~ongoing)

- Storybook becomes the canonical internal catalog: add a "Foundations"
  section (tokens, color scales, typography) alongside component stories.
- Add visual regression coverage. You already have Playwright configured
  (`playwright.config.ts`, `e2e/`) — Storybook has a Playwright test runner
  integration that can screenshot every story; that's lower-lift than
  introducing a new tool. (The `cypress/` folder in the working tree looks
  like unmodified `cypress open` scaffolding, not a real suite — worth
  confirming whether it's intentional before it gets committed.)
- Contrast/a11y checks from Phase 2 become a CI gate, not just a local check.

## Suggested sequencing

Phase 0 and Phase 1 are short and unblock everything else — do those first.
Phase 2 (theming) is the stated top priority and is mostly *finishing*
existing work rather than new build, so it can run concurrently with the
start of Phase 3 once tokens exist. Phase 4 is continuous, not a discrete step.

## Open decisions to make along the way

- Token implementation: bespoke `theme.tokens` namespace vs. leaning fully on
  MUI's `palette`/`typography`/`shape` extension points.
- How far to take "open to replacing parts of MUI" — recommend scoping this
  narrowly to the contrast/color-pairing logic (where MUI's model actively
  conflicts with leonardo) rather than a broader migration away from MUI
  components, given 94 components are already built on it.
- Where theme persistence lives (localStorage vs. a user-profile API call via
  the existing `src/api`/`src/store`).
