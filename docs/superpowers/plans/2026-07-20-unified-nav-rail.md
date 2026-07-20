# Unified Navigation Rail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Collapse the two disjoint nav systems (public `SideRail`/`MobileNav` + admin `AdminNavRail`/`AdminMobileDrawer`) into one persistent rail rendered by `AppShell` on every inner route — reader facets always, a collapsible Studio section when logged in, and a footer account menu with Logout.

**Architecture:** A single `navConfig` module is the sole source of Studio items (role-tagged). The existing `SideRail` evolves into the unified desktop rail and `MobileNav` grows a config-driven Studio section; both gain Logout. `AppShell` wraps *every* inner route (admin routes move under it in `App.tsx`), and `AdminLayout` is re-scoped from "owns the whole admin chrome" to "themes the content column + renders its top bar." `AdminNavRail`, `AdminMobileDrawer`, and the dead `SideMenu` retire.

**Tech Stack:** React 19 + TypeScript + Vite, MUI 9 (`Box`, `Menu`, icons), React Router 7, Vitest + Testing Library + jsdom, MSW. `@` aliases `src/`.

## Global Constraints

- Node 22. Run `npm run ci` (typecheck + lint + test) green before finishing; commit after each task.
- **No raw color literals** in components (lint `no-restricted-syntax`; exempt: `src/theme/**`, tests, stories). Use `theme.palette.*`, `theme.tokens.*`, `alpha(...)`, or `facetColor(...)`.
- **Token-driven voice, not hardcoded:** mono via `theme.tokens?.typography.mono ?? 'monospace'`; radius via `theme.tokens?.radius.sm ?? 6`; motion via `theme.tokens?.motion.*` with fallbacks.
- **Preserve every destination + contract:** same routes, labels, `aria-label`s, `aria-current` active semantics; role gating via `isWriter`/`isSiteAdmin` from `@/auth/authHelpers` (note `isWriter` returns true for admins too).
- **Auth only via `useAuth()`.** This work is nav/layout only — no API, TanStack Query, or auth-provider changes; **no route guards added** (out of scope).
- Tests are co-located `*.test.tsx`; jsdom setup in `src/test/setup.ts`; MSW server in `src/test/server.ts`.
- The admin content canvas stays Prism-dark (`PrismThemeProvider`); the rail stays under the live app theme.

---

## File Structure

- **New:** `src/components/layout/navConfig.tsx` — sole source of Studio nav items + `visibleStudioItems(user)`.
- **Reworked:** `SideRail.tsx` (→ unified rail; filename kept to avoid import churn), `MobileNav.tsx`, `AppShell.tsx`, `AdminLayout.tsx`, `AdminTopBar.tsx`, `App.tsx`, and the 17 pages rendering `<AdminLayout>`.
- **Deleted:** `SideMenu.tsx`, `AdminNavRail.tsx`, `AdminMobileDrawer.tsx` (+ their tests/stories).

---

## Task 1: Single Studio nav-item source (`navConfig`)

**Files:**
- Create: `src/components/layout/navConfig.tsx`
- Test: `src/components/layout/navConfig.test.tsx`

**Interfaces:**
- Consumes: `NavBarUser` from `./navTypes`; `isSiteAdmin`, `isWriter` from `@/auth/authHelpers`.
- Produces:
  - `type StudioGroup = 'content' | 'build' | 'system'`
  - `interface StudioNavItem { label: string; to: string; icon: React.ReactNode; group: StudioGroup; minRole: 'writer' | 'admin' }`
  - `const STUDIO_NAV_ITEMS: StudioNavItem[]`
  - `function visibleStudioItems(user?: NavBarUser): StudioNavItem[]`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/layout/navConfig.test.tsx
import { describe, it, expect } from 'vitest';
import { STUDIO_NAV_ITEMS, visibleStudioItems } from './navConfig';
import type { NavBarUser } from './navTypes';

const withRoles = (...roles: string[]): NavBarUser => ({ realm_access: { roles } });

describe('navConfig', () => {
  it('hides Studio from anon and role-less users', () => {
    expect(visibleStudioItems(undefined)).toEqual([]);
    expect(visibleStudioItems(withRoles())).toEqual([]);
  });

  it('shows only writer-tier (content) items to a writer', () => {
    // authHelpers derives roles from the host; use the localhost admin/writer role names.
    const items = visibleStudioItems(withRoles('localhost:writer'));
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((i) => i.minRole === 'writer')).toBe(true);
    expect(items.map((i) => i.label)).toContain('Articles');
    expect(items.map((i) => i.label)).not.toContain('Agents'); // admin-tier
  });

  it('shows every item to an admin', () => {
    const items = visibleStudioItems(withRoles('localhost:admin'));
    expect(items).toHaveLength(STUDIO_NAV_ITEMS.length);
    expect(items.map((i) => i.label)).toContain('Agents');
  });

  it('has unique routes and labels', () => {
    const routes = STUDIO_NAV_ITEMS.map((i) => i.to);
    const labels = STUDIO_NAV_ITEMS.map((i) => i.label);
    expect(new Set(routes).size).toBe(routes.length);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
```

> Note: `authHelpers` scopes roles to the current host — under jsdom the host is `localhost`, so `getWriterRole()`/`getAdminRole()` resolve to `localhost:writer` / `localhost:admin`. If the suite's jsdom URL differs, read `src/auth/authHelpers.ts` and use the matching role strings. Confirm the exact prefix by opening `authHelpers.ts` before writing the assertions.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/layout/navConfig.test.tsx`
Expected: FAIL — `Cannot find module './navConfig'`.

- [ ] **Step 3: Write the implementation**

```tsx
// src/components/layout/navConfig.tsx
import React from 'react';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ArticleIcon from '@mui/icons-material/Article';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GroupsIcon from '@mui/icons-material/Groups';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import RuleIcon from '@mui/icons-material/Rule';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PaletteIcon from '@mui/icons-material/Palette';
import type { NavBarUser } from './navTypes';
import { isSiteAdmin, isWriter } from '@/auth/authHelpers';

export type StudioGroup = 'content' | 'build' | 'system';

export interface StudioNavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  group: StudioGroup;
  /** Minimum role that may see this item. `isWriter` is true for admins too. */
  minRole: 'writer' | 'admin';
}

/**
 * The single source of Studio (admin) nav sections — consumed by the desktop
 * rail (SideRail) and the mobile drawer (MobileNav). Order + groups drive the
 * hairline dividers between groups; `minRole` drives per-role visibility.
 */
export const STUDIO_NAV_ITEMS: StudioNavItem[] = [
  { label: 'Manager', to: '/manager', icon: <SpaceDashboardIcon fontSize="small" />, group: 'content', minRole: 'writer' },
  { label: 'Articles', to: '/articles', icon: <ArticleIcon fontSize="small" />, group: 'content', minRole: 'writer' },
  { label: 'Images', to: '/images', icon: <PhotoLibraryIcon fontSize="small" />, group: 'content', minRole: 'writer' },
  { label: 'Experience', to: '/experience', icon: <BadgeIcon fontSize="small" />, group: 'content', minRole: 'writer' },
  { label: 'Projects', to: '/projects', icon: <WorkspacesIcon fontSize="small" />, group: 'build', minRole: 'admin' },
  { label: 'Workflows', to: '/workflows', icon: <AccountTreeIcon fontSize="small" />, group: 'build', minRole: 'admin' },
  { label: 'Agents', to: '/agents', icon: <GroupsIcon fontSize="small" />, group: 'build', minRole: 'admin' },
  { label: 'Workspace Roots', to: '/workspace-roots', icon: <FolderOpenIcon fontSize="small" />, group: 'build', minRole: 'admin' },
  { label: 'Score Definitions', to: '/score-definitions', icon: <RuleIcon fontSize="small" />, group: 'build', minRole: 'admin' },
  { label: 'Groups', to: '/groups', icon: <ManageAccountsIcon fontSize="small" />, group: 'system', minRole: 'admin' },
  { label: 'UI Manager', to: '/ui', icon: <PaletteIcon fontSize="small" />, group: 'system', minRole: 'admin' },
];

/** Studio items visible to `user`; `[]` when the user is neither writer nor admin. */
export function visibleStudioItems(user?: NavBarUser): StudioNavItem[] {
  const writer = isWriter(user);
  const admin = isSiteAdmin(user);
  if (!writer && !admin) return [];
  return STUDIO_NAV_ITEMS.filter((item) => (item.minRole === 'writer' ? writer : admin));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/layout/navConfig.test.tsx`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/navConfig.tsx src/components/layout/navConfig.test.tsx
git commit -m "feat(nav): single role-tagged Studio nav-item source"
```

---

## Task 2: Evolve `SideRail` into the unified desktop rail

Adds the Studio section (from `navConfig`) and a footer **account menu with Logout** to the existing reader rail. `SideRail` currently renders only on garden routes via `AppShell`, so this is purely additive until Task 4 moves admin routes under `AppShell`.

**Files:**
- Modify: `src/components/layout/SideRail.tsx` (full rewrite below)
- Modify: `src/components/layout/AppShell.tsx:18,36` (thread `logout` to `SideRail`)
- Test: `src/components/layout/SideRail.test.tsx` (extend)

**Interfaces:**
- Consumes: `visibleStudioItems`, `StudioNavItem` from `./navConfig`; `GARDEN_FACETS`, `facetColor`, `isFacetActive` from `@/components/home/gardenFacets`.
- Produces: `SideRailProps` gains `logout?: (() => void) | undefined`.

- [ ] **Step 1: Write the failing tests**

Add to `src/components/layout/SideRail.test.tsx` (keep existing tests; render helper likely already wraps in a router + theme — reuse it). Use the host-scoped admin role string as in Task 1.

```tsx
import { fireEvent, screen, within } from '@testing-library/react';
// ...existing imports + renderSideRail helper...

it('shows no Studio section when logged out', () => {
  renderSideRail({ isAuthenticated: false });
  expect(screen.queryByRole('button', { name: /studio/i })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

it('shows the Studio disclosure with admin items when an admin is logged in', () => {
  renderSideRail({ isAuthenticated: true, user: { realm_access: { roles: ['localhost:admin'] } } });
  const toggle = screen.getByRole('button', { name: /studio/i });
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('link', { name: 'Agents' })).toBeInTheDocument();
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

it('exposes Logout in the account menu and calls logout', () => {
  const logout = vi.fn();
  renderSideRail({ isAuthenticated: true, user: { firstName: 'Andrew', realm_access: { roles: ['localhost:admin'] } }, logout });
  fireEvent.click(screen.getByRole('button', { name: /account/i }));
  fireEvent.click(screen.getByRole('menuitem', { name: /logout/i }));
  expect(logout).toHaveBeenCalledTimes(1);
});
```

> If the existing `renderSideRail` helper doesn't accept `user`/`logout`, widen it to spread props onto `<SideRail {...props} />`. Read the test file first to match its helper shape.

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/components/layout/SideRail.test.tsx`
Expected: FAIL — no "studio"/"account" controls yet.

- [ ] **Step 3: Rewrite `SideRail.tsx`**

```tsx
// src/components/layout/SideRail.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { KaleidoscopeMark } from './KaleidoscopeMark';
import type { NavBarUser } from './navTypes';
import { visibleStudioItems, type StudioNavItem } from './navConfig';
import { GARDEN_FACETS, facetColor, isFacetActive } from '@/components/home/gardenFacets';

export interface SideRailProps {
  user?: NavBarUser | undefined;
  isAuthenticated?: boolean | undefined;
  login?: (() => void) | undefined;
  logout?: (() => void) | undefined;
}

// eslint-disable-next-line no-restricted-syntax -- bare-MUI fallback spectrum, used only when theme.tokens is undefined
const FALLBACKS = ['#45D6E8', '#9C90F0', '#E0A73C'];

/** True when `pathname` is `to` or a nested route beneath it. */
function isActive(pathname: string, to: string): boolean {
  return pathname === to || pathname.startsWith(`${to}/`);
}

export const SideRail: React.FC<SideRailProps> = ({ user, isAuthenticated = false, login, logout }) => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const { pathname } = useLocation();
  const mono = tokens?.typography.mono ?? 'monospace';
  const rSm = tokens?.radius.sm ?? 6;
  const durBase = tokens?.motion.duration.base ?? 250;
  const settle = tokens?.motion.easing.springSettle ?? 'ease';

  const studioItems = visibleStudioItems(user);
  const [studioOpen, setStudioOpen] = useState(true);
  const [menuEl, setMenuEl] = useState<HTMLElement | null>(null);

  const itemSx = (active: boolean, color: string): SxProps<Theme> => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 1.25,
    px: 1.5,
    py: 1.25,
    borderRadius: `${rSm}px`,
    fontFamily: mono,
    fontSize: '0.82rem',
    letterSpacing: '0.02em',
    textDecoration: 'none',
    color: active ? 'text.primary' : 'text.secondary',
    bgcolor: active ? 'action.hover' : 'transparent',
    transition: `color ${durBase}ms, background-color ${durBase}ms`,
    '&::before': {
      content: '""', position: 'absolute', left: -6, top: 8, bottom: 8, width: 3, borderRadius: 2,
      bgcolor: color, boxShadow: `0 0 10px ${color}`, opacity: active ? 1 : 0, transition: `opacity ${durBase}ms`,
    },
    '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
  });

  const studioItemSx = (active: boolean): SxProps<Theme> => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 1.25,
    px: 1.5,
    py: 0.9,
    borderRadius: `${rSm}px`,
    fontFamily: mono,
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: active ? 'primary.main' : 'text.secondary',
    bgcolor: active ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
    transition: `color ${durBase}ms, background-color ${durBase}ms`,
    '&::before': {
      content: '""', position: 'absolute', left: -6, top: 6, bottom: 6, width: 3, borderRadius: 2,
      bgcolor: 'primary.main', opacity: active ? 1 : 0, transition: `opacity ${durBase}ms`,
    },
    '&:hover': { color: active ? 'primary.main' : 'text.primary', bgcolor: 'action.hover' },
    '& svg': { fontSize: '1rem' },
  });

  return (
    <Box
      component="nav"
      aria-label="Primary"
      sx={{
        width: 216, flex: 'none', alignSelf: 'stretch',
        borderRight: '1px solid', borderColor: 'divider', bgcolor: 'background.paper',
        display: 'flex', flexDirection: 'column', gap: 0.5, p: 1.5,
      }}
    >
      {/* home = the prism */}
      <Box
        component={Link}
        to="/"
        aria-label="Home — the prism"
        sx={{
          display: 'flex', alignItems: 'center', gap: 1.25, p: 1, mb: 1,
          textDecoration: 'none', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider',
          '& .klogo': { transition: `transform ${tokens?.motion.duration.slow ?? 400}ms ${settle}` },
          '&:hover .klogo': { transform: 'rotate(120deg)' },
        }}
      >
        <KaleidoscopeMark size={26} className="klogo" />
        <Box component="span" sx={{ fontFamily: mono, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.16em' }}>
          andrewlai
        </Box>
      </Box>

      {/* reader facets */}
      {GARDEN_FACETS.map((f, i) => {
        const active = isFacetActive(f, pathname);
        const color = facetColor(tokens, f.colorIndex, FALLBACKS[i] ?? FALLBACKS[0]!);
        return (
          <Box key={f.key} component={Link} to={f.route} aria-label={f.label} aria-current={active ? 'page' : 'false'} sx={itemSx(active, color)}>
            <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color, flex: 'none' }} />
            <Box component="span">{f.label}</Box>
          </Box>
        );
      })}

      {/* About (essentials tier) */}
      <Box component={Link} to="/about" aria-label="About" aria-current={pathname === '/about' ? 'page' : 'false'} sx={itemSx(pathname === '/about', theme.palette.success.main)}>
        <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main', flex: 'none' }} />
        <Box component="span">About</Box>
      </Box>

      {/* Studio — collapsible, role-filtered from navConfig */}
      {studioItems.length > 0 && (
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 1, pt: 0.5, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Box
            component="button"
            type="button"
            onClick={() => setStudioOpen((v) => !v)}
            aria-expanded={studioOpen}
            aria-label="Studio"
            sx={{
              display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 1, border: 'none', bgcolor: 'transparent',
              cursor: 'pointer', color: 'text.secondary', fontFamily: mono, fontSize: '0.66rem',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              '&:hover': { color: 'text.primary' },
            }}
          >
            <Box component="span">Studio</Box>
            <Box sx={{ flex: 1 }} />
            <KeyboardArrowDownIcon
              fontSize="small"
              sx={{ transform: studioOpen ? 'none' : 'rotate(-90deg)', transition: `transform ${durBase}ms ${settle}` }}
            />
          </Box>
          {studioOpen && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, overflowY: 'auto', minHeight: 0 }}>
              {studioItems.map((item: StudioNavItem, i) => {
                const active = isActive(pathname, item.to);
                const prev = studioItems[i - 1];
                const showDivider = i > 0 && prev?.group !== item.group;
                return (
                  <React.Fragment key={item.to}>
                    {showDivider && <Divider sx={{ my: 0.5, borderColor: 'divider' }} />}
                    <Box component={Link} to={item.to} aria-current={active ? 'page' : undefined} sx={studioItemSx(active)}>
                      {item.icon}
                      <Box component="span">{item.label}</Box>
                    </Box>
                  </React.Fragment>
                );
              })}
            </Box>
          )}
        </Box>
      )}

      <Box sx={{ flex: 1, minHeight: 8 }} />

      {/* auth footer */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1 }}>
        {isAuthenticated ? (
          <>
            <Box
              component="button"
              type="button"
              onClick={(e) => setMenuEl(e.currentTarget)}
              aria-label="Account"
              aria-haspopup="menu"
              sx={{
                display: 'flex', alignItems: 'center', gap: 1, width: '100%', px: 1, py: 0.75,
                border: 'none', bgcolor: 'transparent', cursor: 'pointer', borderRadius: `${rSm}px`,
                color: 'text.secondary', fontFamily: mono, fontSize: '0.75rem',
                '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
              }}
            >
              <Avatar alt={user?.firstName ?? 'User'} src="/static/images/nav-bar/user.svg" sx={{ width: 30, height: 30 }} />
              <Box component="span">{user?.firstName ?? 'Account'}</Box>
            </Box>
            <Menu anchorEl={menuEl} open={Boolean(menuEl)} onClose={() => setMenuEl(null)}>
              <MenuItem component={Link} to="/admin" onClick={() => setMenuEl(null)} sx={{ fontFamily: mono, fontSize: '0.8rem' }}>Admin</MenuItem>
              <MenuItem onClick={() => { setMenuEl(null); logout?.(); }} sx={{ fontFamily: mono, fontSize: '0.8rem' }}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Box
            component="button"
            type="button"
            onClick={login}
            aria-label="login"
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 1, cursor: 'pointer',
              border: '1px solid', borderColor: 'divider', borderRadius: `${rSm}px`, bgcolor: 'transparent',
              color: 'text.secondary', fontFamily: mono, fontSize: '0.72rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', px: 1.25, py: 1,
              '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
            }}
          >
            <Avatar sx={{ width: 26, height: 26, fontFamily: mono, fontWeight: 700, color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.14), fontSize: '0.8rem' }}>?</Avatar>
            <Box component="span">Login</Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
```

- [ ] **Step 4: Thread `logout` through `AppShell`**

In `src/components/layout/AppShell.tsx`, add `logout` to the `useAuth()` destructure (line ~18) and pass it to `SideRail` (line ~36):

```tsx
const { isAuthenticated, userProfile, login, logout } = useAuth();
// ...
<SideRail user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- src/components/layout/SideRail.test.tsx`
Expected: PASS (new + existing).

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/SideRail.tsx src/components/layout/SideRail.test.tsx src/components/layout/AppShell.tsx
git commit -m "feat(nav): unified SideRail with collapsible Studio + account menu logout"
```

---

## Task 3: Grow the unified Studio section + Logout into `MobileNav`

Replace `MobileNav`'s hardcoded Studio list with `visibleStudioItems(user)` and add Logout to the drawer's account footer.

**Files:**
- Modify: `src/components/layout/MobileNav.tsx` (Studio + footer sections; add `logout` prop)
- Modify: `src/components/layout/AppShell.tsx` (pass `logout` to `MobileNav`)
- Test: `src/components/layout/MobileNav.test.tsx` (extend)

**Interfaces:**
- Consumes: `visibleStudioItems` from `./navConfig`.
- Produces: `MobileNavProps` gains `logout?: (() => void) | undefined`.

- [ ] **Step 1: Write the failing tests**

Add to `src/components/layout/MobileNav.test.tsx` (reuse the file's existing render helper + drawer-open interaction):

```tsx
it('renders the shared Studio items for an admin and exposes Logout', () => {
  const logout = vi.fn();
  renderMobileNav({ isAuthenticated: true, user: { firstName: 'Andrew', realm_access: { roles: ['localhost:admin'] } }, logout });
  fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
  expect(screen.getByRole('link', { name: /agents/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /logout/i }));
  expect(logout).toHaveBeenCalledTimes(1);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/components/layout/MobileNav.test.tsx`
Expected: FAIL — no Agents link / Logout control.

- [ ] **Step 3: Update `MobileNav.tsx`**

Add the import and prop:

```tsx
import { visibleStudioItems } from './navConfig';
// ...
export interface MobileNavProps {
  user?: NavBarUser | undefined;
  isAuthenticated?: boolean | undefined;
  login?: (() => void) | undefined;
  logout?: (() => void) | undefined;
}
export const MobileNav: React.FC<MobileNavProps> = ({ user, isAuthenticated = false, login, logout }) => {
  // ...
  const studioItems = visibleStudioItems(user);
```

Replace the current Studio block (the `{(userIsWriter || userIsAdmin) && ( ... )}` region, ~lines 244-259) with a config-driven list:

```tsx
{studioItems.length > 0 && (
  <>
    <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 1, pt: 1 }}>
      <Box component="span" sx={{ fontFamily: mono, fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'text.secondary' }}>Studio</Box>
    </Box>
    {studioItems.map((item) => (
      <Box key={item.to} component={Link} to={item.to} sx={studioLinkSx(mono, rSm)}>
        {item.label}
      </Box>
    ))}
  </>
)}
```

Then remove the now-unused `userIsWriter`/`userIsAdmin` locals **only if** nothing else references them (they were used solely for this block). In the drawer footer's authenticated branch (the `<Box component={Link} to="/admin" ...>` account row, ~lines 264-268), add a Logout button directly beneath it:

```tsx
{isAuthenticated ? (
  <>
    <Box component={Link} to="/admin" aria-label="admin" sx={{ display: 'flex', alignItems: 'center', gap: 1, minHeight: MIN_TAP, textDecoration: 'none', color: 'text.primary', fontFamily: mono, fontSize: '0.85rem' }}>
      <Avatar alt={user?.firstName ?? 'User'} src="/static/images/nav-bar/user.svg" sx={{ width: 30, height: 30 }} />
      {user?.firstName ?? 'Account'}
    </Box>
    <Box
      component="button"
      type="button"
      onClick={() => logout?.()}
      aria-label="Logout"
      sx={{ display: 'flex', alignItems: 'center', minHeight: MIN_TAP, mt: 0.5, width: '100%', border: 'none', bgcolor: 'transparent', color: 'text.secondary', fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', px: 1, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
    >
      Logout
    </Box>
  </>
) : (
  // ...unchanged Login button...
)}
```

- [ ] **Step 4: Pass `logout` from `AppShell`**

In `src/components/layout/AppShell.tsx` mobile branch: `<MobileNav user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />`.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- src/components/layout/MobileNav.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/MobileNav.tsx src/components/layout/MobileNav.test.tsx src/components/layout/AppShell.tsx
git commit -m "feat(nav): shared Studio list + Logout in MobileNav drawer"
```

---

## Task 4: Unify the shell — move admin routes under `AppShell`, strip `AdminLayout` to content-only

**Coupled change:** the router move and the `AdminLayout` re-scope must land together so admin pages never render two rails (both) or zero rails (neither). Before this commit, admin routes render `AdminLayout`-with-rail outside `AppShell` (works); after, they render under `AppShell`-with-rail + `AdminLayout`-content-only (works).

**Files:**
- Modify: `src/App.tsx:38-88` (nest admin routes under the existing `<AppShell>` child)
- Modify: `src/components/layout/AdminLayout.tsx` (full rewrite below)
- Modify: `src/components/layout/AdminTopBar.tsx` (drop hamburger usage — keep prop, see note)
- Test: `src/components/layout/AdminLayout.test.tsx`, `src/components/layout/AppShell.test.tsx`

**Interfaces:**
- `AdminLayout` public API unchanged for callers: `{ title, actions?, disablePrismTheme?, children }`. The `user`/`isAuthenticated`/`login`/`navItems` props are made optional-and-ignored here (removed entirely in Task 6, which also updates call sites).

- [ ] **Step 1: Write the failing tests**

`AdminLayout.test.tsx` — assert it renders the title/actions and Prism canvas but **no** navigation:

```tsx
it('renders title + actions and no nav rail/drawer', () => {
  renderAdminLayout({ title: 'Manager', actions: <button>Act</button> });
  expect(screen.getByRole('heading', { name: 'Manager' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Act' })).toBeInTheDocument();
  // the rail lives in AppShell now — AdminLayout must not render one
  expect(screen.queryByRole('navigation', { name: /admin sections/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /open menu/i })).not.toBeInTheDocument();
});
```

`AppShell.test.tsx` — one rail on an admin route:

```tsx
it('renders exactly one primary rail (no admin duplicate)', () => {
  renderAtRoute('/manager', { isAuthenticated: true, user: { realm_access: { roles: ['localhost:admin'] } } });
  expect(screen.getAllByRole('navigation', { name: /primary/i })).toHaveLength(1);
});
```

> Match the existing `AppShell.test` render helper (it likely wraps in `MemoryRouter`/theme). Read it first; if it renders `<AppShell>` directly rather than through the router tree, assert on the single `SideRail` nav instead.

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/components/layout/AdminLayout.test.tsx src/components/layout/AppShell.test.tsx`
Expected: FAIL (AdminLayout still renders a rail).

- [ ] **Step 3: Rewrite `AdminLayout.tsx`**

```tsx
// src/components/layout/AdminLayout.tsx
import React from 'react';
import Box from '@mui/material/Box';
import { PrismThemeProvider } from '../prism';
import { AdminTopBar } from './AdminTopBar';

export interface AdminLayoutProps {
  /** Section title for the top bar. */
  title: string;
  /** Right-aligned top-bar actions (page-specific). */
  actions?: React.ReactNode;
  /**
   * Skip the built-in Prism theming so the content renders under the *live* app
   * theme (used by the UI Manager theme workbench so edits preview in place).
   */
  disablePrismTheme?: boolean;
  children: React.ReactNode;
}

/**
 * The admin content column: a slim top bar over the scrollable page body, on a
 * Prism (dark) canvas. Navigation now lives in the shared shell (AppShell →
 * SideRail / MobileNav); this component owns only the section chrome.
 */
export const AdminLayout: React.FC<AdminLayoutProps> = ({ title, actions, disablePrismTheme = false, children }) => {
  const content = (
    <Box sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <AdminTopBar title={title} actions={actions} />
      <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
        {children}
      </Box>
    </Box>
  );
  return disablePrismTheme ? content : <PrismThemeProvider>{content}</PrismThemeProvider>;
};
```

- [ ] **Step 4: Simplify `AdminTopBar.tsx`**

The shell owns the mobile menu now, so `AdminTopBar` no longer needs its hamburger. Remove the `onMenuClick` prop, its `MenuIcon` import, and the hamburger `<Box component="button">` block; keep the title + actions layout. (If you prefer a smaller diff, leave `onMenuClick` as an unused optional prop — but no caller passes it after this task, so deleting it is cleaner.)

- [ ] **Step 5: Nest admin routes under `AppShell` in `App.tsx`**

Move every route currently in the "Legacy" group into the existing `{ element: <AppShell />, children: [...] }` block, after the garden routes. The result:

```tsx
{
  element: <AppShell />,
  children: [
    // garden
    { path: '/content/:slug', element: <ArticlePage /> },
    { path: '/archive', element: <ArchivePage /> },
    { path: '/recipes', element: <RecipesPage /> },
    { path: '/recipes/:slug', element: <RecipePage /> },
    { path: '/about', element: <AboutPage /> },
    { path: '/experience', element: <ExperiencePage /> },
    { path: '/library', element: <LibraryPage view="shelf" /> },
    { path: '/library/:interestId', element: <LibraryPage view="shelf" /> },
    { path: '/library/:interestId/acquisitions', element: <LibraryPage view="acquisitions" /> },
    { path: '/library/:interestId/taste', element: <LibraryPage view="taste" /> },
    { path: '/about-this-site', element: <AboutThisSitePage /> },
    { path: '/sign-up', element: <SignUpPage /> },
    // studio (formerly "Legacy", now under the shared shell)
    { path: '/articles', element: <ArticleManagerPage /> },
    { path: '/articles/new', element: <ArticleEditorPage /> },
    { path: '/articles/:slug/edit', element: <ArticleEditorPage /> },
    { path: '/recipes/new', element: <RecipeEditorPage /> },
    { path: '/recipes/:slug/edit', element: <RecipeEditorPage /> },
    { path: '/images', element: <ImageManagerPage /> },
    { path: '/ui', element: <UIManagerPage /> },
    { path: '/groups', element: <GroupsPage /> },
    { path: '/admin', element: <AdminPage /> },
    { path: '/manager', element: <ManagerPage /> },
    { path: '/projects', element: <ProjectsPage /> },
    { path: '/projects/:id/develop', element: <ProjectDevelopPage /> },
    { path: '/projects/:id/skills', element: <ProjectSkillsPage /> },
    { path: '/score-definitions', element: <ScoreDefinitionsPage /> },
    { path: '/workflows', element: <WorkflowsPage /> },
    { path: '/workflows/new', element: <WorkflowEditorPage /> },
    { path: '/workflows/:id', element: <WorkflowEditorPage /> },
    { path: '/agents', element: <AgentTeamPage /> },
    { path: '/workspace-roots', element: <WorkspaceRootsPage /> },
  ],
},
```

> Preserve any route that also existed elsewhere (e.g. a `ProjectDetailPage` route if present). Do not drop or reorder within the garden block. `AppShell`'s `<main>` has no padding; `AdminLayout` supplies the admin content padding, and garden pages supply their own — unchanged.

- [ ] **Step 6: Run the full suite**

Run: `npm test -- src/components/layout src/App` then `npm run typecheck`
Expected: PASS. (Deleted-component tests still exist — they pass until Task 5.)

- [ ] **Step 7: Verify in the running app**

Run `npm run dev`, log in, and confirm: on `/manager` there is exactly **one** rail (the shell's), the Studio section is present with the active item highlighted, the content canvas is Prism-dark, and Logout from the account menu works. Navigate `/manager → /recipes` and confirm the rail stays mounted (no full swap).

- [ ] **Step 8: Commit**

```bash
git add src/App.tsx src/components/layout/AdminLayout.tsx src/components/layout/AdminTopBar.tsx src/components/layout/AdminLayout.test.tsx src/components/layout/AppShell.test.tsx
git commit -m "feat(nav): one shell for all inner routes; AdminLayout is content-only"
```

---

## Task 5: Delete absorbed / dead nav components

After Task 4, `AdminNavRail` and `AdminMobileDrawer` are no longer rendered anywhere, and `SideMenu` was already unused.

**Files:**
- Delete: `SideMenu.tsx`, `SideMenu.test.tsx`, `SideMenu.stories.tsx`
- Delete: `AdminNavRail.tsx`, `AdminNavRail.test.tsx`, `AdminNavRail.stories.tsx`
- Delete: `AdminMobileDrawer.tsx`, `AdminMobileDrawer.test.tsx`
- (all under `src/components/layout/`)

- [ ] **Step 1: Confirm nothing imports them**

Run:
```bash
grep -rn "AdminNavRail\|AdminMobileDrawer\|SideMenu\|ADMIN_NAV_ITEMS" src --include='*.ts' --include='*.tsx' | grep -v -E '(AdminNavRail|AdminMobileDrawer|SideMenu)\.(tsx|test\.tsx|stories\.tsx)'
```
Expected: **no output**. (If `ADMIN_NAV_ITEMS` still appears, it was missed — its replacement is `STUDIO_NAV_ITEMS` in `navConfig`.)

- [ ] **Step 2: Delete the files**

```bash
git rm src/components/layout/SideMenu.tsx src/components/layout/SideMenu.test.tsx src/components/layout/SideMenu.stories.tsx \
       src/components/layout/AdminNavRail.tsx src/components/layout/AdminNavRail.test.tsx src/components/layout/AdminNavRail.stories.tsx \
       src/components/layout/AdminMobileDrawer.tsx src/components/layout/AdminMobileDrawer.test.tsx
```

- [ ] **Step 3: Typecheck + test**

Run: `npm run typecheck && npm test -- src/components/layout`
Expected: PASS, no unresolved imports.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore(nav): delete AdminNavRail, AdminMobileDrawer, dead SideMenu"
```

---

## Task 6: Remove dead `AdminLayout` props and simplify the 17 call sites

`AdminLayout` no longer uses `user`/`isAuthenticated`/`login`/`navItems`. Remove them from its interface and from every caller; drop `user` objects computed *solely* for `AdminLayout`.

**Files:**
- Modify: `src/components/layout/AdminLayout.tsx` (props already trimmed in Task 4 — confirm none of the four remain)
- Modify: the 17 pages listed by the grep in Step 1.

- [ ] **Step 1: List the call sites**

Run:
```bash
grep -rln "AdminLayout" src/pages --include='*.tsx' | grep -v '.test.'
```
Expected: 17 files (WorkflowEditorPage, AdminPage, ManagerPage, UIManagerPage, GroupsPage, ImageManagerPage, RecipeEditorPage, ArticleEditorPage, WorkflowsPage, ArticleManagerPage, AgentTeamPage, ProjectsPage, ScoreDefinitionsPage, WorkspaceRootsPage, ProjectDetailPage, ProjectDevelopPage, ProjectSkillsPage).

- [ ] **Step 2: Transform each call site**

In each file: remove `user={user}`, `isAuthenticated={isAuthenticated}`, `login={login}`, and any `navItems={...}` from the `<AdminLayout ...>` opening tag, keeping `title`, `actions`, and `disablePrismTheme`. Then delete any now-unused `const user = userProfile ? {...} : undefined;` block and prune the `useAuth()` destructure to only what the page still uses (e.g. `token`).

Example — `ManagerPage.tsx`:
```tsx
// before
const { isAuthenticated, token, userProfile, login } = useAuth();
const user = userProfile ? { firstName: ..., lastName: ..., realm_access: ... } : undefined;
return <AdminLayout title="Manager" user={user} isAuthenticated={isAuthenticated} login={login}>...
// after
const { token } = useAuth();
return <AdminLayout title="Manager">...
```

Example — `UIManagerPage.tsx` keeps `disablePrismTheme`:
```tsx
<AdminLayout title="..." disablePrismTheme>
```

> Leave each page's other `useAuth()` values that are used elsewhere (e.g. `token` for API calls, `isAuthenticated` if a page branches on it in its body — check each). Only remove what becomes unused. Let `npm run typecheck` and lint (`no-unused-vars`) be your guide.

- [ ] **Step 3: Typecheck, lint, test**

Run: `npm run typecheck && npm run lint && npm test -- src/pages`
Expected: PASS with no unused-variable errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/AdminLayout.tsx src/pages
git commit -m "refactor(nav): drop dead auth/nav props from AdminLayout call sites"
```

---

## Task 7: E2E coverage + full CI

**Files:**
- Modify/Create: an `e2e/` spec (extend the existing nav spec if present, else `e2e/nav.spec.ts`).

- [ ] **Step 1: Add a logged-out structural e2e**

```ts
// e2e/nav.spec.ts (or extend existing)
import { test, expect } from '@playwright/test';

test('one persistent rail with garden facets, no Studio when logged out', async ({ page }) => {
  await page.goto('/archive');
  const rail = page.getByRole('navigation', { name: 'Primary' });
  await expect(rail).toBeVisible();
  await expect(rail.getByRole('link', { name: 'Recipes' })).toBeVisible();
  await expect(rail.getByRole('button', { name: /studio/i })).toHaveCount(0);
  await expect(rail.getByRole('button', { name: /login/i })).toBeVisible();
  // rail persists across garden navigation
  await rail.getByRole('link', { name: 'Recipes' }).click();
  await expect(rail).toBeVisible();
});
```

> Logged-in / Logout e2e is best-effort given the known Auth0-harness gap (see `personal-recommender-frontend` memory); the component tests in Tasks 2–3 cover the authenticated rail. Do not block on an Auth0 login flow here.

- [ ] **Step 2: Run e2e**

Run: `npm run test:e2e -- nav`
Expected: PASS. (If the dev/preview server or Auth0 gating blocks it, note the skip and rely on unit coverage.)

- [ ] **Step 3: Full CI + final commit**

Run: `npm run ci`
Expected: typecheck + lint + unit all green.

```bash
git add e2e
git commit -m "test(nav): e2e for the unified persistent rail"
```

---

## Self-Review notes (for the executor)

- **Role strings:** Task 1/2/3 assume jsdom host `localhost` → `localhost:admin` / `localhost:writer`. Verify against `src/auth/authHelpers.ts` (`getAdminRole`/`getWriterRole`) before writing assertions; adjust the role literals if the test host differs.
- **Render helpers:** Tasks 2–4 reuse each test file's existing render helper — read the file before extending, and widen the helper's props if it doesn't already forward `user`/`logout`.
- **Buildable at every commit:** Task 4 intentionally couples the router move with the `AdminLayout` strip; do not split them. Tasks 5 and 6 are pure cleanup and each keep the suite green.
- **Prism theme:** only `AdminLayout` (content) wraps `PrismThemeProvider`; the rail stays under the app theme by design (spec Open Decision #1). If the light-app + dark-Studio seam reads as off in Step 7 of Task 4, that's the flagged fast-follow — not a plan bug.
