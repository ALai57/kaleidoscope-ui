# Mobile Responsiveness — Phase 3 Implementation Plan (Admin / CMS)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the admin/CMS shell usable on a phone — replace the icon-only nav rail with a labeled drawer below `md`, and fix the two admin surfaces that actually overflow (ProjectsPage's fixed split + hardcoded graph, and the editor/form rows with fixed `minWidth`).

**Architecture:** Admin is desktop-first and lower-priority; this phase does the high-value, testable subset. `AdminLayout` follows the Phase 1 `AppShell` pattern — `useIsMobile()` branches between the desktop rail+topbar and a mobile top-bar-with-hamburger + slide-in drawer built from the shared `ADMIN_NAV_ITEMS`. ProjectsPage forces list view (hiding the 1140px graph) and stacks the split view on mobile. Small form rows get responsive `Stack direction`.

**Tech Stack:** React 19 + TS, MUI 9 (+ `@mui/x-data-grid`), Emotion `sx`, React Router 7, Vitest + Testing Library, Playwright. Prism tokens.

## Global Constraints

- **Node 22**; `npm ci`.
- **Mobile/desktop switch is `md` (900px)** via `useIsMobile()` (`@/hooks/useIsMobile`, from Phase 1). No new breakpoint token.
- **No hardcoded hex in components** — colors via `theme.palette` / `theme.tokens` (lint flags raw hex/`rgba()`); scrims use `alpha(theme.palette.common.black, …)` (the repo pattern).
- **One source of truth for admin destinations:** `ADMIN_NAV_ITEMS` (`AdminNavRail.tsx`) — the drawer reuses it, never a duplicate list.
- **A11y:** the drawer is a labeled `role="dialog"`, closeable by `Esc` and scrim, focuses on open, closes on link click; the background is `inert` while it's open; interactive targets ≥ **44px**; active destination carries `aria-current="page"`.
- Tests co-located. Run `npm run ci` before pushing.
- **Base branch:** builds on `feat/mobile-responsiveness` (Phases 0–2).

## Prior audit (grounds this plan)

- **Admin shell** (`AdminLayout` → `AdminNavRail` + `AdminTopBar`) is an always-on flex row. `AdminNavRail` *shrinks* to a 64px icon-only rail below `md` (`width: { xs: 64, md: 216 }`) but never becomes touch-usable — labels are hidden and only a hover `Tooltip` carries them (useless on touch). It never hides; there's no drawer. `ADMIN_NAV_ITEMS` (label/to/icon/group) is the shared nav source. `AdminTopBar` has a title + right-aligned `actions` (already `flexWrap`); no menu-button slot yet.
- **ProjectsPage** (`src/pages/projects/ProjectsPage.tsx`) is the real overflow page: split view puts a **fixed 280px** sidebar next to a `flex` editor (`gap: 3`), and graph view renders `<ProjectGraph … width={1140} height={600} />` — guaranteed overflow on a phone. List view (default) already uses responsive `Grid size={{ xs:12, sm:6, md:4 }}`.
- **Editor/form rows with fixed `minWidth`:** `ArticleEditorPage` — a `TextField sx={{ minWidth: 300 }}` (new-article title) and a `FormControl sx={{ minWidth: 200 }}` (branch selector), each in a non-wrapping `Stack direction="row"`. `RecipeEditorPage` — a 3-`TextField` `Stack direction="row"` (Servings/Prep/Cook), un-`fullWidth`.
- **ArticleManager DataGrid** (`ArticleManagerPage` via `src/components/layout/Table.tsx`) has ~940px of intrinsic column width. `DataGrid` scrolls internally so it doesn't blow out `body`, but the wrapping `Box` has no explicit `overflowX` guard.
- **Already fine (no work):** `RichTextEditor`/`EditorToolbar` (media-safe, toolbar wraps), `WorkflowsPage`, `WorkflowEditorPage`, `AgentTeamPage` body, `ManagerPage`, `AdminPage`, `UIManagerPage`, `GroupsPage`, `ProjectDevelopPage`, `ScoreDefinitionsPage`, `WorkspaceRootsPage`, `ImageManagerPage`/`ImageBrowser` (already has its own mobile split).
- **Out of scope (documented, follow-up):** a full DataGrid → card view for `ArticleManager`; normalizing `ImageBrowser`'s `down('sm')` to `useIsMobile()`; `AgentTeamPage`'s emoji-picker grid (8 cols → cramped-but-usable in a `sm` dialog). None overflow the page body.

---

## File Structure

**Create**
- `src/components/layout/AdminMobileDrawer.tsx` — slide-in admin nav drawer from `ADMIN_NAV_ITEMS`. (Task 1)
- `src/components/layout/AdminMobileDrawer.test.tsx` — drawer tests. (Task 1)

**Modify**
- `src/components/layout/AdminTopBar.tsx` — optional `onMenuClick` → hamburger button. (Task 1)
- `src/components/layout/AdminTopBar.test.tsx` — hamburger tests. (Task 1)
- `src/components/layout/AdminLayout.tsx` — branch to the mobile shell below `md`. (Task 1)
- `src/components/layout/AdminLayout.test.tsx` — mobile-branch test. (Task 1)
- `src/pages/projects/ProjectsPage.tsx` — force list view + hide graph toggle + stack split on mobile. (Task 2)
- `src/pages/ArticleEditorPage.tsx` — two `Stack` rows stack on mobile. (Task 3)
- `src/pages/RecipeEditorPage.tsx` — Servings/Prep/Cook row stacks on mobile. (Task 3)
- `src/components/layout/Table.tsx` — contain the DataGrid's horizontal scroll. (Task 3)
- `e2e/mobile-overflow.spec.ts` — add admin shell routes. (Task 4)

---

## Task 1: Admin mobile nav shell (hamburger + drawer)

Below `md`, `AdminLayout` drops the persistent rail and renders a top bar with a hamburger that opens a labeled slide-in drawer built from `ADMIN_NAV_ITEMS`. Desktop is unchanged. This fixes the shell for **every** admin page at once.

**Files:**
- Create: `src/components/layout/AdminMobileDrawer.tsx`, `…AdminMobileDrawer.test.tsx`
- Modify: `src/components/layout/AdminTopBar.tsx`, `…AdminTopBar.test.tsx`, `AdminLayout.tsx`, `AdminLayout.test.tsx`

**Interfaces:**
- Consumes: `ADMIN_NAV_ITEMS`, `AdminNavItem` (`./AdminNavRail`); `useIsMobile` (`@/hooks/useIsMobile`); `NavBarUser` (`./navTypes`); `KaleidoscopeMark` (`./KaleidoscopeMark`).
- Produces: `AdminTopBarProps` gains `onMenuClick?: () => void`; `AdminMobileDrawer: React.FC<AdminMobileDrawerProps>` where `AdminMobileDrawerProps = { open: boolean; onClose: () => void; items?: AdminNavItem[]; user?: NavBarUser; isAuthenticated?: boolean; login?: () => void }`.

- [ ] **Step 1: Write the failing AdminTopBar test** — in `src/components/layout/AdminTopBar.test.tsx` (the file already defines a `Wrapper` that renders under `ThemeProvider theme={makeTheme(BASE_THEME, 'prism')}`).

Extend the imports:
- `import { describe, it, expect } from 'vitest';` → `import { describe, it, expect, vi } from 'vitest';`
- `import { render, screen } from '@testing-library/react';` → `import { render, screen, fireEvent } from '@testing-library/react';`

Add these tests inside `describe('AdminTopBar', …)`:
```tsx
  it('renders a menu button that fires onMenuClick when provided', () => {
    const onMenuClick = vi.fn();
    render(<AdminTopBar title="Manager" onMenuClick={onMenuClick} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(onMenuClick).toHaveBeenCalledTimes(1);
  });

  it('renders no menu button when onMenuClick is omitted', () => {
    render(<AdminTopBar title="Manager" />, { wrapper: Wrapper });
    expect(screen.queryByRole('button', { name: /open menu/i })).toBeNull();
  });
```

- [ ] **Step 2: Run it, confirm the menu-button test fails**

Run: `npm test -- src/components/layout/AdminTopBar.test.tsx`
Expected: FAIL — no menu button exists yet.

- [ ] **Step 3: Add the hamburger to `AdminTopBar.tsx`**

Add the import:
```tsx
import MenuIcon from '@mui/icons-material/Menu';
```
Extend the props:
```tsx
export interface AdminTopBarProps {
  /** The current section title, rendered in the heading voice. */
  title: string;
  /** Right-aligned page actions (buttons, toggles, …). */
  actions?: React.ReactNode;
  /** When set, a hamburger button appears left of the title (mobile shell). */
  onMenuClick?: (() => void) | undefined;
}
```
Destructure it: `export const AdminTopBar: React.FC<AdminTopBarProps> = ({ title, actions, onMenuClick }) => {`.
Replace the title `<Typography>` with a left-group that optionally includes the hamburger:
Find:
```tsx
      <Typography
        component="h1"
        sx={{
          m: 0,
          fontFamily: headingFamily,
          fontWeight: 700,
          fontSize: '1.15rem',
          letterSpacing: '0.02em',
        }}
      >
        {title}
      </Typography>
```
Replace:
```tsx
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
        {onMenuClick && (
          <Box
            component="button"
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              ml: -1,
              border: 'none',
              bgcolor: 'transparent',
              color: 'text.primary',
              cursor: 'pointer',
              borderRadius: 1,
            }}
          >
            <MenuIcon />
          </Box>
        )}
        <Typography
          component="h1"
          sx={{
            m: 0,
            fontFamily: headingFamily,
            fontWeight: 700,
            fontSize: '1.15rem',
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </Typography>
      </Box>
```

- [ ] **Step 4: Run the AdminTopBar tests to verify they pass**

Run: `npm test -- src/components/layout/AdminTopBar.test.tsx`
Expected: PASS.

- [ ] **Step 5: Write the failing AdminMobileDrawer test**

`src/components/layout/AdminMobileDrawer.test.tsx`:
```tsx
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '@/theme';
import { AdminMobileDrawer } from './AdminMobileDrawer';

const theme = makeTheme(BASE_THEME);
const renderDrawer = (props: Record<string, unknown> = {}, path = '/manager') =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <AdminMobileDrawer open onClose={vi.fn()} {...props} />
      </MemoryRouter>
    </ThemeProvider>
  );

describe('AdminMobileDrawer', () => {
  it('renders a labeled link for every admin section', () => {
    renderDrawer();
    const dialog = screen.getByRole('dialog', { name: /admin menu/i });
    for (const label of ['Manager', 'Articles', 'Images', 'Projects', 'Workflows', 'Agents', 'Groups', 'UI Manager']) {
      expect(within(dialog).getByRole('link', { name: label })).toBeTruthy();
    }
  });

  it('marks the active section with aria-current', () => {
    renderDrawer({}, '/projects');
    const dialog = screen.getByRole('dialog', { name: /admin menu/i });
    expect(within(dialog).getByRole('link', { name: 'Projects' }).getAttribute('aria-current')).toBe('page');
    expect(within(dialog).getByRole('link', { name: 'Manager' }).getAttribute('aria-current')).toBeNull();
  });

  it('closes on Escape, on the close button, and on scrim click', () => {
    const onClose = vi.fn();
    renderDrawer({ onClose });
    fireEvent.keyDown(screen.getByRole('dialog', { name: /admin menu/i }), { key: 'Escape' });
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders nothing when closed', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter><AdminMobileDrawer open={false} onClose={vi.fn()} /></MemoryRouter>
      </ThemeProvider>
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
```

- [ ] **Step 6: Run it, confirm it fails**

Run: `npm test -- src/components/layout/AdminMobileDrawer.test.tsx`
Expected: FAIL — `Failed to resolve import "./AdminMobileDrawer"`.

- [ ] **Step 7: Write `AdminMobileDrawer.tsx`**

```tsx
import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import { KaleidoscopeMark } from './KaleidoscopeMark';
import { ADMIN_NAV_ITEMS } from './AdminNavRail';
import type { AdminNavItem } from './AdminNavRail';
import type { NavBarUser } from './navTypes';

const MIN_TAP = 44;

function isActive(pathname: string, to: string): boolean {
  return pathname === to || pathname.startsWith(`${to}/`);
}

export interface AdminMobileDrawerProps {
  open: boolean;
  onClose: () => void;
  items?: AdminNavItem[];
  user?: NavBarUser | undefined;
  isAuthenticated?: boolean | undefined;
  login?: (() => void) | undefined;
}

/**
 * The mobile admin nav: a labeled slide-in drawer built from the same
 * ADMIN_NAV_ITEMS the desktop rail uses. Rendered by AdminLayout below md in
 * place of the icon-only rail (whose tooltips are useless on touch).
 */
export const AdminMobileDrawer: React.FC<AdminMobileDrawerProps> = ({
  open,
  onClose,
  items = ADMIN_NAV_ITEMS,
  user,
  isAuthenticated = false,
  login,
}) => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const { pathname } = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const mono = tokens?.typography.mono ?? 'monospace';
  const rSm = tokens?.radius.sm ?? 6;

  useEffect(() => { if (open) panelRef.current?.focus(); }, [open]);

  if (!open) return null;

  const itemSx = (active: boolean): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    minHeight: MIN_TAP,
    px: 1,
    borderRadius: `${rSm}px`,
    textDecoration: 'none',
    color: active ? 'primary.main' : 'text.primary',
    bgcolor: active ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
    fontFamily: mono,
    fontSize: '0.78rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    '&:hover': { bgcolor: 'action.hover' },
  });

  return (
    <Box
      onClick={onClose}
      sx={{ position: 'fixed', inset: 0, zIndex: 1200, bgcolor: alpha(theme.palette.common.black, 0.45) }}
    >
      <Box
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-label="Admin menu"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '82%',
          maxWidth: 300,
          bgcolor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
          p: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          outline: 'none',
          overflowY: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <KaleidoscopeMark size={26} />
          <Box component="span" sx={{ fontFamily: mono, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.18em' }}>
            KALEIDOSCOPE
          </Box>
          <Box sx={{ flex: 1 }} />
          <Box
            component="button"
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            sx={{ display: 'inline-flex', width: MIN_TAP, height: MIN_TAP, alignItems: 'center', justifyContent: 'center', border: 'none', bgcolor: 'transparent', color: 'text.primary', cursor: 'pointer' }}
          >
            <CloseIcon fontSize="small" />
          </Box>
        </Box>

        {items.map((item, i) => {
          const active = isActive(pathname, item.to);
          const prev = items[i - 1];
          const showDivider = i > 0 && item.group !== undefined && prev?.group !== item.group;
          return (
            <React.Fragment key={item.to}>
              {showDivider && <Divider sx={{ my: 0.5 }} />}
              <Box component={Link} to={item.to} aria-current={active ? 'page' : undefined} onClick={onClose} sx={itemSx(active)}>
                {item.icon}
                {item.label}
              </Box>
            </React.Fragment>
          );
        })}

        <Box sx={{ flex: 1 }} />
        <Divider sx={{ my: 0.5 }} />
        {isAuthenticated ? (
          <Box component={Link} to="/admin" aria-label="admin" onClick={onClose} sx={{ display: 'flex', alignItems: 'center', gap: 1, minHeight: MIN_TAP, textDecoration: 'none', color: 'text.primary', fontFamily: mono, fontSize: '0.78rem' }}>
            <Avatar alt={user?.firstName ?? 'User'} src="/static/images/nav-bar/user.svg" sx={{ width: 30, height: 30 }} />
            {user?.firstName ?? 'Account'}
          </Box>
        ) : (
          <Box
            component="button"
            type="button"
            onClick={login}
            aria-label="login"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, minHeight: MIN_TAP, width: '100%', border: '1px solid', borderColor: 'divider', borderRadius: `${rSm}px`, bgcolor: 'transparent', color: 'text.secondary', fontFamily: mono, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', px: 1.25, cursor: 'pointer', '&:hover': { color: 'primary.main', borderColor: 'primary.main' } }}
          >
            <Avatar sx={{ width: 26, height: 26, fontFamily: mono, fontWeight: 700, color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.14), fontSize: '0.8rem' }}>?</Avatar>
            Login
          </Box>
        )}
      </Box>
    </Box>
  );
};
```

- [ ] **Step 8: Run the drawer tests to verify they pass**

Run: `npm test -- src/components/layout/AdminMobileDrawer.test.tsx`
Expected: PASS (4 tests).

- [ ] **Step 9: Write the failing AdminLayout mobile test** — in `src/components/layout/AdminLayout.test.tsx` (the file already defines a `Wrapper` = `MemoryRouter initialEntries={['/projects']}` + `ThemeProvider theme={makeTheme(BASE_THEME, 'prism')}`).

Extend the imports:
- `import { describe, it, expect } from 'vitest';` → `import { describe, it, expect, vi, beforeEach } from 'vitest';`
- `import { render, screen } from '@testing-library/react';` → `import { render, screen, fireEvent, within } from '@testing-library/react';`

Add the mock after the imports (before the `theme`/`Wrapper` definitions):
```tsx
import { useIsMobile } from '@/hooks/useIsMobile';
vi.mock('@/hooks/useIsMobile', () => ({ useIsMobile: vi.fn(() => false) }));
const mockUseIsMobile = vi.mocked(useIsMobile);
beforeEach(() => mockUseIsMobile.mockReturnValue(false)); // existing tests exercise the desktop rail
```

Add this test inside `describe('AdminLayout', …)`:
```tsx
  it('renders a hamburger + drawer (not the persistent rail) below md', () => {
    mockUseIsMobile.mockReturnValue(true);
    render(
      <AdminLayout title="Manager">
        <div>page content</div>
      </AdminLayout>,
      { wrapper: Wrapper }
    );
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    const dialog = screen.getByRole('dialog', { name: /admin menu/i });
    expect(within(dialog).getByRole('link', { name: 'Manager' })).toBeInTheDocument();
    expect(screen.getByText('page content')).toBeInTheDocument();
  });
```
(The existing tests render `AdminLayout` with `useIsMobile → false`, so they keep exercising the desktop rail unchanged.)

- [ ] **Step 10: Run it, confirm it fails**

Run: `npm test -- src/components/layout/AdminLayout.test.tsx`
Expected: FAIL — no hamburger/drawer (AdminLayout always renders the rail).

- [ ] **Step 11: Branch `AdminLayout.tsx` on `useIsMobile`**

Add imports:
```tsx
import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { AdminMobileDrawer } from './AdminMobileDrawer';
```
(merge `useState` into the existing `import React from 'react'` line if you prefer: `import React, { useState } from 'react';`.)

At the top of the component body (before `const shell = …`), add the hooks and the mobile branch:
```tsx
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (isMobile) {
    const mobileShell = (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
        <Box inert={drawerOpen || undefined} sx={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <AdminTopBar title={title} actions={actions} onMenuClick={() => setDrawerOpen(true)} />
          <Box component="main" sx={{ flex: 1, p: 2 }}>
            {children}
          </Box>
        </Box>
        <AdminMobileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          {...(navItems ? { items: navItems } : {})}
          user={user}
          isAuthenticated={isAuthenticated}
          login={login}
        />
      </Box>
    );
    return disablePrismTheme ? mobileShell : <PrismThemeProvider>{mobileShell}</PrismThemeProvider>;
  }
```
Leave the existing desktop `const shell = (…)` / `return disablePrismTheme ? shell : …` untouched below it.

- [ ] **Step 12: Run the AdminLayout tests**

Run: `npm test -- src/components/layout/AdminLayout.test.tsx`
Expected: PASS (existing desktop tests + the new mobile test).

- [ ] **Step 13: Typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: no new errors.

- [ ] **Step 14: Commit**

```bash
git add src/components/layout/AdminMobileDrawer.tsx src/components/layout/AdminMobileDrawer.test.tsx src/components/layout/AdminTopBar.tsx src/components/layout/AdminTopBar.test.tsx src/components/layout/AdminLayout.tsx src/components/layout/AdminLayout.test.tsx
git commit -m "feat(responsive): admin nav drawer + hamburger below md"
```

---

## Task 2: ProjectsPage — force list view + stack the split on mobile

Below `md`: hide the graph toggle and force list view (never render the 1140px `ProjectGraph`), and stack the split view (280px sidebar → full-width above the editor) so it doesn't overflow.

**Files:**
- Modify: `src/pages/projects/ProjectsPage.tsx`

**Interfaces:**
- Consumes: `useIsMobile` (`@/hooks/useIsMobile`).

- [ ] **Step 1: Add the hook + derived view mode** — in `src/pages/projects/ProjectsPage.tsx`:

Add the import (near the other imports):
```tsx
import { useIsMobile } from '@/hooks/useIsMobile';
```
Find:
```tsx
  const [viewMode, setViewMode] = useState<ViewMode>('list');
```
Replace:
```tsx
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const isMobile = useIsMobile();
  // On phones the graph (fixed 1140px) can't fit — force the list.
  const effectiveViewMode: ViewMode = isMobile ? 'list' : viewMode;
```

- [ ] **Step 2: Hide the graph/list toggle on mobile** — find:
```tsx
  const headerActions = !isSplitView ? (
    <>
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        size="small"
        onChange={(_, v) => {
          if (v) setViewMode(v as ViewMode);
        }}
      >
        <ToggleButton value="list" aria-label="list view">
          <Tooltip title="List view">
            <GridViewIcon fontSize="small" />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="graph" aria-label="graph view">
          <Tooltip title="Graph view">
            <HubIcon fontSize="small" />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
```
Replace:
```tsx
  const headerActions = !isSplitView ? (
    <>
      {!isMobile && (
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        size="small"
        onChange={(_, v) => {
          if (v) setViewMode(v as ViewMode);
        }}
      >
        <ToggleButton value="list" aria-label="list view">
          <Tooltip title="List view">
            <GridViewIcon fontSize="small" />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="graph" aria-label="graph view">
          <Tooltip title="Graph view">
            <HubIcon fontSize="small" />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
      )}
```

- [ ] **Step 3: Stack the split view and use the effective view mode** — find:
```tsx
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: isSplitView ? 3 : 0 }}>

              {/* ── Card area (no AnimatePresence — let layoutId own the motion) ── */}
              <Box sx={{ width: isSplitView ? 280 : '100%', flexShrink: 0 }}>
```
Replace:
```tsx
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', gap: isSplitView ? 3 : 0 }}>

              {/* ── Card area (no AnimatePresence — let layoutId own the motion) ── */}
              <Box sx={{ width: isMobile ? '100%' : (isSplitView ? 280 : '100%'), flexShrink: 0 }}>
```
Find:
```tsx
                ) : viewMode === 'list' ? (
```
Replace:
```tsx
                ) : effectiveViewMode === 'list' ? (
```

- [ ] **Step 4: Add the mobile test** — `src/pages/projects/ProjectsPage.test.tsx` already has an MSW (`/projects` → `[]`) + `QueryClient` + `MemoryRouter` + `ThemeProvider` `Wrapper`, and mocks `../../auth/useAuth` (authenticated). Reuse it.

Add the hook mock after the existing `vi.mock('../../auth/useAuth', …)` block:
```tsx
import { useIsMobile } from '@/hooks/useIsMobile';
vi.mock('@/hooks/useIsMobile', () => ({ useIsMobile: vi.fn(() => false) }));
const mockUseIsMobile = vi.mocked(useIsMobile);
```
Add `beforeEach` to the vitest import (`import { describe, it, expect, beforeAll, afterEach, afterAll, beforeEach, vi } from 'vitest';`) and a reset so the existing tests stay desktop:
```tsx
beforeEach(() => mockUseIsMobile.mockReturnValue(false));
```

Add this test inside `describe('ProjectsPage', …)`:
```tsx
  it('hides the graph/list view toggle on mobile', () => {
    mockUseIsMobile.mockReturnValue(true);
    render(<ProjectsPage />, { wrapper: Wrapper });
    // the "graph view" ToggleButton is only rendered on desktop
    expect(screen.queryByRole('button', { name: /graph view/i })).toBeNull();
  });
```
(The existing tests assert the desktop rail nav, so the `false` default keeps them green.)

- [ ] **Step 5: Run tests + typecheck + lint**

Run: `npm test -- src/pages/projects/ProjectsPage.test.tsx && npm run typecheck && npm run lint`
Expected: PASS / clean (or, if there's no page test, run `npm run typecheck && npm run lint` and note the coverage approach).

- [ ] **Step 6: Commit**

```bash
git add src/pages/projects/ProjectsPage.tsx src/pages/projects/ProjectsPage.test.tsx
git commit -m "feat(responsive): ProjectsPage forces list view + stacks split on mobile"
```

---

## Task 3: Admin form/table polish

Three small, targeted fixes: two editor `Stack` rows and the recipe Servings/Prep/Cook row stack on mobile; the DataGrid's horizontal scroll is contained so it never blows out the page body.

**Files:**
- Modify: `src/pages/ArticleEditorPage.tsx`, `src/pages/RecipeEditorPage.tsx`, `src/components/layout/Table.tsx`

- [ ] **Step 1: ArticleEditor — stack the new-article title row** — in `src/pages/ArticleEditorPage.tsx`, find the new-article `Stack` (the one preceding the `Article title` `TextField` with `minWidth: 300`):
```tsx
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              mb: 2
            }}>
            <TextField
              size="small"
              label="Article title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              sx={{ minWidth: 300 }}
            />
```
Replace:
```tsx
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
              alignItems: { xs: 'stretch', sm: 'center' },
              mb: 2
            }}>
            <TextField
              size="small"
              label="Article title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              sx={{ minWidth: { xs: 0, sm: 300 } }}
            />
```

- [ ] **Step 2: ArticleEditor — stack the branch-selector row** — find the branch-selector `Stack` (preceding the `FormControl … minWidth: 200`):
```tsx
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              mb: 2
            }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
```
Replace:
```tsx
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
              alignItems: { xs: 'stretch', sm: 'center' },
              mb: 2
            }}>
            <FormControl size="small" sx={{ minWidth: { xs: 0, sm: 200 } }}>
```

- [ ] **Step 3: RecipeEditor — stack the Servings/Prep/Cook row** — in `src/pages/RecipeEditorPage.tsx`, find:
```tsx
          <Stack direction="row" spacing={2}>
            <TextField
              label="Servings"
```
Replace:
```tsx
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Servings"
```

- [ ] **Step 4: Contain the DataGrid's horizontal scroll** — in `src/components/layout/Table.tsx`, find:
```tsx
  <Box sx={{ maxWidth, mx: 'auto' }}>
    <DataGrid
```
Replace:
```tsx
  <Box sx={{ maxWidth, mx: 'auto', width: '100%', overflowX: 'auto' }}>
    <DataGrid
```
(The `DataGrid` already scrolls its own body; `width:100% + overflowX:auto` on the wrapper guarantees the grid can never push the page body wider than the viewport on a phone.)

- [ ] **Step 5: Verify no regression** — these are layout-only (responsive `Stack` direction + a wrapper overflow). Run the affected suites; they render these components and must stay green:

Run: `npm test -- src/pages/ArticleEditorPage.test.tsx src/pages/RecipeEditorPage.test.tsx src/pages/ArticleManagerPage.test.tsx src/components/layout/Table.test.tsx` (run whichever of these exist)
Then: `npm run typecheck && npm run lint`
Expected: PASS / clean. No new behavioral test is added — the changes are responsive `sx` values jsdom doesn't compute; the page-body overflow guarantee is exercised by the Task 4 e2e where reachable.

- [ ] **Step 6: Commit**

```bash
git add src/pages/ArticleEditorPage.tsx src/pages/RecipeEditorPage.tsx src/components/layout/Table.tsx
git commit -m "feat(responsive): stack admin editor/form rows + contain DataGrid scroll on mobile"
```

---

## Task 4: Extend the overflow e2e to the admin shell

Add admin routes that render a stable shell without a backend, guarding the Phase-3 shell (nav drawer, top bar, page containers) against 390px overflow.

**Files:**
- Modify: `e2e/mobile-overflow.spec.ts`

- [ ] **Step 1: Add the admin routes** — in `e2e/mobile-overflow.spec.ts`, find:
```ts
const routes = ['/', '/about', '/recipes', '/experience', '/library'];
```
Replace:
```ts
const routes = [
  // public reader
  '/', '/about', '/recipes', '/experience', '/library',
  // admin shell (render a stable shell without a backend)
  '/admin', '/manager', '/workflows', '/agents', '/projects', '/score-definitions', '/workspace-roots',
];
```

- [ ] **Step 2: Run the e2e**

Run: `npm run test:e2e -- mobile-overflow`
Expected: all routes pass (12). Playwright auto-boots the dev server; these admin routes render their shell (login card / empty list) without a backend and, after Task 1, use the full-width mobile shell — no horizontal overflow. If an admin route fails, report the route + `scrollWidth`/`clientWidth`; do not weaken the assertion.

- [ ] **Step 3: Commit**

```bash
git add e2e/mobile-overflow.spec.ts
git commit -m "test(responsive): extend 390px overflow guard to admin shell routes"
```

---

## Final verification

- [ ] **Full CI gate**

Run: `npm run ci`
Expected: typecheck + lint + test pass (lint may show the pre-existing warnings unrelated to this branch).

- [ ] **Manual smoke (recommended).** `npm run dev`, device mode at 390px, logged in if possible:
  - Any admin route (`/manager`, `/projects`, …) — the left rail is gone; a hamburger in the top bar opens a labeled drawer of admin sections; tapping a section navigates and closes the drawer; background is inert while open.
  - `/projects` — no graph toggle; selecting a project stacks the card above the detail (no sideways scroll).
  - `/articles/new` and `/recipes/new` — title/branch and servings rows stack; no sideways scroll.
  - `/articles` (with data) — the table scrolls horizontally *inside its own box*; the page body does not.

---

## Self-review notes (coverage vs. spec §8)

- **`AdminNavRail` collapses to a drawer under `md`** → Task 1 (hamburger + `AdminMobileDrawer` from `ADMIN_NAV_ITEMS`; desktop rail unchanged). The a11y here is more complete than Phase 1's `MobileNav` drawer (background `inert`, close-on-link, focus-on-open) — worth back-porting to `MobileNav` in the deferred a11y pass.
- **Data grids get `overflow-x` containment or a stacked card view** → Task 3 (`Table.tsx` `overflowX:auto` containment). The full card view is explicitly deferred (documented) — the containment stops page-body overflow, which is the correctness bar.
- **ProjectsPage split/graph** → Task 2 (force list, hide graph toggle, stack split). The 1140px graph is the clearest overflow; forcing list on mobile removes it entirely.
- **Editor pages get a usable narrow layout or a graceful fallback** → Task 3 (the `Stack` rows). No "best on desktop" block was needed — the editors reflow with these targeted fixes (audit found `RichTextEditor`/`EditorToolbar` already media-safe and wrapping).
- **Overflow regression e2e extended to admin routes** → Task 4 (shell-level). **Limitation (documented):** data-dependent admin overflow — `ArticleManager`'s DataGrid *with rows*, `ProjectsPage`'s split/graph *with a selected project* — is not reachable by the e2e without a backend; those are covered by the code fixes + the manual smoke, not the automated guard.

Deferred (out of scope): DataGrid → card view; `ImageBrowser` `down('sm')` → `useIsMobile()` normalization; `AgentTeamPage` emoji-grid density; and the standing a11y follow-up (unify the two nav drawers, focus-trap completion).
