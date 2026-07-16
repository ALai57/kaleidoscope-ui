# Nav Migration Follow-up: retire NavBar (garden front-page part 2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the remaining 15 pages off the public top `NavBar` — admin/writer tools onto the existing `AdminLayout` (rail + top bar), the two public pages onto `AppShell`/`SideRail` — then delete `NavBar`.

**Architecture:** Two shells already exist and are both `NavBar`-free: `AppShell` (public `SideRail`, from the first plan) and `AdminLayout` (`AdminNavRail` + `AdminTopBar`, used by 4 admin pages today). This plan routes every remaining page through the correct shell, extracts the shared `NavBarUser` type out of `NavBar` so `NavBar` can be deleted, and deletes it. After this, no page renders `NavBar`.

**Tech Stack:** React 19 + TypeScript, Vite, MUI 9 (styling via `theme.tokens`), React Router 7, TanStack Query, Vitest + Testing Library.

## Global Constraints

- TypeScript throughout; keep each page's existing import style (most use relative imports — do not churn them to `@/`).
- Style via `theme.tokens` with bare-MUI fallbacks; no hardcoded hex.
- Auth via `useAuth()`; role checks only via `@/auth/authHelpers`.
- Server state via TanStack Query — do not change any data fetching.
- Accessibility: preserve `id="primary-content"` where a page currently has it (put it on the content root passed as `AdminLayout` children); admin shell is `AdminNavRail`'s nav landmark; public shell is `SideRail`'s `<nav aria-label="Primary">`.
- Per task: run the affected page's co-located test (if one exists), `npm run typecheck`, and `npx eslint <changed files>` — all clean before commit. Update any test assertion that referenced `NavBar`-owned content (e.g. the "KALEIDOSCOPE" wordmark) rather than deleting coverage.
- `NavBar.tsx` must remain until Task 6 (pages are migrated first); do not delete it early.
- Run `npm run ci` before the final commit.

---

## File Structure

**Create:**
- `src/components/layout/navTypes.ts` — the shared `NavBarUser` type, extracted from `NavBar.tsx`.

**Modify (repoint type import):** `NavBar.tsx`, `SideRail.tsx`, `AdminNavRail.tsx`, `AdminLayout.tsx`.

**Modify (public → AppShell):** `src/App.tsx` (move 2 routes into the AppShell group); `AboutThisSitePage.tsx`, `SignUpPage.tsx` (remove NavBar).

**Modify (admin → AdminLayout):** `ArticleManagerPage.tsx`, `ArticleEditorPage.tsx`, `RecipeEditorPage.tsx`, `AdminPage.tsx`, `ImageManagerPage.tsx`, `GroupsPage.tsx`, `ManagerPage.tsx`, `UIManagerPage.tsx`, `WorkflowEditorPage.tsx`, `projects/ProjectDetailPage.tsx`, `projects/ProjectDevelopPage.tsx`, `projects/ProjectSkillsPage.tsx`, `projects/ScoreDefinitionsPage.tsx`.

**Delete (Task 6):** `NavBar.tsx`, `NavBar.test.tsx`, `NavBar.stories.tsx`.

---

## Admin migration recipe (used by Tasks 3–5)

Every admin page today looks roughly like:

```tsx
return (
  <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
    <PrismThemeProvider>
      <Box id="primary-content" sx={{ flex: 1, bgcolor: 'background.default', p: 3 }}>
        <Box /* hand-rolled mono eyebrow, e.g. "ARTICLES" */ >…</Box>
        {content}
      </Box>
    </PrismThemeProvider>
  </Box>
);
```

Convert it to:

```tsx
return (
  <AdminLayout
    title="<Title>"
    user={user}
    isAuthenticated={isAuthenticated}
    login={login}
    actions={/* hoisted header buttons, or omit the prop entirely */}
  >
    <Box id="primary-content">
      {content}
    </Box>
  </AdminLayout>
);
```

Rules for each page:
1. Import `AdminLayout` (`../components/layout/AdminLayout` for top-level pages, `../../components/layout/AdminLayout` for `projects/*`).
2. Remove the `<NavBar>` element and its import. Remove `logout` from the `useAuth()` destructure if it becomes unused (`AdminLayout` takes `login` only). Keep the `user` mapping (`userProfile → { firstName, lastName, realm_access }`).
3. Remove the page's own `<PrismThemeProvider>` wrapper and its import **if** it was only wrapping this content (`AdminLayout` already provides one). If the page uses `PrismThemeProvider` for something else, leave that usage.
4. Remove the hand-rolled eyebrow/title header row (its text becomes the `AdminTopBar` `title`). Use that eyebrow's text as the `title` when it differs from the suggested title below.
5. Hoist any page-level header action buttons (a "New…", "Publish", export, or toggle cluster that sat in a header row alongside the old title) into `actions={<>…</>}`. If the page has no such header actions, omit the `actions` prop. Do not invent actions.
6. `AdminLayout`'s `<main>` already applies `p: 3`; drop the old content wrapper's `p: 3`/`flex/bgcolor` layout props so padding isn't doubled. Keep the inner content markup unchanged otherwise.
7. Preserve `id="primary-content"` if the page had it — put it on the single content root you pass as `AdminLayout` children.
8. Verify with the page's co-located test (if any) + `npm run typecheck` + `npx eslint <file>`.

Per-page parameters:

| Page | Route(s) | Suggested `title` | Notes |
|---|---|---|---|
| `ArticleManagerPage` | `/articles` | Articles | eyebrow "ARTICLES"; has a Table; hoist any "New article"/publish controls if present |
| `ArticleEditorPage` | `/articles/new`, `/articles/:slug/edit` | Article Editor | editor page; hoist save/publish header buttons into `actions` |
| `RecipeEditorPage` | `/recipes/new`, `/recipes/:slug/edit` | Recipe Editor | note it passes `user={userProfile ?? undefined}` today — keep the mapped `user` |
| `AdminPage` | `/admin` | Admin | landing for the logged-in avatar; has `id="primary-content"` |
| `ImageManagerPage` | `/images` | Images | image grid; hoist upload control if in a header row |
| `GroupsPage` | `/groups` | Groups | has `id="primary-content"` |
| `ManagerPage` | `/manager` | Manager | has `id="primary-content"` |
| `UIManagerPage` | `/ui` | UI Manager | theme/preset workbench |
| `WorkflowEditorPage` | `/workflows/new`, `/workflows/:id` | Workflow Editor | hoist save/run header buttons if present |
| `ProjectDetailPage` | (rendered under `/projects/:id/*`? confirm route) | Project | `projects/*` → import path `../../…` |
| `ProjectDevelopPage` | `/projects/:id/develop` | Develop | `../../…` import |
| `ProjectSkillsPage` | `/projects/:id/skills` | Skills | `../../…` import |
| `ScoreDefinitionsPage` | `/score-definitions` | Score Definitions | `../../…` import |

> If a page's real structure doesn't match the recipe skeleton (e.g. no eyebrow, or `NavBar` nested unusually), adapt sensibly per the rules above; if a page can't be migrated without a judgment call the recipe doesn't cover, STOP and report BLOCKED with specifics rather than guessing.

---

## Task 1: Extract `NavBarUser` into `navTypes.ts`

**Files:**
- Create: `src/components/layout/navTypes.ts`
- Modify: `src/components/layout/NavBar.tsx`, `SideRail.tsx`, `AdminNavRail.tsx`, `AdminLayout.tsx`

**Interfaces:**
- Produces: `export interface NavBarUser { firstName?: string; lastName?: string; realm_access?: { roles: string[] } }` from `@/components/layout/navTypes`.

- [ ] **Step 1: Create the type module**

```ts
// src/components/layout/navTypes.ts
/**
 * Shared user shape for the app's navigation shells (SideRail, AdminNavRail,
 * AdminLayout). Extracted from the legacy NavBar so that component can be
 * deleted while consumers keep a stable import.
 */
export interface NavBarUser {
  firstName?: string | undefined;
  lastName?: string | undefined;
  realm_access?: { roles: string[] } | undefined;
}
```

- [ ] **Step 2: Repoint `NavBar.tsx`** — delete its local `NavBarUser` interface declaration and instead `import type { NavBarUser } from './navTypes';` (keep `export type { NavBarUser }` there is NOT needed — consumers move to navTypes in the next step). Its `NavBarProps` keeps using `NavBarUser`.

- [ ] **Step 3: Repoint the three consumers** — in `SideRail.tsx`, `AdminNavRail.tsx`, and `AdminLayout.tsx`, change `import type { NavBarUser } from './NavBar';` to `import type { NavBarUser } from './navTypes';`. No other change.

- [ ] **Step 4: Verify (type-only change — typecheck + existing suites are the test)**

Run: `npm run typecheck`
Expected: PASS.
Run: `npm test -- src/components/layout/SideRail.test.tsx src/components/layout/AdminLayout.test.tsx src/components/layout/AdminNavRail.test.tsx src/components/layout/NavBar.test.tsx`
Expected: PASS (all existing nav tests still green).
Run: `npx eslint src/components/layout/navTypes.ts src/components/layout/NavBar.tsx src/components/layout/SideRail.tsx src/components/layout/AdminNavRail.tsx src/components/layout/AdminLayout.tsx`
Expected: 0 problems.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/navTypes.ts src/components/layout/NavBar.tsx src/components/layout/SideRail.tsx src/components/layout/AdminNavRail.tsx src/components/layout/AdminLayout.tsx
git commit -m "refactor(layout): extract NavBarUser into navTypes so NavBar can be retired"
```

---

## Task 2: Public pages (About-this-site, Sign-up) → AppShell

**Files:**
- Modify: `src/App.tsx` (move 2 routes into the AppShell group)
- Modify: `src/pages/AboutThisSitePage.tsx`, `src/pages/SignUpPage.tsx`
- Modify (if they assert NavBar content): `src/pages/AboutThisSitePage.test.tsx`, `src/pages/SignUpPage.test.tsx`, `SignUpPage.extra.test.tsx`

- [ ] **Step 1: Move the two routes under `AppShell` in `src/App.tsx`.** In the existing `{ element: <AppShell />, children: [...] }` garden group, add:

```tsx
          { path: '/about-this-site', element: <AboutThisSitePage /> },
          { path: '/sign-up', element: <SignUpPage /> },
```

and remove those same two entries from the legacy (flat) group.

- [ ] **Step 2: Remove `<NavBar>` from both pages.** In `AboutThisSitePage.tsx` and `SignUpPage.tsx`: delete the `<NavBar .../>` element and its import; remove now-unused `login`/`logout`/`user`/`isAuthenticated` from the `useAuth()` destructure and the `user` mapping if they become unused (typecheck is the guard). Keep each page's own `Footer` and content. (These pages get the `SideRail` from `AppShell`; they should NOT also render a `PrismThemeProvider` wrapper unless they already used one for their own content — leave unrelated usage alone.)

- [ ] **Step 3: Run the affected tests**

Run: `npm test -- src/pages/AboutThisSitePage.test.tsx src/pages/SignUpPage.test.tsx src/pages/SignUpPage.extra.test.tsx`
Expected: PASS. If a test asserted the "KALEIDOSCOPE" wordmark or a NavBar link the page no longer owns, retarget that assertion (report which).

- [ ] **Step 4: Typecheck + lint**

Run: `npm run typecheck` (clean) and `npx eslint src/App.tsx src/pages/AboutThisSitePage.tsx src/pages/SignUpPage.tsx` (0 problems).

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/pages/AboutThisSitePage.tsx src/pages/SignUpPage.tsx src/pages/AboutThisSitePage.test.tsx src/pages/SignUpPage.test.tsx src/pages/SignUpPage.extra.test.tsx
git commit -m "feat(nav): route About-this-site + Sign-up through AppShell/SideRail"
```

---

## Task 3: Admin cluster — content/writer tools → AdminLayout

**Files:** `src/pages/ArticleManagerPage.tsx`, `src/pages/ArticleEditorPage.tsx`, `src/pages/RecipeEditorPage.tsx` (+ their co-located tests if any assert NavBar).

Apply the **Admin migration recipe** (above) to each, using the per-page parameters table. Titles: `Articles`, `Article Editor`, `Recipe Editor`.

- [ ] **Step 1: Migrate `ArticleManagerPage.tsx`** per the recipe (title `Articles`; remove the "ARTICLES" eyebrow; preserve `id="primary-content"`; hoist any header action buttons; drop `PrismThemeProvider` wrapper + doubled `p:3`).
- [ ] **Step 2: Migrate `ArticleEditorPage.tsx`** per the recipe (title `Article Editor`; hoist save/publish header buttons into `actions`).
- [ ] **Step 3: Migrate `RecipeEditorPage.tsx`** per the recipe (title `Recipe Editor`; it passes `user={userProfile ?? undefined}` today — keep the mapped `user`).
- [ ] **Step 4: Verify**

Run: `npm test -- src/pages/ArticleManagerPage.test.tsx src/pages/ArticleEditorPage.test.tsx src/pages/ArticleEditorPage.extra.test.tsx src/pages/RecipeEditorPage.test.tsx` (skip any path that doesn't exist). Retarget NavBar-owned assertions as needed.
Run: `npm run typecheck` (clean) and `npx eslint` on the 3 changed pages (0 problems).

- [ ] **Step 5: Commit**

```bash
git add src/pages/ArticleManagerPage.tsx src/pages/ArticleEditorPage.tsx src/pages/RecipeEditorPage.tsx src/pages/ArticleManagerPage.test.tsx src/pages/ArticleEditorPage.test.tsx src/pages/ArticleEditorPage.extra.test.tsx src/pages/RecipeEditorPage.test.tsx
git commit -m "feat(nav): move content/writer tool pages onto AdminLayout"
```

---

## Task 4: Admin cluster — admin surfaces → AdminLayout

**Files:** `src/pages/AdminPage.tsx`, `src/pages/ImageManagerPage.tsx`, `src/pages/GroupsPage.tsx`, `src/pages/ManagerPage.tsx`, `src/pages/UIManagerPage.tsx` (+ their co-located tests).

Apply the **Admin migration recipe** to each. Titles: `Admin`, `Images`, `Groups`, `Manager`, `UI Manager`. `AdminPage`, `GroupsPage`, `ManagerPage` have `id="primary-content"` — preserve it on the content root.

- [ ] **Step 1: Migrate `AdminPage.tsx`** (title `Admin`; preserve `id="primary-content"`).
- [ ] **Step 2: Migrate `ImageManagerPage.tsx`** (title `Images`; hoist upload/header controls into `actions` if present).
- [ ] **Step 3: Migrate `GroupsPage.tsx`** (title `Groups`; preserve `id="primary-content"`).
- [ ] **Step 4: Migrate `ManagerPage.tsx`** (title `Manager`; preserve `id="primary-content"`).
- [ ] **Step 5: Migrate `UIManagerPage.tsx`** (title `UI Manager`).
- [ ] **Step 6: Verify**

Run: `npm test -- src/pages/AdminPage.test.tsx src/pages/ImageManagerPage.test.tsx src/pages/GroupsPage.test.tsx src/pages/GroupsPage.extra.test.tsx src/pages/ManagerPage.test.tsx src/pages/UIManagerPage.test.tsx` (skip missing). Retarget NavBar-owned assertions.
Run: `npm run typecheck` (clean) and `npx eslint` on the 5 changed pages (0 problems).

- [ ] **Step 7: Commit**

```bash
git add src/pages/AdminPage.tsx src/pages/ImageManagerPage.tsx src/pages/GroupsPage.tsx src/pages/ManagerPage.tsx src/pages/UIManagerPage.tsx src/pages/AdminPage.test.tsx src/pages/ImageManagerPage.test.tsx src/pages/GroupsPage.test.tsx src/pages/GroupsPage.extra.test.tsx src/pages/ManagerPage.test.tsx src/pages/UIManagerPage.test.tsx
git commit -m "feat(nav): move admin surface pages onto AdminLayout"
```

---

## Task 5: Admin cluster — project/workflow tools → AdminLayout

**Files:** `src/pages/WorkflowEditorPage.tsx`, `src/pages/projects/ProjectDetailPage.tsx`, `src/pages/projects/ProjectDevelopPage.tsx`, `src/pages/projects/ProjectSkillsPage.tsx`, `src/pages/projects/ScoreDefinitionsPage.tsx` (+ any co-located tests).

Apply the **Admin migration recipe**. `projects/*` pages import `AdminLayout` from `../../components/layout/AdminLayout`. Titles: `Workflow Editor`, `Project`, `Develop`, `Skills`, `Score Definitions`.

> Note on `ProjectDetailPage`: confirm how it is routed/rendered (it may be rendered inside another project route rather than a top-level path). Migrate its own `NavBar` render the same way; if it is a nested view that shouldn't own a full shell, STOP and report BLOCKED with what you found.

- [ ] **Step 1: Migrate `WorkflowEditorPage.tsx`** (title `Workflow Editor`; hoist save/run header buttons into `actions`).
- [ ] **Step 2: Migrate `projects/ProjectDevelopPage.tsx`** (title `Develop`; `../../` import).
- [ ] **Step 3: Migrate `projects/ProjectSkillsPage.tsx`** (title `Skills`; `../../` import).
- [ ] **Step 4: Migrate `projects/ScoreDefinitionsPage.tsx`** (title `Score Definitions`; `../../` import).
- [ ] **Step 5: Migrate `projects/ProjectDetailPage.tsx`** (title `Project`; `../../` import; heed the routing note above).
- [ ] **Step 6: Verify**

Run: `npm test -- src/pages/projects` (runs any project-page tests) and any `WorkflowEditorPage.test.tsx` if it exists. Retarget NavBar-owned assertions.
Run: `npm run typecheck` (clean) and `npx eslint` on the 5 changed pages (0 problems).

- [ ] **Step 7: Commit**

```bash
git add src/pages/WorkflowEditorPage.tsx src/pages/projects/ProjectDetailPage.tsx src/pages/projects/ProjectDevelopPage.tsx src/pages/projects/ProjectSkillsPage.tsx src/pages/projects/ScoreDefinitionsPage.tsx
git commit -m "feat(nav): move project/workflow tool pages onto AdminLayout"
```

---

## Task 6: Delete `NavBar` + full verification

**Files:** delete `src/components/layout/NavBar.tsx`, `src/components/layout/NavBar.test.tsx`, `src/components/layout/NavBar.stories.tsx`.

- [ ] **Step 1: Confirm nothing references `NavBar` anymore**

Run: `grep -rn "layout/NavBar\|from './NavBar'\|from '../NavBar'\|<NavBar" src --include="*.tsx" | grep -v "navTypes"`
Expected: NO matches (the only nav-type imports now point at `navTypes`). If anything remains, migrate/repoint it before deleting.

- [ ] **Step 2: Delete the files**

```bash
git rm src/components/layout/NavBar.tsx src/components/layout/NavBar.test.tsx src/components/layout/NavBar.stories.tsx
```

- [ ] **Step 3: Full CI**

Run: `npm run ci`
Expected: typecheck + lint + test all PASS. Fix any fallout (an orphaned import, a story referencing NavBar, a test importing it).

- [ ] **Step 4: Production build**

Run: `npm run build`
Expected: builds clean.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore(layout): delete retired NavBar (migrated to SideRail + AdminLayout)"
```

- [ ] **Step 6: Manual smoke (human)**

`npm run dev` and spot-check: a public page (`/about-this-site`) shows the SideRail; an admin page (`/articles`, `/admin`, `/images`, a project page) shows the AdminNavRail + top-bar title and NO leftover top NavBar; the landing hero and garden pages are unchanged.

---

## Self-Review notes

- Spec coverage: retires `NavBar` for all 15 remaining pages (Tasks 2–5), extracts the shared type so deletion is clean (Task 1), deletes `NavBar` + verifies (Task 6). Two-shell split per the confirmed decision: admin/writer tools → `AdminLayout` (Tasks 3–5), public About-this-site + Sign-up → `AppShell`/`SideRail` (Task 2).
- The admin migration is recipe-driven because the 13 pages have varied bespoke headers; the recipe + per-page parameter table make each conversion concrete, and implementers read each page. The recipe is stated once and referenced by Tasks 3–5 (each task's brief must be read alongside this recipe section).
- Type consistency: `NavBarUser` moves to `navTypes.ts` (Task 1) and every consumer (`SideRail`, `AdminNavRail`, `AdminLayout`) repoints there; `NavBar` imports it too until deleted in Task 6.
- Risk notes carried as explicit BLOCK-if-unsure points: `ProjectDetailPage` routing/nesting; any page whose structure doesn't match the recipe skeleton.
