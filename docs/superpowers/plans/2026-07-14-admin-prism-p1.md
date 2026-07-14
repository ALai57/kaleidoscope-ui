# Admin Shell → Prism (P1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the admin / mission-control shell onto the Prism (dark) design system by scoping the Prism theme to `AdminLayout`, so its already-token-driven cards, chips, nav rail and top bar re-skin at once — then fix the two components that hardcode non-token values.

**Architecture:** The app's design layer is token-driven: `makePrismTheme()` builds a self-contained MUI theme pinned to the Prism preset in dark, and `PrismThemeProvider` scopes it to a subtree (proven on `RecipesPage`). `AdminLayout` is the single shell rendered by all admin routes (`ProjectsPage`, `WorkflowsPage`, `AgentTeamPage`, `WorkspaceRootsPage`). Wrapping `AdminLayout` in `PrismThemeProvider` flips the whole admin surface to Prism-dark; the `common/*` primitives (`SurfaceCard`, `EntityCard`, `StatusChip`) and the token-aware `AdminNavRail` / `AdminTopBar` read colors, radius and motion from the theme, so they change with **zero code edits**. Only `ScoreRunCard` (a hardcoded radius) and `layout/Button` (a hardcoded `primary.light`) fight the token layer and need real fixes.

**Tech Stack:** React 18 + TypeScript, MUI 6 (`ThemeProvider`, `colorSchemes`), Emotion, Vitest + Testing Library + jsdom, MSW, Storybook 8.

## Global Constraints

- Node **22** (`.nvmrc`); install with `npm ci` (`legacy-peer-deps=true`, `engine-strict=true`).
- **No raw color literals** in components — `no-restricted-syntax` lint rule bans hex/`rgb()`/`rgba()`/`hsl()` outside `src/theme/**`, color tooling, tests and stories. Read colors from the token-derived MUI palette (`background.paper`, `divider`, `primary.main`, `success.main`, …) or `theme.tokens.*`. See `docs/design-system-usage.md`.
- **Scope is the admin shell only.** Do NOT touch the public `NavBar`, `SideMenu`, or any reader/portfolio page — those stay on the tenant's light theme. The Prism mount lives inside `AdminLayout` and nowhere higher.
- The Prism theme pins **both** color schemes to the dark Prism tokens (`makePrismTheme`), so the subtree renders dark regardless of the app's active color mode. Never switch the app-global preset/mode to achieve this.
- Server state → TanStack Query; client/UI state → Zustand; API only through `src/api/*`; auth only through `useAuth()` / `authHelpers`.
- Run `npm run ci` (typecheck + lint + test) before pushing. Commit after every task.

---

## File Structure

| File | Change | Responsibility |
|---|---|---|
| `src/components/layout/AdminLayout.tsx` | Modify | Wrap the shell in `PrismThemeProvider` — the keystone mount. |
| `src/components/layout/AdminLayout.test.tsx` | Modify | Add a regression test proving the subtree renders under the Prism (dark) theme. |
| `src/components/workflows/AdminPrismCards.stories.tsx` | Create | Storybook workbench: the admin card set rendered under `PrismThemeProvider` for visual QA + a re-skin regression test anchor. |
| `src/components/workflows/WorkflowCard.test.tsx` | Modify | Regression guard: the EntityCard-based cards render under Prism without error and keep their content. |
| `src/components/projects/ScoreRunCard.tsx` | Modify | Replace the hardcoded `borderRadius: '8px !important'` with the theme radius so it matches Prism's radius. |
| `src/components/projects/ScoreRunCard.test.tsx` | Create | Assert the card renders under Prism and no longer hardcodes the radius. |
| `src/components/layout/Button.tsx` | Modify | Remove the hardcoded `primary.light` background override; render a plain token-driven contained button. |
| `src/components/layout/Button.test.tsx` | Modify | Assert the button no longer forces `primary.light` and renders its label. |

**Out of scope (verified zero-change re-skins — no task, covered by the Task 2 regression guard):** `WorkflowCard`, `RoundCard`, `TeamLeadCard`, `AdvisorReviewCard`, `AgentCard`, `ProjectCard`, `common/EntityCard`, `common/SurfaceCard`, `common/StatusChip`, `tasks/TaskTypeChip`, `AdminNavRail`, `AdminTopBar`. These contain no hardcoded colors and read the surface/voice/motion from the theme.

---

### Task 1: Mount the Prism theme on the admin shell

**Files:**
- Modify: `src/components/layout/AdminLayout.tsx`
- Test: `src/components/layout/AdminLayout.test.tsx`

**Interfaces:**
- Consumes: `PrismThemeProvider` from `src/components/prism` (existing; wraps children in `makePrismTheme()` — a theme with both color schemes pinned to Prism dark, `palette.mode === 'dark'`).
- Produces: `AdminLayout` renders its entire subtree (nav rail, top bar, `children`) under the Prism theme. Every consumer (`ProjectsPage`, `WorkflowsPage`, `AgentTeamPage`, `WorkspaceRootsPage`) inherits Prism with no page-level change.

- [ ] **Step 1: Write the failing test**

Add to `src/components/layout/AdminLayout.test.tsx`:

```tsx
import { useTheme } from '@mui/material/styles';
import { render, screen } from '../../test/testUtils';
import { AdminLayout } from './AdminLayout';

// Reads the *ambient* theme mode at its position in the tree.
const ModeProbe = () => {
  const theme = useTheme();
  return <span data-testid="admin-mode">{theme.palette.mode}</span>;
};

it('renders its subtree under the Prism (dark) theme, overriding the ambient light app theme', () => {
  // testUtils.render provides the light app theme + a Router.
  render(
    <AdminLayout title="Workflows">
      <ModeProbe />
    </AdminLayout>,
  );
  expect(screen.getByTestId('admin-mode')).toHaveTextContent('dark');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/layout/AdminLayout.test.tsx`
Expected: FAIL — probe reads `light` (the ambient app theme), since `AdminLayout` does not yet scope Prism.

- [ ] **Step 3: Wrap the shell in `PrismThemeProvider`**

In `src/components/layout/AdminLayout.tsx`, add the import and wrap the outer `Box`:

```tsx
import { PrismThemeProvider } from '../prism';
```

Wrap the returned tree (the whole shell — the outer `Box` that contains the nav rail and content column):

```tsx
export const AdminLayout: React.FC<AdminLayoutProps> = ({
  title,
  actions,
  navItems,
  user,
  isAuthenticated,
  login,
  children,
}) => (
  <PrismThemeProvider>
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AdminNavRail
        {...(navItems ? { items: navItems } : {})}
        user={user}
        isAuthenticated={isAuthenticated}
        login={login}
      />
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <AdminTopBar title={title} actions={actions} />
        <Box component="main" sx={{ flex: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  </PrismThemeProvider>
);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/layout/AdminLayout.test.tsx`
Expected: PASS — probe reads `dark`. Existing AdminLayout tests still pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/AdminLayout.tsx src/components/layout/AdminLayout.test.tsx
git commit -m "feat(admin): scope Prism theme to the admin shell via AdminLayout"
```

---

### Task 2: Lock in the zero-change card re-skin (regression guard + Storybook)

The six EntityCard/StatusChip-based cards need no edits — this task proves it and captures the visual result, so a future hardcoded color can't silently break the re-skin.

**Files:**
- Create: `src/components/workflows/AdminPrismCards.stories.tsx`
- Test: `src/components/workflows/WorkflowCard.test.tsx` (modify — add a Prism-wrapped case)

**Interfaces:**
- Consumes: `PrismThemeProvider` (from `src/components/prism`), `WorkflowCard` (default export), and the `Workflow` type from `src/types/workflow`.
- Produces: a `PrismThemeProvider`-wrapped Storybook story group for admin cards; a regression test asserting a representative card renders under Prism with its content intact.

- [ ] **Step 1: Write the failing test**

Add to `src/components/workflows/WorkflowCard.test.tsx`:

```tsx
import { PrismThemeProvider } from '../prism';
import { render, screen } from '../../test/testUtils';
import WorkflowCard from './WorkflowCard';
import type { Workflow } from '../../types/workflow';

const prismWorkflow: Workflow = {
  id: 'wf-prism-1',
  name: 'Refactor auth flow',
  description: 'Consolidate all authz through a single helper module.',
  status: 'live',
  is_default: false,
  steps: [],
} as Workflow;

it('renders under the Prism theme with its title and status intact', () => {
  render(
    <PrismThemeProvider>
      <WorkflowCard
        workflow={prismWorkflow}
        onEdit={() => {}}
        onArchive={() => {}}
        archiving={false}
      />
    </PrismThemeProvider>,
  );
  expect(screen.getByText('Refactor auth flow')).toBeInTheDocument();
  // StatusChip resolves the `live` domain status to its "success" tone label.
  expect(screen.getByText(/live/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it passes immediately (no production change needed)**

Run: `npm test -- src/components/workflows/WorkflowCard.test.tsx`
Expected: PASS on the first run — this is a *regression guard*, not a red-first test. If it FAILS, a card is not theme-safe; stop and fix that card before continuing.

> Note: this is the one task that intentionally does not follow red→green — its purpose is to assert and lock the already-correct behavior. If it does not pass unchanged, that failure is the signal to investigate.

- [ ] **Step 3: Create the Storybook workbench**

Create `src/components/workflows/AdminPrismCards.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { PrismThemeProvider } from '../prism';
import WorkflowCard from './WorkflowCard';
import type { Workflow } from '../../types/workflow';

const workflows: Workflow[] = [
  { id: '1', name: 'Refactor auth flow', description: 'Consolidate all authz through a single helper module.', status: 'live', is_default: true, steps: [{}, {}, {}] },
  { id: '2', name: 'Nightly ingest', description: 'Scrape, parse and normalize new recipe sources.', status: 'draft', is_default: false, steps: [{}] },
  { id: '3', name: 'Archived pipeline', description: 'Deprecated import path.', status: 'archived', is_default: false, steps: [] },
] as Workflow[];

const meta: Meta = {
  title: 'Admin/Prism cards',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const WorkflowCards: StoryObj = {
  render: () => (
    <PrismThemeProvider>
      <Box sx={{ bgcolor: 'background.default', p: 4, display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {workflows.map((wf) => (
          <WorkflowCard key={wf.id} workflow={wf} onEdit={() => {}} onArchive={() => {}} archiving={false} />
        ))}
      </Box>
    </PrismThemeProvider>
  ),
};
```

- [ ] **Step 4: Verify the story renders dark**

Run: `npm run storybook`
Open **Admin / Prism cards → Workflow cards**. Confirm: dark `#10151E` card surfaces on the `#0A0E15` plane, mono-voiced titles, the `live` chip in the accent/success tone, hairline borders, hover lift. Stop `storybook` when confirmed.

- [ ] **Step 5: Commit**

```bash
git add src/components/workflows/AdminPrismCards.stories.tsx src/components/workflows/WorkflowCard.test.tsx
git commit -m "test(admin): lock admin card Prism re-skin with a regression guard + story"
```

---

### Task 3: Tokenize ScoreRunCard's hardcoded radius

`ScoreRunCard` pins `borderRadius: '8px !important'` on its `Accordion`, so under Prism (radius `10px`) its corners disagree with every neighboring card. Read the radius from the theme.

**Files:**
- Modify: `src/components/projects/ScoreRunCard.tsx:67`
- Test: `src/components/projects/ScoreRunCard.test.tsx` (create)

**Interfaces:**
- Consumes: `ScoreRun` type from `src/types/project`; `useTheme` from `@mui/material/styles` (`theme.shape.borderRadius` is the token-derived radius — `10` under Prism).
- Produces: `ScoreRunCard` renders with the active theme's radius; no hardcoded pixel radius remains.

- [ ] **Step 1: Write the failing test**

Create `src/components/projects/ScoreRunCard.test.tsx`:

```tsx
import { readFileSync } from 'node:fs';
import { PrismThemeProvider } from '../prism';
import { render, screen } from '../../test/testUtils';
import { ScoreRunCard } from './ScoreRunCard';
import type { ScoreRun } from '../../types/project';

const scoreRun: ScoreRun = {
  version: 2,
  overall: 7.4,
  scored_at: '2026-07-01T00:00:00Z',
  definition: { name: 'Clarity', scorer_type: 'llm_judge' },
  dimensions: [],
} as ScoreRun;

it('does not hardcode a pixel radius (reads it from the theme)', () => {
  const source = readFileSync(new URL('./ScoreRunCard.tsx', import.meta.url), 'utf8');
  expect(source).not.toMatch(/borderRadius:\s*'8px/);
});

it('renders its score under the Prism theme', () => {
  render(
    <PrismThemeProvider>
      <ScoreRunCard scoreRun={scoreRun} />
    </PrismThemeProvider>,
  );
  expect(screen.getByText('Clarity')).toBeInTheDocument();
  expect(screen.getByText('7.4')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/projects/ScoreRunCard.test.tsx`
Expected: FAIL on the first assertion — the source still contains `borderRadius: '8px`.

- [ ] **Step 3: Replace the hardcoded radius with the theme radius**

In `src/components/projects/ScoreRunCard.tsx`, add `useTheme` and use `theme.shape.borderRadius`. At the top of the component body:

```tsx
import { useTheme } from '@mui/material/styles';
// ...
export const ScoreRunCard: React.FC<ScoreRunCardProps> = ({ scoreRun, defaultExpanded = false }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);
```

Change the `Accordion` `sx` (line ~67) from:

```tsx
sx={{ '&:before': { display: 'none' }, borderRadius: '8px !important', mb: 1 }}
```

to:

```tsx
sx={{ '&:before': { display: 'none' }, borderRadius: `${theme.shape.borderRadius}px !important`, mb: 1 }}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/projects/ScoreRunCard.test.tsx`
Expected: PASS — no hardcoded radius; card renders.

- [ ] **Step 5: Commit**

```bash
git add src/components/projects/ScoreRunCard.tsx src/components/projects/ScoreRunCard.test.tsx
git commit -m "fix(projects): read ScoreRunCard radius from theme so it matches Prism"
```

---

### Task 4: De-hardcode `layout/Button`

`layout/Button` reaches into `theme.palette.primary.light` and forces it as the background, overriding MUI's contained-button styling and breaking the Prism accent-button look. Drop the override; let the contained variant read the palette.

**Files:**
- Modify: `src/components/layout/Button.tsx`
- Test: `src/components/layout/Button.test.tsx` (modify)

**Interfaces:**
- Consumes: nothing new — MUI `Button` `variant="contained"` reads `palette[color].main` / `.contrastText`.
- Produces: `layout/Button` renders a plain token-driven contained button; no `primary.light` override, no `useTheme` read for color.

- [ ] **Step 1: Write the failing test**

Add to `src/components/layout/Button.test.tsx`:

```tsx
import { readFileSync } from 'node:fs';

it('does not force the primary.light background (uses palette-driven contained styling)', () => {
  const source = readFileSync(new URL('./Button.tsx', import.meta.url), 'utf8');
  expect(source).not.toMatch(/primary\?\.light|primaryLight/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/layout/Button.test.tsx`
Expected: FAIL — the source still references `primaryLight` / `primary?.light`.

- [ ] **Step 3: Remove the hardcoded override**

Replace the body of `src/components/layout/Button.tsx` with:

```tsx
import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export interface ButtonProps {
  onClick?: (() => void) | undefined;
  color?: MuiButtonProps['color'] | undefined;
  text?: React.ReactNode;
  sx?: MuiButtonProps['sx'] | undefined;
  disabled?: boolean | undefined;
}

export const Button: React.FC<ButtonProps> = ({ onClick, color = 'primary', text, sx, disabled }) => (
  <MuiButton
    color={color}
    variant="contained"
    onClick={onClick}
    disabled={disabled ?? false}
    {...(sx ? { sx } : {})}
  >
    {text}
  </MuiButton>
);
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/components/layout/Button.test.tsx`
Expected: PASS — no `primaryLight` reference; existing Button tests (label render, click, disabled) still pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Button.tsx src/components/layout/Button.test.tsx
git commit -m "fix(layout): drop hardcoded primary.light so Button follows the palette"
```

---

### Task 5: Full-shell verification

**Files:** none (verification only).

- [ ] **Step 1: Run the full CI gate**

Run: `npm run ci`
Expected: typecheck, lint (no `no-restricted-syntax` violations), and the full Vitest suite all pass.

- [ ] **Step 2: Drive the real admin surface**

Run: `npm run dev` (with `../kaleidoscope` backend running per CLAUDE.md, or against MSW/preview). Visit `/workflows`, `/projects`, `/agents`, `/workspace-roots`. Confirm on each:
  - Page plane is Prism dark (`#0A0E15`); cards are `#10151E` with hairline borders and hover lift.
  - Nav rail + top bar are dark, mono-voiced, with the accent active-state.
  - Status chips use Prism tones (live = pulsing dot); score colors on `ScoreRunCard` read correctly on dark; all corners share the Prism radius.
  - The **public** `NavBar` / reader pages (`/home`, `/about`, `/archive`) are **unchanged** (still light) — confirms the scope boundary held.

- [ ] **Step 3: Commit any verification-driven fixes**

If Step 2 surfaces a component that fights the dark theme (a stray hardcoded value, a low-contrast pairing), fix it with the same red→green cycle, then re-run `npm run ci`. Otherwise, nothing to commit.

---

## Self-Review

**Spec coverage (the P1 row of the audit):**
- *Feature/entity cards (9 files)* → Task 1 mounts Prism; Task 2 proves the EntityCard/SurfaceCard-based cards (`WorkflowCard`, `RoundCard`, `TeamLeadCard`, `AdvisorReviewCard`, `AgentCard`, `ProjectCard`) re-skin with no edits; Task 3 fixes `ScoreRunCard`, the one card that hardcoded a value. ✓
- *Status chips* → `common/StatusChip` + `TaskTypeChip` are token-driven and re-skin via Task 1; badge `<Chip>`s (`v2`, "Default") correctly stay plain per `design-system-usage.md`. ✓
- *Nav rail* → `AdminNavRail` re-skins via the Task 1 mount (already token-aware). ✓
- *Top bar* → `AdminTopBar` re-skins via Task 1. (The public *site navbar* `NavBar`/`SideMenu` is out of scope per the chosen boundary — reader surface, tenant-light.) ✓
- *Buttons* → Task 4 de-hardcodes `layout/Button`; other MUI `<Button>`s re-skin via palette under the Task 1 mount. ✓

**Placeholder scan:** every code step shows complete code; every run step shows the exact command and expected pass/fail. No TBD/TODO. ✓

**Type consistency:** `PrismThemeProvider` (children-only), `Workflow`, `ScoreRun`, `theme.shape.borderRadius`, and `MuiButtonProps['color']` are used consistently across tasks with the signatures they're defined/imported with. ✓

**Assumptions to verify at execution:** `Workflow` / `ScoreRun` fixture shapes above are minimal — if the types require additional non-optional fields, extend the fixtures (the `as Workflow` / `as ScoreRun` casts keep the tests compiling meanwhile). If `AdminLayout.test.tsx`'s existing suite stubs `AdminNavRail`/`AdminTopBar`, keep those stubs and add the new case alongside.
