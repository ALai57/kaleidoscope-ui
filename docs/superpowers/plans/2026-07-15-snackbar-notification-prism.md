# Snackbar + NotificationCard → Prism (P3 slice 2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the two shared feedback primitives — `layout/NotificationCard` (full rebuild on `SurfaceCard`) and `layout/Snackbar` (light-touch mono voice) — token-driven so each stays coherent under Prism-dark and ambient light.

**Architecture:** No page mount. Both components read `theme.tokens.*` with fallbacks. `NotificationCard` (no app consumers) is rebuilt on `SurfaceCard` with a level-tone accent rail, removing its stale Bootstrap classes + raw color literals. `Snackbar` (shared across admin/workflow contexts) keeps all behavior; its `Alert` gains a mono, token-radius `sx`.

**Tech Stack:** React 18 + TS + Vite, MUI 6 + Emotion, Vitest + Testing Library (jsdom), Storybook 8.

## Global Constraints

- Node 22; `npm run ci` green before push; commit after each task.
- **No raw color literals** (lint `no-restricted-syntax`; exempt: `src/theme/**`, tests, stories). Use `theme.palette.*` / `theme.tokens.*` / `alpha(...)`. Remove `NotificationCard`'s `color: 'orange'`/`'red'` literals.
- **Token-driven Prism voice:** mono via `theme.tokens?.typography.mono ?? 'monospace'`; radius via `theme.shape.borderRadius`. No new `prism/*` primitive; `NotificationCard` reuses `SurfaceCard`.
- **Reuse invariant:** `Snackbar` renders in `WorkflowEditorPage`, `ImageManagerPage`, `WorkflowRunPanel`, `RoundsTimeline` (light + potential dark). Styling must be token-driven; adding `useTheme()` must not break bare (no-provider) test renders (MUI `useTheme()` returns the default theme when unprovided).
- **Preserve contracts (retained test files stay UNCHANGED):** Snackbar — message text renders; `role="alert"`; close button `title="Close"` + fires `onClose`; four levels; `open={false}` → no alert. NotificationCard — `title`/`message` text; default `error` → `data-testid="ErrorOutlineIcon"`; `warn` level.
- **Presentation only** — no prop-signature or behavior changes.

---

### Task 1: NotificationCard → Prism (rebuild on SurfaceCard)

**Files:**
- Modify: `src/components/layout/NotificationCard.tsx` (full component rewrite; `NotificationCardProps` unchanged)
- Modify: `src/components/layout/NotificationCard.stories.tsx` (add `Info` + `PrismDark` variants)
- Test: `src/components/layout/NotificationCard.test.tsx` — NOT modified; must keep passing.

**Interfaces:**
- Consumes: `SurfaceCard` from `@/components/common/SurfaceCard`; `useTheme` from `@mui/material/styles`; `InfoOutlinedIcon` from `@mui/icons-material/InfoOutlined`.
- Produces: `NotificationCard` (same props: `level?: 'error'|'warn'|'info'`, `title?`, `message?`).

- [ ] **Step 1: Rewrite `NotificationCard.tsx`**

```tsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { SurfaceCard } from '../common/SurfaceCard';

export interface NotificationCardProps {
  level?: 'error' | 'warn' | 'info';
  title?: string;
  message?: string;
}

// Level → MUI palette tone (each has a `.main`, so it resolves in light + dark).
const LEVEL_TONE: Record<NonNullable<NotificationCardProps['level']>, 'error' | 'warning' | 'info'> = {
  error: 'error',
  warn: 'warning',
  info: 'info',
};

const LevelIcon: React.FC<{ level: NotificationCardProps['level'] }> = ({ level }) => {
  switch (level) {
    case 'warn':
      return <WarningAmberIcon fontSize="small" color="inherit" />;
    case 'info':
      return <InfoOutlinedIcon fontSize="small" color="inherit" />;
    case 'error':
    default:
      return <ErrorOutlineIcon fontSize="small" color="inherit" />;
  }
};

export const NotificationCard: React.FC<NotificationCardProps> = ({
  level = 'error',
  title,
  message,
}) => {
  const theme = useTheme();
  const mono = theme.tokens?.typography.mono ?? 'monospace';
  const tone = LEVEL_TONE[level] ?? 'error';

  return (
    <SurfaceCard sx={{ p: 2, mb: 3, borderLeft: 3, borderLeftColor: `${tone}.main` }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: `${tone}.main` }}>
        <LevelIcon level={level} />
        <Typography
          component="div"
          sx={{ fontFamily: mono, fontWeight: 700, letterSpacing: '0.03em', color: `${tone}.main` }}
        >
          {title}
        </Typography>
      </Box>
      {message && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {message}
        </Typography>
      )}
    </SurfaceCard>
  );
};
```

- [ ] **Step 2: Run the existing test (must stay green)**

Run: `npx vitest run src/components/layout/NotificationCard.test.tsx`
Expected: PASS (4 tests) — title/message render; default `error` still yields `data-testid="ErrorOutlineIcon"` (that icon is unchanged); `warn` renders. If any fail, a contract was dropped — fix before continuing.

- [ ] **Step 3: Update the story (add `Info` + `PrismDark` variants)**

Replace `src/components/layout/NotificationCard.stories.tsx` with:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { NotificationCard } from './NotificationCard';
import { PrismThemeProvider } from '../prism';

const meta: Meta<typeof NotificationCard> = {
  title: 'Layout/NotificationCard',
  component: NotificationCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof NotificationCard>;

export const ErrorNotification: Story = {
  args: {
    level: 'error',
    title: 'Connection Error',
    message: 'Failed to connect to the database.',
  },
};

export const WarnNotification: Story = {
  args: {
    level: 'warn',
    title: 'Low Disk Space',
    message: 'Your disk is almost full.',
  },
};

export const InfoNotification: Story = {
  args: {
    level: 'info',
    title: 'Heads up',
    message: 'A new version is available.',
  },
};

// Token-driven: the same component under a Prism-dark ancestor.
export const PrismDark: Story = {
  args: {
    level: 'error',
    title: 'Connection Error',
    message: 'Failed to connect to the database.',
  },
  decorators: [
    (Story) => (
      <PrismThemeProvider>
        <Story />
      </PrismThemeProvider>
    ),
  ],
};
```

- [ ] **Step 4: Typecheck + lint**

Run: `npm run typecheck && npx eslint src/components/layout/NotificationCard.tsx src/components/layout/NotificationCard.stories.tsx`
Expected: clean — no raw color literals (the `orange`/`red` inline styles are gone), `useTheme` used.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/NotificationCard.tsx src/components/layout/NotificationCard.stories.tsx
git commit -m "feat(layout): NotificationCard → Prism callout on SurfaceCard (tone rail, mono title)"
```

---

### Task 2: Snackbar → Prism voice (token-driven)

**Files:**
- Modify: `src/components/layout/Snackbar.tsx` (add `useTheme` + Alert `sx`)
- Modify: `src/components/layout/Snackbar.stories.tsx` (add a `PrismDark` variant)
- Test: `src/components/layout/Snackbar.test.tsx`, `src/components/layout/Snackbar.extra.test.tsx` — NOT modified; must keep passing.

**Interfaces:**
- Consumes: `useTheme` from `@mui/material/styles`.
- Produces: `Snackbar` (same `SnackbarProps`).

- [ ] **Step 1: Add `useTheme` + the Alert `sx` in `Snackbar.tsx`**

Add the import:

```tsx
import { useTheme } from '@mui/material/styles';
```

Inside the `Snackbar` component, after the existing `handleClose` `useCallback`, add:

```tsx
  const theme = useTheme();
  const mono = theme.tokens?.typography.mono ?? 'monospace';
```

Replace the `<Alert …>` element with:

```tsx
      <Alert
        severity={level}
        onClose={handleClose}
        sx={{
          fontFamily: mono,
          fontSize: '0.8rem',
          letterSpacing: '0.02em',
          alignItems: 'center',
          borderRadius: `${theme.shape.borderRadius}px`,
        }}
      >
        {message}
      </Alert>
```

(Everything else — the `MuiSnackbar` wrapper, `showing` state, `handleClose`, props — stays exactly as-is.)

- [ ] **Step 2: Run both Snackbar test files (must stay green)**

Run: `npx vitest run src/components/layout/Snackbar.test.tsx src/components/layout/Snackbar.extra.test.tsx`
Expected: PASS (all tests) — message text renders; `role="alert"` present; `title="Close"` close button fires `onClose`; all four levels; `open={false}` → no alert. The bare renders (no ThemeProvider) exercise the `theme.tokens?` fallback → `useTheme()` returns the default theme, no crash. If any fail, fix before continuing.

- [ ] **Step 3: Run the shared-Snackbar consumer tests (no regression)**

Run: `npx vitest run src/pages/ImageManagerPage.test.tsx src/pages/WorkflowEditorPage.test.tsx src/components/workflows/WorkflowRunPanel.test.tsx src/components/workflows/RoundsTimeline.test.tsx`
Expected: PASS (whichever of these exist — if a file is absent, vitest reports "no test files found" for it, which is fine; the point is the ones that exist stay green). Since `Snackbar` only gained presentational `sx`, consumers must be unaffected.

- [ ] **Step 4: Add a `PrismDark` story variant**

Replace `src/components/layout/Snackbar.stories.tsx` with:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar } from './Snackbar';
import { PrismThemeProvider } from '../prism';

const meta: Meta<typeof Snackbar> = {
  title: 'Layout/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Info: Story = {
  args: {
    message: 'This is an informational message',
    level: 'info',
    open: true,
  },
};

export const Success: Story = {
  args: {
    message: 'Operation completed successfully',
    level: 'success',
    open: true,
  },
};

export const Error: Story = {
  args: {
    message: 'Something went wrong!',
    level: 'error',
    open: true,
  },
};

// Token-driven: the same Snackbar under a Prism-dark ancestor.
export const PrismDark: Story = {
  args: {
    message: 'Photo uploaded successfully',
    level: 'success',
    open: true,
  },
  decorators: [
    (Story) => (
      <PrismThemeProvider>
        <Story />
      </PrismThemeProvider>
    ),
  ],
};
```

- [ ] **Step 5: Typecheck + lint**

Run: `npm run typecheck && npx eslint src/components/layout/Snackbar.tsx src/components/layout/Snackbar.stories.tsx`
Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/Snackbar.tsx src/components/layout/Snackbar.stories.tsx
git commit -m "feat(layout): Snackbar Prism voice — mono message, token radius (token-driven)"
```

---

### Task 3: Verify (build-storybook + full CI)

**Files:** none (verification only).

- [ ] **Step 1: Build Storybook**

Run: `npm run build-storybook`
Expected: completes without error (both stories' new `PrismDark`/`Info` variants compile).

- [ ] **Step 2: Full CI gate**

Run: `npm run ci`
Expected: typecheck + lint + ALL tests PASS. The full suite is the safety net for the shared `Snackbar`'s consumers. Record the final test count (expect the prior total, unchanged — no tests added or removed).

- [ ] **Step 3: (No commit — nothing changed.)** If CI surfaced a failure, STOP and report it with exact output; do not broad-fix.

---

## Self-Review

- **Spec coverage:** NotificationCard rebuild on SurfaceCard, tone rail, mono title, literals removed, Info icon (Task 1) ✓; Snackbar token-driven mono voice, behavior preserved (Task 2) ✓; shared-consumer regression check (Task 2 Step 3) + full CI (Task 3) ✓; `PrismDark` story variants both (Tasks 1–2) ✓. Contract preservation asserted by the retained, unedited test files ✓.
- **Placeholder scan:** no TBD/TODO; all component/story code complete; commands have expected outputs.
- **Type consistency:** `NotificationCardProps`/`SnackbarProps` unchanged; `LEVEL_TONE` keys match the `level` union; `SurfaceCard` accepts `sx` + children (`BoxProps`); `borderLeftColor: \`${tone}.main\`` is a valid theme color string; `useTheme()` used in both; `InfoOutlinedIcon` import path verified present. `data-testid="ErrorOutlineIcon"` preserved because the default-level icon is still `ErrorOutlineIcon`.
