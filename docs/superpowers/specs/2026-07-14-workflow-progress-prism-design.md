# Workflow Progress Internals → Prism (P2 slice 3) — Design

**Status:** Approved design (2026-07-14). Next: implementation plan via writing-plans.

**Goal:** Elevate the workflow run-progress components — `RoundsTimeline` (+ `RoundCard`), `WorkflowStepper`, and `WorkflowRunPanel` chrome — from "dark MUI" to the Prism *voice*: a shared pulsing `LiveDot` in place of "in-progress" status spinners, mono status/labels, a hairline timeline spine with an accent "now" node, and tokenized color usage. Token-driven, so it reads Prism-dark in `ProjectsPage`'s inline detail and light-coherent in `ProjectDetailPage`.

**Context:** P2 slice 3 (continues Image Manager + Article Manager/Editor; see `prism-p2-image-manager` memory + the Prism-adoption audit). Unlike prior slices there is **no theme mount** — these components already render dark via the token-backed MUI palette when hosted under `AdminLayout` (`ProjectsPage` → `ProjectInlineDetail`). What's missing is the Prism *voice*. `StatusChip` already speaks it (its internal `StatusDot` reads `theme.tokens.motion` and runs a `status-pulse` keyframe) — that pattern is the model.

---

## Global Constraints

- Node 22; `npm run ci` (typecheck + lint + test) green before push; commit after each task.
- **No raw color literals** in components (lint-enforced `no-restricted-syntax`; exempt under `src/theme/**`, tests, stories). Use `theme.palette.*` / `theme.tokens.*` / `alpha(...)`. This slice must **fix** existing raw-ish usages in `RoundCard` (`${persona.color}0d` string-concat, `boxShadow: 0 0 0 2px ${persona.color}`) by routing through `alpha(...)`, and replace MUI `.50` palette-shade backgrounds (`warning.50`/`primary.50`) — which are not dark-safe in the token-derived palette — with `alpha(theme.palette.<tone>.main, …)`.
- **Token-driven Prism voice**, not a color overhaul: colors already resolve correctly (palette is token-backed). The additive work is mono typography (`theme.tokens?.typography.mono ?? 'monospace'` with fallback), the `LiveDot` pulse (reads `theme.tokens?.motion` with fallback), and hairline/accent treatment. `prism/*` imports are **not** required here; keep these components token-driven via `theme.*`.
- **Reuse invariant:** `WorkflowRunPanel` (and its `WorkflowStepper`/`RoundsTimeline`/`RoundCard`) render in TWO admin contexts — `ProjectsPage` → `ProjectInlineDetail` (AdminLayout → dark) and `ProjectDetailPage` (light `NavBar`). No public reader is involved. All styling must be token-driven so both stay coherent (Prism-dark vs light-with-Prism-voice). Verified by rendering in both themes in tests/stories.
- **Styling + presentation only.** The run-orchestration logic (TanStack Query polling, mutations, `editor`/respond handlers, status computation) is unchanged.
- Respect `@media (prefers-reduced-motion: reduce)` for the pulse/ping.

---

## Architecture / Approach

Additive Prism voice, token-driven, in place. One new shared primitive (`LiveDot`); the rest are targeted restyles of existing structure.

**Distinguish two kinds of spinner** (only the first changes):
- *Status "this is live/running"* indicators (`RoundCard` "Analyzing…", `WorkflowRunPanel` active-run header, `WorkflowStepper` running step) → replaced by `LiveDot` (the Prism pulse).
- *Button/loading* spinners (start button, submit/respond button, initial load) → **stay** `CircularProgress` (a genuine loading affordance).

---

## Components

### 1. `src/components/common/LiveDot.tsx` (new)
A small token-driven pulsing dot — the reusable "live" signal, modeled on `StatusChip`'s internal `StatusDot` (`StatusChip.tsx:103-129`).
- Props: `size?: number` (default ~8), `color?` (a palette path or token; default the accent / `primary.main`), `label?: string` (optional trailing mono text, e.g. "Analyzing"). Renders an inline-flex dot (+ optional label).
- The dot pulses via a `box-shadow` ring keyframe using `theme.tokens?.motion.duration.slow * 4` / `tokens?.motion.easing.easeOut` with `1600ms`/`'ease-out'` fallbacks (same as `StatusDot`), guarded by `@media (prefers-reduced-motion: reduce)`.
- Token-driven, no `prism/*` import; correct in both light and dark. Co-located test.

### 2. `RoundsTimeline.tsx` + `RoundCard.tsx` → Prism timeline
- **Spine (`RoundsTimeline`):** wrap the round list in a hairline left **spine** (a thin `divider` vertical rule) with a node per round aligned to each `RoundCard`; the **active round's node** is an accent `LiveDot` (ping), completed nodes are a small filled `success`/`divider` dot. This restructures the current stacked-cards + `Divider` layout (`:169-251`) into spine + cards. Mono round-count labels (`overline` → mono).
- **`RoundCard`:** the "Analyzing…" `CircularProgress` (`:333`) → `LiveDot label="Analyzing"`; tokenize the header backgrounds (`warning.50`/`primary.50`/`action.hover`, `:318-322`) → `alpha(theme.palette.<tone>.main, ~0.12)` (dark-safe); tokenize `bgcolor: \`${persona.color}0d\`` (`:198`) → `alpha(persona.color, 0.05)` and `boxShadow: 0 0 0 2px ${persona.color}` (`:153`) → `0 0 0 2px ${alpha(persona.color, …)}` or keep solid via `alpha`; mono for the round/status labels. Keep the `EntityCard variant="panel"` structure + `StatusChip` decision chips.

### 3. `WorkflowStepper.tsx` → step dots
- The `running` branch of `StatusIcon` (`:115`, currently a bare `CircularProgress size={18}`) → `LiveDot` (accent pulse) so a running step reads as "live," not just spinning.
- The persona avatar dot (`:355-371`, `22×22` `borderRadius:50%` `bgcolor: persona.color`) gains an accent ring/pulse **only while its step is running/streaming** (compose with `LiveDot` or an accent `box-shadow` ring via `alpha(persona.color/primary.main, …)`).
- Mono voice on status text: "Running…" (`:343-345`), round labels (`overline` at `:441/457/471`), "Skipped". Keep the `StatusChip` "Needs your input" and the accordion border-state (`:310`).

### 4. `WorkflowRunPanel.tsx` → chrome
- Active-run status header (`:643-663`): the `CircularProgress` (`:644`) → `LiveDot`; "Run #N — in progress" `overline` → mono; keep the `StatusChip`.
- Run-control chrome: the compact strip container (`:685-716`, `border:1 + action.hover`) and `StartRunControls` (`:526-561`) get hairline + mono voice; the start `Button` adopts the Prism accent treatment (outlined → accent hover), keeping its `PlayCircleOutlineIcon`/loading `CircularProgress`.
- `RunHistoryRow` (`:415-511`): keep the mono run number (`:443`); mono the timestamp/label meta; status via existing `StatusChip`.

---

## Reuse Safety & Testing

Co-located Vitest + Testing Library (jsdom); Storybook variants for visual QA.

- **`LiveDot`:** renders the dot (+ optional label); pulse keyframe present; token reads fall back cleanly with no provider; renders under both light and `PrismThemeProvider` (dark).
- **Dark + light coherence (the invariant):** render `RoundsTimeline`/`WorkflowStepper`/`WorkflowRunPanel` (or a representative subtree) under `PrismThemeProvider` (dark) AND the light app theme (`testUtils.render`) → both render without error, status→visual mapping intact, `LiveDot` present for the active/running state. This proves the components work in `ProjectsPage` (dark) and `ProjectDetailPage` (light).
- **Status mapping intact:** the existing status→icon/color and `StatusChip` behavior is unchanged (only the "running/live" spinner is swapped for `LiveDot`); existing tests for these components updated where a swapped spinner assertion changes (e.g. a `CircularProgress` query → `LiveDot`/`data-testid`).
- **Lint:** the `RoundCard` `alpha(...)` conversions remove the existing raw-ish color usages — confirm `npm run lint` is clean.
- **Stories:** add `PrismThemeProvider`-wrapped (dark) variants beside light ones for `RoundsTimeline`/`RoundCard`/`WorkflowStepper` where stories exist; a `LiveDot` story showing the pulse.

---

## Out of Scope
- `WorkflowStepList` (workflow-definition editor — config, not run progress).
- The run-orchestration logic (queries, mutations, polling, respond/answer handlers, status computation) — presentation only.
- Page mounts: `ProjectDetailPage` stays light (no `PrismThemeProvider`); this slice only makes the components token-driven so they're coherent there.
- Any new `prism/*` generic primitive (LiveDot lives in `common/`, matching `StatusChip`/`StatTile`).
- Replacing button/loading spinners (start/submit/initial-load) — those stay `CircularProgress`.

---

## Decisions Resolved (during brainstorming)
1. **Scope:** all three — `RoundsTimeline`(+`RoundCard`), `WorkflowStepper`, and `WorkflowRunPanel` chrome. *(user)*
2. **Spinner → pulse:** "in-progress/live" status spinners become the `LiveDot` pulse; button/loading spinners stay. *(user)*
3. **Timeline spine:** add a hairline spine + accent now-node to `RoundsTimeline` (structural). *(user)*
4. **No mount:** token-driven elevation; `ProjectDetailPage` stays light; components coherent in both contexts. *(design — no public reader, so token-driven suffices)*
5. **Shared `LiveDot`** in `common/` (not per-component, not `prism/*`), modeled on `StatusChip.StatusDot`. *(design — DRY, consistent live signal)*
6. **`RoundCard` in scope** as the round "node" that `RoundsTimeline` delegates to (it holds the in-progress visual + the raw-ish colors to tokenize). *(design)*
