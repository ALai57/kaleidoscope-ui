# Mobile responsiveness — public reader first, admin second

**Status:** Design approved (concept + scope). Ready for implementation planning.
**Date:** 2026-07-17
**Author:** Andrew Lai (with Claude)

Interactive prototypes (private Artifacts):
- **Mobile plan — audit + before/after mockups** — https://claude.ai/code/artifact/bdfadbe0-5fe2-4b80-a7f2-e78b2015d901
- **Prism hero — optical bench (chosen hero direction)** — https://claude.ai/code/artifact/597379a9-5b2e-4992-a03f-9b5acc553bd1

---

## 1. Purpose

The single SPA bundle is served to every tenant, but it was built desktop-first. Driving the real app at
390 px (phone) and 768 px (tablet) surfaced that the site is not usable on a phone in a few load-bearing
places — most importantly the **primary navigation stops communicating anything on touch**. This work makes
the app mobile-responsive, led by the **public reader** surfaces (where real mobile traffic lands) and
followed by the **admin/CMS** surfaces (desktop-first, lower priority).

The guiding principle: **reorient, don't shrink.** Layouts change shape at small widths rather than scaling a
desktop composition down.

---

## 2. Findings (what grounds this work)

Captured live from the running app; full evidence in the plan Artifact.

| # | Finding | Severity | Where |
|---|---|---|---|
| 1 | **Primary nav collapses to unlabeled dots.** Below `sm`, `SideRail` hides every label and renders sections as 8 px colored circles. Touch has no hover tooltip → four mystery dots; writer/admin links are hidden entirely; the rail still consumes 64 px. | Critical | `src/components/layout/SideRail.tsx` |
| 2 | **Landing hero is a desktop diagram, shrunk.** `RefractionHero` — the whole navigation on `/` — keeps its horizontal prism-to-cards diagram at phone width; cards jam the right edge, the fold below is empty. | High | `src/components/home/RefractionHero.tsx` |
| 3 | **Legacy pages overflow / wrap to 1–2 words per line.** `/experience` reaches 477 px wide (own top NavBar, two-column skills+timeline); `/library` overflows to 406 px on its two-column shelf/detail split. | High | `ExperiencePage`, `LibraryPage` |
| 4 | **Admin rail is legible but immovable.** `AdminNavRail` shows real icons (fine), but it is a fixed rail with no drawer and data-dense grids behind it have little room. | Medium | `src/components/layout/AdminNavRail.tsx` |
| 5 | **No shared responsive primitives.** Only 3 files touch `useMediaQuery`; breakpoints are ad-hoc per component. No `useIsMobile` hook, no tap-target floor. | Medium | repo-wide |

Only `/experience` and `/library` overflow the viewport horizontally today; the deeper problem is
navigation legibility, not overflow.

---

## 3. Scope

**In scope**

- A small set of **responsive foundations** (Phase 0) so subsequent phases compose instead of copy-paste.
- **Public reader nav + hero** (Phase 1) — the highest-traffic, most-broken surfaces.
- **Reader content pages** (Phase 2) — reflow the overflowing/unreadable pages.
- **Admin/CMS pass** (Phase 3) — drawer nav + scroll-contained grids; desktop-first, lowest priority.

**Explicitly out of scope**

- Any visual redesign beyond what responsiveness requires. Colors, type, and Prism language are unchanged.
- Rebuilding editor pages (article/recipe/workflow) into first-class mobile editors. They get a *usable*
  narrow layout or a graceful "best on desktop" state, not a mobile-optimized authoring experience.
- A native app, offline, or PWA install work.
- The deferred accessibility hardening pass tracked separately (this spec folds in the a11y that responsive
  nav *requires* — labels, tap targets, focus — but is not the full audit).

**Non-goals**

- Pixel parity between phone and desktop. Reorientation is expected and desired.

---

## 4. Approach — four phases

Phase 0 ships alongside Phase 1 (the foundations are proven by their first consumer). Phases 2 and 3 follow.
Each phase is independently shippable and each change ships with a test.

```
Phase 0  Foundations ───┐
Phase 1  Nav + Hero  ───┴──► reader is usable on a phone
Phase 2  Content pages ─────► no overflow, readable columns
Phase 3  Admin pass ───────► drawer nav + scrollable grids
```

---

## 5. Phase 0 — Responsive foundations

### 5.1 Breakpoint convention

Use the existing **MUI theme breakpoints** as the single source of truth (there is no separate breakpoint
token, and we will not add one). The dividing line between "mobile layout" and "desktop layout" for this
work is **`md` (900 px)**:

- `< md` → mobile layout (bottom nav, stacked hero, single-column content).
- `>= md` → current desktop layout (side rail, refraction diagram, multi-column).

`sm` (600 px) remains available for finer tuning inside a layout (e.g. type scale) but is **not** the
mobile/desktop switch. This is a deliberate change from `SideRail`'s current `sm`-based collapse, which
produced the mystery-dot state on the 600–900 px tablet band as well.

### 5.2 `useIsMobile` hook

`src/hooks/useIsMobile.ts` (new `hooks/` dir):

```ts
export function useIsMobile(): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
}
```

A thin, named wrapper so components read `const isMobile = useIsMobile()` instead of re-deriving the query.
One place to change the breakpoint later. Co-located `useIsMobile.test.ts` mocks `matchMedia`.

### 5.3 Tap-target floor

Interactive nav targets get a **44 px minimum** hit area (WCAG 2.5.5 / Apple HIG). Encoded as a small style
helper rather than a magic number scattered around — e.g. a `minTapTarget` sx fragment exported from the
nav components' shared module. Applies to bottom-tab buttons, drawer rows, and the hamburger.

### 5.4 `MobileNav` shell component

New `src/components/layout/MobileNav.tsx` — the reusable mobile navigation surface consumed by Phase 1:

- **Top bar** — Prism mark (links `/`), current page title, a menu (`☰`) button.
- **Bottom tab bar** — the four primary destinations (Writing, Reading, Recipes, About), always **labeled**,
  each in its facet color, active tab carries `aria-current="page"`. Thumb-reachable; `44px` targets;
  `backdrop-filter` blur over `background.paper`.
- **Drawer** — opened by the menu button; repeats the four facets and **surfaces the writer/admin links that
  the mobile rail currently hides** (Experience, Projects, Manager, plus login/avatar). Scrim closes it;
  `Esc` closes it; focus is trapped while open; `prefers-reduced-motion` disables the slide.

`MobileNav` reads `GARDEN_FACETS` and `facetColor` (same source as `SideRail` and `RefractionHero`), so the
destinations and colors stay in sync automatically. It uses Prism tokens (mono type, radius, categorical
spectrum) — **no hardcoded hex** — and CSS `gap`/grid over MUI-only layout APIs where cheap, to stay
resilient to a future move off MUI.

---

## 6. Phase 1 — Public reader navigation & hero

### 6.1 `SideRail` → responsive

`AppShell` (`src/components/layout/AppShell.tsx`) currently always renders `<SideRail>` beside the routed
content. Make it breakpoint-aware:

- `>= md` — render `SideRail` unchanged (the current rail is fine on desktop/tablet-landscape).
- `< md` — render `MobileNav` instead: no left rail, content is full-width, bottom tab bar + drawer.

The `SideRail`'s own internal `xs`/`sm` collapse (the mystery-dot state, `width: { xs: 64, sm: 214 }` and the
`display: { xs: 'none' }` label hiding) is **removed** — below `md` the rail is not rendered at all, so that
dead state disappears. `SideRail` becomes desktop-only and can drop its `xs` branches.

`AppShell` decides via `useIsMobile()` and renders one or the other; the routed `<Outlet/>` is unchanged.

### 6.2 `RefractionHero` → the optical bench (mobile only)

On `/` and `/home`, `RefractionHero` is the navigation, so it must reorient — not shrink — below `md`.

**Desktop (`>= md`):** unchanged. The existing 1000×480 horizontal diagram (source → prism → three fan-out
rays → cards) with light pulses stays exactly as is.

**Mobile (`< md`):** the approved **optical bench** layout (see hero Artifact):

1. **Source** — "you" (name + kaleidoscope mark), centered at the top.
2. A single **mirror** turns the downward beam **left**.
3. The beam enters the **prism**, seated at the top-left corner.
4. The prism disperses into three **colored rays that curve down** onto full-width, stacked facet cards —
   Writing (teal, nearest), Reading (violet), Recipes (amber, furthest).

Geometry / implementation notes (from the prototype, native SVG viewBox `298×624`, scale to container):

- Rays are **monotonic in x** (always progressing toward the cards) so no ray bends back on itself, and they
  **diverge from a single prism apex** so they never cross. This is the core visual contract — preserve it if
  the geometry is re-tuned.
- The pre-prism beam is **neutral/white**; color appears only **at** the prism — the literal refraction.
- Cards are absolutely positioned at known Y; ray endpoints are the card anchors. In the component, compute
  ray endpoints from the facet card positions (or fix them for the three known facets) rather than
  hand-tuning per screen.
- Each ray gets a soft **per-facet-color glow** (`drop-shadow`), luminous on dark, near-invisible on light.
- Colors come from `theme.tokens` categorical spectrum via `facetColor` — recolors with the active preset.

**Animation:** reuse the existing pulse machinery conceptually — a load sequence (beam draws along the bench →
mirror glints → prism appears → rays fan out → cards rise). Gate all motion on
`prefers-reduced-motion` (as `RefractionHero` already does via `useMediaQuery`/`PULSE_CONFIG.enabled`); the
static end-state must be fully legible with motion off.

**Tradeoff (accepted):** seating the prism on the left needs a wider left margin than a naive stack, so the
mobile cards are slightly narrower (~a 120 px left column on a 390 px phone). Accepted in exchange for keeping
the refraction metaphor.

### 6.3 What Phase 1 fixes

Findings **1** (mystery-dot nav → labeled bottom tabs + drawer, admin links restored) and **2** (hero
reorients instead of shrinking).

---

## 7. Phase 2 — Reader content pages

Fixes finding **3** and the general "desktop columns on a phone" problem.

- **Experience** (`ExperiencePage`) — the date-gutter timeline collapses to a single column below `md`: the
  date becomes a chip above each entry, the description takes the full width (no more 1–2 words/line). The
  skills grid reflows to fewer columns. Kills the 477 px overflow.
- **Library** (`LibraryPage`) — the shelf/detail two-column split stacks below `md`; kills the 406 px overflow.
- **Article & Recipe pages** — confirm comfortable mobile padding and media `max-width: 100%`; these largely
  reflow already but need a pass.
- **Legacy top-NavBar pages** — where cheap, migrate the remaining legacy pages onto `AppShell` so they
  inherit the Phase 1 mobile nav instead of carrying their own top `NavBar` (which is itself not responsive).
  `/experience` is the priority; the full legacy migration can be incremental.

---

## 8. Phase 3 — Admin / CMS pass

Fixes finding **4**. Desktop-first surfaces, so lowest priority.

- **`AdminNavRail`** collapses to a drawer below `md` (a slimmer, dark-Prism analogue of `MobileNav`'s drawer;
  may reuse the same drawer primitive with the admin nav model).
- **Data grids** (agents, workflows, tasks, groups, projects, image manager) get **`overflow-x` containment**
  in their own scroll container so the page body never scrolls sideways, or a **stacked card view** on phones
  where a table doesn't make sense.
- **Editor pages** (article/recipe/workflow) get a usable narrow layout or a graceful, explicit "best on a
  larger screen" state — not a full mobile-editor build (out of scope, §3).

---

## 9. Testing

Every change ships with a test — this repo's discipline.

- **Overflow regression (e2e, Playwright).** A spec that loads the key public routes (`/`, `/about`,
  `/experience`, `/recipes`, `/library`) at a 390 px viewport and asserts
  `document.documentElement.scrollWidth <= clientWidth + 1`. This is the automated form of the manual smell
  that surfaced findings 1–3, and it guards against regressions. Extend to admin routes in Phase 3.
- **Unit (Vitest + Testing Library).** `useIsMobile` (mock `matchMedia`); `MobileNav` renders the four
  labeled tabs, marks the active one with `aria-current`, opens/closes the drawer, and exposes the
  writer/admin links when authorized. `AppShell` renders `MobileNav` below `md` and `SideRail` at/above `md`
  (mock the media query).
- **Hero.** A test asserting `RefractionHero` renders the mobile bench structure below `md` and the desktop
  diagram at/above `md`, and that no motion is emitted under `prefers-reduced-motion`.
- Run `npm run ci` (typecheck + lint + test) before pushing.

---

## 10. Guardrails / conventions

- **Stay on Prism tokens.** Facet colors via `facetColor`/`theme.tokens.color.categorical`; mono type,
  radius, motion from tokens. No hardcoded hex in components (matches the existing lint guard).
- **One source of truth for destinations.** `MobileNav`, `SideRail`, and `RefractionHero` all read
  `GARDEN_FACETS` — never duplicate the facet list.
- **Accessibility that responsiveness requires.** Every nav target labeled (no icon-only primary nav), `44px`
  minimum hit area, visible focus-visible states, `aria-current` on the active destination, drawer focus-trap
  + `Esc`, all motion gated on `prefers-reduced-motion`.
- **MUI-agnostic where cheap.** Prefer CSS `gap`/grid and tokens over MUI-only APIs, so the nav survives a
  possible future move off MUI.
- **Server/client state unchanged.** No new data fetching; this is layout + navigation only.

---

## 11. Sequencing summary

1. **Phase 0 + 1 together** — foundations (`useIsMobile`, tap-target helper, `MobileNav`) proven by making
   `AppShell`/`SideRail` responsive and reorienting `RefractionHero`. Ship with the overflow e2e + nav/hero
   unit tests. *Biggest UX win.*
2. **Phase 2** — Experience timeline, Library split, article/recipe padding, `/experience` onto `AppShell`.
3. **Phase 3** — `AdminNavRail` drawer, grid overflow containment, editor narrow-layout/fallback.

---

## 12. Open questions

- **Bottom tab bar vs. top-drawer-only.** The design commits to a bottom tab bar (four thumb-reachable
  destinations). If four ever grows toward six, revisit — a drawer-only pattern scales better past ~5.
- **Legacy migration extent in Phase 2.** How many legacy top-NavBar pages to move onto `AppShell` now vs.
  leave for a later sweep — decide per-page by effort during planning.
- **Card width on very small phones (< 360 px).** Confirm the optical-bench left column still leaves
  comfortable card width on the smallest supported devices; fall back to a tighter prism inset if needed.
