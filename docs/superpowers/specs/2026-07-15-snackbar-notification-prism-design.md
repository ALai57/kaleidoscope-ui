# Snackbar + NotificationCard → Prism (P3 slice 2) — Design

**Status:** Approved design (2026-07-15). Next: implementation plan via writing-plans.

**Goal:** Bring the two shared feedback primitives — `layout/Snackbar` and `layout/NotificationCard`
— into the Prism voice, **token-driven** so each stays coherent wherever it renders (Prism-dark
subtree vs. ambient light). This closes the last admin-adjacent P3 archetype ("Snackbar /
notification").

**Context:** P3 slice 2 (admin-adjacent half of P3; continues the GroupsPage slice). See the
`prism-p2-image-manager` memory + the Prism-adoption audit. Distinct from page slices: these are
**shared components**, not a page mount — no `PrismThemeProvider` is added here; the components must
read `theme.tokens.*` with fallbacks so they render Prism under a Prism-themed ancestor and stay clean
under light MUI.

---

## Global Constraints

- Node 22; `npm run ci` (typecheck + lint + test) green before push; commit after each task.
- **No raw color literals** (lint `no-restricted-syntax`; exempt: `src/theme/**`, tests, stories).
  Use `theme.palette.*` / `theme.tokens.*` / `alpha(...)`. This slice must **remove**
  `NotificationCard`'s existing raw-ish inline literals (`style={{ color: 'orange' }}` /
  `{ color: 'red' }`) by routing icon/accent color through the MUI palette (`warning.main` /
  `error.main` / `info.main`).
- **Token-driven Prism voice:** mono via `theme.tokens?.typography.mono ?? 'monospace'`; radius via
  `theme.shape.borderRadius`. No new `prism/*` primitive. `NotificationCard` reuses `SurfaceCard`.
- **Reuse invariant (central here):** `layout/Snackbar` is rendered by `WorkflowEditorPage`,
  `ImageManagerPage`, `WorkflowRunPanel`, and `RoundsTimeline` — a mix of ambient-light and (potential)
  Prism-dark contexts. All styling must be token-driven so both stay coherent; MUI `Alert` severity
  colors already resolve from the active palette and stay unchanged. Adding `useTheme()` must not break
  the bare (no-provider) test renders — MUI `useTheme()` returns the default theme when no provider is
  present (so `theme.tokens` is `undefined` → mono fallback; `theme.shape.borderRadius` exists).
- **Preserve every contract** (covered by the retained test files, which stay UNCHANGED):
  - **Snackbar** (`Snackbar.test.tsx`, `Snackbar.extra.test.tsx`): the message text renders; the Alert
    exposes `role="alert"`; the close affordance keeps `title="Close"` and fires `onClose`; the four
    levels (`info`/`success`/`warning`/`error`) render; `open={false}` renders no alert.
  - **NotificationCard** (`NotificationCard.test.tsx`): `title` and `message` text render; the default
    (`error`) level renders an icon with `data-testid="ErrorOutlineIcon"`; the `warn` level exists.
- **Presentation only.** No prop-signature changes, no behavior changes (Snackbar's open/close state,
  `autoHideDuration`, `clickaway` handling all unchanged).

---

## Architecture / Approach

Two independent shared-component re-skins, token-driven in place.

### 1. `layout/Snackbar` — light-touch Prism voice

`Snackbar` wraps MUI `Snackbar` + `Alert`. Keep the structure and all behavior; give the `Alert` a
token-driven Prism voice via `sx`:
- `useTheme()` → `mono = theme.tokens?.typography.mono ?? 'monospace'`.
- The `Alert` gets `sx`: `fontFamily: mono`, a slightly tightened `fontSize`/`letterSpacing` for the
  status-message voice, `alignItems: 'center'`, and `borderRadius` from `theme.shape.borderRadius`.
  Keep the default (`standard`) variant — it carries a severity-tinted background that reads correctly
  in **both** light and dark palettes (an `outlined`/transparent variant would be see-through over
  page content). Keep `severity={level}` and `onClose={handleClose}` exactly (preserves `role="alert"`
  + the `title="Close"` button).

The mono message is the visible Prism cue and reads as intentional in light too (matching how
`StatTile`/`StatusChip` use mono as the "data voice"). Under a Prism-themed ancestor the Alert renders
dark automatically (MUI portal preserves React context), so no forced colors are needed.

### 2. `layout/NotificationCard` — full re-skin (no consumers, safe)

`NotificationCard` has **no app consumers** (only its own test + story) and currently uses stale
Bootstrap classes (`className="text-white bg-light mb-3 article-card"`) and raw-literal inline icon
colors. Rebuild it on `SurfaceCard` with a Prism callout treatment:
- `useTheme()` → `mono`. A `LEVEL_TONE` map: `error → 'error'`, `warn → 'warning'`, `info → 'info'`.
- `SurfaceCard` with a left accent rail: `sx={{ p: 2, mb: 3, borderLeft: 3, borderLeftColor:
  \`${tone}.main\` }}` (keeps `SurfaceCard`'s hairline `divider` border on the other sides — the
  audit's `.note`/callout idiom).
- Header row: the level icon (`ErrorOutlineIcon` / `WarningAmberIcon` / add `InfoOutlinedIcon` for
  `info`) rendered `color="inherit"` inside a `Box` with `color: \`${tone}.main\``, next to a mono,
  bold, tone-colored `title`. Body: the `message` in `text.secondary` `body2`.
- Keep `ErrorOutlineIcon` as the default (`error`) icon so `data-testid="ErrorOutlineIcon"` still
  resolves. Drop the Bootstrap classes and the `style={{ color: 'orange'/'red' }}` literals entirely.

---

## Reuse Safety & Testing

Co-located Vitest + Testing Library (jsdom); Storybook variants for visual QA.

- **Both existing test files per component keep passing UNCHANGED** — the re-skins preserve every
  asserted contract (message/title text, `role="alert"`, `title="Close"` + `onClose`, the four levels,
  `data-testid="ErrorOutlineIcon"`, the `warn` level). The retained green suites are the regression
  proof; no test edits. The bare (no-provider) renders exercise the `theme.tokens?` fallback path.
- **Shared-Snackbar consumer safety:** because `Snackbar` is shared, Task 2 additionally runs the
  consumer test files (`ImageManagerPage`, `WorkflowEditorPage`, `WorkflowRunPanel`, `RoundsTimeline`)
  to confirm no regression, and Task 3 runs the **full** `npm run ci`.
- **Lint/type:** the `NotificationCard` rebuild removes its raw-ish literals — confirm `npm run lint`
  clean. Both components add `useTheme()` — confirm typecheck clean and the hook is actually used.
- **Stories:** each component's story gains a `PrismDark` variant (a decorator wrapping the story in
  `PrismThemeProvider`) beside the existing light stories, demonstrating the token-driven voice reads
  correctly in **both** themes. Add an `Info` variant to `NotificationCard.stories` to cover the new
  `info` icon.

---

## Out of Scope

- Rewiring where pages place their `Snackbar` (e.g. moving `ImageManagerPage`'s snackbar inside its
  Prism wrap) — page-level churn; pages opt into the Prism voice by their own placement. This slice
  only makes the components token-driven.
- The raw MUI `<Snackbar>` used directly in `GroupsPage`/`WorkflowEditorPage` (not the `layout/`
  wrapper) — not this component; leave as-is.
- Any new `prism/*` primitive, or a shared "callout"/"alert" abstraction beyond `SurfaceCard`.
- Behavior/prop changes (open/close, autoHide, clickaway) — presentation only.
- Public-reader P3 items (reader cards, timeline, skill chips) — separate brand decision.
- Cross-cutting Prism a11y hardening — tracked as one separate pass.

---

## Decisions Resolved (during brainstorming)
1. **Slice:** finish admin-adjacent P3 = `layout/Snackbar` + `layout/NotificationCard`. *(user)*
2. **Token-driven, no mount:** these are shared components → read `theme.tokens.*` with fallbacks;
   coherent in light + Prism-dark, no `PrismThemeProvider` added here. *(design — reuse invariant)*
3. **Snackbar = light-touch** (mono message + token radius on a `standard`-variant Alert, all behavior
   kept); **NotificationCard = full rebuild** (no consumers, and it removes raw literals + stale
   classes). *(design — matched to each component's risk)*
4. **No test changes:** contracts preserved → retained suites are the regression proof. *(design)*
5. **`SurfaceCard` for NotificationCard**, left accent rail by level tone; no new primitive. *(design)*
