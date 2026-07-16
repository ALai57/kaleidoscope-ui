# Front page: the digital garden — refraction hero + Prism side nav

**Status:** Design approved (concept + scope). Ready for implementation planning.
**Date:** 2026-07-16
**Author:** Andrew Lai (with Claude)

Interactive concept prototypes (private Artifacts):
- Three initial concepts — https://claude.ai/code/artifact/7d3693e7-5752-4092-ac83-82edc9e01a24
- Refraction refined + navbar/rail alternatives — https://claude.ai/code/artifact/72dbb774-546a-465c-846d-ed576a7c2c52
- **Chosen direction — hero → side rail flow** — https://claude.ai/code/artifact/45cbc56c-b794-4ffb-a070-98bef6605d7e

---

## 1. Purpose & concept

The site is a **digital garden** — a place where Andrew curates writing, reading, and recipes.
The front page should express that idea as a single, memorable moment and double as navigation.

**The metaphor:** one beam of light (Andrew — "a single light") enters a **prism** and refracts into a
**spectrum** of pursuits. Each color is a curated section of the garden. The site is named *Kaleidoscope*
and its design language is *Prism*, so "a self that contains every color, split into facets" is the house
metaphor rather than a bolt-on.

Two coordinated pieces:

1. **Refraction hero** — the front page (`/`, `/home`). A stylized (never photoreal) SVG of a prism
   dispersing light into three clickable facets: **Writing · Reading · Recipes**.
2. **Prism side rail** — once you enter, the prism "folds" into a persistent **left navigation rail** that
   replaces today's top `NavBar` across the whole site. The same three spectrum colors follow you; the
   section you're in stays lit ("you are here").

### Category → route mapping

| Facet | Color token | Route | Notes |
|---|---|---|---|
| Writing | accent / spectrum s1 (cyan `#45D6E8`) | `/archive` | existing archive page |
| Reading | spectrum s2 (violet `#9C90F0`) | `/library` | **shelf view made public** — see §6 |
| Recipes | spectrum s3 (amber `#E0A73C`) | `/recipes` | existing recipes page |
| About | spectrum s4 (green `#2E9E5B`) | `/about` | essentials-tier rail item |

Colors are read from `theme.tokens` (`color.brand.primary` + `color.categorical` spectrum), so the whole
system recolors with the active preset and color mode. No hardcoded hex in components.

### Tagline

Working default (chosen from three options): **"A digital garden — tending what I write, read, and cook."**
Final copy can be tweaked during implementation; it is not load-bearing for the design.

---

## 2. Scope

**In scope (this piece of work):** both the hero *and* the full side-rail migration — the cohesive whole.

- New `HomePage` hero (replaces the current hero + feature-card + portfolio layout on `/`).
- New `SideRail` primary navigation, replacing `NavBar` on all non-landing routes.
- A layout shell deciding hero-vs-rail per route.
- Ungate the `/library` **shelf** view for public read-only access (§6).

**Explicitly deferred / out of scope:**

- A lush hand-illustrated (raster) prism. This spec ships the **vector** prism; a raster-art polish pass is a
  later, separate follow-up built on the same layout.
- Additional facets ("photos", "projects") — the design leaves room (a faint 4th ray) but we ship three.
- Rebuilding admin/writer tool pages themselves. They only get *relocated* in the nav, not redesigned.

---

## 3. Component architecture

Kept small and single-purpose so each unit can be understood and tested independently.

### 3.1 `RefractionHero` (`src/components/home/RefractionHero.tsx`)
- **Does:** renders the prism SVG scene and the three facet links; owns the load-in animation and
  hover/focus interaction. Pure presentational — receives the facet list (label, route, color, glyph,
  description) as props/local config; contains no data fetching.
- **Used by:** `HomePage`.
- **Depends on:** `theme.tokens` (colors, motion, radius), `react-router` `Link`, an `useReducedMotion`-style
  check (MUI `useMediaQuery('(prefers-reduced-motion: reduce)')`).
- **Interaction:** hovering/focusing a facet dims the others and lights the hovered one (color glow + label +
  route). Full keyboard path (each facet is a focusable link with a visible focus ring). Under reduced
  motion, the entrance animation and beam pulse are disabled; hover feedback becomes static.
- **Accessibility:** each facet is a real `<a>`/`RouterLink` with an accessible name ("Writing — essays,
  talks & notes"); the SVG is decorative scaffolding with `role="group"` + `aria-label`.

### 3.2 `SideRail` (`src/components/layout/SideRail.tsx`)
- **Does:** the persistent primary navigation. Prism mark → home at the top; the three garden sections +
  About + auth control; a secondary "tools" affordance for writer/admin links.
- **Replaces:** `NavBar` on non-landing routes. `NavBar` is retired once all routes use the shell (keep the
  file until migration completes, then delete).
- **Depends on:** `useAuth()` (for auth state + role gating via `isWriter`/`isSiteAdmin` from
  `@/auth/authHelpers`), `useLocation` (active route → `aria-current` + lit color), `theme.tokens`,
  `KaleidoscopeMark`.
- **State model:** stateless w.r.t. navigation (route is the source of truth). Local UI state only for the
  secondary tools menu open/closed and (mobile) any expand behavior.
- **Rail inventory (essentials tier):**
  - Home (prism mark) → `/` (the hero)
  - Writing → `/archive`
  - Reading → `/library`
  - Recipes → `/recipes`
  - About → `/about`
  - Auth: avatar → `/admin` when authenticated, else Login button (same behavior as today's `NavBar`)
- **Secondary "tools" menu (writer/admin only):** Experience (`/experience`), Projects (`/projects`),
  Manager (`/manager`), Library editor tabs (acquisitions/taste). Rendered at the rail foot as an overflow
  group, or via the existing `SideMenu` drawer. Gated by `isWriter` / `isSiteAdmin` exactly as today — no
  change to who can see what; only *where* the links live.
- **Active state:** the item matching the current route gets its spectrum color as a lit left "spine"
  (`box-shadow` glow) + brighter label + `aria-current="page"`. This is the rail translation of today's
  animated accent underline.

### 3.3 `AppShell` (layout decision) — `src/components/layout/AppShell.tsx` (or in `App.tsx` layout route)
- **Does:** decides, per route, whether to render the full-bleed hero (landing) or the rail + content.
  - Landing routes (`/`, `/home`): render children full-bleed; **no rail** (the hero *is* the nav). Footer
    still renders.
  - All other routes: render `SideRail` + a content region + Footer.
- **Rationale:** keeps hero-vs-rail logic in one place instead of per-page. Implemented as a React Router
  layout route (`element` wrapping the existing children) so individual pages don't each import the rail.
- **Depends on:** `useLocation`, `useAuth` (passes user to `SideRail`).

### 3.4 `HomePage` (rewrite `src/pages/HomePage.tsx`)
- Becomes a thin composition: `<RefractionHero />` + a short "recent from the garden" strip below (optional,
  can reuse `PortfolioSection`) + `Footer`. The current top-nav `NavBar` call is removed (the shell/landing
  handles chrome). Existing `getArticles` query can stay if we keep a recent-writing strip; otherwise drop it.

### 3.5 Responsive rail (in `SideRail`)
- **≥ 640px:** expanded rail (icon + label), ~208–214px wide.
- **< 640px:** collapses to a **64px icon-only** rail (labels hidden, still reachable via `aria-label` +
  tooltip). Alternatively a top bar + drawer on the smallest screens — decide during the plan; icon rail is
  the default from the prototype. The existing `SideMenu` drawer can back the mobile secondary menu.

---

## 4. Data flow

- **No new server state.** Navigation is derived from the router; auth/roles from `useAuth()` +
  `authHelpers`. The hero is static config. Any "recent from the garden" strip reuses the existing TanStack
  Query `getArticles` client (and, if desired later, recipe/reading clients) — through `src/api/*` only.
- **Theming:** all color/motion/radius via `theme.tokens`; the spectrum comes from `color.categorical`
  (Prism preset overrides it to the validated spectrum). Facet colors are assigned by index so they track
  the preset.

---

## 5. Motion & interaction detail

- **Hero load-in:** source glow → beam draws in → fan splits (staggered) → facet cards settle with a gentle
  spring. One-time on mount. A slow ambient pulse on the core beam only.
- **Enter transition (hero → inside):** the hero fades/translates out while the rail slides in from the left;
  the active section lights. (In the SPA this is a route change; the "fold" is a tasteful cross-fade, not a
  literal shared-element morph — that can be a later enhancement.)
- **Hover/focus:** dim-others + light-one, on both hero facets and rail items.
- **Reduced motion:** `prefers-reduced-motion: reduce` disables entrance/pulse/lift; state changes become
  instant, hover feedback static. Required.

---

## 6. The `/library` gating change

Today `/library` is **writer-gated** (`isWriter`) — it is the Personal Recommender tool. The Reading facet
makes it a **public** garden section, so:

- **Make the `shelf` view public read-only.** A non-writer visiting `/library` (and `/library/:interestId`)
  sees the curated shelf, read-only.
- **Keep writer-gated:** the `acquisitions` and `taste` views/tabs, plus all create/edit/mutate actions and
  the "new" affordances. Non-writers don't see those tabs or buttons.
- **Implementation note:** the gate currently lives in `LibraryPage` (and matched the removed nav link).
  Change it from "redirect non-writers away" to "render shelf; hide writer-only tabs/actions when
  `!isWriter`." The writer-only API calls must remain unreachable for non-writers (defense stays server-side
  too — coordinate with `../kaleidoscope` if the shelf endpoint is currently auth-required).
- **Open item for the plan:** confirm the backend `shelf` read endpoint is (or can be) public for the
  andrewslai tenant; if not, this facet needs an anonymous read path. Flag before building.

---

## 7. Testing

Per repo discipline (every feature needs a test; co-located `*.test.tsx`; Vitest + Testing Library + MSW;
Playwright for flows):

- **`RefractionHero`:** renders three facet links with correct `href`s and accessible names; keyboard focus
  reaches each; reduced-motion path renders without animation classes.
- **`SideRail`:** renders essentials items; active route gets `aria-current="page"`; writer/admin tool links
  appear only for the right roles (mock `useAuth`); auth avatar vs login renders by auth state; home mark
  links to `/`.
- **`AppShell`:** landing routes render the hero without the rail; other routes render the rail; Footer
  present in both.
- **`LibraryPage` gating:** non-writer sees shelf, does NOT see acquisitions/taste tabs or mutate actions;
  writer sees everything (regression).
- **E2E (Playwright):** from `/`, clicking a facet lands on the right route with the rail present and the
  matching item lit; home mark returns to the hero. (Auth-gated paths may be skipped if no Auth0 harness,
  consistent with existing e2e limitations.)
- Update/replace the existing `HomePage.test.tsx` and any `NavBar` tests affected by retirement.

Run `npm run ci` (typecheck + lint + test) before pushing.

---

## 8. Migration / retirement notes

- `NavBar` is replaced by `SideRail` via `AppShell`. Retire `NavBar` (and its tests) only after every route
  renders through the shell; delete in the same branch once green.
- `AdminTopBar` / `SideMenu`: reuse `SideMenu`'s drawer for the mobile secondary menu if convenient; don't
  expand scope to redesign admin chrome.
- Keep the `KaleidoscopeMark` as the prism/home mark for brand continuity (it already rotates on hover — the
  rail's home mark can keep or adapt that).

---

## 9. "Prism = me" guardrails

The self-as-light idea is stated **once, quietly**: the source disc carries the monogram + a single small
label ("a single light · me"). No portrait inside the glass, no slogan, no rainbow-everything. If it ever
reads as gimmick, the escape hatch is to drop the source disc + label — the refraction still works purely as
navigation (this is a config toggle, not a redraw).

---

## 10. Open decisions to settle in the implementation plan

1. Backend: is the `/library` shelf read endpoint public for the andrewslai tenant? (§6)
2. Landing chrome: does the hero page show *no* rail, or does a rail slide in on scroll? (Default: no rail.)
3. Mobile nav: 64px icon rail vs top-bar + drawer at the smallest breakpoint. (Default: icon rail.)
4. Keep a "recent from the garden" strip under the hero, or hero-only? (Default: keep a light strip.)
5. Final tagline + facet microcopy.
