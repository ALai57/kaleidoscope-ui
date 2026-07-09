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
  flip, not a real adaptive recompute. **Note:** `makeTheme` computes `tertiary`
  but only wires `primary` and `secondary` into the MUI theme — `tertiary` is
  dropped on the floor today. `main.tsx` calls `makeTheme(BASE_THEME)`
  *statically*; a `themeStore` (zustand) and a `themes` API (`getThemes`/
  `updateTheme`) already exist but are **neither persisted nor connected** to
  `main.tsx`. So Phase 2 is even more "finish existing wiring" than "new build."
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
- **Duplication**: ~10 components independently implement a "Card" pattern
  (`WorkflowCard`, `RoundCard`, `TeamLeadCard`, `AdvisorReviewCard`,
  `ProjectCard`, `ScoreRunCard`, `AgentCard`, `ArticleCard`, plus the image/
  notification cards). And ~25 files use inline `<Chip>` for their own status/
  badge treatment; only `TaskTypeChip` is a dedicated component. No shared
  `StatusChip` or card primitive exists yet — each one hand-rolls color and
  spacing.
- **Styling approaches**: contrary to what `package.json` suggests,
  `styled-components` and `@emotion/styled` are **declared dependencies but
  unused** in `src/` — zero imports found. The app already consistently uses
  MUI's `sx` prop (82 files) plus MUI's `styled()` (3 files, all in
  `components/colors`). The real inconsistency is 12 files using raw
  `style={{ ... }}` with hardcoded values (e.g. `DarkModeToggle.tsx` hardcodes
  `rgba(0, 0, 0, 0.18)` instead of a theme token). This is a much smaller
  problem than a 3-library split — good news.

## Phase 0 — Clean up the foundation (~1-2 days) — DONE

Cheap wins that remove noise before building on top of it. **Correction to the
original assumption:** neither `styled-components` nor the `@emotion/*` packages
were free to drop:
- `@emotion/react` **and** `@emotion/styled` are required peer dependencies of
  `@mui/styled-engine` (MUI v6). Both **stay**.
- `styled-components` was **not** unused — it's a runtime peer dependency of the
  `@styled-icons/*` icons, and `@styled-icons/boxicons-regular` was imported in
  2 files (`ImageBrowser.tsx`, `EditorPanel.tsx`). Dropping it required first
  migrating those 2 icons to `@mui/icons-material` (`AddPhotoAlternate`, `Save`).

Completed:
- ✅ Migrated the 2 `@styled-icons/boxicons-regular` icons to
  `@mui/icons-material`, which also cleaned up 2 of the 12 raw-`style` offenders
  (the icons' `style={{ height: '20px' }}` → `sx={{ fontSize: 20 }}`).
- ✅ Removed `styled-components`, `@styled-icons/boxicons-regular`,
  `@styled-icons/material`, and `@styled-icons/remix-fill` from `package.json`
  (the latter two were entirely unused).
- ✅ Wrote `docs/styling-conventions.md` (the `sx` / `styled()` / no-raw-`style` /
  no-hardcoded-color rules).

Still deferred (correctly) to Phase 1:
- Sweep the remaining 10 `style={{}}` offenders (`DarkModeToggle.tsx`'s hardcoded
  `rgba` is one) onto theme tokens/`sx` **as Phase 1 tokens land**, not before —
  no point migrating twice. Note `components/colors/*` uses `style={{}}` for
  genuinely dynamic per-pixel swatch rendering; review those case-by-case.

Possible follow-up (out of Phase 0 scope): `@udecode/plate*` is a declared
dependency with **zero** `src` imports — a candidate for removal, but it's a
large tree pulling its own `styled-components` peer, so verify nothing relies on
it transitively before touching it.

## Phase 1 — Design tokens (~1 week) — DONE

Introduced a token layer between raw color math and MUI's theme object.
**Key decision:** because the app may leave MUI soon, tokens are a
framework-agnostic source of truth and the MUI theme is *derived* from them via
an adapter — not the MUI-first hybrid originally floated. A future MUI swap
touches the adapter, not components.

Completed:
- ✅ `src/theme/tokens.ts` — a MUI-independent `Tokens` type + `makeTokens(params,
  mode)` covering brand colors, status colors (success/warning/error/info),
  surface/border/text neutrals, spacing (8px base), radius, elevation, and a
  type scale. Also gives `tertiary` a real home (it was computed then dropped).
- ✅ `makeTheme` derives the MUI theme from tokens via `paletteFromTokens` /
  `typographyFromTokens` adapters and exposes `theme.tokens` (module-augmented).
- ✅ Tests for tokens + adapter.

Prerequisite for Phase 2 (the picker drives tokens) and Phase 3 (shared
components consume tokens).

## Phase 2 — Adaptive theming engine (~1-2 weeks) — MOSTLY DONE

The highest-priority goal. Landed in two commits (engine core + wiring).
**Discovery:** the doc was stale — `UIManagerPage` (`/ui`) already wired
`ColorPicker` → `themeStore` → the `themes` API. The real gap was that
`main.tsx` built the theme statically and never read the store, so picker edits
never reached the live app.

Completed:
- ✅ `src/theme/contrast.ts` — `leonardo-contrast-colors` as a proper top-level
  dependency (no more try/catch dynamic import). Provides `adaptiveColor`,
  `contrastRatio`, `onColor`, hex/hsl normalization, and `toHsl`. A local
  `.d.ts` declares leonardo's class API (its shipped types cover only the
  legacy function API and resolve untyped under Vite).
- ✅ Replaced the naive `100 - lightness` dark flip with a real leonardo
  recompute of brand colors against the dark surface.
- ✅ Injected leonardo-derived `contrastText` into each palette slot instead of
  MUI's luminance-threshold auto-contrast.
- ✅ Automated a11y gate (`contrast.test.ts`) asserting generated themes meet
  WCAG AA across a spread of seed hues.
- ✅ `main.tsx` builds the theme reactively from the store (`ThemedApp`); picker
  edits now take effect app-wide. Fixed the previously no-op picker with real
  hex→HSL conversion.
- ✅ Persistence: versioned `ThemeConfig` ({ version, seed, mode }) stored as
  JSON via the themes API (confirmed JSON storage → extensible without a
  backend migration); `themeStore` also caches the seed to localStorage for
  instant paint. `ThemeBootstrap` loads the API config once on startup.
  `normalizeThemeConfig` migrates legacy records whose `config` was raw
  `ThemeParams`.

Still open (carry into Phase 2 polish / Phase 3):
- ⏳ `ColorFamily.tsx` is still experimental (its default `lightness: 0.1`
  would make leonardo throw — needs real params + wiring, not just the import
  swap).
- ⏳ `theme.tokens` is attached light-mode only — make it mode-reactive before
  components start reading it in dark mode.
- ⏳ `makeTheme` runs leonardo on every seed change — debounce the picker.
- ⏳ Not yet runtime-verified in the browser (needs Auth0 login at `/ui`); MUI's
  `useColorScheme` mode system with the current `ThemeProvider` is unproven and
  two pre-existing test failures touch the dark-mode toggle.

## Phase 3 — Component library consolidation (~2-3 weeks) — IN PROGRESS

Target the highest-duplication, zero-story folders first since that's where
new work is actively happening and drifting. Phase 1 tokens + Phase 2
`contrastText` are now available for these primitives to consume.

- Extract shared primitives from the ~10 existing "Card" implementations
  (`WorkflowCard`, `RoundCard`, `TeamLeadCard`, `AdvisorReviewCard`,
  `ProjectCard`, `ScoreRunCard`, `AgentCard`, `ArticleCard`, ...) into one
  themed `Card` (or a small family: e.g. `EntityCard` + slots) that consumes
  Phase 1 tokens.
- Same for the status/chip pattern repeated across ~25 files using inline
  `<Chip>` (only `TaskTypeChip` is a dedicated component today) — one
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
  introducing a new tool. (The untracked `cypress/` folder was stock
  `cypress open` scaffolding and was removed — not committed.)
- Contrast/a11y checks from Phase 2 become a CI gate, not just a local check.

## Suggested sequencing

Phase 0 and Phase 1 are short and unblock everything else — do those first.
Phase 2 (theming) is the stated top priority and is mostly *finishing*
existing work rather than new build, so it can run concurrently with the
start of Phase 3 once tokens exist. Phase 4 is continuous, not a discrete step.

## Resolved decisions

- **Token implementation:** framework-agnostic `theme.tokens` source of truth
  with the MUI theme derived via an adapter — *not* the MUI-first hybrid —
  because the app may leave MUI soon (below).
- **MUI's future:** the app may migrate off MUI soon, so design decisions favor
  framework-agnostic structures. MUI stays the base for now (94 components), but
  nothing new should deepen coupling to it.
- **Theme persistence:** the themes API is the cross-device source of truth
  (config stored as JSON, so extensible without a backend migration), with a
  localStorage cache for instant paint. Persisted shape is a versioned
  `ThemeConfig`.

## Still open

- Whether to let users customize beyond the brand seed (status colors, radius,
  type). If so, they go under `ThemeConfig.overrides` (version bump, no
  migration needed).
- Multi-theme support: the themes API returns a list + `display_name`, but only
  `themes[0]` is used and there are no create/delete endpoints.
