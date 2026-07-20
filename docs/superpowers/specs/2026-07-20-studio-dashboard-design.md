# Studio Dashboard (`/manager` repurpose) — Design

**Status:** Approved design (2026-07-20). Next: implementation plan via writing-plans.

**Goal:** Repurpose the `/manager` page from a redundant navigation launcher into the **Studio landing
dashboard**. The unified navigation rail now owns navigation — every admin destination is a one-click,
always-visible rail item sourced from `navConfig`. That makes Manager's capability-card grid pure
duplication (and a detour: rail → `/manager` → click a card → destination). This redesign **deletes the
card grid**, keeps the live stats strip, and grows the page into a proper "what's going on" landing:
stats + quick-create actions + a recent-activity feed. The page and its rail nav item are renamed
**Studio**, so the rail's Studio section lands on the Studio dashboard.

**Context:** Follows the unified-nav-rail work (`2026-07-20-unified-nav-rail-design.md`), which
established `navConfig` as the single source of nav items and surfaces all Studio destinations directly
in the rail. Today `ManagerPage` (`/manager`) renders, under `AdminLayout`, a `HubStats` stat strip
(Articles/Images/Projects counts) followed by a grid of six `ManagerCard` links — Articles→`/articles`,
Recipes→`/recipes`, Images→`/images`, Audiences→`/groups`, UI Customization→`/ui`, Projects→`/projects`
— **all six of which the rail already carries** (the card labels even drift from the rail's:
"Audiences" vs "Groups", "UI Customization" vs "UI Manager"). This slice retires that grid and the
label drift with it. The Prism re-skin from `2026-07-15-manager-admin-hub-prism-design.md` stays — this
changes the page's *content and purpose*, not its Prism voice.

---

## Global Constraints

- Node 22; `npm run ci` (typecheck + lint + test) green before push; commit after each task.
- **No raw color literals** in components (lint-enforced `no-restricted-syntax`; exempt under
  `src/theme/**`, tests, stories). Reuse token-driven idioms: mono via
  `theme.tokens?.typography.mono ?? 'monospace'`; motion via `theme.tokens?.motion.*` with fallbacks;
  tinted fills via `alpha(theme.palette.<tone>.main, …)`.
- **Reuse existing primitives, add no new shared component.** `PrismThemeProvider`, `StatTile`,
  `SurfaceCard`, `layout/Button` — all already token-driven. New pieces (`QuickActions`,
  `RecentActivity` and its per-source lists) stay **page-local** to `StudioPage` (single consumer —
  YAGNI, matching the prior hub slice's `HubStats`/`ManagerCard` locality).
- **Server state via TanStack Query; API only through `src/api/*`.** No inline fetch, no mutations, no
  new endpoints — the dashboard is read-only. Reuse existing query keys so the dashboard shares cache
  with the manager pages (`['branches']`, `['images']`, `['projects']`, `['recipes']`).
- **Auth only through `useAuth()`.** Quick-create actions are role-gated to match the rail's `minRole`
  semantics (`isWriter`/`isSiteAdmin` from `@/auth/authHelpers`) — no new gating model.
- **Prism voice preserved.** The page stays `PrismThemeProvider`-dark under `AdminLayout` with the mono
  eyebrow/heading idiom. This is a content/IA change, not a re-theme.

---

## Architecture / Approach

`StudioPage` (the renamed `ManagerPage`) renders, top to bottom, inside `AdminLayout`:

### 1. Header
Mono eyebrow `CONTROL` (accent) + `Typography component="h1"` mono **Studio** — the exact
eyebrow/heading idiom already used by `ImageManagerPage`/`ArticleManagerPage`/the current hub.

### 2. Stats strip — `HubStats` (kept as-is)
The existing responsive row of three `StatTile`s — `ARTICLES` (`getBranches().length`), `IMAGES`
(`getImageMetadata().length`), `PROJECTS` (`getProjects().length`), each via `useQuery`, `—` while
loading, `0` on empty/error. No change; it already shares cache with the manager pages.

### 3. Quick actions — `QuickActions` (new, page-local)
A small row of primary **create-shortcuts** the rail structurally can't offer — the one launcher-ish
affordance worth keeping because it's an *action*, not a *destination duplicate*:

| Action | → route | Gate |
|---|---|---|
| New Article | `/articles/new` | `isWriter` |
| New Recipe | `/recipes/new` | `isWriter` |
| New Image | `/images` | `isWriter` |
| New Project | `/projects` | `isSiteAdmin` |

Rendered as `layout/Button`s (or `SurfaceCard interactive` action tiles) wrapped in
`component={Link}`. Each action is shown only when its gate passes, matching the rail's role filtering
(a writer sees the content-group actions; an admin sees all). If no action is visible the row is
omitted.

### 4. Recent activity — `RecentActivity` (new, page-local): **grouped mini-lists**
Three labeled sections, side by side on wide viewports (responsive CSS grid, stacking on mobile), each
a short reverse-chronological list (cap ~5 rows) built from a **single-call source that shares the
stat-strip cache** — no per-project fan-out, no new endpoint:

| Section | Source | Sort key | Row → link | Extra |
|---|---|---|---|---|
| **Recent Recipes** | `getRecipes()` | `Recipe.modified_at` | `/recipes/:slug/edit` | — |
| **Recent Images** | `getImageMetadata()` | `Image.created_at` | `/images` | thumbnail |
| **Recent Projects** | `getProjects()` | `Project.updated_at` | `/projects/:id/develop` | `status` badge (`idea`/`developing`/`executing`) |

Each section: mono section label, then rows (title + relative timestamp, e.g. "2h ago"). Loading shows
a few skeleton rows; empty shows a quiet "Nothing yet" line. Sorting is client-side on the one
timestamp field each source provides. Sections are independent `useQuery`s — one slow/failed source
doesn't block the others.

### Route & naming
- **Label → "Studio"** everywhere: the page heading and the rail's `navConfig` item (currently
  `Manager`). One-line change to `STUDIO_NAV_ITEMS` in `navConfig.tsx`.
- **Route stays `/manager`** to avoid redirect churn (the nav item's `to` is unchanged; only its
  `label` changes). Renaming the URL to `/studio` (with a `/manager` → `/studio` redirect) is an
  optional cosmetic follow-up, not part of this slice.
- The file/component may be renamed `ManagerPage` → `StudioPage` for clarity (route mapping in
  `App.tsx` updated), or kept as `ManagerPage` to minimize churn — implementer's call at plan time;
  the user-facing label is what matters.

---

## Testing

Co-located Vitest + Testing Library (jsdom); suite stays green (`npm run ci`). The page runs several
queries, so the test wrapper needs `QueryClientProvider` and the API modules `vi.mock`ed to resolve
fixed arrays (extends the existing `ManagerPage.test` pattern).

- **Stats strip** — keep the existing `StatTile` count assertions passing (proves the strip survived
  the repurpose).
- **Card grid removed** — assert the six old capability links (`/articles`, `/groups`, `/ui`, …) are
  **no longer rendered** as a card grid (the redundant launcher is gone). Update/replace the old
  href-preservation assertions accordingly.
- **Quick actions** — a writer sees the content create-actions (New Article/Recipe/Image) and not the
  admin-only ones; an admin sees all; each links to the correct `/…/new` route.
- **Recent activity** — each section renders its mocked rows in reverse-chronological order by the
  right timestamp field; a row links to the correct edit/detail route; the projects section shows the
  `status` badge; loading shows skeletons, empty shows the "Nothing yet" line; a failing source leaves
  the others rendered.
- **navConfig** — the Studio item's label is now `Studio` (update the existing label assertion);
  route/`aria-label` unchanged.
- **Story (render smoke)** — `StudioPage.stories.tsx` seeds the query caches with representative arrays
  and renders under `PrismThemeProvider` (dark), matching the prior slices' story-as-render-smoke.

---

## Non-Goals / Deferred (documented follow-ups, not built here)

- **Live workflow-runs feed row.** The best live-activity signal (`WorkflowRun.status`:
  `in_progress`/`awaiting_input`/`failed` + timestamps) has **no global endpoint** — runs are only
  exposed per-project (`getWorkflowRuns(projectId)`). A cross-project feed would need an N+1 fan-out
  over `getProjects()`. Deferred pending a **backend global activity/runs endpoint**, which is the
  right way to power this row. (Same applies to tasks/scores/notes, all per-project.)
- **True "recently edited articles" row.** `Article` carries only `created_at` — no `updated_at`. An
  accurate edit-recency row needs backend `Article.updated_at` (or walking `getBranches()` →
  `getBranchVersions()`, a per-branch fan-out). Deferred; recipes cover the "recently edited" pattern
  cleanly today.
- **URL rename `/manager` → `/studio`.** Cosmetic; optional later with a redirect.
- **Single merged activity stream.** Grouped mini-lists chosen over one interleaved feed (cleaner
  provenance, no cross-source timestamp-field merge). Revisit only if a real merged feed is wanted.
- **Any new API endpoint, mutation, or backend change.** The dashboard is read-only over existing
  list endpoints.
- **Re-theming.** The page stays Prism-dark; this is content/IA only.

---

## Sequencing

Separate slice, landing **after** the unified-nav-rail migration (which keeps Manager as a plain
Studio item). The rail migration does not depend on this and should not wait for it. This slice's only
coupling to the rail is the one-line `navConfig` label change (`Manager` → `Studio`).

---

## Decisions Resolved (during brainstorming)

1. **Fate of `/manager`:** repurpose into a Studio dashboard (not delete, not keep-as-is). *(user)*
2. **Dashboard scope:** full activity dashboard — stats + quick actions + recent-activity feed.
   *(user)*
3. **Activity feed sourcing:** cheap single-call sources now (recipes/images/projects); global
   activity/runs backend endpoint deferred as the follow-up for a live workflow-runs row. *(user)*
4. **Naming:** rename page + rail nav item to **Studio**; route stays `/manager`. *(user)*
5. **Feed layout:** grouped mini-lists (Recent Recipes / Images / Projects), not a merged stream.
   *(user)*
6. **Reuse:** no new shared component; page-local `QuickActions`/`RecentActivity` on existing
   `StatTile`/`SurfaceCard`/`layout/Button`. *(design — DRY/YAGNI)*
