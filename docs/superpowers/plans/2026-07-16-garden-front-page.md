# Digital Garden Front Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the front page with a prism-refraction hero and introduce a Prism side-nav rail (replacing the top `NavBar`) across the public "garden" routes, plus make the `/library` shelf publicly readable.

**Architecture:** A shared facet config drives both the hero and the rail. `RefractionHero` is the landing page. `AppShell` is a React Router layout route that renders `SideRail` + `<Outlet/>` for garden routes; landing routes (`/`, `/home`) render the hero full-bleed with no rail. Un-migrated routes stay in a legacy group that keeps the existing per-page `NavBar`, so there is never double navigation. A follow-up plan migrates the remaining admin/manager pages and deletes `NavBar`.

**Tech Stack:** React 19 + TypeScript, Vite, MUI 9 (styling via `theme.tokens`), React Router 7, TanStack Query, Vitest + Testing Library + MSW.

## Global Constraints

- **Language/imports:** TypeScript throughout; import from `@/…` (aliased to `src/`).
- **Styling:** Through `theme.tokens` (colors/motion/radius) with bare-MUI fallbacks, as `NavBar.tsx` does. No hardcoded hex in components; category colors come from `tokens.color.categorical` and `tokens.color.brand.primary`.
- **State:** Server state → TanStack Query; nav state derives from the router (`useLocation`). No new stores.
- **Auth:** Only through `useAuth()`; role checks only via `isWriter` / `isSiteAdmin` from `@/auth/authHelpers`.
- **Accessibility:** Every nav target is a real `RouterLink`/`<a>` with an accessible name; rail is a `<nav aria-label="Primary">`; active item gets `aria-current="page"`; visible focus rings; honor `prefers-reduced-motion`.
- **Testing:** Co-located `*.test.tsx`; use `render` from `@/test/testUtils` (real theme + MemoryRouter) unless a test needs custom router entries. Every task ends green. Run `npm run ci` (typecheck + lint + test) before the final commit.
- **Node 22**; install with `npm ci` (`legacy-peer-deps=true`).
- **Visual reference (final polish):** prototype Artifact — https://claude.ai/code/artifact/45cbc56c-b794-4ffb-a070-98bef6605d7e

---

## File Structure

**Create:**
- `src/components/home/gardenFacets.ts` — shared facet config + color accessor (consumed by hero + rail).
- `src/components/home/gardenFacets.test.ts`
- `src/components/home/RefractionHero.tsx` — the prism-refraction hero.
- `src/components/home/RefractionHero.test.tsx`
- `src/components/layout/SideRail.tsx` — primary side navigation.
- `src/components/layout/SideRail.test.tsx`
- `src/components/layout/AppShell.tsx` — layout route: rail + content.
- `src/components/layout/AppShell.test.tsx`

**Modify:**
- `src/pages/HomePage.tsx` — render `RefractionHero`; drop `NavBar`.
- `src/pages/HomePage.test.tsx` — update expectations for the new hero.
- `src/pages/library/LibraryPage.tsx` — public shelf; writer-only tabs/actions gated.
- `src/pages/library/LibraryPage.test.tsx` — new/updated (create if absent).
- `src/App.tsx` — restructure router into landing / garden-shell / legacy groups.
- `src/pages/ArticlePage.tsx`, `src/pages/RecipesPage.tsx`, `src/pages/RecipePage.tsx`, `src/pages/AboutPage.tsx`, `src/pages/ExperiencePage.tsx` — remove per-page `<NavBar>` (now provided by `AppShell`).

---

## Task 1: Shared garden facet config

**Files:**
- Create: `src/components/home/gardenFacets.ts`
- Test: `src/components/home/gardenFacets.test.ts`

**Interfaces:**
- Produces:
  - `type GardenFacetKey = 'writing' | 'reading' | 'recipes'`
  - `interface GardenFacet { key: GardenFacetKey; label: string; route: string; description: string; colorIndex: number }`
  - `const GARDEN_FACETS: readonly GardenFacet[]`
  - `function facetColor(tokens: Tokens | undefined, colorIndex: number, fallback: string): string`
  - `function isFacetActive(facet: GardenFacet, pathname: string): boolean`

- [ ] **Step 1: Write the failing test**

```ts
// src/components/home/gardenFacets.test.ts
import { describe, it, expect } from 'vitest';
import { GARDEN_FACETS, facetColor, isFacetActive } from './gardenFacets';
import { makeTokens } from '@/theme';
import { DEFAULT_SEED } from '@/theme';

describe('gardenFacets', () => {
  it('maps the three garden sections to their routes', () => {
    expect(GARDEN_FACETS.map((f) => [f.key, f.route])).toEqual([
      ['writing', '/archive'],
      ['reading', '/library'],
      ['recipes', '/recipes'],
    ]);
  });

  it('reads a color from the token categorical palette by index', () => {
    const tokens = makeTokens(DEFAULT_SEED, 'light', 'default');
    expect(facetColor(tokens, 1, '#000')).toBe(tokens.color.categorical[1]);
  });

  it('falls back when tokens are missing', () => {
    expect(facetColor(undefined, 1, '#abc')).toBe('#abc');
  });

  it('treats /library and its sub-paths as the reading section', () => {
    const reading = GARDEN_FACETS.find((f) => f.key === 'reading')!;
    expect(isFacetActive(reading, '/library')).toBe(true);
    expect(isFacetActive(reading, '/library/123/acquisitions')).toBe(true);
    expect(isFacetActive(reading, '/recipes')).toBe(false);
  });

  it('matches recipes exactly and on detail pages', () => {
    const recipes = GARDEN_FACETS.find((f) => f.key === 'recipes')!;
    expect(isFacetActive(recipes, '/recipes')).toBe(true);
    expect(isFacetActive(recipes, '/recipes/pho')).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/home/gardenFacets.test.ts`
Expected: FAIL — module `./gardenFacets` not found.

- [ ] **Step 3: Write minimal implementation**

```ts
// src/components/home/gardenFacets.ts
import type { Tokens } from '@/theme';

export type GardenFacetKey = 'writing' | 'reading' | 'recipes';

export interface GardenFacet {
  key: GardenFacetKey;
  label: string;
  route: string;
  /** One-line description shown under the label. */
  description: string;
  /** Index into `tokens.color.categorical` for this facet's spectrum hue. */
  colorIndex: number;
}

/**
 * The three curated sections of the garden. Shared by the hero (RefractionHero)
 * and the primary nav (SideRail) so both stay in sync. Colors are indices into
 * the active preset's categorical palette — no hardcoded hex, so the spectrum
 * recolors with the preset.
 */
export const GARDEN_FACETS: readonly GardenFacet[] = [
  { key: 'writing', label: 'Writing', route: '/archive', description: 'essays, talks & notes', colorIndex: 0 },
  { key: 'reading', label: 'Reading', route: '/library', description: "the shelf & what's next", colorIndex: 1 },
  { key: 'recipes', label: 'Recipes', route: '/recipes', description: "what's on the table", colorIndex: 3 },
];

/** Categorical color for a facet, with a fallback for bare-MUI themes/tests. */
export function facetColor(tokens: Tokens | undefined, colorIndex: number, fallback: string): string {
  return tokens?.color.categorical[colorIndex] ?? fallback;
}

/** True when the current path belongs to this facet's section. */
export function isFacetActive(facet: GardenFacet, pathname: string): boolean {
  return pathname === facet.route || pathname.startsWith(`${facet.route}/`);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/home/gardenFacets.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/home/gardenFacets.ts src/components/home/gardenFacets.test.ts
git commit -m "feat(home): shared garden facet config for hero + side rail"
```

---

## Task 2: Public read-only library shelf

**Files:**
- Modify: `src/pages/library/LibraryPage.tsx` (gating logic around lines 82-111, tabs around 40-49)
- Test: `src/pages/library/LibraryPage.test.tsx` (create)

**Interfaces:**
- Consumes: `isWriter` (`@/auth/authHelpers`), `ShelfView`, existing library hooks.
- Produces: unchanged public API (`LibraryPage`, `LibraryView`). Behavior change only.

**Behavior:** non-writers see the `shelf` view read-only. The Acquisitions/Taste tabs, the Check-in button, and the "add interest" affordance appear only for writers. Visiting `/library/:id/acquisitions` or `/taste` as a non-writer shows the shelf (or an access message), never the writer tools.

- [ ] **Step 1: Write the failing test**

```tsx
// src/pages/library/LibraryPage.test.tsx
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/testUtils';
import LibraryPage from './LibraryPage';

const mockAuth = { isAuthenticated: false, isLoading: false, token: undefined,
  userProfile: null as unknown, login: vi.fn(), logout: vi.fn() };
vi.mock('@/auth/useAuth', () => ({ useAuth: () => mockAuth }));

// Stub the heavy shelf so the test targets gating, not data.
vi.mock('@/components/library/ShelfView', () => ({
  ShelfView: () => <div data-testid="shelf">shelf</div>,
}));
vi.mock('@/components/library/hooks', () => ({
  useInterests: () => ({ data: [] }),
  useInterest: () => ({ data: undefined }),
}));

beforeEach(() => { mockAuth.userProfile = null; });

describe('LibraryPage gating', () => {
  it('shows the shelf to anonymous visitors (public read-only)', () => {
    render(<LibraryPage view="shelf" />);
    expect(screen.getByTestId('shelf')).toBeTruthy();
  });

  it('hides the Acquisitions and Taste tabs from non-writers', () => {
    render(<LibraryPage view="shelf" />);
    expect(screen.queryByText('Acquisitions')).toBeNull();
    expect(screen.queryByText('Taste profile')).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/library/LibraryPage.test.tsx`
Expected: FAIL — anonymous currently sees "Sign in as a writer…", no shelf.

- [ ] **Step 3: Implement — thread `canEdit` through the inner component**

In `src/pages/library/LibraryPage.tsx`, change `LibraryPageInner` to accept `canEdit` and gate the writer-only UI. Replace the component signature and the tab/actions block:

```tsx
const LibraryPageInner: React.FC<{ view: LibraryView; canEdit: boolean }> = ({ view, canEdit }) => {
  const { tokens } = useTheme();
  const { token } = useAuth();
  const navigate = useNavigate();
  const { interestId } = useParams<{ interestId: string }>();
  const interests = useInterests(token);
  const interest = useInterest(interestId ?? '', token);
  const [modal, setModal] = React.useState<'none' | 'new' | 'checkin'>('none');

  const id = interestId ?? '';
  // Non-writers can never land on a writer-only view.
  const effectiveView: LibraryView = canEdit ? view : 'shelf';

  return (
    <Box sx={{ display: 'flex', gap: 3, p: 3, minHeight: '70vh' }}>
      <InterestRail
        interests={interests.data ?? []}
        activeId={interestId}
        onAdd={canEdit ? () => setModal('new') : undefined}
      />

      <Box sx={{ flex: 1 }}>
        {id && canEdit && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <Link to={`/library/${id}`} style={tabStyle(tokens, effectiveView === 'shelf')}>Shelves</Link>
            <Link to={`/library/${id}/acquisitions`} style={tabStyle(tokens, effectiveView === 'acquisitions')}>Acquisitions</Link>
            <Link to={`/library/${id}/taste`} style={tabStyle(tokens, effectiveView === 'taste')}>Taste profile</Link>
            <div style={{ marginLeft: 'auto' }}>
              <Button variant="subtle" onClick={() => setModal('checkin')}>Check-in</Button>
            </div>
          </div>
        )}

        {!id && (
          <p style={{ color: tokens.color.text.secondary }}>
            {canEdit ? 'Select an interest, or add one to start a shelf.' : 'Select a shelf to browse.'}
          </p>
        )}

        {id && effectiveView === 'shelf' && <ShelfView interestId={id} token={token} />}
        {id && canEdit && effectiveView === 'acquisitions' && <AcquisitionsPipeline interestId={id} token={token} />}
        {id && canEdit && effectiveView === 'taste' && interest.data && (
          <TasteProfileEditor interest={interest.data} token={token} />
        )}
      </Box>

      {canEdit && (
        <OnboardingDialog
          open={modal === 'new'}
          onClose={() => setModal('none')}
          token={token}
          onCreated={(newId) => { setModal('none'); navigate(`/library/${newId}/acquisitions`); }}
        />
      )}
      {canEdit && interest.data && (
        <CheckInDialog
          open={modal === 'checkin'}
          onClose={() => setModal('none')}
          interest={interest.data}
          token={token}
        />
      )}
    </Box>
  );
};
```

Then update the outer `LibraryPage` to always render the inner component (no more writer wall). Replace the `userIsWriter ? … : …` block:

```tsx
const LibraryPage: React.FC<{ view: LibraryView }> = ({ view }) => {
  const { isAuthenticated, userProfile, isLoading, login, logout } = useAuth();

  const user = userProfile
    ? { firstName: userProfile.firstName ?? undefined, lastName: userProfile.lastName ?? undefined, realm_access: userProfile.realm_access }
    : undefined;

  if (isLoading) return <LoadingScreen />;

  const canEdit = isWriter(userProfile);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <PrismThemeProvider>
        <Box sx={{ flex: 1, bgcolor: 'background.default' }}>
          <LibraryPageInner view={view} canEdit={canEdit} />
        </Box>
      </PrismThemeProvider>
    </Box>
  );
};
```

> Note: the `NavBar` here is removed later in Task 7 when LibraryPage joins the shell. Leave it for now so this task is independently shippable. `login`/`logout` stay wired to `NavBar`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/library/LibraryPage.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Run the broader library suite for regressions**

Run: `npm test -- src/pages/library src/components/library`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/pages/library/LibraryPage.tsx src/pages/library/LibraryPage.test.tsx
git commit -m "feat(library): public read-only shelf; gate writer tools on isWriter"
```

> **Backend dependency (flag, do not block):** confirm the shelf read endpoint (`useShelf`/`useInterests`) returns data for anonymous requests on the andrewslai tenant. If it 401s without a token, the public shelf will render empty and this needs an anonymous read path in `../kaleidoscope`. Note this in the PR description.

---

## Task 3: RefractionHero component

**Files:**
- Create: `src/components/home/RefractionHero.tsx`
- Test: `src/components/home/RefractionHero.test.tsx`

**Interfaces:**
- Consumes: `GARDEN_FACETS`, `facetColor` (Task 1); `useTheme` (`theme.tokens`); `useMediaQuery`; `Link` (react-router).
- Produces: `const RefractionHero: React.FC` (default export). Renders one link per facet with `aria-label` `"{label} — {description}"` and `href` = facet.route.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/home/RefractionHero.test.tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/testUtils';
import RefractionHero from './RefractionHero';

describe('RefractionHero', () => {
  it('renders a link for each garden facet with its route', () => {
    render(<RefractionHero />);
    expect(screen.getByRole('link', { name: /Writing/ }).getAttribute('href')).toBe('/archive');
    expect(screen.getByRole('link', { name: /Reading/ }).getAttribute('href')).toBe('/library');
    expect(screen.getByRole('link', { name: /Recipes/ }).getAttribute('href')).toBe('/recipes');
  });

  it('gives each facet an accessible name that includes its description', () => {
    render(<RefractionHero />);
    expect(screen.getByRole('link', { name: /essays, talks & notes/ })).toBeTruthy();
  });

  it('labels the scene as a group for assistive tech', () => {
    render(<RefractionHero />);
    expect(screen.getByRole('group', { name: /prism/i })).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/home/RefractionHero.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write implementation**

```tsx
// src/components/home/RefractionHero.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GARDEN_FACETS, facetColor } from './gardenFacets';

/**
 * The front-page hero: one beam of light ("me") refracted through a prism into
 * the three garden facets. Stylized SVG, never photoreal. Colors come from
 * `theme.tokens` so the spectrum recolors with the active preset. Hovering or
 * focusing a facet dims the others and lights the chosen one. Under reduced
 * motion the entrance/pulse animations are disabled.
 *
 * Visual reference (final polish): the approved prototype Artifact.
 */
const FALLBACKS = ['#45D6E8', '#9C90F0', '#E0A73C']; // writing / reading / recipes

const RefractionHero: React.FC = () => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const mono = tokens?.typography.mono ?? 'monospace';
  const ink1 = tokens?.color.text.primary ?? theme.palette.text.primary;
  const ink3 = tokens?.color.text.disabled ?? theme.palette.text.disabled;
  const surface = tokens?.color.surface.raised ?? theme.palette.background.paper;
  const border = tokens?.color.border.strong ?? theme.palette.divider;
  const accent = tokens?.color.brand.primary ?? theme.palette.primary.main;
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Facet card y positions in the 1000x480 viewBox.
  const rowY = [80, 198, 316];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        py: { xs: 4, md: 6 },
        // Dim siblings when one facet is engaged.
        '& .facet': { transition: 'opacity .35s ease' },
        '& .hero-scene:has(.facet:hover) .facet:not(:hover)': { opacity: 0.24 },
        '& .hero-scene:has(.facet:focus-visible) .facet:not(:focus-visible)': { opacity: 0.24 },
        '& .facet:focus-visible': { outline: 'none' },
        '& .facet:focus-visible .ring': { opacity: 0.9 },
      }}
    >
      <Box
        component="svg"
        className="hero-scene"
        viewBox="0 0 1000 480"
        role="group"
        aria-label="A prism refracting one light into three garden sections"
        sx={{ width: '100%', maxWidth: 1000, height: 'auto' }}
      >
        <defs>
          <radialGradient id="rh-src" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dff6fb" />
            <stop offset="55%" stopColor={accent} />
            <stop offset="100%" stopColor="#0b3a44" />
          </radialGradient>
        </defs>

        {/* source = me */}
        <circle cx="120" cy="238" r="25" fill="url(#rh-src)" />
        <text x="120" y="245" textAnchor="middle" fontFamily={mono} fontSize="20" fontWeight="600" fill="#0A0E15">A</text>
        <text x="120" y="314" textAnchor="middle" fontFamily={mono} fontSize="10.5" letterSpacing="0.14em" fill={ink3}>A SINGLE LIGHT · ME</text>

        {/* beam + prism */}
        <line x1="146" y1="238" x2="446" y2="238" stroke={accent} strokeWidth="5" strokeLinecap="round">
          {!reduce && <animate attributeName="opacity" values="0.9;0.55;0.9" dur="4.5s" repeatCount="indefinite" />}
        </line>
        <polygon points="466,150 400,312 534,312" fill={`${accent}22`} stroke={accent} strokeWidth="1.8" strokeLinejoin="round" />
        <text x="466" y="340" textAnchor="middle" fontFamily={mono} fontSize="10.5" letterSpacing="0.14em" fill={ink3}>THE PRISM</text>

        {GARDEN_FACETS.map((f, i) => {
          const c = facetColor(tokens, f.colorIndex, FALLBACKS[i]);
          const y = rowY[i];
          const cy = y + 40;
          return (
            <Box
              key={f.key}
              component={Link}
              to={f.route}
              className="facet"
              aria-label={`${f.label} — ${f.description}`}
              sx={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              <line x1="500" y1="250" x2="712" y2={cy} stroke={c} strokeWidth="3" strokeLinecap="round" />
              <rect className="ring" x="704" y={y - 6} width="254" height="92" rx="16" fill="none" stroke={c} strokeDasharray="4 4" opacity="0" />
              <rect x="710" y={y} width="242" height="80" rx="13" fill={surface} stroke={border} />
              <rect x="710" y={y} width="6" height="80" rx="3" fill={c} />
              <text x="782" y={y + 30} fontFamily={mono} fontSize="18" fontWeight="600" fill={ink1}>{f.label}</text>
              <text x="782" y={y + 49} fontFamily={theme.typography.fontFamily} fontSize="12" fill={ink3}>{f.description}</text>
              <text x="782" y={y + 68} fontFamily={mono} fontSize="11" fill={c}>{f.route}</text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default RefractionHero;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/home/RefractionHero.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/home/RefractionHero.tsx src/components/home/RefractionHero.test.tsx
git commit -m "feat(home): RefractionHero prism front-page hero"
```

---

## Task 4: HomePage renders the hero (drop NavBar)

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/HomePage.test.tsx`

**Interfaces:**
- Consumes: `RefractionHero` (Task 3), existing `Footer`, `PortfolioSection`, `getArticles`.
- Produces: default-exported `HomePage` that renders the hero (no top `NavBar`; chrome for `/` is the hero itself).

- [ ] **Step 1: Update the test to the new front page**

Replace the body of `src/pages/HomePage.test.tsx` tests (keep the mocks/server setup) so it targets the hero. Replace the three `it(...)` blocks with:

```tsx
describe('HomePage', () => {
  it('renders the refraction hero facet links', () => {
    render(<HomePage />, { wrapper: Wrapper });
    expect(screen.getByRole('link', { name: /Writing/ }).getAttribute('href')).toBe('/archive');
    expect(screen.getByRole('link', { name: /Reading/ }).getAttribute('href')).toBe('/library');
    expect(screen.getByRole('link', { name: /Recipes/ }).getAttribute('href')).toBe('/recipes');
  });

  it('renders recent articles from API', async () => {
    render(<HomePage />, { wrapper: Wrapper });
    await waitFor(() => {
      expect(screen.getByText('Hello World')).toBeTruthy();
    });
  });
});
```

> The existing `Wrapper` uses `createTheme()` (bare MUI, no `tokens`), which exercises the hero's fallback path — good. Keep it.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/HomePage.test.tsx`
Expected: FAIL — hero not rendered yet (old HomePage has no facet links to `/library`).

- [ ] **Step 3: Rewrite HomePage**

Replace `src/pages/HomePage.tsx` with a thin composition. Remove the `NavBar` import/usage and the old hero/feature-card markup; keep the recent-writing strip.

```tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import RefractionHero from '@/components/home/RefractionHero';
import { PortfolioSection } from '@/components/layout/PortfolioSection';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/auth/useAuth';
import { getArticles } from '@/api/articles';

const HomePage: React.FC = () => {
  const { token } = useAuth();
  const { data: articles = [] } = useQuery({
    queryKey: ['articles'],
    queryFn: () => getArticles(token),
  });

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* The hero IS the front-page navigation — no top NavBar here. */}
      <RefractionHero />
      <Container maxWidth="lg" sx={{ pb: 6 }}>
        <PortfolioSection recentArticles={articles} />
      </Container>
      <Footer />
    </Box>
  );
};

export default HomePage;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/HomePage.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Typecheck (unused imports)**

Run: `npm run typecheck`
Expected: PASS — no unused-import/type errors from the rewrite.

- [ ] **Step 6: Commit**

```bash
git add src/pages/HomePage.tsx src/pages/HomePage.test.tsx
git commit -m "feat(home): front page renders RefractionHero, drops top NavBar"
```

---

## Task 5: SideRail component

**Files:**
- Create: `src/components/layout/SideRail.tsx`
- Test: `src/components/layout/SideRail.test.tsx`

**Interfaces:**
- Consumes: `GARDEN_FACETS`, `facetColor`, `isFacetActive` (Task 1); `useLocation`, `Link`; `KaleidoscopeMark`; `isSiteAdmin`, `isWriter`; `NavBarUser` type reused from `@/components/layout/NavBar`.
- Produces:
  - `interface SideRailProps { user?: NavBarUser; isAuthenticated?: boolean; login?: () => void }`
  - `const SideRail: React.FC<SideRailProps>`

**Behavior:** a `<nav aria-label="Primary">` with: prism/home mark → `/`; the three garden facets (spectrum-lit, `aria-current="page"` on the active section); an About link; auth (avatar → `/admin` when authenticated, else a Login button). Writer/admin **tools** (Experience, Projects, Manager) render only for the right roles, in a secondary group at the foot.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/layout/SideRail.test.tsx
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '@/theme';
import { SideRail } from './SideRail';
import { getWriterRole, getAdminRole } from '@/auth/authHelpers';

const theme = makeTheme(BASE_THEME);
function renderAt(path: string, props = {}) {
  return rtlRender(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <SideRail {...props} />
      </MemoryRouter>
    </ThemeProvider>
  );
}

describe('SideRail', () => {
  it('renders the three garden sections plus About as a Primary nav', () => {
    renderAt('/archive');
    const nav = screen.getByRole('navigation', { name: /primary/i });
    expect(nav).toBeTruthy();
    expect(screen.getByRole('link', { name: /Writing/ }).getAttribute('href')).toBe('/archive');
    expect(screen.getByRole('link', { name: /Reading/ }).getAttribute('href')).toBe('/library');
    expect(screen.getByRole('link', { name: /Recipes/ }).getAttribute('href')).toBe('/recipes');
    expect(screen.getByRole('link', { name: /About/ }).getAttribute('href')).toBe('/about');
  });

  it('marks the active section with aria-current', () => {
    renderAt('/recipes/pho');
    expect(screen.getByRole('link', { name: /Recipes/ }).getAttribute('aria-current')).toBe('page');
    expect(screen.getByRole('link', { name: /Writing/ }).getAttribute('aria-current')).toBe('false');
  });

  it('shows a Login button when unauthenticated', () => {
    const login = vi.fn();
    renderAt('/archive', { isAuthenticated: false, login });
    expect(screen.getByRole('button', { name: /login/i })).toBeTruthy();
  });

  it('hides writer/admin tools from the public', () => {
    renderAt('/archive');
    expect(screen.queryByRole('link', { name: /Projects/ })).toBeNull();
    expect(screen.queryByRole('link', { name: /Manager/ })).toBeNull();
  });

  it('shows admin tools to a site admin', () => {
    const user = { realm_access: { roles: [getAdminRole()] } };
    renderAt('/archive', { user, isAuthenticated: true });
    expect(screen.getByRole('link', { name: /Projects/ })).toBeTruthy();
  });

  it('shows Experience to a writer', () => {
    const user = { realm_access: { roles: [getWriterRole()] } };
    renderAt('/archive', { user, isAuthenticated: true });
    expect(screen.getByRole('link', { name: /Experience/ })).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/layout/SideRail.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write implementation**

```tsx
// src/components/layout/SideRail.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { KaleidoscopeMark } from './KaleidoscopeMark';
import type { NavBarUser } from './NavBar';
import { isSiteAdmin, isWriter } from '@/auth/authHelpers';
import { GARDEN_FACETS, facetColor, isFacetActive } from '@/components/home/gardenFacets';

export interface SideRailProps {
  user?: NavBarUser | undefined;
  isAuthenticated?: boolean | undefined;
  login?: (() => void) | undefined;
}

const FALLBACKS = ['#45D6E8', '#9C90F0', '#E0A73C'];

export const SideRail: React.FC<SideRailProps> = ({ user, isAuthenticated = false, login }) => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const { pathname } = useLocation();
  const mono = tokens?.typography.mono ?? 'monospace';
  const rSm = tokens?.radius.sm ?? 6;
  const durBase = tokens?.motion.duration.base ?? 250;

  const userIsWriter = isWriter(user);
  const userIsAdmin = isSiteAdmin(user);

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
      content: '""',
      position: 'absolute',
      left: -6,
      top: 8,
      bottom: 8,
      width: 3,
      borderRadius: 2,
      bgcolor: color,
      boxShadow: `0 0 10px ${color}`,
      opacity: active ? 1 : 0,
      transition: `opacity ${durBase}ms`,
    },
    '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
  });

  const toolSx = (active: boolean): SxProps<Theme> => ({
    display: 'block',
    px: 1.5,
    py: 1,
    borderRadius: `${rSm}px`,
    fontFamily: mono,
    fontSize: '0.72rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: active ? 'primary.main' : 'text.secondary',
    '&:hover': { color: 'text.primary' },
  });

  return (
    <Box
      component="nav"
      aria-label="Primary"
      sx={{
        width: { xs: 64, sm: 214 },
        flex: 'none',
        alignSelf: 'stretch',
        borderRight: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        p: 1.5,
      }}
    >
      {/* home = the prism */}
      <Box
        component={Link}
        to="/"
        aria-label="Home — the prism"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          p: 1,
          mb: 1,
          textDecoration: 'none',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <KaleidoscopeMark size={26} />
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }, fontFamily: mono, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.16em' }}>
          andrewlai
        </Box>
      </Box>

      {/* garden sections */}
      {GARDEN_FACETS.map((f, i) => {
        const active = isFacetActive(f, pathname);
        const color = facetColor(tokens, f.colorIndex, FALLBACKS[i]);
        return (
          <Box key={f.key} component={Link} to={f.route} aria-current={active ? 'page' : 'false'} sx={itemSx(active, color)}>
            <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color, flex: 'none' }} />
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>{f.label}</Box>
          </Box>
        );
      })}

      {/* About (essentials tier) */}
      <Box component={Link} to="/about" aria-current={pathname === '/about' ? 'page' : 'false'} sx={itemSx(pathname === '/about', theme.palette.success.main)}>
        <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main', flex: 'none' }} />
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>About</Box>
      </Box>

      <Box sx={{ flex: 1 }} />

      {/* writer/admin tools — secondary group */}
      {(userIsWriter || userIsAdmin) && (
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1, display: { xs: 'none', sm: 'block' } }}>
          {userIsWriter && (
            <Box component={Link} to="/experience" sx={toolSx(pathname === '/experience')}>Experience</Box>
          )}
          {userIsAdmin && (
            <>
              <Box component={Link} to="/projects" sx={toolSx(pathname === '/projects')}>Projects</Box>
              <Box component={Link} to="/manager" sx={toolSx(pathname === '/manager')}>Manager</Box>
            </>
          )}
        </Box>
      )}

      {/* auth */}
      <Box sx={{ pt: 1, display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
        {isAuthenticated ? (
          <Tooltip title={`Logged in as ${user?.firstName ?? 'User'}`}>
            <Box component={Link} to="/admin" aria-label="admin" sx={{ display: 'inline-flex', border: '1px solid', borderColor: 'divider', borderRadius: '50%', p: 0.25 }}>
              <Avatar alt={user?.firstName ?? 'User'} src="/static/images/nav-bar/user.svg" sx={{ width: 32, height: 32 }} />
            </Box>
          </Tooltip>
        ) : (
          <Box
            component="button"
            type="button"
            onClick={login}
            aria-label="login"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: `${rSm}px`,
              bgcolor: 'transparent',
              color: 'text.secondary',
              fontFamily: mono,
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              px: 1.25,
              py: 1,
              '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
            }}
          >
            <Avatar sx={{ width: 26, height: 26, fontFamily: mono, fontWeight: 700, color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.14), fontSize: '0.8rem' }}>?</Avatar>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Login</Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/layout/SideRail.test.tsx`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/SideRail.tsx src/components/layout/SideRail.test.tsx
git commit -m "feat(layout): SideRail primary navigation (garden + essentials + tools)"
```

---

## Task 6: AppShell layout route

**Files:**
- Create: `src/components/layout/AppShell.tsx`
- Test: `src/components/layout/AppShell.test.tsx`

**Interfaces:**
- Consumes: `SideRail` (Task 5); `useAuth`; `Outlet` (react-router).
- Produces: `const AppShell: React.FC` — renders `SideRail` (fed from `useAuth`) beside `<Outlet />`. No `NavBar`. Intended as a React Router layout-route `element`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/layout/AppShell.test.tsx
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '@/theme';
import { AppShell } from './AppShell';

vi.mock('@/auth/useAuth', () => ({
  useAuth: () => ({ isAuthenticated: false, isLoading: false, token: undefined, userProfile: null, login: vi.fn(), logout: vi.fn() }),
}));

const theme = makeTheme(BASE_THEME);

describe('AppShell', () => {
  it('renders the primary rail alongside routed content', () => {
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
    expect(screen.getByRole('navigation', { name: /primary/i })).toBeTruthy();
    expect(screen.getByText('recipes content')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/layout/AppShell.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write implementation**

```tsx
// src/components/layout/AppShell.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { SideRail } from './SideRail';
import { useAuth } from '@/auth/useAuth';

/**
 * Layout route for the garden's inner pages: the persistent Prism SideRail plus
 * the routed page content. Replaces the per-page top NavBar. Landing routes
 * (`/`, `/home`) are intentionally NOT wrapped by this shell — the hero is their
 * navigation.
 */
export const AppShell: React.FC = () => {
  const { isAuthenticated, userProfile, login } = useAuth();
  const user = userProfile
    ? { firstName: userProfile.firstName ?? undefined, lastName: userProfile.lastName ?? undefined, realm_access: userProfile.realm_access }
    : undefined;

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

> Note: `useAuth()` returns `{ isAuthenticated, isLoading, token, userProfile, login, logout }` — there is no `user` field, so `userProfile` is mapped to the `NavBarUser` shape here (same mapping the old pages used).

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/layout/AppShell.test.tsx`
Expected: PASS.

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck`
Expected: PASS — confirm the `useAuth` destructure has no unused/invalid fields.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/AppShell.tsx src/components/layout/AppShell.test.tsx
git commit -m "feat(layout): AppShell layout route (SideRail + content)"
```

---

## Task 7: Wire the router + remove NavBar from garden pages

**Files:**
- Modify: `src/App.tsx` (router children, lines 41-75)
- Modify: `src/pages/ArticlePage.tsx`, `src/pages/RecipesPage.tsx`, `src/pages/RecipePage.tsx`, `src/pages/AboutPage.tsx`, `src/pages/ExperiencePage.tsx`, `src/pages/library/LibraryPage.tsx`

**Interfaces:**
- Consumes: `AppShell` (Task 6).
- Produces: three route groups — **landing** (`/`, `/home` → hero, no shell), **garden shell** (wrapped by `AppShell`), **legacy** (unchanged, keeps per-page `NavBar`).

**Garden shell routes (move under `AppShell`):** `/content/:slug`, `/archive`, `/recipes`, `/recipes/:slug`, `/about`, `/experience`, `/library`, `/library/:interestId`, `/library/:interestId/acquisitions`, `/library/:interestId/taste`.

- [ ] **Step 1: Restructure the router in `src/App.tsx`**

Add the import and replace the single `children` array with grouped children. Import at top:

```tsx
import { AppShell } from './components/layout/AppShell';
```

Replace the `children: [ … ]` array (lines 41-75) with:

```tsx
    children: [
      // Landing — the hero is the navigation; no rail.
      { path: '/', element: <HomePage /> },
      { path: '/home', element: <HomePage /> },

      // Garden — persistent Prism SideRail via AppShell.
      {
        element: <AppShell />,
        children: [
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
        ],
      },

      // Legacy — still render their own top NavBar until the follow-up migration.
      { path: '/articles', element: <ArticleManagerPage /> },
      { path: '/articles/new', element: <ArticleEditorPage /> },
      { path: '/articles/:slug/edit', element: <ArticleEditorPage /> },
      { path: '/recipes/new', element: <RecipeEditorPage /> },
      { path: '/recipes/:slug/edit', element: <RecipeEditorPage /> },
      { path: '/images', element: <ImageManagerPage /> },
      { path: '/ui', element: <UIManagerPage /> },
      { path: '/groups', element: <GroupsPage /> },
      { path: '/sign-up', element: <SignUpPage /> },
      { path: '/admin', element: <AdminPage /> },
      { path: '/about-this-site', element: <AboutThisSitePage /> },
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
```

- [ ] **Step 2: Remove `<NavBar>` from each garden page**

For each of the six files, delete the `<NavBar ... />` JSX line, remove the now-unused `NavBar` import, and drop any props/vars used only to feed it (e.g. `login`, `logout`, `user`, `isAuthenticated`) **only if** they become unused — the typecheck in Step 4 is the guard. The pages keep their own `Footer` and outer `<Box>`. Concretely per file:

- `src/pages/AboutPage.tsx` — remove `<NavBar .../>` + import.
- `src/pages/ExperiencePage.tsx` — remove `<NavBar .../>` + import.
- `src/pages/RecipesPage.tsx` — remove `<NavBar .../>` + import.
- `src/pages/RecipePage.tsx` — remove `<NavBar .../>` + import.
- `src/pages/ArticlePage.tsx` — this file exports both the article view and `ArchiveView`; remove `<NavBar .../>` from **both** render paths + the import.
- `src/pages/library/LibraryPage.tsx` — remove the `<NavBar .../>` line added-back in Task 2 and its import; the outer `<Box>` + `PrismThemeProvider` stay.

> Do NOT touch the legacy pages (ArticleManager, editors, admin, projects, workflows, etc.) — they stay on their own NavBar in this plan.

- [ ] **Step 3: Run the affected page suites**

Run: `npm test -- src/pages/RecipesPage.test.tsx src/pages/RecipePage.test.tsx src/pages/ArticlePage.test.tsx src/pages/AboutPage.test.tsx src/pages/library/LibraryPage.test.tsx`
Expected: PASS. If any test asserted on `NavBar`-provided text (e.g. "KALEIDOSCOPE" wordmark), update that assertion to reflect the page no longer owning the nav.

- [ ] **Step 4: Typecheck for orphaned imports/props**

Run: `npm run typecheck`
Expected: PASS — no unused `NavBar`/`login`/`logout`/`user` symbols in the edited pages.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/pages/AboutPage.tsx src/pages/ExperiencePage.tsx src/pages/RecipesPage.tsx src/pages/RecipePage.tsx src/pages/ArticlePage.tsx src/pages/library/LibraryPage.tsx
git commit -m "feat(nav): route garden pages through AppShell + SideRail"
```

---

## Task 8: Full verification + manual smoke

**Files:** none (verification).

- [ ] **Step 1: Full CI**

Run: `npm run ci`
Expected: typecheck + lint + test all PASS. Fix any lint (unused imports) or failing tests surfaced across the migration.

- [ ] **Step 2: Manual smoke via dev server**

Run: `npm run dev`, then verify in the browser:
- `/` shows the refraction hero; hovering a facet dims the others; each facet links to `/archive`, `/library`, `/recipes`.
- Entering `/archive`, `/recipes`, `/about`, `/experience`, `/library` shows the SideRail with the active section lit; the home mark returns to `/`.
- `/library` as an anonymous visitor shows the shelf (see Task 2 backend note if empty); Acquisitions/Taste tabs are absent.
- Narrow the window < 640px → the rail collapses to the 64px icon rail.
- Tab through the hero facets and rail items → visible focus rings; Enter activates.
- A legacy route (e.g. `/admin`) still shows the old top NavBar (expected until the follow-up plan).

- [ ] **Step 3: Optionally run the verify skill**

Invoke the `verify` skill to exercise the front-page → section flow end-to-end.

- [ ] **Step 4: Final commit (if any fixes were needed)**

```bash
git add -A
git commit -m "chore(garden): fix lint/test fallout from front-page + rail migration"
```

---

## Follow-up (separate plan, out of scope here)

- Migrate the remaining legacy pages (article/recipe editors, ArticleManager, admin, projects, workflows, agents, groups, images, ui, manager, sign-up, about-this-site, score-definitions, workspace-roots) onto `AppShell`, then **delete `NavBar.tsx`** and its tests.
- Optional: shared-element "fold" transition from hero prism → rail mark.
- Optional: lush hand-illustrated (raster) prism art pass over the same layout.
- Backend: ensure the `/library` shelf read endpoint serves anonymous requests for the andrewslai tenant.

## Self-Review notes

- Spec §1 (concept/mapping/tagline) → Tasks 1, 3, 4. §2 (scope: hero + rail, library ungate) → Tasks 2-7; admin-page migration explicitly deferred (documented). §3 (RefractionHero/SideRail/AppShell/HomePage) → Tasks 3-6. §4 (data flow) → Tasks honor tokens + router-derived nav; no new stores. §5 (motion/reduced-motion) → Task 3 (`useMediaQuery` + `<animate>` gating). §6 (library gating) → Task 2. §7 (testing) → each task's tests + Task 8. §10 open decisions carried into "Follow-up" / PR notes.
- Type consistency: `GardenFacet`, `facetColor(tokens, colorIndex, fallback)`, `isFacetActive(facet, pathname)`, `SideRailProps`, `NavBarUser` reused across Tasks 1/3/5. `AppShell` uses corrected `useAuth` destructure (no `user` field).
