# Studio Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Repurpose `/manager` from a redundant navigation launcher into the Studio landing dashboard — stats + role-gated quick-create actions + recent-activity mini-lists — now that the unified nav rail owns navigation.

**Architecture:** Evolve the existing `ManagerPage` in place. Delete the capability-card grid (100% duplicated by the rail), keep the live `HubStats` stat strip, and add two page-local sections below it: `QuickActions` (create shortcuts a rail link can't offer) and `RecentActivity` (three grouped mini-lists from single-call sources). Rename the page heading and the rail's nav item from "Manager" to "Studio". Route, filename, and default export stay `ManagerPage`/`/manager` to minimize churn.

**Tech Stack:** React 19 + TypeScript, MUI 9, TanStack Query (server state), React Router 7, Vitest + Testing Library (jsdom), Storybook.

## Global Constraints

- Node 22; `npm run ci` (typecheck + lint + test) green before push; commit after each task.
- **No raw color literals** in components (lint-enforced `no-restricted-syntax`; exempt under `src/theme/**`, tests, stories). Use `theme.palette.*` / `theme.tokens.*` / `alpha(...)`. Mono via `theme.tokens?.typography.mono ?? 'monospace'`; motion via `theme.tokens?.motion.*` with fallbacks.
- **Reuse existing primitives; add no new shared component.** New pieces (`QuickActions`, `RecentActivity`, `formatRelative`) stay page-local in `ManagerPage.tsx`, matching how `HubStats`/`ManagerCard` are defined there today.
- **Server state via TanStack Query; API only through `src/api/*`.** No inline fetch, no mutations, no new endpoints — read-only. Reuse query keys `['branches']`, `['images']`, `['projects']`, `['recipes']` so the dashboard shares cache with the manager pages (images/projects are already fetched by `HubStats`).
- **Auth only through `useAuth()`.** `useAuth()` returns `userProfile: AuthUserProfile | null`, which carries `realm_access?: { roles: string[] }`. Gate with `isWriter(userProfile)` / `isSiteAdmin(userProfile)` from `@/auth/authHelpers` — `isWriter` is true for admins too. In jsdom tests the host is `localhost`, so the roles are `localhost:writer` / `localhost:admin`.
- **Page stays Prism-dark** under `AdminLayout` (unchanged). This is a content/IA change, not a re-theme.
- **Preserve routes/contracts:** `/manager` route unchanged; the six *old* capability card links are intentionally removed (that removal is the point).

---

## File Structure

- **Modify** `src/components/layout/navConfig.tsx` — change the `Manager` item's `label` to `Studio` (route/`to` unchanged).
- **Modify** `src/components/layout/navConfig.test.tsx` — update the label assertion.
- **Modify** `src/pages/ManagerPage.tsx` — the main change: remove `CAPABILITIES`/`ManagerCard`/grid; set `title="Studio"`; add page-local `formatRelative`, `QuickActions`, `RecentActivity`; keep `HubStats`.
- **Modify** `src/pages/ManagerPage.test.tsx` — replace the six capability-link assertions with: card grid gone, quick actions role-gated, recent-activity rows/links/badge/loading/empty. Keep the stats-strip assertion.
- **Modify** `src/pages/ManagerPage.stories.tsx` — seed the `['recipes']` cache alongside the existing three so `RecentActivity` renders in the story.

---

### Task 1: Rename the nav item to "Studio"

**Files:**
- Modify: `src/components/layout/navConfig.tsx` (the `Manager` entry in `STUDIO_NAV_ITEMS`)
- Test: `src/components/layout/navConfig.test.tsx`

**Interfaces:**
- Consumes: `STUDIO_NAV_ITEMS: StudioNavItem[]`, `visibleStudioItems(user?)` (existing).
- Produces: the Studio nav item now has `label: 'Studio'`, `to: '/manager'` (unchanged route).

- [ ] **Step 1: Update the label assertion in the test first**

In `src/components/layout/navConfig.test.tsx`, find the assertion referencing the `'Manager'` label and change the expected label to `'Studio'`. If the test asserts by finding the item with `to === '/manager'`, add/adjust:

```ts
it('labels the /manager Studio item "Studio"', () => {
  const item = STUDIO_NAV_ITEMS.find((i) => i.to === '/manager');
  expect(item?.label).toBe('Studio');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/layout/navConfig.test.tsx`
Expected: FAIL — current label is `'Manager'`, expected `'Studio'`.

- [ ] **Step 3: Change the label in navConfig**

In `src/components/layout/navConfig.tsx`, change the first `STUDIO_NAV_ITEMS` entry:

```tsx
  { label: 'Studio', to: '/manager', icon: <SpaceDashboardIcon fontSize="small" />, group: 'content', minRole: 'writer' },
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/layout/navConfig.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/navConfig.tsx src/components/layout/navConfig.test.tsx
git commit -m "feat(nav): rename Manager nav item to Studio"
```

---

### Task 2: Gut the redundant launcher — Studio header + stats only

Remove the capability-card grid (all six links are already one-click in the rail) and rename the page heading. The page is left as header + `HubStats`; `QuickActions`/`RecentActivity` land in Tasks 3–4.

**Files:**
- Modify: `src/pages/ManagerPage.tsx`
- Test: `src/pages/ManagerPage.test.tsx`

**Interfaces:**
- Consumes: `AdminLayout` (`title`), `HubStats` (kept), `useAuth()` (`token`).
- Produces: `ManagerPage` renders `<AdminLayout title="Studio">` with `HubStats` and **no** capability grid.

- [ ] **Step 1: Rewrite the test to lock in the new shape**

Replace the whole body of `src/pages/ManagerPage.test.tsx` with this (drops the six card-link tests, adds a "grid gone" assertion, keeps the stats test). Note the mutable `mockAuth` so later tasks can vary roles:

```tsx
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ManagerPage from './ManagerPage';
import type { AuthContextValue } from '../auth/AuthProvider';

// Mutable auth value so individual tests can swap roles before rendering.
const mockAuth: AuthContextValue = {
  isAuthenticated: true,
  isLoading: false,
  token: 'test-token',
  userProfile: { firstName: 'Admin', realm_access: { roles: ['localhost:admin'] } },
  login: vi.fn(),
  logout: vi.fn(),
};
vi.mock('../auth/useAuth', () => ({ useAuth: () => mockAuth }));

vi.mock('../api/articles', () => ({
  getBranches: vi.fn().mockResolvedValue(new Array(12).fill({})),
}));
vi.mock('../api/images', () => ({
  getImageMetadata: vi.fn().mockResolvedValue(new Array(47).fill({})),
}));
vi.mock('../api/projects', () => ({
  getProjects: vi.fn().mockResolvedValue(new Array(5).fill({})),
}));
vi.mock('../api/recipes', () => ({
  getRecipes: vi.fn().mockResolvedValue([]),
}));

const theme = createTheme();

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

beforeEach(() => {
  mockAuth.userProfile = { firstName: 'Admin', realm_access: { roles: ['localhost:admin'] } };
});

describe('ManagerPage (Studio dashboard)', () => {
  it('no longer renders the capability-card launcher grid', () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    const links = screen.queryAllByRole('link');
    // The old grid linked these; they now live only in the rail.
    expect(links.find((el) => el.getAttribute('href') === '/groups')).toBeFalsy();
    expect(links.find((el) => el.getAttribute('href') === '/ui')).toBeFalsy();
    expect(screen.queryByText('UI Customization')).toBeNull();
    expect(screen.queryByText('Audiences')).toBeNull();
  });

  it('renders the live stats strip with fetched counts', async () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    expect(await screen.findByText('12')).toBeTruthy();
    expect(await screen.findByText('47')).toBeTruthy();
    expect(await screen.findByText('5')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/pages/ManagerPage.test.tsx`
Expected: FAIL — the grid still renders `/groups`, `/ui`, "Audiences", "UI Customization".

- [ ] **Step 3: Strip the grid and rename the heading**

In `src/pages/ManagerPage.tsx`: delete the `Capability` interface, the `CAPABILITIES` array, the `ManagerCard` component, and the unused imports (`Link`, `CardActionArea`, `SurfaceCard`, `alpha` — keep `useTheme` only if still used; after this task `HubStats` doesn't need it, so remove `useTheme` too if unused). Replace the page component with:

```tsx
const ManagerPage: React.FC = () => {
  const { token } = useAuth();

  return (
    <AdminLayout title="Studio">
      <Box id="primary-content">
        <Container>
          <HubStats token={token} />
        </Container>
      </Box>
    </AdminLayout>
  );
};

export default ManagerPage;
```

The file now imports only what `HubStats` + the shell need:

```tsx
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '../components/layout/AdminLayout';
import { StatTile } from '../components/common/StatTile';
import { useAuth } from '../auth/useAuth';
import { getBranches } from '../api/articles';
import { getImageMetadata } from '../api/images';
import { getProjects } from '../api/projects';
```

(Keep the existing `HubStats` component definition unchanged.)

- [ ] **Step 4: Run the test + lint/typecheck**

Run: `npx vitest run src/pages/ManagerPage.test.tsx && npm run lint && npm run typecheck`
Expected: test PASS; lint clean (no unused imports, no raw literals); typecheck clean.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ManagerPage.tsx src/pages/ManagerPage.test.tsx
git commit -m "feat(studio): drop redundant capability grid, rename hub to Studio"
```

---

### Task 3: Quick-create actions (role-gated)

Add a row of create shortcuts below the stats strip. Shown per-role: writer sees New Article / New Recipe / New Image; admin additionally sees New Project.

**Files:**
- Modify: `src/pages/ManagerPage.tsx`
- Test: `src/pages/ManagerPage.test.tsx`

**Interfaces:**
- Consumes: `useAuth()` (`userProfile`), `isWriter`/`isSiteAdmin` from `@/auth/authHelpers`.
- Produces: page-local `QuickActions` rendered below `HubStats`; each action is a `<Button component={Link} to=...>`.

- [ ] **Step 1: Write the failing tests**

Append to the `describe` block in `src/pages/ManagerPage.test.tsx`:

```tsx
  it('shows writer create-actions and hides admin-only ones for a writer', () => {
    mockAuth.userProfile = { firstName: 'Wanda', realm_access: { roles: ['localhost:writer'] } };
    render(<ManagerPage />, { wrapper: Wrapper });
    const links = screen.getAllByRole('link');
    expect(links.find((el) => el.getAttribute('href') === '/articles/new')).toBeTruthy();
    expect(links.find((el) => el.getAttribute('href') === '/recipes/new')).toBeTruthy();
    // New Project is admin-only.
    expect(screen.queryByText('New Project')).toBeNull();
  });

  it('shows every create-action for an admin', () => {
    mockAuth.userProfile = { firstName: 'Admin', realm_access: { roles: ['localhost:admin'] } };
    render(<ManagerPage />, { wrapper: Wrapper });
    expect(screen.getByText('New Article')).toBeTruthy();
    expect(screen.getByText('New Recipe')).toBeTruthy();
    expect(screen.getByText('New Image')).toBeTruthy();
    expect(screen.getByText('New Project')).toBeTruthy();
  });
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run src/pages/ManagerPage.test.tsx`
Expected: FAIL — "New Article" not found (component not added yet).

- [ ] **Step 3: Implement `QuickActions`**

In `src/pages/ManagerPage.tsx` add these imports:

```tsx
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { isSiteAdmin, isWriter } from '@/auth/authHelpers';
import type { AuthUserProfile } from '../auth/AuthProvider';
```

Add the action list + component (page-local, above the page component):

```tsx
// ── Quick actions ────────────────────────────────────────────────────────────
// Create-shortcuts the rail can't offer. `minRole` mirrors the Studio nav gating:
// content authoring is writer-level, project creation is admin-level.
interface QuickAction {
  label: string;
  to: string;
  minRole: 'writer' | 'admin';
}

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'New Article', to: '/articles/new', minRole: 'writer' },
  { label: 'New Recipe', to: '/recipes/new', minRole: 'writer' },
  { label: 'New Image', to: '/images', minRole: 'writer' },
  { label: 'New Project', to: '/projects', minRole: 'admin' },
];

const QuickActions: React.FC<{ user: AuthUserProfile | null }> = ({ user }) => {
  const writer = isWriter(user);
  const admin = isSiteAdmin(user);
  const visible = QUICK_ACTIONS.filter((a) => (a.minRole === 'writer' ? writer : admin));
  if (visible.length === 0) return null;

  return (
    <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
      {visible.map((action) => (
        <Button
          key={action.to}
          component={Link}
          to={action.to}
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
        >
          {action.label}
        </Button>
      ))}
    </Stack>
  );
};
```

Wire it into the page (pull `userProfile` from `useAuth`):

```tsx
const ManagerPage: React.FC = () => {
  const { token, userProfile } = useAuth();

  return (
    <AdminLayout title="Studio">
      <Box id="primary-content">
        <Container>
          <HubStats token={token} />
          <QuickActions user={userProfile} />
        </Container>
      </Box>
    </AdminLayout>
  );
};
```

- [ ] **Step 4: Run tests + lint + typecheck**

Run: `npx vitest run src/pages/ManagerPage.test.tsx && npm run lint && npm run typecheck`
Expected: all PASS/clean.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ManagerPage.tsx src/pages/ManagerPage.test.tsx
git commit -m "feat(studio): role-gated quick-create actions"
```

---

### Task 4: Recent-activity mini-lists + story

Add three grouped mini-lists below the quick actions: Recent Recipes / Recent Images / Recent Projects, each sorted by its own timestamp field, capped at 5, with loading skeletons and an empty state. Images and Projects reuse the `['images']`/`['projects']` cache the stat strip already fills; Recipes adds one `['recipes']` query.

**Files:**
- Modify: `src/pages/ManagerPage.tsx`
- Test: `src/pages/ManagerPage.test.tsx`
- Modify: `src/pages/ManagerPage.stories.tsx`

**Interfaces:**
- Consumes: `getRecipes` (`src/api/recipes`), `getImageMetadata`, `getProjects`; types `Recipe`, `Image`, `Project`.
- Produces: page-local `RecentActivity` + named export `formatRelative(iso: string): string`.

- [ ] **Step 1: Write the failing tests**

Add a fixtures block and tests to `src/pages/ManagerPage.test.tsx`. First, override the recipe/image/project mocks to return dated fixtures — replace the four `vi.mock` API blocks' resolved values so the lists have content and order. Update the mocks near the top:

```tsx
vi.mock('../api/images', () => ({
  getImageMetadata: vi.fn().mockResolvedValue([
    { name: 'old', title: 'Old Photo', created_at: '2026-07-01T00:00:00Z', versions: {} },
    { name: 'new', title: 'New Photo', created_at: '2026-07-19T00:00:00Z', versions: {} },
  ]),
}));
vi.mock('../api/projects', () => ({
  getProjects: vi.fn().mockResolvedValue([
    { id: 'p1', title: 'Alpha', status: 'developing', created_at: '2026-07-01T00:00:00Z', updated_at: '2026-07-18T00:00:00Z' },
  ]),
}));
vi.mock('../api/recipes', () => ({
  getRecipes: vi.fn().mockResolvedValue([
    { id: 'r1', recipe_url: 'soup', content: { title: 'Soup', sections: [] }, hostname: 'x', public_visibility: true, created_at: '2026-07-01T00:00:00Z', modified_at: '2026-07-17T00:00:00Z' },
  ]),
}));
```

The stats-strip test expects counts `47`/`5`; since the image/project mocks now return 2/1 items, update that test's expected counts to `2` (images) and `1` (projects), and drop the `47`/`5` assertions. Keep the `12` (branches) assertion.

Then add:

```tsx
  it('lists recent recipes/images/projects linking to their destinations', async () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    const soup = await screen.findByText('Soup');
    expect(soup.closest('a')?.getAttribute('href')).toBe('/recipes/soup/edit');
    const alpha = await screen.findByText('Alpha');
    expect(alpha.closest('a')?.getAttribute('href')).toBe('/projects/p1/develop');
    // Project status badge is shown.
    expect(screen.getByText('developing')).toBeTruthy();
  });

  it('orders images most-recent first', async () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    await screen.findByText('New Photo');
    const titles = screen.getAllByText(/Photo$/).map((el) => el.textContent);
    expect(titles.indexOf('New Photo')).toBeLessThan(titles.indexOf('Old Photo'));
  });
```

And a direct unit test for the formatter:

```tsx
import { formatRelative } from './ManagerPage';

describe('formatRelative', () => {
  it('renders day-granularity for older timestamps', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
    expect(formatRelative(threeDaysAgo)).toBe('3d ago');
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run src/pages/ManagerPage.test.tsx`
Expected: FAIL — `formatRelative` not exported / "Soup" not found.

- [ ] **Step 3: Implement `formatRelative` + `RecentActivity`**

In `src/pages/ManagerPage.tsx` add imports:

```tsx
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useTheme, alpha } from '@mui/material/styles';
import { getRecipes } from '../api/recipes';
import type { Recipe } from '../types/recipe';
import type { Image } from '../types/image';
import type { Project } from '../types/project';
```

Add the formatter (named export) and the section components (page-local):

```tsx
// Relative "3d ago" formatting. Mirrors the workflows-panel helper; kept local
// per the page-local convention (no shared util introduced here).
export function formatRelative(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  return `${diffD}d ago`;
}

interface ActivityRow {
  key: string;
  title: string;
  to: string;
  at: string;
  badge?: string;
}

function byDesc(a: string, b: string): number {
  return new Date(b).getTime() - new Date(a).getTime();
}

const ActivitySection: React.FC<{
  label: string;
  isLoading: boolean;
  rows: ActivityRow[];
}> = ({ label, isLoading, rows }) => {
  const theme = useTheme();
  const mono = theme.tokens?.typography.mono ?? 'monospace';

  return (
    <Box sx={{ flex: 1, minWidth: 220 }}>
      <Typography
        component="h2"
        sx={{ fontFamily: mono, fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'text.secondary', mb: 1 }}
      >
        {label}
      </Typography>
      {isLoading ? (
        <>
          <Skeleton height={28} />
          <Skeleton height={28} />
          <Skeleton height={28} />
        </>
      ) : rows.length === 0 ? (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Nothing yet
        </Typography>
      ) : (
        rows.map((row) => (
          <Box
            key={row.key}
            component={Link}
            to={row.to}
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: 1,
              py: 0.75,
              color: 'text.primary',
              textDecoration: 'none',
              borderBottom: 1,
              borderColor: (t) => alpha(t.palette.text.primary, 0.08),
              '&:hover': { color: 'primary.main' },
            }}
          >
            <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {row.title}
            </Box>
            <Box component="span" sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexShrink: 0 }}>
              {row.badge && (
                <Box
                  component="span"
                  sx={{ fontFamily: mono, fontSize: '0.62rem', textTransform: 'uppercase', px: 0.75, py: 0.25, borderRadius: 0.5, color: 'text.secondary', bgcolor: (t) => alpha(t.palette.text.primary, 0.08) }}
                >
                  {row.badge}
                </Box>
              )}
              <Box component="span" sx={{ fontFamily: mono, fontSize: '0.68rem', color: 'text.secondary' }}>
                {formatRelative(row.at)}
              </Box>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

const RecentActivity: React.FC<{ token: string | undefined }> = ({ token }) => {
  const recipes = useQuery({ queryKey: ['recipes'], queryFn: () => getRecipes({}, token) });
  const images = useQuery({ queryKey: ['images'], queryFn: () => getImageMetadata(token) });
  const projects = useQuery({ queryKey: ['projects'], queryFn: () => getProjects(token) });

  const recipeRows: ActivityRow[] = [...((recipes.data as Recipe[] | undefined) ?? [])]
    .sort((a, b) => byDesc(a.modified_at, b.modified_at))
    .slice(0, 5)
    .map((r) => ({ key: r.id, title: r.content.title, to: `/recipes/${r.recipe_url}/edit`, at: r.modified_at }));

  const imageRows: ActivityRow[] = [...((images.data as Image[] | undefined) ?? [])]
    .sort((a, b) => byDesc(a.created_at, b.created_at))
    .slice(0, 5)
    .map((img) => ({ key: img.name, title: img.title || img.name, to: '/images', at: img.created_at }));

  const projectRows: ActivityRow[] = [...((projects.data as Project[] | undefined) ?? [])]
    .sort((a, b) => byDesc(a.updated_at, b.updated_at))
    .slice(0, 5)
    .map((p) => ({ key: p.id, title: p.title, to: `/projects/${p.id}/develop`, at: p.updated_at, badge: p.status }));

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      <ActivitySection label="Recent Recipes" isLoading={recipes.isLoading} rows={recipeRows} />
      <ActivitySection label="Recent Images" isLoading={images.isLoading} rows={imageRows} />
      <ActivitySection label="Recent Projects" isLoading={projects.isLoading} rows={projectRows} />
    </Box>
  );
};
```

Wire it into the page below `QuickActions`:

```tsx
          <HubStats token={token} />
          <QuickActions user={userProfile} />
          <RecentActivity token={token} />
```

- [ ] **Step 4: Run tests + lint + typecheck**

Run: `npx vitest run src/pages/ManagerPage.test.tsx && npm run lint && npm run typecheck`
Expected: all PASS/clean.

- [ ] **Step 5: Seed the recipes cache in the story**

In `src/pages/ManagerPage.stories.tsx`, update the `title` to `'Pages/StudioPage'` and add a recipes entry to `makeClient()` so `RecentActivity` renders:

```tsx
  client.setQueryData(['recipes'], [
    { id: 'r1', recipe_url: 'soup', content: { title: 'Weeknight Soup', sections: [] }, hostname: 'x', public_visibility: true, created_at: '2026-07-01T00:00:00Z', modified_at: '2026-07-17T00:00:00Z' },
  ]);
```

- [ ] **Step 6: Run the full gate**

Run: `npm run ci`
Expected: typecheck + lint + full unit suite green.

- [ ] **Step 7: Commit**

```bash
git add src/pages/ManagerPage.tsx src/pages/ManagerPage.test.tsx src/pages/ManagerPage.stories.tsx
git commit -m "feat(studio): recent-activity mini-lists (recipes/images/projects)"
```

---

## Self-Review

**Spec coverage:**
- Delete card grid → Task 2. ✅
- Keep stats strip → Task 2 (HubStats retained). ✅
- Quick-create actions, role-gated → Task 3. ✅
- Recent-activity grouped mini-lists (recipes `modified_at` / images `created_at` / projects `updated_at`+status) → Task 4. ✅
- Rename page + rail item to "Studio", route stays `/manager` → Task 1 (nav) + Task 2 (heading). ✅
- No new shared component; page-local; reuse StatTile/existing primitives → Tasks 3–4 (page-local). ✅
- Read-only, existing query keys, shared cache → Task 4 (images/projects reuse `['images']`/`['projects']`). ✅
- Deferred (live workflow-runs row, article edit-recency, `/studio` URL rename, merged stream) → not built, per spec Non-Goals. ✅

**Placeholder scan:** No TBD/TODO; every code step shows complete code. ✅

**Type consistency:** `QuickActions` takes `user: AuthUserProfile | null` and calls `isWriter`/`isSiteAdmin` (accept `WithRoles | null`, which `AuthUserProfile` satisfies via `realm_access`). `RecentActivity` uses `Recipe.content.title`/`recipe_url`/`modified_at`, `Image.name`/`title`/`created_at`/`versions`, `Project.id`/`title`/`status`/`updated_at` — all verified against `src/types/*`. `formatRelative` signature matches its import in the test. ✅

**Note for implementer:** Tasks 2–4 all edit `src/pages/ManagerPage.tsx` and `ManagerPage.test.tsx`, so run them in order (Task 4's mock fixtures supersede Task 2's array-length mocks; the stats-count assertions are updated in Task 4 Step 1 accordingly).
