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
- ✅ `makeTheme` ran leonardo on every seed change — the picker now debounces
  store updates (`useDebouncedCallback`, 120ms).
- ⏳ Not yet runtime-verified in the browser (needs Auth0 login at `/ui`); MUI's
  `useColorScheme` mode system with the current `ThemeProvider` is unproven and
  two pre-existing test failures touch the dark-mode toggle.

## Phase 3 — Component library consolidation (~2-3 weeks) — MOSTLY DONE

Target the highest-duplication, zero-story folders first. Phase 1 tokens +
Phase 2 `contrastText` feed these primitives.

- ✅ **`StatusChip`** (`common/StatusChip.tsx`) — one semantic status→color
  source of truth (tones + a domain-status alias map). Migrated the genuine
  status/score chips across workflows/projects and deleted the per-component
  color maps (`STATUS_COLOR`, `STATUS_COLORS`, `STATUS_CHIP_COLOR`, decision
  colors). Left true label/category chips as plain `<Chip>`.
- ✅ **`SurfaceCard`** (`common/SurfaceCard.tsx`) — the shared card *surface*
  (border/radius/paper-bg/hover), since the ~10 cards share a surface but not an
  internal layout. Migrated the hand-rolled Box surfaces (`AgentCard`,
  `WorkflowCard`, `AdvisorReviewCard`, `TeamLeadCard`, `RoundCard`). Left MUI
  `Card` cards (`ProjectCard`/`ImageCard`/`FullImageCard`, for
  `CardActionArea`/`CardMedia`), the `Accordion`-based `ScoreRunCard`, and the
  CSS-class cards (`ArticleCard`/`NotificationCard`).
- ✅ Backfilled Storybook stories for the touched components
  (`WorkflowCard`, `ProjectCard`, `AgentCard`, `TaskTypeChip`, plus
  `StatusChip`/`SurfaceCard`). Validated with `build-storybook`.
- ✅ Wrote the usage doc: [`design-system-usage.md`](./design-system-usage.md)
  ("when to use X vs a one-off").

Still open:
- ⏳ Optional `EntityCard` (header/body/actions) on top of `SurfaceCard` for the
  header-row cards — only if the pattern proves worth it.
- ⏳ Migrate more `StatusChip`/`SurfaceCard` call sites opportunistically as
  files are touched.

## Phase 4 — Documentation & governance (~ongoing) — IN PROGRESS

- ✅ Storybook is now the canonical catalog: added a **Foundations** section
  (`components/foundations/Foundations.stories.tsx`) — Colors (with live
  contrast ratios), Typography, Spacing, Radius, Elevation, rendered from the
  tokens. Also wrapped all stories in the real design-system theme via a
  `ThemeProvider` decorator (`.storybook/preview.tsx`), so the catalog reflects
  the actual theme, not default MUI.
- ✅ Contrast/a11y checks are already a CI gate: `contrast.test.ts`'s a11y gate
  runs in `npm run test` (and `npm run ci`). (Note: `npm run ci` also runs
  `lint`, which currently has pre-existing errors unrelated to the design
  system — worth a separate cleanup.)
- ✅ Visual regression coverage set up: `@storybook/test-runner` +
  `jest-image-snapshot` screenshot every story against a baseline
  (`.storybook/test-runner.ts`, `npm run test-storybook:ci`). Runs against the
  dev server (the Vite/Storybook static build has a module-load-order issue).
  Baselines are environment-sensitive → generated per-CI-environment, not
  committed from a dev machine (see [`visual-regression.md`](./visual-regression.md)).
  Two pre-existing broken stories are excluded via `tags: ['!test']`.

## Phase 5 — Design-language presets ("Prism") — IN PROGRESS

Context: a full visual mockup ("Prism" — a dark, monospace, spring-motion
"mission-control" look) was proposed as a wholesale redesign. Prism is
*dark-committed and fixed*, which directly conflicts with Phase 2's headline
goal (user-customizable, contrast-safe theming). **Decision:** rather than
replace the adaptive engine, express Prism as a **selectable preset** *within*
it — the engine stays the source of truth; Prism becomes a look you pick. The
accepted trade-off: Prism loses its dark-committed *purity* (you can run it
light, or recolor its seed), but its personality (mono voice, spring motion,
radii, accent) survives and the customization goal is preserved.

What a "preset" is: a named bundle of the **non-color, structural** tokens
(radius, motion, typography voice) plus a default brand seed and default color
mode. The live seed and mode still come from the store, so a preset stays fully
re-colorable.

Landed (vertical slice — proved end-to-end through the NavBar):
- ✅ **Token model** (`theme/tokens.ts`): added `Motion` (spring easings +
  durations), a `mono`/`headingFamily` typography voice, and a preset-driven
  `RadiusScale`. `PRESETS` defines `default` (Classic) and `prism`;
  `makeTokens(params, mode, presetId)` emits them and stamps `tokens.preset`.
- ✅ **Adapter/wiring**: `makeTheme(params, presetId)` threads the preset;
  `ThemeConfig` gained a `preset` field (**bumped to v2**;
  `normalizeThemeConfig` migrates v1 → preset `default`); `themeStore` gained
  `preset` + `setPreset` (resets the seed to the preset default);
  `ThemeBootstrap` restores a saved preset without clobbering the saved seed.
- ✅ **Prism defaults to dark**: each preset carries a `defaultMode`
  (`prism: 'dark'`). `useSelectPreset()` is the user-action entry point —
  it applies the preset (store) *and* its default mode (MUI `useColorScheme`),
  distinct from bootstrap which restores a user's saved mode.
- ✅ **NavBar reskin** (`components/layout/NavBar.tsx`): rebuilt to the Prism
  structure (rotating kaleidoscope wordmark, uppercase-mono links with an
  accent underline, bordered controls), reading `theme.tokens` + palette with
  **zero hardcoded color** — so it re-skins from the active preset/seed.
  Storybook `PrismPreset` story renders it dark; test wrapper uses `makeTheme`.

Roll-out (in progress — landed as per-component vertical slices):
- ✅ **Preset picker** (`common/PresetPicker.tsx`) — a segmented control wired
  into `UIManagerPage` that reads the active preset from the store and calls
  `useSelectPreset`. Each option previews its own preset's voice + radius.
  Closes the gap where the hook existed but nothing selected a preset at runtime.
- ✅ **`StatusChip` pulsing dot** — opt-in leading dot (`dot` prop, default off)
  that inherits the chip's tone via `currentColor` and pulses for live/in-flight
  tones using the preset motion tokens. `isLiveTone` is the single source of
  which tones read as active work.
- ✅ **`StatTile`** (`common/StatTile.tsx`) — mission-control metric tile on
  `SurfaceCard`: uppercase mono label, value in the heading voice, unit, optional
  live `StatusChip`, and a trend/delta line (caller-overridable `trendTone`).
- ✅ **`EntityCard`** (`common/EntityCard.tsx`) — the header/body/actions
  skeleton (avatar + title/subtitle, top-right status/action slot, body, footer
  actions) on `SurfaceCard`, for the ~10 hand-rolled entity cards to migrate onto.

Still open (roll-out):
- ⏳ Restyle the remaining Prism surfaces to consume the tokens: the nav rail +
  top bar, table/inputs/editor treatments. Each follows the NavBar pattern.
- ✅ Migrate the existing entity cards onto `EntityCard` (all with smoke tests):
  `AgentCard` + `WorkflowCard` on the default `card` variant; `TeamLeadCard`,
  `AdvisorReviewCard`, `RoundCard` on a new `panel` variant (filled header bar +
  accent border + full-bleed body) that factors out the shell those three status
  cards each hand-rolled. ⏳ Still adopt `StatTile` where dashboards hand-roll
  metrics, and migrate the remaining CSS-class/MUI-`Card` cards opportunistically.
- ⏳ Consider folding `headingFamily` into the global MUI typography adapter (the
  NavBar/primitives consume `tokens.typography.mono` directly for now, to contain
  blast radius).

## Phase 6 — Public site (marketing pages) — PROPOSED

The admin/workflow surfaces now speak the design system, but the **public pages
a visitor actually lands on** — `HomePage`, `AboutPage`, `ExperiencePage` (and
their shared `PortfolioSection` / `SkillsSection` / `Timeline` / `Footer`) —
predate it and look out of place next to the reskinned `NavBar`. This phase
brings them onto the same tokens + primitives.

### Why they look out of place (measured against the NavBar)

The NavBar sets the reference: mono "data voice", accent-underline motif,
bordered controls, spring motion, **zero hardcoded color** (re-skins from the
active preset/seed/mode). The public pages violate each of these:

1. **Typography voice.** Pages use sans MUI headings (`h2`/`h3`/`h4`); Prism's
   identity is the monospace heading voice (`tokens.typography.mono` +
   `headingFamily`) the NavBar already speaks. Nothing on these pages opts in.
2. **Hand-rolled cards.** `FeatureCard`, `PortfolioSection`'s card, and
   `SkillsSection`'s `Paper` are raw MUI `Card`/`Paper elevation={n}` with
   generic `translateY(-4px)` / `boxShadow: 8` hover — bypassing `SurfaceCard`/
   `EntityCard` and the preset's radius + spring-motion tokens.
3. **Hardcoded color.** The hero hardcodes `linear-gradient(primary.dark →
   primary.light)` + `color: 'white'` + `grey.100`; `Footer` hardcodes
   `grey.900`/`grey.400`; `TimelineDot` hardcodes `backgroundColor: 'black'`.
   None of these re-skin with preset/seed/mode — the footer reads as a dark slab
   under a light Classic theme.
4. **Motion.** Generic `transition: transform 0.2s` instead of the preset's
   `motion.easing.spring*` + `motion.duration.*`.
5. **No shared section rhythm.** Bare `<Divider>` rules and plain headings; none
   of the accent-underline / mono-eyebrow motif that would tie a page back to the
   NavBar.

### Guardrail

Do **not** hardcode the Prism dark look. Consume tokens so the pages re-skin
under *both* presets and *both* modes exactly like the NavBar — this preserves
Phase 2's headline "customizable, contrast-safe" goal. The pages should look
right in Classic-light and Prism-dark from the same code.

### New primitive (the unifier)

- **`SectionHeading`** (`common/SectionHeading.tsx`) — a mono eyebrow (e.g.
  `// PROFILE`) + a heading in the heading voice + an accent underline that
  echoes the NavBar link motif. This is the single element that makes all three
  pages read as one system; every page below leans on it. Story + test, same as
  the other primitives.

### Page-by-page

**HomePage**
- *Hero*: drop the hardcoded gradient/`white`. Back it with a token surface
  (`surface.sunken`, or a seed-derived token gradient), render the name in the
  heading voice, the tagline as mono-uppercase letter-spaced text (NavBar-link
  style), and the CTAs with the NavBar's bordered/accent-underline button idiom
  (accent border + spring hover) instead of `bgcolor: 'white'`. Portrait gets
  `radius.lg` + a token elevation.
- *Feature cards* → **`EntityCard`** (`card` variant, `interactive`,
  `component={RouterLink}`): icon in the `avatar` slot, `title`, description as
  body. Inherits spring hover + token radius for free.
- *PortfolioSection* → cards on **`SurfaceCard interactive`** (or `EntityCard`);
  date as subtitle, tags as tokenized chips; "Recent Writing" via
  `SectionHeading`; "View all →" as a mono link.

**AboutPage**
- "About" → `SectionHeading` with a mono eyebrow. Body prose stays (readability).
  Image → `radius.lg` + token elevation. Optionally surface the "outside of work"
  interests (cooking, Spanish, board games, tango) as tokenized chips to echo the
  mission-control vibe.

**ExperiencePage**
- Section headings ("Experience", "Skills", "Career History") → `SectionHeading`,
  replacing the bare `<Divider>`s.
- The role intro is a natural fit for a **`StatTile`** strip (e.g. Role · Company
  · Focus) — reusing the mission-control metric primitive on a résumé.
- `SkillsSection`'s `Paper` → `SurfaceCard`; section titles in the heading voice.
- *Timeline* (the biggest offender): restyle `TimelineEntry` — `TimelineDot`
  from hardcoded `black` → `primary.main`/token; dates + org headings in the
  heading voice; wrap each entry's content in a `SurfaceCard`; replace raw `<a>`
  / `<br><br>` with MUI `Link` + spacing; connector color from tokens.

**Footer**
- Tokenize: `surface.sunken` bg + `text.secondary`, and mono-uppercase nav links
  echoing the NavBar — so it re-skins with mode/preset instead of being a fixed
  dark slab.

### Suggested order

`SectionHeading` first (unblocks all three pages), then HomePage (hero + cards),
then ExperiencePage (Timeline is the largest lift), then AboutPage, then Footer.
Each ships as a vertical slice with a story + test, like the Phase 5 slices.

### Open decision

Prism is *spiritually* dark-committed but the engine is preset-driven. Should the
public `kaleidoscope.pub` tenant **default to** the Prism look, or stay Classic
until a visitor selects Prism? This phase assumes the latter (token-consuming, so
it's correct under either) and defers the default-preset-per-tenant question to a
product call — it only needs `ThemeBootstrap` to seed a per-tenant default.

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
