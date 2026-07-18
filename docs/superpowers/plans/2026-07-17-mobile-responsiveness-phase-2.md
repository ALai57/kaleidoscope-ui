# Mobile Responsiveness — Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reflow the reader content pages that still overflow at 390px — the Experience timeline and the Library shelf/detail split — and extend the overflow e2e guard to cover them.

**Architecture:** Both pages are already inside `AppShell` (they inherit the Phase 1 mobile nav) — the overflow is purely internal layout. Fixes follow the Phase 1 pattern: the `useIsMobile()` (`md`) switch drives a stacked mobile layout. `Timeline` reads `useIsMobile()` once and passes a `mobile` flag to each `TimelineEntry` (so entries stay hook-free and unit-testable); `LibraryPage`/`InterestRail` read `useIsMobile()` to stack the rail above content and drop its fixed width.

**Tech Stack:** React 19 + TypeScript, MUI 9 + `@mui/lab` Timeline, Emotion `sx`, React Router 7, Vitest + Testing Library (jsdom), Playwright (e2e), Prism tokens.

## Global Constraints

- **Node 22**; install with `npm ci`.
- **Mobile/desktop switch is `md` (900px)** via `useIsMobile()` (`@/hooks/useIsMobile`, from Phase 1). Do not add a breakpoint token or use a different threshold.
- **No hardcoded hex in components** — colors via `theme.palette` / `theme.tokens` (the existing lint guard flags raw hex/`rgba()` in `src/**/*.tsx`).
- These pages are already inside `AppShell`; **do not** add nav shells or migrate routes. `NavBar` no longer exists — no NavBar work.
- **Scope discipline:** touch only the reflow. No visual redesign, no data-fetching changes, no unrelated refactors.
- Tests are co-located `*.test.ts(x)`. Run `npm run ci` (typecheck + lint + test) before pushing.
- **Base branch:** this plan builds on `feat/mobile-responsiveness` (Phase 0/1). Execute on that branch (or a branch off it).

## Prior audit (grounds this plan)

Driven live + code-read at 390px:
- **Experience `/experience`** overflows to ~477px. Cause: `@mui/lab`'s `TimelineItem` is an always-row 3-column flex (date col + dot/connector + card) with **no** mobile stacking, no `minWidth:0` on any flex child, and MUI's `::before` opposite-spacer. (`src/components/layout/TimelineEntry.tsx`, rendered by `src/components/layout/Timeline.tsx`.) It uses static data (`TIMELINE_ENTRIES`), so it renders fully without a backend.
- **Library `/library`** overflows to ~406px. Cause: `InterestRail` hard-codes `minWidth: 220` (inline `style`) inside `LibraryPage`'s always-row flex shell whose content column lacks `minWidth:0`. (`src/pages/library/LibraryPage.tsx`, `src/components/library/InterestRail.tsx`.)
- **Article/Recipe audit — already safe, no shell fix needed:** `RichTextEditor` (`src/components/editor/RichTextEditor.tsx`) already constrains reader media — `& img { maxWidth: '100%' }` (line 110-112), `& pre { overflowX: 'auto' }` (line 86-91), outer `overflow: 'hidden'` (line 67). `ArticlePage`/`RecipePage` containers are fluid (`maxWidth` + `mx:'auto'` / `Container maxWidth`). The **only** reader nit is `RecipePage`'s header row (`Stack direction="row"`, title + action buttons, no wrap) — Task 3.

---

## File Structure

**Modify**
- `src/components/layout/TimelineEntry.tsx` — add `mobile` prop; hide date column + show date chip + `minWidth:0` on mobile. (Task 1)
- `src/components/layout/Timeline.tsx` — read `useIsMobile()`, apply the `::before` reclaim on mobile, pass `mobile` to entries. (Task 1)
- `src/components/layout/Timeline.test.tsx` — add two mobile `TimelineEntry` tests. (Task 1)
- `src/components/library/InterestRail.tsx` — drop the fixed `minWidth:220` on mobile. (Task 2)
- `src/pages/library/LibraryPage.tsx` — stack rail above content on mobile; content `minWidth:0`; wrap the tabs row. (Task 2)
- `src/components/library/InterestRail.test.tsx` — add desktop/mobile width tests. (Task 2)
- `src/pages/RecipePage.tsx` — header row stacks on mobile. (Task 3)
- `e2e/mobile-overflow.spec.ts` — add `/experience` and `/library` to the guarded routes. (Task 4)

---

## Task 1: Experience timeline — mobile stacking

Below `md`, the timeline drops its left date column and MUI's opposite-spacer, so the dot/connector rail sits on the left and the card takes the full remaining width; the date moves into a chip at the top of the card. `Timeline` owns the one `useIsMobile()` call and passes `mobile` to each entry.

**Files:**
- Modify: `src/components/layout/TimelineEntry.tsx`, `src/components/layout/Timeline.tsx`
- Test: `src/components/layout/Timeline.test.tsx`

**Interfaces:**
- Consumes: `useIsMobile` (`@/hooks/useIsMobile`); `timelineItemClasses` (`@mui/lab/TimelineItem`).
- Produces: `TimelineEntryProps` gains `mobile?: boolean` (default false).

- [ ] **Step 1: Write the failing tests** — add these to the `describe('TimelineEntry', …)` block in `src/components/layout/Timeline.test.tsx` (the file already defines `mockEntry` with `until: 'Dec, 2024'`, `since: 'Jan, 2023'`):

```tsx
  it('shows the date as a chip inside the card on mobile', () => {
    render(<TimelineEntry entry={mockEntry} mobile />, { wrapper: Wrapper });
    const chip = screen.getByTestId('timeline-date-mobile');
    expect(chip).toBeTruthy();
    expect(chip.textContent).toContain('Dec, 2024');
    expect(screen.getByText('Senior Engineer @ Acme Corp')).toBeTruthy();
  });

  it('renders no mobile date chip on desktop (date stays in the opposite column)', () => {
    render(<TimelineEntry entry={mockEntry} mobile={false} />, { wrapper: Wrapper });
    expect(screen.queryByTestId('timeline-date-mobile')).toBeNull();
    expect(screen.getByText('Dec, 2024')).toBeTruthy();
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/components/layout/Timeline.test.tsx`
Expected: FAIL — `mobile` prop/`timeline-date-mobile` testid don't exist yet (the mobile test can't find the chip; TS may also flag the unknown prop).

- [ ] **Step 3: Add the `mobile` prop to `TimelineEntry`** — in `src/components/layout/TimelineEntry.tsx`:

Find:
```tsx
export interface TimelineEntryProps {
  entry: TimelineEntryData;
  /** Height of the connector below this entry in pixels (proportional to time span). */
  connectorHeight?: number | undefined;
  /** The current role — gets an accent border, a "Current" badge, and a heavier dot. */
  featured?: boolean | undefined;
}
```
Replace:
```tsx
export interface TimelineEntryProps {
  entry: TimelineEntryData;
  /** Height of the connector below this entry in pixels (proportional to time span). */
  connectorHeight?: number | undefined;
  /** The current role — gets an accent border, a "Current" badge, and a heavier dot. */
  featured?: boolean | undefined;
  /** Below md: hide the left date column and render the date as a chip in the card. */
  mobile?: boolean | undefined;
}
```

Find:
```tsx
export const TimelineEntry: React.FC<TimelineEntryProps> = ({
  entry,
  connectorHeight = 80,
  featured = false,
}) => {
```
Replace:
```tsx
export const TimelineEntry: React.FC<TimelineEntryProps> = ({
  entry,
  connectorHeight = 80,
  featured = false,
  mobile = false,
}) => {
```

- [ ] **Step 4: Hide the date column on mobile** — in `TimelineEntry.tsx`, wrap the opposite-content block:

Find:
```tsx
      {/* Left column — dates in the heading voice */}
      <TimelineOppositeContent sx={{ flex: 0.3 }}>
```
Replace:
```tsx
      {/* Left column — dates in the heading voice (desktop only; mobile shows a chip in the card) */}
      {!mobile && (
      <TimelineOppositeContent sx={{ flex: 0.3 }}>
```

Find (the closing tag of that block):
```tsx
          </Typography>
        )}
      </TimelineOppositeContent>
      {/* Middle — dot + connector (token palette, no hardcoded black) */}
```
Replace:
```tsx
          </Typography>
        )}
      </TimelineOppositeContent>
      )}
      {/* Middle — dot + connector (token palette, no hardcoded black) */}
```

- [ ] **Step 5: Let the content shrink and add the mobile date chip** — in `TimelineEntry.tsx`:

Find:
```tsx
      <TimelineContent sx={{ py: 0, pr: 0 }}>
        <SurfaceCard
          sx={{
            p: 2,
            mb: 1,
            ...(featured
              ? { borderColor: 'primary.main', borderWidth: 2, boxShadow: 2 }
              : {}),
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 1 }}>
```
Replace:
```tsx
      <TimelineContent sx={{ py: 0, pr: 0, minWidth: 0 }}>
        <SurfaceCard
          sx={{
            p: 2,
            mb: 1,
            minWidth: 0,
            ...(featured
              ? { borderColor: 'primary.main', borderWidth: 2, boxShadow: 2 }
              : {}),
          }}
        >
          {mobile && (
            <Box
              component="span"
              data-testid="timeline-date-mobile"
              sx={{
                display: 'inline-block',
                mb: 1,
                px: 1,
                py: 0.25,
                borderRadius: '999px',
                border: '1px solid',
                borderColor: 'divider',
                color: 'text.secondary',
                fontFamily: mono,
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
              }}
            >
              {since ? `${since} — ${until ?? year}` : String(until ?? year)}
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 1 }}>
```

- [ ] **Step 6: Reclaim the opposite space + pass `mobile` from `Timeline`** — in `src/components/layout/Timeline.tsx`:

Find:
```tsx
import MuiTimeline from '@mui/lab/Timeline';
import { TimelineEntry } from './TimelineEntry';
```
Replace:
```tsx
import MuiTimeline from '@mui/lab/Timeline';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { TimelineEntry } from './TimelineEntry';
import { useIsMobile } from '@/hooks/useIsMobile';
```

Find:
```tsx
  const mono = theme.tokens?.typography.mono ?? 'monospace';
  const headingFamily = theme.tokens?.typography.headingFamily === 'mono' ? mono : 'inherit';
```
Replace:
```tsx
  const mono = theme.tokens?.typography.mono ?? 'monospace';
  const headingFamily = theme.tokens?.typography.headingFamily === 'mono' ? mono : 'inherit';
  const isMobile = useIsMobile();
```

Find:
```tsx
                <MuiTimeline position="right" sx={{ padding: '0px', m: 0 }}>
                  {entriesWithDeltas.map((entry, i) => (
                    <TimelineEntry
                      key={String(entry.year) + entry.heading}
                      entry={entry}
                      connectorHeight={entry.connectorHeight}
                      featured={group.category === 'work' && groupIdx === 0 && i === 0}
                    />
                  ))}
                </MuiTimeline>
```
Replace:
```tsx
                <MuiTimeline
                  position="right"
                  sx={{
                    padding: '0px',
                    m: 0,
                    ...(isMobile && {
                      [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 },
                    }),
                  }}
                >
                  {entriesWithDeltas.map((entry, i) => (
                    <TimelineEntry
                      key={String(entry.year) + entry.heading}
                      entry={entry}
                      connectorHeight={entry.connectorHeight}
                      featured={group.category === 'work' && groupIdx === 0 && i === 0}
                      mobile={isMobile}
                    />
                  ))}
                </MuiTimeline>
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npm test -- src/components/layout/Timeline.test.tsx`
Expected: PASS (existing TimelineEntry/Timeline tests + the 2 new mobile tests). The existing `Timeline` tests render at the default breakpoint (`useIsMobile()` → false in jsdom without `matchMedia`), so they exercise the unchanged desktop path.

- [ ] **Step 8: Typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: no new errors.

- [ ] **Step 9: Commit**

```bash
git add src/components/layout/TimelineEntry.tsx src/components/layout/Timeline.tsx src/components/layout/Timeline.test.tsx
git commit -m "feat(responsive): stack the Experience timeline on mobile"
```

---

## Task 2: Library — stack the rail above content on mobile

Below `md`, `LibraryPage`'s two-column shell becomes a single column (rail on top), the content column gets `minWidth:0`, the tabs row wraps, and `InterestRail` drops its fixed 220px width.

**Files:**
- Modify: `src/components/library/InterestRail.tsx`, `src/pages/library/LibraryPage.tsx`
- Test: `src/components/library/InterestRail.test.tsx`

**Interfaces:**
- Consumes: `useIsMobile` (`@/hooks/useIsMobile`).

- [ ] **Step 1: Write the failing tests** — in `src/components/library/InterestRail.test.tsx`, add the mock at the top (after the existing imports) and two tests. The file already imports `{ describe, it, expect, vi }`, `screen`, `renderWithProviders`, and defines `interests`.

Add after the imports:
```tsx
import { useIsMobile } from '@/hooks/useIsMobile';
vi.mock('@/hooks/useIsMobile', () => ({ useIsMobile: vi.fn(() => false) }));
const mockUseIsMobile = vi.mocked(useIsMobile);
beforeEach(() => mockUseIsMobile.mockReturnValue(false));
```
(Add `beforeEach` to the vitest import: `import { describe, it, expect, vi, beforeEach } from 'vitest';`.)

Add these tests inside `describe('InterestRail', …)`:
```tsx
  it('reserves a fixed 220px rail on desktop', () => {
    mockUseIsMobile.mockReturnValue(false);
    renderWithProviders(<InterestRail interests={interests} activeId="i1" />);
    expect(screen.getByRole('navigation').style.minWidth).toBe('220px');
  });

  it('drops the fixed width and fills the column on mobile', () => {
    mockUseIsMobile.mockReturnValue(true);
    renderWithProviders(<InterestRail interests={interests} activeId="i1" />);
    const nav = screen.getByRole('navigation');
    expect(nav.style.minWidth).toBe('0px');
    expect(nav.style.width).toBe('100%');
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/components/library/InterestRail.test.tsx`
Expected: FAIL — the mobile test finds `minWidth: '220px'` (rail is unconditionally 220) and no `width: 100%`.

- [ ] **Step 3: Make `InterestRail` width responsive** — in `src/components/library/InterestRail.tsx`:

Find:
```tsx
import { useTheme } from '@mui/material/styles';
import { Button } from '../prism';
```
Replace:
```tsx
import { useTheme } from '@mui/material/styles';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Button } from '../prism';
```

Find:
```tsx
  const { tokens } = useTheme();
  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 220 }}>
```
Replace:
```tsx
  const { tokens } = useTheme();
  const isMobile = useIsMobile();
  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        minWidth: isMobile ? 0 : 220,
        width: isMobile ? '100%' : undefined,
      }}
    >
```

- [ ] **Step 4: Run the InterestRail tests to verify they pass**

Run: `npm test -- src/components/library/InterestRail.test.tsx`
Expected: PASS (existing 3 tests + the 2 new ones).

- [ ] **Step 5: Stack the LibraryPage shell on mobile** — in `src/pages/library/LibraryPage.tsx`:

Find:
```tsx
import { useTheme } from '@mui/material/styles';
import { LoadingScreen } from '../../components/layout/LoadingScreen';
```
Replace:
```tsx
import { useTheme } from '@mui/material/styles';
import { useIsMobile } from '@/hooks/useIsMobile';
import { LoadingScreen } from '../../components/layout/LoadingScreen';
```

Find:
```tsx
  const { tokens } = useTheme();
  const { token } = useAuth();
```
Replace:
```tsx
  const { tokens } = useTheme();
  const isMobile = useIsMobile();
  const { token } = useAuth();
```

Find:
```tsx
    <Box sx={{ display: 'flex', gap: 3, p: 3, minHeight: '70vh' }}>
```
Replace:
```tsx
    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 3, p: { xs: 2, md: 3 }, minHeight: '70vh' }}>
```

Find:
```tsx
      <Box sx={{ flex: 1 }}>
        {id && canEdit && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
```
Replace:
```tsx
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {id && canEdit && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
```

- [ ] **Step 6: Run the library test suite**

Run: `npm test -- src/pages/library src/components/library`
Expected: PASS. `LibraryPage`'s stack direction is a CSS breakpoint value jsdom can't assert; it is verified by the `/library` overflow e2e in Task 4. Existing `LibraryPage.test` renders at the default breakpoint (`useIsMobile()` → false) and is unaffected.

- [ ] **Step 7: Typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: no new errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/library/InterestRail.tsx src/pages/library/LibraryPage.tsx src/components/library/InterestRail.test.tsx
git commit -m "feat(responsive): stack the Library rail above content on mobile"
```

---

## Task 3: RecipePage header — stack on mobile

Layout-only responsive tweak: the recipe header (`title` + action buttons) stacks into a column below `sm` so a long title can't push the buttons off-screen. No new behavior, so no new test — verified by the existing `RecipePage` suite (which renders the header) staying green.

**Files:**
- Modify: `src/pages/RecipePage.tsx`

- [ ] **Step 1: Make the header row responsive** — in `src/pages/RecipePage.tsx`:

Find:
```tsx
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
```
Replace:
```tsx
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              sx={{
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
```

- [ ] **Step 2: Confirm no regression**

Run: `npm test -- src/pages/RecipePage.test.tsx`
Expected: PASS (unchanged). This suite renders the header (title + `Edit` for authenticated users) via MSW-backed recipe data; a passing run confirms the responsive `direction` change didn't break header rendering. The change is layout-only (a MUI responsive `direction` object), which jsdom does not compute, so no new assertion is added.

- [ ] **Step 3: Commit**

```bash
git add src/pages/RecipePage.tsx
git commit -m "feat(responsive): stack the RecipePage header on mobile"
```

---

## Task 4: Extend the overflow e2e to the reflowed routes

Now that Experience and Library reflow, add them to the 390px overflow guard (the Phase 1 spec deferred them to here).

**Files:**
- Modify: `e2e/mobile-overflow.spec.ts`

- [ ] **Step 1: Add the two routes** — in `e2e/mobile-overflow.spec.ts`:

Find:
```ts
const routes = ['/', '/about', '/recipes'];
```
Replace:
```ts
const routes = ['/', '/about', '/recipes', '/experience', '/library'];
```

- [ ] **Step 2: Run the e2e**

Run: `npm run test:e2e -- mobile-overflow`
Expected: 5/5 passing. Playwright boots the dev server (`webServer` in `playwright.config.ts`). `/experience` renders from static `TIMELINE_ENTRIES` (no backend); `/library` renders its shell (interests list may be empty without a backend, but the stacked layout does not overflow). If `/experience` or `/library` still fails, the corresponding Task 1/2 fix is incomplete — report it with the route and the `scrollWidth`/`clientWidth` numbers rather than weakening the assertion.

- [ ] **Step 3: Commit**

```bash
git add e2e/mobile-overflow.spec.ts
git commit -m "test(responsive): extend 390px overflow guard to /experience and /library"
```

---

## Final verification

- [ ] **Run the full CI gate**

Run: `npm run ci`
Expected: `typecheck` + `lint` + `test` all pass (lint may show the 4 pre-existing warnings unrelated to this branch).

- [ ] **Manual smoke (recommended).** `npm run dev`, browser device mode at 390px:
  - `/experience` — timeline is a single left-rail-plus-full-width-card column; each card shows a date chip; no horizontal scroll.
  - `/library` — the interest rail sits above the content; no horizontal scroll.
  - `/recipes/<a real slug>` — header title and actions stack cleanly on a narrow screen.

---

## Self-review notes (coverage vs. spec §7)

- **Experience timeline → single column, date chips; skills grid reflows** → Task 1. (The skills grid — `SkillsSection` — is already responsive via `sx={{ xs/sm/md }}`; no change needed, confirmed in the audit.)
- **Library shelf/detail split stacks** → Task 2.
- **Article & Recipe pages get a mobile pass (padding, media max-width:100%)** → audited: `RichTextEditor` already constrains media (cited above), containers already fluid; the one real nit (RecipePage header) → Task 3.
- **Migrate legacy top-NavBar pages onto AppShell** → **not applicable**: `NavBar` was already removed in a prior migration and all four Phase-2 target routes are already inside `AppShell`. Documented in the audit; no task.
- **Overflow regression e2e extended to /experience, /library** → Task 4.

Deferred to later phases (correctly out of scope): Phase 3 admin (`AdminNavRail` drawer, data-grid overflow), and the a11y follow-up carried from Phase 1 (drawer focus trap).
