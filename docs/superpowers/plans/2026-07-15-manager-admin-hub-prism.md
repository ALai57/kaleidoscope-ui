# Manager / Admin Hub → Prism (P2 slice 4) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the `/manager` capability hub and the `/admin` session panel into the Prism voice — a `PrismThemeProvider`-wrapped dark canvas, mono eyebrow, Prism capability cards, a live `StatTile` strip on the hub, and a re-skinned admin/login panel.

**Architecture:** Two independent page re-skins that mount `PrismThemeProvider` around the content below the light `NavBar` (fill-height flex pattern) and reuse existing common primitives (`SurfaceCard`, `StatTile`, `layout/Button`) — no new shared component. The hub gains a read-only `StatTile` strip fed by existing list endpoints via TanStack Query.

**Tech Stack:** React 18 + TS + Vite, MUI 6 + Emotion, TanStack Query, Vitest + Testing Library (jsdom), Storybook 8.

## Global Constraints

- Node 22; run `npm run ci` (typecheck + lint + test) green before push; commit after each task.
- **No raw color literals** (lint `no-restricted-syntax`; exempt: `src/theme/**`, tests, stories). Use `theme.palette.*` / `theme.tokens.*` / `alpha(...)`.
- **Token-driven Prism voice:** mono via `theme.tokens?.typography.mono ?? 'monospace'`; motion via `theme.tokens?.motion.duration.base` / `theme.tokens?.motion.easing.springSettle` with fallbacks; tinted fills via `alpha(theme.palette.<tone>.main, …)`. No new `prism/*` primitive.
- **`PrismThemeProvider` wraps only the content below `NavBar`.** Fill-height: outer page `Box` = `minHeight:'100vh'; display:'flex'; flexDirection:'column'`; wrapped content `Box` = `flex:1; bgcolor:'background.default'`.
- **Preserve contracts (covered by existing tests):** all six `ManagerPage` capability links — name text, `aria-label`, and `to` href — intact; `AdminPage`'s `data-testid="admin-panel"` / `data-testid="login-panel"`, the `Welcome …` / Login / Logout copy, and login/logout wiring intact; keep the `isLoading` gate.
- **Stats read-only:** counts via existing `getBranches` / `getImageMetadata` / `getProjects` (query keys `['branches']` / `['images']` / `['projects']` — shared with the manager pages). No mutations, no new endpoints. API access only through `src/api/*`.

---

### Task 1: ManagerPage — Prism wrap, eyebrow, capability card re-skin

Re-skin the hub's shell and cards (no stats yet — Task 2 adds them). Presentation-only.

**Files:**
- Modify: `src/pages/ManagerPage.tsx` (full rewrite of the component; `CAPABILITIES` data unchanged)
- Test: `src/pages/ManagerPage.test.tsx` (existing assertions must keep passing; no wrapper change this task)

**Interfaces:**
- Consumes: `SurfaceCard` from `@/components/common/SurfaceCard` (`interactive?`, `sx`, children); `PrismThemeProvider` from `@/components/prism`; `NavBar`; `useAuth`.
- Produces: default-exported `ManagerPage`; a page-local `ManagerCard` (Task 2 leaves it untouched and inserts `HubStats` above the grid).

- [ ] **Step 1: Rewrite `ManagerPage.tsx`**

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme, alpha } from '@mui/material/styles';
import { NavBar } from '../components/layout/NavBar';
import { SurfaceCard } from '../components/common/SurfaceCard';
import { PrismThemeProvider } from '../components/prism';
import { useAuth } from '../auth/useAuth';

// ── Manager capabilities ───────────────────────────────────────────────────

interface Capability {
  name: string;
  description: string;
  src: string;
  alt: string;
  to: string;
}

const CAPABILITIES: Capability[] = [
  {
    name: 'Articles',
    description: 'Create and manage Articles',
    src: '/static/images/writing.svg',
    alt: 'Manage articles',
    to: '/articles',
  },
  {
    name: 'Recipes',
    description: 'Scrape, edit, search, and share Recipes',
    src: '/static/images/writing.svg',
    alt: 'Manage recipes',
    to: '/recipes',
  },
  {
    name: 'Images',
    description: 'Create and manage Images',
    src: '/static/images/images.svg',
    alt: 'Manage images',
    to: '/images',
  },
  {
    name: 'Audiences',
    description: 'Control who has access to your content by defining an Audience',
    src: '/static/images/audiences.svg',
    alt: 'Manage audiences',
    to: '/groups',
  },
  {
    name: 'UI Customization',
    description: 'Customize the look and feel of the site',
    src: '/static/images/audiences.svg',
    alt: 'Manage UI Customization',
    to: '/ui',
  },
  {
    name: 'Projects',
    description: 'Create and manage Projects',
    src: '/static/images/project-management-logo.svg',
    alt: 'Manage projects',
    to: '/projects',
  },
];

// ── Capability card ─────────────────────────────────────────────────────────

const ManagerCard: React.FC<{ capability: Capability }> = ({ capability }) => {
  const theme = useTheme();
  const mono = theme.tokens?.typography.mono ?? 'monospace';
  const dur = theme.tokens?.motion.duration.base ?? 250;
  const ease = theme.tokens?.motion.easing.springSettle ?? 'ease';

  return (
    <SurfaceCard
      interactive
      sx={{
        height: '100%',
        transition: `box-shadow 0.2s ${ease}, transform ${dur}ms ${ease}`,
        // Only translate when the user hasn't asked to reduce motion, so
        // reduced-motion users get no movement at all (not just no easing).
        '@media (prefers-reduced-motion: no-preference)': {
          '&:hover': { transform: 'translateY(-2px)' },
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={capability.to}
        aria-label={capability.name}
        sx={{
          height: '100%',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            mb: 1.5,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: (t) => alpha(t.palette.primary.main, 0.12),
            border: 1,
            borderColor: (t) => alpha(t.palette.primary.main, 0.3),
          }}
        >
          <Box
            component="img"
            src={capability.src}
            alt={capability.alt}
            sx={{ width: 24, height: 24, objectFit: 'contain' }}
          />
        </Box>
        <Typography
          component="div"
          sx={{ fontFamily: mono, fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.02em' }}
        >
          {capability.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {capability.description}
        </Typography>
      </CardActionArea>
    </SurfaceCard>
  );
};

// ── Eyebrow header ──────────────────────────────────────────────────────────

const HubHeader: React.FC = () => (
  <Box sx={{ mb: 3 }}>
    <Box
      component="p"
      sx={(t) => ({
        m: 0,
        fontFamily: t.tokens?.typography.mono ?? 'monospace',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'primary.main',
      })}
    >
      CONTROL
    </Box>
    <Typography
      component="h1"
      sx={(t) => ({
        m: 0,
        mt: 0.5,
        fontFamily: t.tokens?.typography.mono ?? 'monospace',
        fontWeight: 700,
        fontSize: '1.6rem',
        letterSpacing: '-0.01em',
      })}
    >
      Manager
    </Typography>
  </Box>
);

// ── Page ───────────────────────────────────────────────────────────────────

const ManagerPage: React.FC = () => {
  const { isAuthenticated, userProfile, login, logout } = useAuth();

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <PrismThemeProvider>
        <Box id="primary-content" sx={{ flex: 1, bgcolor: 'background.default', py: 4 }}>
          <Container>
            <HubHeader />
            <Box
              sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              }}
            >
              {CAPABILITIES.map((capability) => (
                <ManagerCard key={capability.name} capability={capability} />
              ))}
            </Box>
          </Container>
        </Box>
      </PrismThemeProvider>
    </Box>
  );
};

export default ManagerPage;
```

- [ ] **Step 2: Run the existing tests to confirm the re-skin preserves every link**

Run: `npx vitest run src/pages/ManagerPage.test.tsx`
Expected: PASS (5 tests) — the capability names, `/articles`/`/images`/`/groups`/`/projects` hrefs, and `aria-label`s are unchanged, so the existing assertions still hold. If any fail, the re-skin dropped a contract — fix before continuing.

- [ ] **Step 3: Typecheck + lint the changed file**

Run: `npm run typecheck && npx eslint src/pages/ManagerPage.tsx`
Expected: clean (no raw color literals — the tints use `alpha(...)`).

- [ ] **Step 4: Commit**

```bash
git add src/pages/ManagerPage.tsx
git commit -m "feat(manager): Prism capability cards + mono hub header"
```

---

### Task 2: ManagerPage — live StatTile stats strip

Add a read-only counts strip (Articles / Images / Projects) above the capability grid.

**Files:**
- Modify: `src/pages/ManagerPage.tsx` (add `HubStats`; render it between `HubHeader` and the grid; new imports)
- Test: `src/pages/ManagerPage.test.tsx` (add `QueryClientProvider` + mock the three API modules; assert the counts render)

**Interfaces:**
- Consumes: `StatTile` from `@/components/common/StatTile` (`label`, `value`); `useQuery`; `getBranches` (`@/api/articles`), `getImageMetadata` (`@/api/images`), `getProjects` (`@/api/projects`); `token` from `useAuth`.
- Produces: page-local `HubStats`.

- [ ] **Step 1: Add the failing test for the stats strip**

Replace `src/pages/ManagerPage.test.tsx` entirely with:

```tsx
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ManagerPage from './ManagerPage';

vi.mock('../auth/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    token: 'test-token',
    userProfile: { firstName: 'Admin' },
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

// Stat-strip data sources — fixed-length arrays so the counts are deterministic.
vi.mock('../api/articles', () => ({
  getBranches: vi.fn().mockResolvedValue(new Array(12).fill({})),
}));
vi.mock('../api/images', () => ({
  getImageMetadata: vi.fn().mockResolvedValue(new Array(47).fill({})),
}));
vi.mock('../api/projects', () => ({
  getProjects: vi.fn().mockResolvedValue(new Array(5).fill({})),
}));

const theme = createTheme();

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('ManagerPage', () => {
  it('renders all navigation links', () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    expect(screen.getByText('Articles')).toBeTruthy();
    expect(screen.getByText('Images')).toBeTruthy();
    expect(screen.getByText('Audiences')).toBeTruthy();
    expect(screen.getByText('UI Customization')).toBeTruthy();
    expect(screen.getByText('Projects')).toBeTruthy();
  });

  it('renders article link pointing to /articles', () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    const links = screen.getAllByRole('link');
    expect(links.find((el) => el.getAttribute('href') === '/articles')).toBeTruthy();
  });

  it('renders images link pointing to /images', () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    const links = screen.getAllByRole('link');
    expect(links.find((el) => el.getAttribute('href') === '/images')).toBeTruthy();
  });

  it('renders groups link pointing to /groups', () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    const links = screen.getAllByRole('link');
    expect(links.find((el) => el.getAttribute('href') === '/groups')).toBeTruthy();
  });

  it('renders projects link pointing to /projects', () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    const links = screen.getAllByRole('link');
    expect(links.find((el) => el.getAttribute('href') === '/projects')).toBeTruthy();
  });

  it('renders the live stats strip with fetched counts', async () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    // Counts come from the mocked list endpoints (12 branches, 47 images, 5 projects).
    expect(await screen.findByText('12')).toBeTruthy();
    expect(await screen.findByText('47')).toBeTruthy();
    expect(await screen.findByText('5')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run it to confirm the stats test fails**

Run: `npx vitest run src/pages/ManagerPage.test.tsx -t "live stats strip"`
Expected: FAIL — no `HubStats` yet, so `12`/`47`/`5` never render.

- [ ] **Step 3: Add `HubStats` to `ManagerPage.tsx`**

Add these imports to the existing import block:

```tsx
import { useQuery } from '@tanstack/react-query';
import { StatTile } from '../components/common/StatTile';
import { getBranches } from '../api/articles';
import { getImageMetadata } from '../api/images';
import { getProjects } from '../api/projects';
```

Add the `HubStats` component just above `HubHeader`:

```tsx
// ── Live stats strip ────────────────────────────────────────────────────────

const HubStats: React.FC<{ token: string | undefined }> = ({ token }) => {
  const articles = useQuery({ queryKey: ['branches'], queryFn: () => getBranches(token) });
  const images = useQuery({ queryKey: ['images'], queryFn: () => getImageMetadata(token) });
  const projects = useQuery({ queryKey: ['projects'], queryFn: () => getProjects(token) });

  // While a count is loading, show an em-dash rather than a premature 0.
  const tiles = [
    { label: 'Articles', query: articles },
    { label: 'Images', query: images },
    { label: 'Projects', query: projects },
  ];

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
      {tiles.map(({ label, query }) => (
        <StatTile
          key={label}
          label={label}
          value={query.isLoading ? '—' : String((query.data ?? []).length)}
        />
      ))}
    </Box>
  );
};
```

Then render it in the page, between `<HubHeader />` and the capability grid, passing `token` from `useAuth` (add `token` to the destructure):

```tsx
const ManagerPage: React.FC = () => {
  const { isAuthenticated, token, userProfile, login, logout } = useAuth();
  // …user mapping unchanged…
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <PrismThemeProvider>
        <Box id="primary-content" sx={{ flex: 1, bgcolor: 'background.default', py: 4 }}>
          <Container>
            <HubHeader />
            <HubStats token={token} />
            <Box
              sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              }}
            >
              {CAPABILITIES.map((capability) => (
                <ManagerCard key={capability.name} capability={capability} />
              ))}
            </Box>
          </Container>
        </Box>
      </PrismThemeProvider>
    </Box>
  );
};
```

- [ ] **Step 4: Run the full ManagerPage test file**

Run: `npx vitest run src/pages/ManagerPage.test.tsx`
Expected: PASS (6 tests) — links preserved + `12`/`47`/`5` render.

- [ ] **Step 5: Typecheck + lint**

Run: `npm run typecheck && npx eslint src/pages/ManagerPage.tsx`
Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add src/pages/ManagerPage.tsx src/pages/ManagerPage.test.tsx
git commit -m "feat(manager): live Articles/Images/Projects StatTile strip"
```

---

### Task 3: AdminPage — Prism wrap, eyebrow, panel re-skin

Re-skin the `/admin` login/session panel to Prism. Presentation-only; preserve every testid + copy.

**Files:**
- Modify: `src/pages/AdminPage.tsx` (full rewrite of the component)
- Test: `src/pages/AdminPage.test.tsx` (existing assertions must keep passing; no query wrapper needed)

**Interfaces:**
- Consumes: `SurfaceCard` from `@/components/common/SurfaceCard`; `PrismThemeProvider`; `Button` from `@/components/layout/Button` (`text`, `color`, `onClick` — already Prism-fixed); `NavBar`; `useAuth`.
- Produces: default-exported `AdminPage`.

- [ ] **Step 1: Rewrite `AdminPage.tsx`**

```tsx
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { NavBar } from '../components/layout/NavBar';
import { Button } from '../components/layout/Button';
import { SurfaceCard } from '../components/common/SurfaceCard';
import { PrismThemeProvider } from '../components/prism';
import { useAuth } from '../auth/useAuth';

// ── Eyebrow header ──────────────────────────────────────────────────────────

const eyebrowSx = (t: import('@mui/material/styles').Theme) => ({
  m: 0,
  fontFamily: t.tokens?.typography.mono ?? 'monospace',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  color: 'primary.main',
});

const PanelHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography
    variant="h4"
    sx={(t) => ({ fontFamily: t.tokens?.typography.mono ?? 'monospace', fontWeight: 700 })}
  >
    {children}
  </Typography>
);

// ── Admin panel (authenticated view) ──────────────────────────────────────

const AdminPanel: React.FC<{
  firstName: string | undefined;
  lastName: string | undefined;
  onLogout: () => void;
}> = ({ firstName, lastName, onLogout }) => (
  <SurfaceCard sx={{ p: 3, maxWidth: 500, mx: 'auto' }} data-testid="admin-panel">
    <Stack spacing={2}>
      <PanelHeading>
        {firstName || lastName ? `Welcome ${firstName ?? ''} ${lastName ?? ''}!` : 'Welcome!'}
      </PanelHeading>
      <Button text="Logout" color="secondary" onClick={onLogout} />
    </Stack>
  </SurfaceCard>
);

// ── Login panel (unauthenticated view) ─────────────────────────────────────

const LoginPanel: React.FC<{ onLogin: () => void }> = ({ onLogin }) => (
  <SurfaceCard sx={{ p: 3, maxWidth: 500, mx: 'auto' }} data-testid="login-panel">
    <Stack spacing={2}>
      <PanelHeading>Welcome!</PanelHeading>
      <Button text="Login" onClick={onLogin} />
    </Stack>
  </SurfaceCard>
);

// ── Page ───────────────────────────────────────────────────────────────────

const AdminPage: React.FC = () => {
  const { isAuthenticated, isLoading, userProfile, login, logout } = useAuth();

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <PrismThemeProvider>
        <Box id="primary-content" sx={{ flex: 1, bgcolor: 'background.default', py: 4 }}>
          <Container>
            <Box component="p" sx={eyebrowSx}>
              SESSION
            </Box>
            <Box sx={{ mt: 3 }}>
              {!isLoading &&
                (isAuthenticated ? (
                  <AdminPanel
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    onLogout={logout}
                  />
                ) : (
                  <LoginPanel onLogin={login} />
                ))}
            </Box>
          </Container>
        </Box>
      </PrismThemeProvider>
    </Box>
  );
};

export default AdminPage;
```

- [ ] **Step 2: Run the existing tests to confirm the re-skin preserves the contracts**

Run: `npx vitest run src/pages/AdminPage.test.tsx`
Expected: PASS (4 tests) — `login-panel`/`admin-panel` testids, the Login button, and `Welcome Alice Smith` all still render. If any fail, a contract was dropped — fix before continuing.

- [ ] **Step 3: Typecheck + lint**

Run: `npm run typecheck && npx eslint src/pages/AdminPage.tsx`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add src/pages/AdminPage.tsx
git commit -m "feat(admin): Prism session/login panel + mono heading"
```

---

### Task 4: Verification + hub render-smoke story

Add a Storybook render-smoke for the hub (seeded query cache, dark) and run the full CI gate.

**Files:**
- Create: `src/pages/ManagerPage.stories.tsx`

**Interfaces:**
- Consumes: `ManagerPage` (default export); `QueryClient`/`QueryClientProvider`; `PrismThemeProvider`; `MemoryRouter`.

- [ ] **Step 1: Add `ManagerPage.stories.tsx`**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ManagerPage from './ManagerPage';
import { PrismThemeProvider } from '../components/prism';

// Render-smoke + visual QA for the Manager hub (P2 slice 4). ManagerPage runs
// three list queries to feed the StatTile strip; this story seeds a fresh
// QueryClient's cache under the exact keys the page uses (`['branches']`,
// `['images']`, `['projects']`) so the real page tree renders immediately with
// representative counts, no network required. Wrapped in PrismThemeProvider so
// the story shows the intended dark mission-control treatment.

const makeClient = () => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  client.setQueryData(['branches'], new Array(12).fill({}));
  client.setQueryData(['images'], new Array(47).fill({}));
  client.setQueryData(['projects'], new Array(5).fill({}));
  return client;
};

const meta: Meta<typeof ManagerPage> = {
  title: 'Pages/ManagerPage',
  component: ManagerPage,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <QueryClientProvider client={makeClient()}>
          <PrismThemeProvider>
            <Story />
          </PrismThemeProvider>
        </QueryClientProvider>
      </MemoryRouter>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ManagerPage>;

export const Hub: Story = {};
```

Note: `ManagerPage` reads `useAuth` directly. If Storybook has no Auth0 provider, `useAuth` should degrade to unauthenticated (NavBar renders a Login affordance) — acceptable for a render smoke. If the story throws because `useAuth` requires a provider, wrap the decorator in the app's existing auth/mock provider used by other page stories (check `src/**/*.stories.tsx` for the pattern) rather than mocking here.

- [ ] **Step 2: Build Storybook to confirm the story compiles**

Run: `npm run build-storybook`
Expected: completes without error (the `ManagerPage` story compiles and renders).

- [ ] **Step 3: Run the full CI gate**

Run: `npm run ci`
Expected: typecheck + lint + all tests PASS. Note the final test count (should be prior total + the new `live stats strip` test).

- [ ] **Step 4: Commit**

```bash
git add src/pages/ManagerPage.stories.tsx
git commit -m "test(manager): hub render-smoke story (seeded stat strip)"
```

---

## Self-Review

- **Spec coverage:** ManagerPage wrap+eyebrow+cards (Task 1) ✓; live StatTile strip from existing endpoints (Task 2) ✓; AdminPage wrap+eyebrow+panel re-skin (Task 3) ✓; render-smoke story + CI (Task 4) ✓. Contract preservation (links, testids, copy) asserted by the retained tests in Tasks 1–3 ✓.
- **Placeholder scan:** no TBD/TODO; every step has complete code or an exact command + expected output. The only conditional is Task 4 Step 1's auth-provider note, which gives a concrete fallback.
- **Type consistency:** `HubStats` prop `token: string | undefined` matches `useAuth().token`; `getBranches`/`getImageMetadata`/`getProjects` all take `token?` and return arrays, so `(query.data ?? []).length` is valid; `StatTile` `value` accepts `React.ReactNode` (string ok); `SurfaceCard` accepts `data-testid` via `...rest` (`BoxProps`) and `sx`; `Button` (`layout/Button`) uses `text`/`color`/`onClick` (unchanged from current AdminPage).
