# Manager / Admin Hub → Prism (P2 slice 4) — Design

**Status:** Approved design (2026-07-15). Next: implementation plan via writing-plans.

**Goal:** Bring the two remaining light admin surfaces — the `/manager` capability hub and the
`/admin` session panel — into the Prism voice: a `PrismThemeProvider`-wrapped dark canvas, a mono
eyebrow header, Prism capability cards (hairline border, mono label, spring hover-lift) replacing the
garish `primary.main`-banner MUI cards, and a **live `StatTile` strip** on the hub (Articles / Images /
Projects counts) that gives it real mission-control character.

**Context:** P2 slice 4 — the last remaining P2 surface (continues Image Manager, Article
Manager/Editor, Workflow Progress; see `prism-p2-image-manager` memory + the Prism-adoption audit).
Unlike the workflow slice (already dark under AdminLayout), these pages render **light** today
(`ManagerPage`/`AdminPage` mount their own `NavBar` + light content), so — like the Image/Article
Manager slices — this slice **mounts** `PrismThemeProvider` around the content below the NavBar.

---

## Global Constraints

- Node 22; `npm run ci` (typecheck + lint + test) green before push; commit after each task.
- **No raw color literals** in components (lint-enforced `no-restricted-syntax`; exempt under
  `src/theme/**`, tests, stories). Use `theme.palette.*` / `theme.tokens.*` / `alpha(...)`.
- **Token-driven Prism voice, not hardcoded Prism.** Mono via `theme.tokens?.typography.mono ??
  'monospace'`; motion via `theme.tokens?.motion.*` with fallbacks; tinted fills via
  `alpha(theme.palette.<tone>.main, …)`. No new `prism/*` primitive — reuse `SurfaceCard`,
  `StatTile`, `PrismThemeProvider`, and `layout/Button` (all already token-driven).
- **`PrismThemeProvider` wraps only the content below `NavBar`** (children-only; the NavBar stays
  light, matching every prior slice). Fill-height pattern: outer page `Box` is
  `minHeight:100vh; display:flex; flexDirection:column`; the wrapped content `Box` is
  `flex:1; bgcolor:'background.default'` so the dark plane fills below the NavBar.
- **Preserve existing contracts:** all six `ManagerPage` capability links (name text, `aria-label`,
  and `to` href) stay intact; `AdminPage`'s `data-testid="admin-panel"` / `data-testid="login-panel"`
  and the "Welcome …" / Login / Logout copy + behavior stay intact. These are covered by existing
  tests and must keep passing.
- **Stats are read-only.** The `StatTile` strip fetches counts via existing typed API clients
  (`getBranches`, `getImageMetadata`, `getProjects`) through TanStack Query — no mutations, no new
  API endpoints, no backend change. All API access through `src/api/*` (never inline fetch).

---

## Architecture / Approach

Two independent page re-skins. Both mount Prism and reuse existing common primitives; neither
introduces a new shared component.

### 1. `ManagerPage` (`/manager`) — the capability hub

- **Mount + header:** wrap content below `NavBar` in `PrismThemeProvider`, flex-fill canvas, mono
  eyebrow `CONTROL` (accent) + `Typography component="h1"` mono `Manager` — the exact eyebrow/heading
  idiom from `ImageManagerPage`/`ArticleManagerPage`.
- **Live stats strip (`HubStats`):** a responsive row of three `StatTile`s above the card grid —
  `ARTICLES` (`getBranches().length`), `IMAGES` (`getImageMetadata().length`), `PROJECTS`
  (`getProjects().length`), each via `useQuery`. While a query is loading its tile shows `—` as the
  value (no spinner — the tile is the affordance); an errored/empty query shows `0`. `StatTile` is
  already token-driven, so it renders Prism-dark here for free. Queries use the existing query keys
  (`['branches']`, `['images']`, `['projects']`) so they share cache with the manager pages.
- **Capability cards (`ManagerCard` re-skin):** replace the MUI `Card` + full-width
  `CardMedia`-on-`primary.main` + `CardContent` with a Prism card built on **`SurfaceCard`**
  (`interactive`): a `CardActionArea`(`component={Link}`) holding a compact **icon tile** (the svg on
  a subtle `alpha(primary.main, …)` tinted, hairline-bordered square — not a garish full banner), the
  capability name in the mono heading voice, and the `body2` secondary description. Spring hover-lift
  via `SurfaceCard interactive` (shadow) plus a small `translateY` using `theme.tokens?.motion`
  (reduced-motion-guarded). All six capabilities, hrefs, and `aria-label`s preserved.
- **Grid:** responsive CSS grid (`repeat(auto-fill, minmax(240px, 1fr))`) replacing the fixed
  256×256 flex boxes.

`ManagerCard` and `HubStats` stay **page-local** to `ManagerPage` (only consumer — no extraction).

### 2. `AdminPage` (`/admin`) — the session panel

- **Mount + header:** same `PrismThemeProvider` flex-fill wrap; mono eyebrow `SESSION` + heading
  `Admin`.
- **Panel re-skin:** the two `Paper` panels (`AdminPanel`, `LoginPanel`) → `SurfaceCard` with a mono
  welcome heading and the Prism `layout/Button` (already fixed in P1). Keep both `data-testid`s, the
  `Welcome {first} {last}!` / `Welcome!` copy, and the login/logout wiring. Keep the `isLoading` gate.

---

## Reuse Safety & Testing

Co-located Vitest + Testing Library (jsdom). No public reader or alternate theme context is involved
(both pages are admin-only, mount their own Prism), so there is **no cross-theme reuse invariant** to
hold here — the only shared component touched, `StatTile`, is already verified token-driven and its
other consumers are untouched.

- **`ManagerPage.test`:** keep the existing link/href assertions passing (they prove the re-skin
  preserved every capability link). The page now runs three queries, so the test wrapper gains a
  `QueryClientProvider` and the three API modules are `vi.mock`ed to resolve fixed-length arrays;
  add assertions that the three `StatTile`s render their counts (e.g. `ARTICLES` shows the mocked
  count). Loading-state (`—`) covered by leaving one query unresolved or asserting the mocked value.
- **`AdminPage.test`:** keep the existing `login-panel`/`admin-panel`/welcome assertions passing
  (they prove the panel re-skin preserved the contracts). No query wrapper needed.
- **Lint/type:** the icon-tile tint and hover use `alpha(...)`/`theme.tokens` — confirm `npm run
  lint` clean (no raw literals) and `npm run typecheck` clean.
- **Story (render smoke):** a `ManagerPage.stories.tsx` that seeds the three query caches with
  representative arrays and renders under `PrismThemeProvider` (dark) — a visual smoke for the hub +
  stat strip, matching the prior slices' story-as-render-smoke practice for query-driven surfaces.

---

## Out of Scope

- Any new API endpoint or a dedicated "counts" backend route — the strip reuses existing list
  endpoints and counts client-side.
- Mutations or write actions on the hub (it stays a navigation + read-only-stats surface).
- `UIManagerPage` and the other already-Prism manager pages (Image/Article) — untouched.
- Extracting `ManagerCard`/`HubStats`/a `CapabilityCard` into a shared component (single consumer —
  YAGNI).
- Recipes/Audiences/UI-Customization stat tiles (no cheap existing count endpoint wired here; the
  strip is Articles/Images/Projects only).
- Cross-cutting Prism a11y hardening — tracked as one separate pass (per the standing follow-up).

---

## Decisions Resolved (during brainstorming)
1. **Scope:** both `ManagerPage` + `AdminPage`, plus a **live** StatTile strip on the hub. *(user —
   "Re-skin + live stats")*
2. **Stats source:** existing list endpoints (`getBranches`/`getImageMetadata`/`getProjects`),
   counted client-side, read-only, shared query keys — no new endpoint. *(design — YAGNI, no backend
   change)*
3. **Stat set:** Articles / Images / Projects (the three with a cheap existing endpoint). *(design)*
4. **Mount:** these pages are light today → this slice mounts `PrismThemeProvider` (like Image/Article
   Manager), unlike the workflow slice. *(design)*
5. **Capability card on `SurfaceCard`** (not a new primitive), page-local. *(design — DRY)*
6. **Loading value = `—`** in the tile (no spinner) — the tile is the affordance. *(design)*
