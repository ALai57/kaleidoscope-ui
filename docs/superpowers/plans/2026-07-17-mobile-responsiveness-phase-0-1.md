# Mobile Responsiveness — Phase 0 + 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the public reader usable on a phone — replace the mystery-dot side rail below `md` with a labeled mobile nav (bottom tabs + drawer), and reorient the landing hero into the optical-bench prism layout.

**Architecture:** A `useIsMobile()` hook (MUI `md` breakpoint) is the single mobile/desktop switch. `AppShell` renders a new `MobileNav` below `md` and the existing `SideRail` at/above `md`. `RefractionHero` renders a new `RefractionHeroMobile` (optical bench) below `md` and its existing desktop diagram above. All destinations/colors come from the shared `GARDEN_FACETS` + `facetColor`; no facet list is duplicated.

**Tech Stack:** React 19 + TypeScript, MUI 9 (`Box`, `useMediaQuery`, `@mui/icons-material`), React Router 7, Emotion `sx`, Vitest + Testing Library (jsdom), Playwright (e2e). Design tokens via `theme.tokens` (Prism).

## Global Constraints

- **Node 22**; install with `npm ci` (`legacy-peer-deps=true`, `engine-strict=true`).
- **No hardcoded hex in components** — facet colors via `facetColor(tokens, colorIndex, fallback)`; other colors via `theme.palette` / `theme.tokens`. The one allowed exception is the `FALLBACKS` spectrum array, which must carry the `// eslint-disable-next-line no-restricted-syntax` comment exactly as `SideRail` does.
- **Mobile/desktop switch is `md` (900px)** via `theme.breakpoints.down('md')`. Do not introduce a breakpoint token.
- **Mono type** from `tokens.typography.mono` (fallback `'monospace'`); radius from `tokens.radius`.
- **Accessibility:** every primary nav target is labeled (no icon-only), interactive nav targets have a **44px** minimum hit area, active destination carries `aria-current="page"`, the drawer is a labeled `role="dialog"` closeable by `Esc` and scrim, motion respects `prefers-reduced-motion`.
- **One source of truth for destinations:** `GARDEN_FACETS` from `@/components/home/gardenFacets`.
- Run `npm run ci` (typecheck + lint + test) before pushing. Tests are co-located `*.test.ts(x)`.

---

## File Structure

**Create**
- `src/hooks/useIsMobile.ts` — the `md` mobile/desktop hook. (Task 1)
- `src/hooks/useIsMobile.test.tsx` — hook tests. (Task 1)
- `src/components/layout/MobileNav.tsx` — top bar + bottom tab bar + drawer. (Task 2)
- `src/components/layout/MobileNav.test.tsx` — nav tests. (Task 2)
- `src/components/home/RefractionHeroMobile.tsx` — optical-bench hero. (Task 5)
- `src/components/home/RefractionHeroMobile.test.tsx` — hero tests. (Task 5)
- `e2e/mobile-overflow.spec.ts` — 390px overflow regression. (Task 7)

**Modify**
- `src/components/layout/AppShell.tsx` — render `MobileNav` below `md`. (Task 3)
- `src/components/layout/AppShell.test.tsx` — add mobile-branch test. (Task 3)
- `src/components/layout/SideRail.tsx` — drop the dead `xs` collapse (desktop-only now). (Task 4)
- `src/components/home/RefractionHero.tsx` — switch to mobile variant below `md`. (Task 6)
- `src/components/home/RefractionHero.test.tsx` — add mobile-switch test. (Task 6)

---

## Task 1: `useIsMobile` hook

**Files:**
- Create: `src/hooks/useIsMobile.ts`
- Test: `src/hooks/useIsMobile.test.tsx`

**Interfaces:**
- Produces: `useIsMobile(): boolean` — `true` below the `md` breakpoint.

- [ ] **Step 1: Write the failing test**

`src/hooks/useIsMobile.test.tsx`:

```tsx
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '@/theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useIsMobile } from './useIsMobile';

vi.mock('@mui/material/useMediaQuery', () => ({ default: vi.fn() }));
const mockUseMediaQuery = vi.mocked(useMediaQuery);

const theme = makeTheme(BASE_THEME);
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('useIsMobile', () => {
  it('is true when the viewport is below md', () => {
    mockUseMediaQuery.mockReturnValue(true);
    const { result } = renderHook(() => useIsMobile(), { wrapper });
    expect(result.current).toBe(true);
  });

  it('is false at or above md', () => {
    mockUseMediaQuery.mockReturnValue(false);
    const { result } = renderHook(() => useIsMobile(), { wrapper });
    expect(result.current).toBe(false);
  });

  it('queries the md breakpoint', () => {
    mockUseMediaQuery.mockReturnValue(false);
    renderHook(() => useIsMobile(), { wrapper });
    expect(mockUseMediaQuery).toHaveBeenCalledWith(theme.breakpoints.down('md'));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/hooks/useIsMobile.test.tsx`
Expected: FAIL — `Failed to resolve import "./useIsMobile"`.

- [ ] **Step 3: Write the hook**

`src/hooks/useIsMobile.ts`:

```ts
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * True below the `md` breakpoint (900px) — the app's single mobile/desktop
 * switch. Wrap `useMediaQuery` so components read `useIsMobile()` instead of
 * re-deriving the query, and so the breakpoint lives in one place.
 */
export function useIsMobile(): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/hooks/useIsMobile.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useIsMobile.ts src/hooks/useIsMobile.test.tsx
git commit -m "feat(responsive): add useIsMobile hook (md breakpoint)"
```

---

## Task 2: `MobileNav` component

The mobile navigation chrome: a sticky top bar (mark + active title + menu), a fixed bottom tab bar (four labeled destinations), and a drawer that repeats the destinations and restores the writer/admin links the mobile rail otherwise hides. Largest task; ships as one cohesive nav.

**Files:**
- Create: `src/components/layout/MobileNav.tsx`
- Test: `src/components/layout/MobileNav.test.tsx`

**Interfaces:**
- Consumes: `GARDEN_FACETS`, `facetColor` (`@/components/home/gardenFacets`); `isSiteAdmin`, `isWriter` (`@/auth/authHelpers`); `NavBarUser` (`./navTypes`); `KaleidoscopeMark` (`./KaleidoscopeMark`).
- Produces:
  - `MobileNav: React.FC<MobileNavProps>` where `MobileNavProps = { user?: NavBarUser; isAuthenticated?: boolean; login?: () => void }`.
  - `export const MOBILE_TOPBAR_H = 52` and `export const MOBILE_BOTTOMBAR_H = 60` (px; consumed by `AppShell` in Task 3).

- [ ] **Step 1: Write the failing test**

`src/components/layout/MobileNav.test.tsx`:

```tsx
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '@/theme';
import { getAdminRole, getWriterRole } from '@/auth/authHelpers';
import { MobileNav } from './MobileNav';

const theme = makeTheme(BASE_THEME);

const renderNav = (props: Record<string, unknown> = {}, path = '/recipes') =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <MobileNav {...props} />
      </MemoryRouter>
    </ThemeProvider>
  );

describe('MobileNav', () => {
  it('renders four labeled primary tabs', () => {
    renderNav();
    const nav = screen.getByRole('navigation', { name: /primary/i });
    for (const label of ['Writing', 'Reading', 'Recipes', 'About']) {
      expect(within(nav).getByRole('link', { name: label })).toBeTruthy();
    }
  });

  it('marks the active destination with aria-current', () => {
    renderNav({}, '/recipes');
    const nav = screen.getByRole('navigation', { name: /primary/i });
    expect(within(nav).getByRole('link', { name: 'Recipes' }).getAttribute('aria-current')).toBe('page');
    expect(within(nav).getByRole('link', { name: 'Writing' }).getAttribute('aria-current')).toBeNull();
  });

  it('opens the drawer from the menu button and closes it', () => {
    renderNav();
    expect(screen.queryByRole('dialog', { name: /menu/i })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(screen.getByRole('dialog', { name: /menu/i })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }));
    expect(screen.queryByRole('dialog', { name: /menu/i })).toBeNull();
  });

  it('surfaces writer + admin links in the drawer for a site admin', () => {
    renderNav({ user: { realm_access: { roles: [getAdminRole()] } } });
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    const dialog = screen.getByRole('dialog', { name: /menu/i });
    expect(within(dialog).getByRole('link', { name: 'Experience' })).toBeTruthy();
    expect(within(dialog).getByRole('link', { name: 'Projects' })).toBeTruthy();
    expect(within(dialog).getByRole('link', { name: 'Manager' })).toBeTruthy();
  });

  it('shows only Experience for a writer (no admin links)', () => {
    renderNav({ user: { realm_access: { roles: [getWriterRole()] } } });
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    const dialog = screen.getByRole('dialog', { name: /menu/i });
    expect(within(dialog).getByRole('link', { name: 'Experience' })).toBeTruthy();
    expect(within(dialog).queryByRole('link', { name: 'Manager' })).toBeNull();
  });

  it('calls login from the drawer when unauthenticated', () => {
    const login = vi.fn();
    renderNav({ isAuthenticated: false, login });
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(login).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/layout/MobileNav.test.tsx`
Expected: FAIL — `Failed to resolve import "./MobileNav"`.

- [ ] **Step 3: Write the component**

`src/components/layout/MobileNav.tsx`:

```tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { KaleidoscopeMark } from './KaleidoscopeMark';
import type { NavBarUser } from './navTypes';
import { isSiteAdmin, isWriter } from '@/auth/authHelpers';
import { GARDEN_FACETS, facetColor } from '@/components/home/gardenFacets';

export const MOBILE_TOPBAR_H = 52;
export const MOBILE_BOTTOMBAR_H = 60;
const MIN_TAP = 44;

// eslint-disable-next-line no-restricted-syntax -- bare-MUI fallback spectrum, mirrors SideRail (facetColor prefers tokens.color.categorical)
const FALLBACKS = ['#45D6E8', '#9C90F0', '#E0A73C'];

export interface MobileNavProps {
  user?: NavBarUser | undefined;
  isAuthenticated?: boolean | undefined;
  login?: (() => void) | undefined;
}

interface Dest {
  key: string;
  label: string;
  route: string;
  color: string;
}

const isRouteActive = (pathname: string, route: string): boolean =>
  pathname === route || pathname.startsWith(`${route}/`);

const studioLinkSx = (mono: string, rSm: number): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  minHeight: MIN_TAP,
  px: 1,
  borderRadius: `${rSm}px`,
  textDecoration: 'none',
  color: 'text.secondary',
  fontFamily: mono,
  fontSize: '0.8rem',
  '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
});

export const MobileNav: React.FC<MobileNavProps> = ({ user, isAuthenticated = false, login }) => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const mono = tokens?.typography.mono ?? 'monospace';
  const rSm = tokens?.radius.sm ?? 6;

  const userIsWriter = isWriter(user);
  const userIsAdmin = isSiteAdmin(user);

  const dests: Dest[] = [
    ...GARDEN_FACETS.map((f, i) => ({
      key: f.key,
      label: f.label,
      route: f.route,
      color: facetColor(tokens, f.colorIndex, FALLBACKS[i] ?? FALLBACKS[0]!),
    })),
    { key: 'about', label: 'About', route: '/about', color: theme.palette.success.main },
  ];
  const activeDest = dests.find((d) => isRouteActive(pathname, d.route));

  // Close on navigation; focus the drawer when it opens.
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { if (open) drawerRef.current?.focus(); }, [open]);

  const tabSx = (active: boolean, color: string): SxProps<Theme> => ({
    flex: 1,
    minWidth: 0,
    minHeight: MIN_TAP,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0.4,
    py: 0.75,
    textDecoration: 'none',
    color: active ? 'text.primary' : 'text.secondary',
    fontFamily: mono,
    fontSize: '0.62rem',
    letterSpacing: '0.02em',
    '& .tab-dot': {
      width: 9,
      height: 9,
      borderRadius: '50%',
      bgcolor: color,
      opacity: active ? 1 : 0.5,
      boxShadow: active ? `0 0 8px ${color}` : 'none',
    },
  });

  return (
    <>
      {/* top bar */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          height: MOBILE_TOPBAR_H,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.5,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box component={Link} to="/" aria-label="Home — the prism" sx={{ display: 'inline-flex', alignItems: 'center', color: 'text.primary' }}>
          <KaleidoscopeMark size={24} />
        </Box>
        <Box component="span" sx={{ fontFamily: mono, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.04em' }}>
          {activeDest?.label ?? 'andrewlai'}
        </Box>
        <Box sx={{ flex: 1 }} />
        <Box
          component="button"
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: MIN_TAP,
            height: MIN_TAP,
            border: 'none',
            bgcolor: 'transparent',
            color: 'text.primary',
            cursor: 'pointer',
            borderRadius: `${rSm}px`,
          }}
        >
          <MenuIcon />
        </Box>
      </Box>

      {/* bottom tab bar */}
      <Box
        component="nav"
        aria-label="Primary"
        sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1100,
          height: MOBILE_BOTTOMBAR_H,
          display: 'flex',
          bgcolor: alpha(theme.palette.background.paper, 0.92),
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        {dests.map((d) => {
          const active = activeDest?.key === d.key;
          return (
            <Box
              key={d.key}
              component={Link}
              to={d.route}
              aria-label={d.label}
              aria-current={active ? 'page' : undefined}
              sx={tabSx(active, d.color)}
            >
              <Box component="span" className="tab-dot" />
              <Box component="span">{d.label}</Box>
            </Box>
          );
        })}
      </Box>

      {/* drawer */}
      {open && (
        <Box onClick={() => setOpen(false)} sx={{ position: 'fixed', inset: 0, zIndex: 1200, bgcolor: 'rgba(0,0,0,0.45)' }}>
          <Box
            ref={drawerRef}
            tabIndex={-1}
            role="dialog"
            aria-label="Menu"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
              width: '78%',
              maxWidth: 320,
              bgcolor: 'background.paper',
              borderLeft: '1px solid',
              borderColor: 'divider',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              outline: 'none',
              overflowY: 'auto',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box component="span" sx={{ fontFamily: mono, fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'text.secondary' }}>Garden</Box>
              <Box sx={{ flex: 1 }} />
              <Box
                component="button"
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                sx={{ display: 'inline-flex', width: MIN_TAP, height: MIN_TAP, alignItems: 'center', justifyContent: 'center', border: 'none', bgcolor: 'transparent', color: 'text.primary', cursor: 'pointer' }}
              >
                <CloseIcon fontSize="small" />
              </Box>
            </Box>

            {dests.map((d) => (
              <Box
                key={d.key}
                component={Link}
                to={d.route}
                aria-current={activeDest?.key === d.key ? 'page' : undefined}
                sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minHeight: MIN_TAP, px: 1, borderRadius: `${rSm}px`, textDecoration: 'none', color: 'text.primary', fontFamily: mono, fontSize: '0.9rem', '&:hover': { bgcolor: 'action.hover' } }}
              >
                <Box component="span" sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: d.color, flex: 'none' }} />
                {d.label}
              </Box>
            ))}

            {(userIsWriter || userIsAdmin) && (
              <>
                <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 1, pt: 1 }}>
                  <Box component="span" sx={{ fontFamily: mono, fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'text.secondary' }}>Studio</Box>
                </Box>
                {userIsWriter && (
                  <Box component={Link} to="/experience" sx={studioLinkSx(mono, rSm)}>Experience</Box>
                )}
                {userIsAdmin && (
                  <>
                    <Box component={Link} to="/projects" sx={studioLinkSx(mono, rSm)}>Projects</Box>
                    <Box component={Link} to="/manager" sx={studioLinkSx(mono, rSm)}>Manager</Box>
                  </>
                )}
              </>
            )}

            <Box sx={{ flex: 1 }} />

            <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1 }}>
              {isAuthenticated ? (
                <Box component={Link} to="/admin" aria-label="admin" sx={{ display: 'flex', alignItems: 'center', gap: 1, minHeight: MIN_TAP, textDecoration: 'none', color: 'text.primary', fontFamily: mono, fontSize: '0.85rem' }}>
                  <Avatar alt={user?.firstName ?? 'User'} src="/static/images/nav-bar/user.svg" sx={{ width: 30, height: 30 }} />
                  {user?.firstName ?? 'Account'}
                </Box>
              ) : (
                <Box
                  component="button"
                  type="button"
                  onClick={login}
                  aria-label="login"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, minHeight: MIN_TAP, width: '100%', border: '1px solid', borderColor: 'divider', borderRadius: `${rSm}px`, bgcolor: 'transparent', color: 'text.secondary', fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', px: 1.5, cursor: 'pointer', '&:hover': { color: 'primary.main', borderColor: 'primary.main' } }}
                >
                  <Avatar sx={{ width: 26, height: 26, fontFamily: mono, fontWeight: 700, color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.14), fontSize: '0.8rem' }}>?</Avatar>
                  Login
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/layout/MobileNav.test.tsx`
Expected: PASS (6 tests).

- [ ] **Step 5: Typecheck + lint the new file**

Run: `npm run typecheck && npm run lint`
Expected: no errors. (If lint flags the `FALLBACKS` hex, confirm the `eslint-disable-next-line no-restricted-syntax` comment is on the line directly above it.)

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/MobileNav.tsx src/components/layout/MobileNav.test.tsx
git commit -m "feat(responsive): add MobileNav (bottom tabs + drawer)"
```

---

## Task 3: `AppShell` renders `MobileNav` below `md`

**Files:**
- Modify: `src/components/layout/AppShell.tsx`
- Test: `src/components/layout/AppShell.test.tsx`

**Interfaces:**
- Consumes: `useIsMobile` (Task 1); `MobileNav`, `MOBILE_BOTTOMBAR_H` (Task 2).

- [ ] **Step 1: Write the failing test** — replace the body of `AppShell.test.tsx` with:

```tsx
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '@/theme';
import { useIsMobile } from '@/hooks/useIsMobile';
import { AppShell } from './AppShell';

vi.mock('@/auth/useAuth', () => ({
  useAuth: () => ({ isAuthenticated: false, isLoading: false, token: undefined, userProfile: null, login: vi.fn(), logout: vi.fn() }),
}));
vi.mock('@/hooks/useIsMobile', () => ({ useIsMobile: vi.fn(() => false) }));
const mockUseIsMobile = vi.mocked(useIsMobile);

const theme = makeTheme(BASE_THEME);

const renderShell = () =>
  rtlRender(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={['/recipes']}>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/recipes" element={<div>recipes content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );

describe('AppShell', () => {
  it('renders the SideRail alongside content at/above md', () => {
    mockUseIsMobile.mockReturnValue(false);
    renderShell();
    // SideRail renders the "andrewlai" wordmark label; MobileNav does not.
    expect(screen.getByText('andrewlai')).toBeTruthy();
    expect(screen.getByText('recipes content')).toBeTruthy();
  });

  it('renders the MobileNav below md', () => {
    mockUseIsMobile.mockReturnValue(true);
    renderShell();
    const nav = screen.getByRole('navigation', { name: /primary/i });
    expect(nav.querySelectorAll('a').length).toBe(4); // four bottom tabs
    expect(screen.getByRole('button', { name: /open menu/i })).toBeTruthy();
    expect(screen.getByText('recipes content')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify the mobile test fails**

Run: `npm test -- src/components/layout/AppShell.test.tsx`
Expected: FAIL — the second test can't find the menu button (AppShell still always renders `SideRail`).

- [ ] **Step 3: Update `AppShell.tsx`** — replace the whole file with:

```tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { SideRail } from './SideRail';
import { MobileNav, MOBILE_BOTTOMBAR_H } from './MobileNav';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAuth } from '@/auth/useAuth';

/**
 * Layout route for the garden's inner pages. At/above `md` it renders the
 * persistent Prism SideRail beside the routed content; below `md` it swaps the
 * rail for the MobileNav (top bar + bottom tab bar + drawer). Landing routes
 * (`/`, `/home`) are intentionally NOT wrapped by this shell — the hero is their
 * navigation.
 */
export const AppShell: React.FC = () => {
  const isMobile = useIsMobile();
  const { isAuthenticated, userProfile, login } = useAuth();
  const user = userProfile
    ? { firstName: userProfile.firstName ?? undefined, lastName: userProfile.lastName ?? undefined, realm_access: userProfile.realm_access }
    : undefined;

  if (isMobile) {
    return (
      <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
        <MobileNav user={user} isAuthenticated={isAuthenticated} login={login} />
        <Box component="main" sx={{ minWidth: 0, pb: `${MOBILE_BOTTOMBAR_H}px` }}>
          <Outlet />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <SideRail user={user} isAuthenticated={isAuthenticated} login={login} />
      <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/layout/AppShell.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/AppShell.tsx src/components/layout/AppShell.test.tsx
git commit -m "feat(responsive): AppShell renders MobileNav below md"
```

---

## Task 4: Make `SideRail` desktop-only (remove dead `xs` collapse)

Below `md`, `AppShell` no longer renders `SideRail`, so its `xs` mystery-dot state is dead code. Remove it so the rail is unambiguously the desktop layout.

**Files:**
- Modify: `src/components/layout/SideRail.tsx`

**Interfaces:**
- No signature change. `SideRailProps` unchanged.

- [ ] **Step 1: Widen the rail** — in `SideRail.tsx`, change the nav container width from responsive to fixed:

Find:
```tsx
        width: { xs: 64, sm: 214 },
```
Replace with:
```tsx
        width: 214,
```

- [ ] **Step 2: Always show the wordmark label** — find:
```tsx
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }, fontFamily: mono, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.16em' }}>
          andrewlai
        </Box>
```
Replace with:
```tsx
        <Box component="span" sx={{ fontFamily: mono, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.16em' }}>
          andrewlai
        </Box>
```

- [ ] **Step 3: Always show the facet + About labels** — three distinct single occurrences of a label span are guarded by `display: { xs: 'none', sm: 'inline' }` (the facet map, the About item, and the Login label). Replace each individually:

Find (single occurrence, inside the facet `.map`):
```tsx
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>{f.label}</Box>
```
Replace:
```tsx
            <Box component="span">{f.label}</Box>
```
Find:
```tsx
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>About</Box>
```
Replace:
```tsx
        <Box component="span">About</Box>
```
Find:
```tsx
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Login</Box>
```
Replace:
```tsx
            <Box component="span">Login</Box>
```

- [ ] **Step 4: Always show the writer/admin tools group** — find:
```tsx
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1, display: { xs: 'none', sm: 'block' } }}>
```
Replace:
```tsx
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1 }}>
```

- [ ] **Step 5: Left-align the auth row** — find:
```tsx
      <Box sx={{ pt: 1, display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
```
Replace:
```tsx
      <Box sx={{ pt: 1, display: 'flex', justifyContent: 'flex-start' }}>
```

- [ ] **Step 6: Run the SideRail tests**

Run: `npm test -- src/components/layout/SideRail.test.tsx`
Expected: PASS (existing assertions target the desktop labels, which are now always present).

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/SideRail.tsx
git commit -m "refactor(responsive): SideRail is desktop-only (drop dead xs collapse)"
```

---

## Task 5: `RefractionHeroMobile` — the optical bench

A single fluid SVG (viewBox `298×624`): centered source, one mirror turning the beam left into a top-left prism, and three colored rays curving down onto stacked facet cards. Cards are drawn inside `<Link>` wrappers (same pattern as the desktop hero) so the whole thing scales together. Static for this phase; a load animation is a deferred polish follow-up (see §6.2 of the spec).

**Files:**
- Create: `src/components/home/RefractionHeroMobile.tsx`
- Test: `src/components/home/RefractionHeroMobile.test.tsx`

**Interfaces:**
- Consumes: `GARDEN_FACETS`, `facetColor` (`./gardenFacets`).
- Produces: `default export RefractionHeroMobile: React.FC` — renders `role="group"` labelled scene with one `<Link>` per facet, each `aria-label`ed `"{label} — {description}"`, and a `data-testid="refraction-hero-mobile"` on the root SVG.

- [ ] **Step 1: Write the failing test**

`src/components/home/RefractionHeroMobile.test.tsx`:

```tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test/testUtils';
import RefractionHeroMobile from './RefractionHeroMobile';

describe('RefractionHeroMobile', () => {
  it('renders a link for each garden facet with its route', () => {
    render(<RefractionHeroMobile />);
    expect(screen.getByRole('link', { name: /Writing/ }).getAttribute('href')).toBe('/archive');
    expect(screen.getByRole('link', { name: /Reading/ }).getAttribute('href')).toBe('/library');
    expect(screen.getByRole('link', { name: /Recipes/ }).getAttribute('href')).toBe('/recipes');
  });

  it('gives each facet an accessible name that includes its description', () => {
    render(<RefractionHeroMobile />);
    expect(screen.getByRole('link', { name: /essays, talks & notes/ })).toBeTruthy();
  });

  it('labels the scene as a group for assistive tech', () => {
    render(<RefractionHeroMobile />);
    expect(screen.getByRole('group', { name: /prism/i })).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/home/RefractionHeroMobile.test.tsx`
Expected: FAIL — `Failed to resolve import "./RefractionHeroMobile"`.

- [ ] **Step 3: Write the component**

`src/components/home/RefractionHeroMobile.tsx`:

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { GARDEN_FACETS, facetColor } from './gardenFacets';

// eslint-disable-next-line no-restricted-syntax -- bare-MUI fallback spectrum, mirrors RefractionHero
const FALLBACKS = ['#45D6E8', '#9C90F0', '#E0A73C']; // writing / reading / recipes

// Per-facet card top (y) and the curved ray from the prism base (50,131) to the
// card's left-edge anchor at (94, top+48). Tuned in the approved prototype.
const CARDS = [
  { top: 168, ray: 'M50,131 C58,176 78,214 94,216' },
  { top: 300, ray: 'M50,131 C52,244 78,346 94,348' },
  { top: 432, ray: 'M50,131 C54,300 80,478 94,480' },
];

const RefractionHeroMobile: React.FC = () => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const mono = tokens?.typography.mono ?? 'monospace';
  const ink1 = tokens?.color.text.primary ?? theme.palette.text.primary;
  const ink3 = tokens?.color.text.disabled ?? theme.palette.text.disabled;
  const surface = tokens?.color.surface.raised ?? theme.palette.background.paper;
  const border = tokens?.color.border.strong ?? theme.palette.divider;
  const accent = tokens?.color.brand.primary ?? theme.palette.primary.main;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 3, px: 2 }}>
      <Box
        component="svg"
        data-testid="refraction-hero-mobile"
        viewBox="0 0 298 624"
        role="group"
        aria-label="A prism refracting one light into three garden sections"
        sx={{ width: '100%', maxWidth: 420, height: 'auto', display: 'block' }}
      >
        {/* source = me, centered top */}
        <circle cx="149" cy="44" r="15" fill={accent} />
        {/* eslint-disable-next-line no-restricted-syntax -- fixed dark on-color monogram over the bright accent disc */}
        <text x="149" y="49" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="600" fill="#0A0E15">A</text>
        <text x="149" y="78" textAnchor="middle" fontFamily={mono} fontSize="9.5" letterSpacing="0.14em" fill={ink3}>ANDREW S LAI</text>

        {/* bench: beam down -> mirror -> left -> prism (decorative) */}
        <g aria-hidden="true">
          <path d="M149,90 L149,116 L52,116" fill="none" stroke={ink3} strokeWidth="1.6" strokeLinejoin="miter" opacity="0.6" />
          <line x1="140" y1="125" x2="158" y2="107" stroke={ink3} strokeWidth="3.4" strokeLinecap="round" />
          <polygon points="44,100 60,132 28,132" fill={`${accent}14`} stroke={accent} strokeWidth="1.3" />
        </g>

        {/* dispersed facet rays + cards */}
        {GARDEN_FACETS.map((f, i) => {
          const c = facetColor(tokens, f.colorIndex, FALLBACKS[i] ?? FALLBACKS[0]!);
          const card = CARDS[i] ?? CARDS[0]!;
          const top = card.top;
          const anchorY = top + 48;
          return (
            <Box
              key={f.key}
              component={Link}
              to={f.route}
              className="facet"
              aria-label={`${f.label} — ${f.description}`}
              sx={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              <path d={card.ray} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" />
              <circle cx="94" cy={anchorY} r="5" fill={c} />
              <rect x="94" y={top} width="192" height="96" rx="12" fill={surface} stroke={border} />
              <rect x="94" y={top} width="4" height="96" rx="2" fill={c} />
              <text x="112" y={top + 34} fontFamily={mono} fontSize="17" fontWeight="600" fill={ink1}>{f.label}</text>
              <text x="112" y={top + 56} fontFamily={theme.typography.fontFamily} fontSize="12" fill={ink3}>{f.description}</text>
              <text x="112" y={top + 76} fontFamily={mono} fontSize="12" fill={c}>{f.route}</text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default RefractionHeroMobile;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/home/RefractionHeroMobile.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/RefractionHeroMobile.tsx src/components/home/RefractionHeroMobile.test.tsx
git commit -m "feat(responsive): add RefractionHeroMobile (optical-bench hero)"
```

---

## Task 6: `RefractionHero` switches to the mobile variant below `md`

**Files:**
- Modify: `src/components/home/RefractionHero.tsx`
- Test: `src/components/home/RefractionHero.test.tsx`

**Interfaces:**
- Consumes: `useIsMobile` (Task 1); `RefractionHeroMobile` (Task 5).

- [ ] **Step 1: Add the mobile-switch test** — at the top of `RefractionHero.test.tsx`, add a mock for `useIsMobile` (default desktop) alongside the existing `useMediaQuery` mock. Insert after the existing `vi.mock('@mui/material/useMediaQuery', ...)` line:

```tsx
import { useIsMobile } from '@/hooks/useIsMobile';
vi.mock('@/hooks/useIsMobile', () => ({ useIsMobile: vi.fn(() => false) }));
const mockUseIsMobile = vi.mocked(useIsMobile);
```

Then, inside the existing `beforeEach`, add a line resetting it to desktop so the existing tests keep exercising the desktop scene:

```tsx
  mockUseIsMobile.mockReturnValue(false); // desktop scene by default
```

Then add this test to the `describe('RefractionHero', ...)` block:

```tsx
  it('renders the mobile optical-bench hero below md', () => {
    mockUseIsMobile.mockReturnValue(true);
    render(<RefractionHero />);
    expect(screen.getByTestId('refraction-hero-mobile')).toBeTruthy();
    // links still present and correct in the mobile variant
    expect(screen.getByRole('link', { name: /Writing/ }).getAttribute('href')).toBe('/archive');
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/home/RefractionHero.test.tsx`
Expected: FAIL — the new test can't find `refraction-hero-mobile` (RefractionHero always renders the desktop scene).

- [ ] **Step 3: Wire the switch into `RefractionHero.tsx`**

Add the imports near the other imports at the top of the file:

```tsx
import { useIsMobile } from '@/hooks/useIsMobile';
import RefractionHeroMobile from './RefractionHeroMobile';
```

Find the reduced-motion hook line (the last hook call before the derived constants):

```tsx
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');
```

Insert immediately after it (after all hook calls, before the `const rowY = ...` computations):

```tsx
  const isMobile = useIsMobile();
  if (isMobile) return <RefractionHeroMobile />;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/home/RefractionHero.test.tsx`
Expected: PASS (existing desktop tests + the new mobile test).

- [ ] **Step 5: Commit**

```bash
git add src/components/home/RefractionHero.tsx src/components/home/RefractionHero.test.tsx
git commit -m "feat(responsive): RefractionHero renders mobile bench below md"
```

---

## Task 7: e2e — no horizontal overflow at 390px

The automated form of the manual smell that found this work. Covers the Phase-1 public routes (`/experience` and `/library` overflow today and are fixed in Phase 2 — deliberately excluded here).

**Files:**
- Create: `e2e/mobile-overflow.spec.ts`

- [ ] **Step 1: Write the spec**

`e2e/mobile-overflow.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

// iPhone-12-class portrait width — the viewport where the audit found the breakage.
test.use({ viewport: { width: 390, height: 844 } });

const routes = ['/', '/about', '/recipes'];

for (const route of routes) {
  test(`no horizontal overflow at 390px: ${route}`, async ({ page }) => {
    await page.goto(route);
    // Let the SPA render its shell (API may be unavailable locally; the layout still lays out).
    await page.waitForTimeout(800);
    const overflows = await page.evaluate(() => {
      const de = document.documentElement;
      return de.scrollWidth > de.clientWidth + 1;
    });
    expect(overflows).toBe(false);
  });
}
```

- [ ] **Step 2: Run the e2e spec**

Run: `npm run test:e2e -- mobile-overflow`
Expected: PASS (3 tests). Playwright starts the dev server automatically (`webServer` in `playwright.config.ts`). No backend is required — these routes render their shell without overflow.

- [ ] **Step 3: Commit**

```bash
git add e2e/mobile-overflow.spec.ts
git commit -m "test(responsive): e2e guard against 390px horizontal overflow"
```

---

## Final verification

- [ ] **Run the full CI gate**

Run: `npm run ci`
Expected: `typecheck` + `lint` + `test` all pass.

- [ ] **Manual smoke (optional but recommended).** `npm run dev`, open the app, and use browser devtools device mode at 390px on `/`, `/about`, `/recipes`:
  - `/` shows the optical-bench hero (centered source → mirror → prism → curved rays to three cards); tapping a card navigates.
  - `/about` and `/recipes` show the top bar + bottom tab bar (four labeled tabs, active one lit); the menu opens the drawer; the drawer shows Login (logged out) or the studio links (logged in as writer/admin).
  - No horizontal scroll on any of the three.

---

## Self-review notes (coverage vs. spec)

- **§5.1 breakpoint `md`** → Task 1 (`useIsMobile`), Global Constraints.
- **§5.2 `useIsMobile`** → Task 1.
- **§5.3 44px tap targets** → `MIN_TAP` used on every interactive target in Task 2.
- **§5.4 `MobileNav` (top bar + bottom tabs + drawer, admin links restored, tokens, `GARDEN_FACETS`)** → Task 2.
- **§6.1 `SideRail` responsive / dead-state removed** → Task 3 (switch) + Task 4 (cleanup).
- **§6.2 `RefractionHero` optical bench, tokens, single-apex non-crossing rays** → Tasks 5–6. *Load animation deferred to a follow-up (noted in Task 5), consistent with "ship the static reorientation first."*
- **§9 overflow regression e2e + unit tests** → Task 7 (e2e) + per-task unit tests. `/experience` and `/library` overflow coverage lands with their Phase-2 fixes.
- **§10 guardrails (labels, aria-current, focus/Esc drawer, reduced motion, no hardcoded hex)** → Tasks 2, 5; Global Constraints.

Not in this plan (correctly — later phases): Phase 2 content pages (Experience/Library reflow, legacy `AppShell` migration) and Phase 3 admin.
