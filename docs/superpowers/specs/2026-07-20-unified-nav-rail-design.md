# Unified Navigation Rail — Design

**Status:** Approved design (2026-07-20). Next: implementation plan via writing-plans.

**Goal:** Collapse the two disjoint navigation systems a logged-in user lives in today — the public
`SideRail`/`MobileNav` (garden) and the admin `AdminNavRail`/`AdminMobileDrawer` (Studio) — into **one
persistent rail** rendered by a single shell on every inner page. Logged out it shows only the garden
facets; logged in it grows a collapsible **Studio** section holding the admin sections, and the footer
becomes an account menu with **Logout**. This removes the full-chrome swap, cuts admin tools and logout
from multi-click journeys to one click, and gives the rail a single source of items so nothing is
duplicated or stranded below the fold. This is "Direction A" from the 2026-07-20 navbar proposal.

**Context:** Today the nav you see is decided by *which route you're on*, not who you are. Garden
routes (`/archive`, `/recipes`, `/content/:slug`, …) mount `AppShell` → `SideRail`; admin routes
(`/manager`, `/articles`, `/agents`, …) live **outside** `AppShell` and each page renders its own
`AdminLayout` → `AdminNavRail` inside a fixed dark `PrismThemeProvider`. Crossing between them replaces
the entire shell (brand, theme, item set, active-indicator style). Consequences, all confirmed in
code: admin tools are reachable from a garden page only via avatar → `/admin` → navigate again; logout
is avatar → `/admin` → a body button (3 steps, no logout in any nav); `/projects`, `/manager`,
`/experience` appear in **both** navs; `SideRail`'s tools/avatar and `AdminNavRail`'s 10-item list can
scroll below the fold; `SideMenu.tsx` is dead code. The App.tsx comment ("Legacy — still render their
own top NavBar until the follow-up migration") marks the split as an unfinished migration — this is
that migration.

---

## Global Constraints

- Node 22; `npm run ci` (typecheck + lint + test) green before push; commit after each task.
- **No raw color literals** in components (lint-enforced `no-restricted-syntax`; exempt under
  `src/theme/**`, tests, stories). Reuse the existing token-driven idioms: mono via
  `theme.tokens?.typography.mono ?? 'monospace'`, motion via `theme.tokens?.motion.*` with fallbacks,
  facet hues via `facetColor(tokens, colorIndex, fallback)`, tinted fills via `alpha(...)`.
- **Preserve every destination and contract.** Same routes, same labels, same `aria-label`s, same
  `aria-current` active semantics. Existing role gating (`isWriter`/`isSiteAdmin` from
  `@/auth/authHelpers`) is preserved, not redesigned. All existing nav/layout tests must keep passing
  or be updated in lockstep with the component they cover.
- **Auth only through `useAuth()`**; server state through TanStack Query; API only through
  `src/api/*`. This work touches none of those — it is layout/nav only.
- **Keep the `AdminLayout` page-facing API stable** (`title`, `actions`, `disablePrismTheme`,
  `children`). 17 pages consume it; the refactor changes its *internals*, not the shape callers write.
  (The now-redundant `user`/`isAuthenticated`/`login`/`navItems` props are removed — see §5.)
- **This is nav/IA, not an auth or theming rewrite.** No route guards are added (their absence is a
  pre-existing, separate concern — see Non-Goals). The admin content canvas stays Prism-dark.

---

## Architecture / Approach

Four moving parts. A **single nav-item source** feeds a **unified desktop rail** and a **unified mobile
nav**; a **single shell** (`AppShell`) wraps every inner route and renders that nav beside an
`<Outlet/>`; **`AdminLayout`** is re-scoped from "owns the whole admin chrome" down to "themes the
content column and renders its top bar." The two admin-only nav components and the dead `SideMenu` are
then deleted.

```
Route tree (after)
  <Outlet/>                         ── errorElement, no chrome
    ├── "/" , "/home"               ── HomePage (hero IS the nav; no shell)   [unchanged]
    └── <AppShell/>                 ── unified rail (desktop) / MobileNav (mobile) + <Outlet/>
          ├── garden routes         ── content renders directly (no top bar)
          └── admin routes          ── content wrapped in <AdminLayout title actions>
                                        (Prism theme + AdminTopBar + padding), NO rail of its own
```

### 1. Single nav-item source — `src/components/layout/navConfig.tsx`

One module is the sole source of truth for what the rail shows, consumed by the desktop rail, the
mobile nav, and their tests. Two ordered lists:

- **Reader facets** — reuse `GARDEN_FACETS` (Writing→`/archive`, Reading→`/library`, Recipes→`/recipes`)
  plus the existing About→`/about` (success-hued). No change to `gardenFacets.ts`; navConfig imports it.
- **Studio items** — the existing `ADMIN_NAV_ITEMS` (10 sections in `content`/`build`/`system` groups,
  each with its MUI icon) **plus** Experience→`/experience`, each extended with a `minRole:
  'writer' | 'admin'`. This replaces the ad-hoc "tools" list currently hardcoded in `SideRail`/`MobileNav`
  and the ungated `ADMIN_NAV_ITEMS`.

```ts
export type StudioGroup = 'content' | 'build' | 'system';
export interface StudioNavItem {
  label: string; to: string; icon: React.ReactNode;
  group: StudioGroup; minRole: 'writer' | 'admin';
}
export const STUDIO_NAV_ITEMS: StudioNavItem[] = [ … ];

/** Filter Studio items by the user's role; [] when neither writer nor admin. */
export function visibleStudioItems(user?: NavBarUser): StudioNavItem[];
```

**Role mapping (behavior-preserving, flagged for confirmation — see Open Decisions):**

| Group   | Items                                                        | `minRole` |
|---------|-------------------------------------------------------------|-----------|
| content | Manager, Articles, Images, Experience                       | `writer`  |
| build   | Projects, Workflows, Agents, Workspace Roots, Score Defs    | `admin`   |
| system  | Groups, UI Manager                                          | `admin`   |

`isWriter(user)` is already "writer **or** admin," so admins see everything and writers see the
content group; a plain authenticated user with no roles sees no Studio group at all (footer avatar
only) — matching today.

### 2. Unified desktop rail — `NavRail` (evolve `SideRail` in place)

`SideRail.tsx` becomes the one rail. Structure top-to-bottom, all token-driven, one width (**216px**,
reconciling today's 214/216 split), one active-indicator style (the dot + glowing left bar the reader
rail already uses; Studio items keep their leading MUI icon):

1. **Brand** → `KaleidoscopeMark` + "andrewlai" → `/` (the reader brand; the "KALEIDOSCOPE" wordmark
   retires with `AdminNavRail`).
2. **Reader facets** — Writing / Reading / Recipes / About, facet-hued dots, `isFacetActive` semantics.
3. **Studio section** (only when `visibleStudioItems(user).length > 0`): a `Studio` group header (mono,
   uppercase, hairline top border) that is a **collapsible disclosure** (`<button aria-expanded>` +
   caret; default expanded), containing the role-filtered items rendered in their `content`/`build`/
   `system` groups with the existing hairline-between-groups rule. The section scrolls internally
   (`flex:1; min-height:0; overflow-y:auto`) so the brand and footer stay pinned and the active item is
   never stranded below the fold.
4. **Footer — account menu.** Authenticated: avatar + first name → opens a Prism `Menu`
   (`@/components/prism`) with **Admin** (`/admin`) and **Logout** (`logout()`). Unauthenticated: the
   existing Login button (`login()`). This is where the 3-step logout collapses to one.

`AppShell` passes `{ user, isAuthenticated, login, logout }` in; `logout` is new to the rail's props.

### 3. Unified mobile nav — `MobileNav` (grow Studio in place)

`MobileNav` keeps its three parts (sticky top bar, fixed bottom garden tab bar, right drawer) and its
`MOBILE_*` height exports. Changes:

- The drawer's **Studio** section is rebuilt from `visibleStudioItems(user)` (labeled, grouped) instead
  of the hardcoded Experience/Projects/Manager list — so mobile and desktop show the *same* Studio set.
- The drawer's account footer gains the same **Logout** affordance (authenticated → account row +
  Logout; today it only links to `/admin`).
- `AdminMobileDrawer` is deleted; the unified drawer is the only mobile menu.

The bottom tab bar stays the four garden facets (Writing/Reading/Recipes/About); Studio + account live
one tap away behind the drawer, as today.

### 4. Single shell + routing — `AppShell` wraps every inner route

- `AppShell` is unchanged in spirit — rail (desktop) / `MobileNav` (mobile) + `<Outlet/>` — but now
  also passes `logout`, and **all admin routes move under it** in `App.tsx`. `/` and `/home` stay
  outside (the hero is their nav).
- Because the rail now lives at the shell level, each admin page stops rendering nav. `AdminLayout` is
  re-scoped (§5) to the content column only.

**Theme boundary (decision — see Open Decisions):** the **rail stays under the live app theme**
everywhere (one consistent, preset-re-skinning rail), while **admin content stays Prism-dark** via
`AdminLayout`'s existing `PrismThemeProvider` wrap. Crossing into Studio no longer swaps the *chrome* —
the rail persists, structurally identical; only the content canvas shifts to mission-control dark. This
preserves the recently-shipped Prism admin identity (P1–P3) while delivering the persistent-rail win.

### 5. `AdminLayout` re-scoped to content-only

Same public API (`title`, `actions`, `disablePrismTheme`, `children`); new internals:

- **Removes** `AdminNavRail`, `AdminMobileDrawer`, and the mobile hamburger/`drawerOpen` state — the
  shell owns navigation now.
- **Keeps** the `PrismThemeProvider` wrap (unless `disablePrismTheme`, still honored for UI Manager),
  the `AdminTopBar` (title + page `actions`), and content padding.
- **Drops** the `user`/`isAuthenticated`/`login`/`navItems` props (nav-only, now unused). The 17 call
  sites simplify to `<AdminLayout title="…" [actions] [disablePrismTheme]>`; pages that computed a
  `user` object *solely* for `AdminLayout` drop that too.
- `AdminTopBar` loses its `onMenuClick`/hamburger branch (the shell's `MobileNav` owns the menu). Its
  title + actions rendering is unchanged.

### 6. Delete absorbed / dead code

`SideMenu.tsx` (+ `.test`/`.stories`) — unused. `AdminNavRail.tsx` (+ `.test`/`.stories`) — merged into
`NavRail`; `ADMIN_NAV_ITEMS` moves into `navConfig` as `STUDIO_NAV_ITEMS`. `AdminMobileDrawer.tsx`
(+ `.test`) — merged into `MobileNav`.

---

## Testing

Every changed component keeps a co-located `*.test.tsx`; the suite must stay green (`npm run ci`).

- **`navConfig`** — `visibleStudioItems` returns `[]` for anon/plain user, the content group for a
  writer, and all groups for an admin; item routes/labels are unique (no duplicates).
- **`NavRail`** (rework `SideRail.test`) — logged out shows facets + Login and **no** Studio; logged in
  (admin) shows the Studio disclosure with all groups; writer sees content group only; the Studio
  header collapses/expands (`aria-expanded`); footer account menu exposes **Logout** and calls
  `logout`; active `aria-current` on the current route.
- **`MobileNav.test`** — drawer Studio section mirrors `visibleStudioItems`; account footer exposes
  Logout; bottom tabs unchanged.
- **`AdminLayout.test`** — renders `title`/`actions` and Prism canvas, honors `disablePrismTheme`, and
  renders **no** rail/drawer/hamburger; API shape (`title`/`actions`/`disablePrismTheme`) preserved.
- **`AppShell.test`** — admin route renders exactly one nav (the unified rail), not two; `logout`
  threaded through.
- **Regression** — delete `SideMenu`/`AdminNavRail`/`AdminMobileDrawer` tests with their components; a
  grep gate confirms no lingering imports.
- **E2E** (`e2e/`) — assert the logged-out rail structure (one rail, facets, Login, no Studio) and that
  garden↔(a public) navigation keeps the rail mounted. Logged-in/Logout e2e is best-effort given the
  known Auth0-harness gap (see `personal-recommender-frontend` memory); component tests carry that load.

---

## Non-Goals

- **Route guards / auth hardening.** Admin routes remain reachable by URL (a pre-existing gap the Explore
  pass surfaced). Worth a follow-up, but out of scope here — this changes navigation, not access control.
- **Making admin content light / removing Prism.** The Studio canvas stays Prism-dark by design.
- **Command palette (Direction C).** A natural follow-on once the single rail exists; not in this pass.
- **Tenant-aware branding.** The "andrewlai" wordmark stays hardcoded as today; multi-tenant brand is a
  separate concern.
- **Redesigning role semantics.** We preserve current gating; the §1 role mapping only formalizes it.

---

## Open Decisions (confirm before/at plan review)

1. **Rail theme at the seam.** Recommended: rail under the live app theme, admin content Prism-dark
   (§4). If a light global theme beside a dark Studio canvas reads as off, the fast-follow is to tint
   the rail Prism when a Studio route is active — deferred unless you want it in-scope now.
2. **Studio role mapping (§1 table).** Content-editing items gated to `writer`, AI/system to `admin`.
   This is a behavior call (today the admin rail gated nothing once reached); confirm it matches the
   backend `<host>:writer` / `<host>:admin` intent.
3. **Studio default state.** Expanded by default (proposed). Alternative: remember collapsed/expanded in
   `uiStore` (Zustand) so it persists across sessions — small add if wanted.

---

## Files Touched (anticipated)

**New:** `src/components/layout/navConfig.tsx` (+ `.test`).
**Reworked:** `SideRail.tsx`→unified `NavRail` (+ test/stories), `MobileNav.tsx` (+ test),
`AppShell.tsx` (+ test), `AdminLayout.tsx` (+ test), `AdminTopBar.tsx`, `App.tsx` (route nesting),
and the 17 pages that render `<AdminLayout>` (drop nav props/`user`).
**Deleted:** `SideMenu.tsx`, `AdminNavRail.tsx`, `AdminMobileDrawer.tsx` (+ their tests/stories).
