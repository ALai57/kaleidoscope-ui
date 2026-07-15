# Workflow Progress Internals → Prism (P2 slice 3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the workflow run-progress components to the Prism voice: a shared pulsing `LiveDot` replacing "in-progress" status spinners, mono status/labels, a hairline timeline spine with an accent "now" node on `RoundsTimeline`, and tokenized colors in `RoundCard` — token-driven so it reads Prism-dark in `ProjectsPage`'s inline detail and light-coherent in `ProjectDetailPage`.

**Architecture:** Additive Prism voice, token-driven, in place — the components already render dark-correct via the token-backed MUI palette; this adds the voice. One new shared primitive (`common/LiveDot`, modeled on `StatusChip`'s internal `StatusDot`); the rest are targeted restyles. Full design: `docs/superpowers/specs/2026-07-14-workflow-progress-prism-design.md`.

**Tech Stack:** React 18 + TS, MUI 6 (`alpha`/`useTheme`/`sx`), Emotion, Vitest + Testing Library (jsdom), Storybook 8.

## Global Constraints

- Node 22; `npm run ci` green before push; commit after each task.
- **No raw color literals** in components (lint-enforced; exempt under `src/theme/**`, tests, stories). Use `theme.palette.*` / `theme.tokens.*` / `alpha(...)`.
- **Token-driven Prism voice, no `prism/*` imports** in these components (they're token-driven via `theme.*`; `LiveDot` lives in `common/` like `StatusChip`). Mono via `theme.tokens?.typography.mono ?? 'monospace'`; motion via `theme.tokens?.motion` with fallbacks.
- **Reuse invariant:** these render in TWO admin contexts — `ProjectsPage` → `ProjectInlineDetail` (dark) and `ProjectDetailPage` (light). No public reader. Keep everything token-driven; verify light + dark.
- **Styling/presentation only** — no changes to queries, mutations, polling, respond/answer handlers, or status computation.
- Respect `@media (prefers-reduced-motion: reduce)` for the pulse.
- **Testing reality:** `RoundsTimeline`/`WorkflowStepper`/`WorkflowRunPanel` have **no existing tests** and are query/integration-heavy; building full unit harnesses is disproportionate for a styling change. Their verification is: `PrismThemeProvider`-wrapped **and** light Storybook stories (which double as render smokes) + `npm run typecheck` + `npm run lint` + manual QA. `LiveDot` (new) and `RoundCard` (has a test) get real unit tests.

## File Structure

| File | Change | Responsibility |
|---|---|---|
| `src/components/common/LiveDot.tsx` | Create | The shared pulsing "live" dot (token-driven, optional mono label). |
| `src/components/common/LiveDot.test.tsx` | Create | Renders dot + label; both themes. |
| `src/components/workflows/RoundCard.tsx` | Modify | Tokenize `.50`/persona colors → `alpha`; "Analyzing" spinner → `LiveDot`; mono round label. |
| `src/components/workflows/RoundCard.test.tsx` | Modify | `LiveDot` shows for in-progress; no crash. |
| `src/components/workflows/RoundsTimeline.tsx` | Modify | Hairline spine + per-round node (active = `LiveDot`, done = dot). |
| `src/components/workflows/WorkflowStepper.tsx` | Modify | Running status-icon → `LiveDot`; persona dot accent pulse while streaming; mono status labels. |
| `src/components/workflows/WorkflowRunPanel.tsx` | Modify | Active-run header spinner → `LiveDot` + mono; run-control chrome hairline/mono; Prism start button. |
| `src/components/workflows/RoundsTimeline.stories.tsx`, `WorkflowStepper.stories.tsx`, `WorkflowRunPanel.stories.tsx` | Create | Light + Prism-dark render-smoke/visual stories for the untested components. |

---

### Task 1: `common/LiveDot` (the shared pulse)

**Files:** Create `src/components/common/LiveDot.tsx`, `src/components/common/LiveDot.test.tsx`.

**Interfaces:** Produces `LiveDot` with `LiveDotProps { size?: number; color?: string; label?: string; pulse?: boolean }`. Renders a `data-testid="live-dot"` span; with `label`, a mono inline-flex `dot + text`. Consumed by Tasks 3–5.

- [ ] **Step 1: Write the failing tests**

Create `src/components/common/LiveDot.test.tsx`:

```tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '../../theme';
import { LiveDot } from './LiveDot';

describe('LiveDot', () => {
  it('renders the dot', () => {
    render(<LiveDot />);
    expect(screen.getByTestId('live-dot')).toBeTruthy();
  });

  it('renders an optional mono label', () => {
    render(<LiveDot label="Analyzing" />);
    expect(screen.getByText('Analyzing')).toBeTruthy();
    expect(screen.getByTestId('live-dot')).toBeTruthy();
  });

  it('renders under a token theme without error', () => {
    render(
      <ThemeProvider theme={makeTheme(BASE_THEME)}>
        <LiveDot label="Running" color="success.main" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Running')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- src/components/common/LiveDot.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Create `LiveDot.tsx`**

```tsx
import React from 'react';
import Box from '@mui/material/Box';

export interface LiveDotProps {
  /** Dot diameter in px (default 8). */
  size?: number;
  /** Palette path or color string for the dot + label (default accent). */
  color?: string;
  /** Optional trailing mono label (e.g. "Analyzing"). */
  label?: string;
  /** Whether the dot pulses (default true). */
  pulse?: boolean;
}

/**
 * A token-driven pulsing "live" dot — the Prism signal for in-progress/streaming
 * state, replacing bare spinners. Modeled on StatusChip's internal StatusDot: the
 * dot inherits `color` via `currentColor`, and pulses a box-shadow ring using
 * `theme.tokens.motion` with fallbacks, so it is correct in both light and dark.
 */
export const LiveDot: React.FC<LiveDotProps> = ({
  size = 8,
  color = 'primary.main',
  label,
  pulse = true,
}) => {
  const dot = (
    <Box
      component="span"
      aria-hidden="true"
      data-testid="live-dot"
      sx={(theme) => {
        const period = theme.tokens ? theme.tokens.motion.duration.slow * 4 : 1600;
        const easing = theme.tokens?.motion.easing.easeOut ?? 'ease-out';
        return {
          width: size,
          height: size,
          borderRadius: '50%',
          flexShrink: 0,
          color,
          bgcolor: 'currentColor',
          ...(pulse && {
            animation: `live-pulse ${period}ms ${easing} infinite`,
            '@keyframes live-pulse': {
              '0%': { boxShadow: '0 0 0 0 currentColor' },
              '70%': { boxShadow: '0 0 0 5px transparent' },
              '100%': { boxShadow: '0 0 0 0 transparent' },
            },
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }),
        };
      }}
    />
  );

  if (!label) return dot;

  return (
    <Box
      component="span"
      sx={(theme) => ({
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        color,
        fontFamily: theme.tokens?.typography.mono ?? 'monospace',
        fontSize: '0.72rem',
        lineHeight: 1,
      })}
    >
      {dot}
      {label}
    </Box>
  );
};
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- src/components/common/LiveDot.test.tsx`
Expected: PASS (3/3). `npm run typecheck` clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/common/LiveDot.tsx src/components/common/LiveDot.test.tsx
git commit -m "feat(common): add token-driven LiveDot pulse (Prism live signal)"
```

---

### Task 2: `RoundCard` — tokenize colors + LiveDot + mono

**Files:** Modify `src/components/workflows/RoundCard.tsx`; Test `src/components/workflows/RoundCard.test.tsx`.

**Interfaces:** Consumes `LiveDot` (Task 1). No prop/API change.

- [ ] **Step 1: Write the failing test**

Add to `src/components/workflows/RoundCard.test.tsx` — **reuse the file's existing render harness/mocks** (read it; mirror the sibling tests' render + a `round` fixture with `status: 'in_progress'` and no judge). Add:

```tsx
it('shows a LiveDot while a round is analyzing (in progress, no judge)', () => {
  // render RoundCard with a round fixture: status 'in_progress', judge undefined,
  // using the file's existing render helper + agents fixture
  expect(screen.getByTestId('live-dot')).toBeTruthy();
  expect(screen.getByText(/Analyzing/)).toBeTruthy();
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- src/components/workflows/RoundCard.test.tsx`
Expected: FAIL — no `live-dot` (still a `CircularProgress`).

- [ ] **Step 3: Apply the edits**

In `src/components/workflows/RoundCard.tsx`:

(a) Add imports: `import { alpha, useTheme } from '@mui/material/styles';` and `import { LiveDot } from '../common/LiveDot';`. Add `const theme = useTheme();` at the top of the component body.

(b) Tokenize `headerBg` (currently `warning.50`/`primary.50` — these do NOT resolve in the token palette) to dark-safe alpha tints:
```tsx
const headerBg =
  awaitingInput ? alpha(theme.palette.warning.main, 0.14)
  : action === 'clarify' ? alpha(theme.palette.warning.main, 0.14)
  : isInProgress && !hasJudge ? alpha(theme.palette.primary.main, 0.14)
  : 'action.hover';
```

(c) Replace the "Analyzing…" spinner block (the `CircularProgress size={12}` + caption) with `LiveDot`:
```tsx
{isInProgress && !hasJudge && !awaitingInput && (
  <LiveDot label="Analyzing…" color="primary.main" />
)}
```
Remove the now-unused `CircularProgress` import **only if** no other usage remains in the file (check first).

(d) Mono the round label (the `Round {round.round_number}` `Typography variant="overline"`): add `fontFamily: theme.tokens?.typography.mono ?? 'monospace'` to its `sx`.

(e) Tokenize the persona-color raw concatenations: `boxShadow: active ? \`0 0 0 2px ${persona.color}\`` → `boxShadow: active ? \`0 0 0 2px ${alpha(persona.color, 0.9)}\``; and `bgcolor: \`${persona.color}0d\`` → `bgcolor: alpha(persona.color, 0.05)`.

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- src/components/workflows/RoundCard.test.tsx`
Expected: PASS (existing + new). `npm run typecheck` && `npm run lint` clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/workflows/RoundCard.tsx src/components/workflows/RoundCard.test.tsx
git commit -m "feat(workflows): RoundCard Prism voice — LiveDot, mono label, tokenized colors"
```

---

### Task 3: `RoundsTimeline` — hairline spine + accent now-node

**Files:** Modify `src/components/workflows/RoundsTimeline.tsx`; Create `src/components/workflows/RoundsTimeline.stories.tsx`.

**Interfaces:** Consumes `LiveDot`. Renders each round in a spine row: a left rail with a node (active round = `LiveDot`, completed = a small `success` dot) + the `RoundCard` to the right.

- [ ] **Step 1: Add the spine layout**

In the active-run `return` (the `<Box>` mapping `olderRounds` + `latestRound`), wrap the rounds in a spine. Introduce a local `TimelineRow` that renders the rail node + children:

```tsx
const TimelineRow: React.FC<{ active?: boolean; children: React.ReactNode }> = ({ active = false, children }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: '24px 1fr', columnGap: 1 }}>
    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      {/* hairline spine */}
      <Box sx={{ position: 'absolute', top: 0, bottom: 0, width: '1px', bgcolor: 'divider' }} />
      {/* node */}
      <Box sx={{ position: 'relative', mt: 1.25 }}>
        {active ? (
          <LiveDot size={10} color="primary.main" />
        ) : (
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
        )}
      </Box>
    </Box>
    <Box sx={{ minWidth: 0 }}>{children}</Box>
  </Box>
);
```

Then render older rounds and the latest round each inside a `TimelineRow` (older = not active; latest = active when `roundInProgress`), replacing the bare `RoundCard` list + the `Divider`. Keep the awaiting-input section and `RoundActionBar` after the latest round's row (they can sit in the `1fr` column of the latest `TimelineRow` or below it). Mono the "N earlier rounds" count label if kept.

- [ ] **Step 2: Create a render-smoke + visual story**

Create `src/components/workflows/RoundsTimeline.stories.tsx` mirroring the repo's story conventions, with light and `PrismThemeProvider`-wrapped variants. Because `RoundsTimeline` fetches rounds via TanStack Query, wrap stories in a `QueryClientProvider` with seeded/mocked data (follow `RoundCard.stories.tsx` for fixture shape). If seeding the query is impractical in a story, render the timeline's presentational subtree with a small in-story fixture — the goal is a render smoke + visual, not full integration.

- [ ] **Step 3: Verify**

Run: `npm run typecheck` && `npm run lint` — clean. Run: `npm run storybook`, open **RoundsTimeline** light + Prism stories, confirm: hairline spine, accent `LiveDot` now-node on the active round, mono labels, RoundCards intact; light variant is coherent (light spine, accent node). Stop storybook.

- [ ] **Step 4: Commit**

```bash
git add src/components/workflows/RoundsTimeline.tsx src/components/workflows/RoundsTimeline.stories.tsx
git commit -m "feat(workflows): RoundsTimeline Prism spine + accent now-node"
```

---

### Task 4: `WorkflowStepper` — running dot → LiveDot + persona pulse + mono

**Files:** Modify `src/components/workflows/WorkflowStepper.tsx`; Create `src/components/workflows/WorkflowStepper.stories.tsx`.

**Interfaces:** Consumes `LiveDot`.

- [ ] **Step 1: Apply the edits**

In `src/components/workflows/WorkflowStepper.tsx`:
(a) Add `import { LiveDot } from '../common/LiveDot';` and (if not present) `import { alpha, useTheme } from '@mui/material/styles';`.
(b) `StatusIcon` `running` branch: replace `<CircularProgress size={18} />` with `<LiveDot size={10} color="primary.main" />`. Remove the `CircularProgress` import only if no other usage remains (the submit/respond button spinner likely still uses it — check).
(c) "Running…" caption: add mono `fontFamily: (t) => t.tokens?.typography.mono ?? 'monospace'` to its `sx`; same for the "Skipped" caption and the round `overline` labels.
(d) Persona avatar dot (the `22×22` `borderRadius:'50%'` `bgcolor: persona.color` Box): when the step is streaming/running, add an accent ring — inside a `useTheme` scope, `boxShadow: isStreaming ? \`0 0 0 2px ${alpha(theme.palette.primary.main, 0.5)}\` : 'none'` and a `transition: 'box-shadow 0.2s'`. (Use the component's existing `isStreaming` flag.)

- [ ] **Step 2: Create a render-smoke + visual story**

Create `src/components/workflows/WorkflowStepper.stories.tsx` with light + Prism-dark variants. `WorkflowStepper` takes step data as props (not query-only) — seed a small fixture of `StepRun`s covering `running`, `completed`, `awaiting_input`, `pending` so the story exercises the `LiveDot` + status icons. Mirror repo story conventions.

- [ ] **Step 3: Verify**

Run: `npm run typecheck` && `npm run lint` — clean. Run: `npm run storybook`, open **WorkflowStepper** stories; confirm the running step shows the `LiveDot` pulse, the persona dot has the accent ring while streaming, labels are mono; light variant coherent. Stop storybook.

- [ ] **Step 4: Commit**

```bash
git add src/components/workflows/WorkflowStepper.tsx src/components/workflows/WorkflowStepper.stories.tsx
git commit -m "feat(workflows): WorkflowStepper Prism — LiveDot running step, persona pulse, mono"
```

---

### Task 5: `WorkflowRunPanel` — active-run header LiveDot + mono + chrome

**Files:** Modify `src/components/workflows/WorkflowRunPanel.tsx`; Create `src/components/workflows/WorkflowRunPanel.stories.tsx`.

**Interfaces:** Consumes `LiveDot`.

- [ ] **Step 1: Apply the edits**

In `src/components/workflows/WorkflowRunPanel.tsx`:
(a) Add `import { LiveDot } from '../common/LiveDot';`.
(b) Active-run status header (`WorkflowTab`, ~`:643-663`): replace `<CircularProgress size={14} thickness={5} />` with `<LiveDot size={9} color="primary.main" />`; add mono `fontFamily` to the "Run #N — in progress" `overline`. Keep the `StatusChip`.
(c) Run-control chrome: the compact strip container (`~:685-716`, `border:1 + action.hover`) — keep the hairline `divider` border; add mono to its labels/overline. The start `Button` (in `StartRunControls` `~:526-561` and the compact strip): give it the Prism accent treatment — keep `variant="outlined"`, add `sx` `{ '&:hover': { borderColor: 'primary.main', color: 'primary.main' } }` and mono label font. Do NOT change the button's loading `CircularProgress` (genuine loading affordance) or the `ScrutinySelector`/target-score logic.
(d) `RunHistoryRow`: the run number is already `fontFamily:'monospace'` — leave it; add mono to the timestamp/label meta `Typography` where cheap.

Only styling `sx`/`fontFamily` changes — no changes to run/mutation/query logic.

- [ ] **Step 2: Create a render-smoke + visual story**

Create `src/components/workflows/WorkflowRunPanel.stories.tsx` with light + Prism-dark variants. `WorkflowRunPanel`/`WorkflowTab` are query-driven; wrap in `QueryClientProvider` with seeded data, or render a representative presentational subtree with an in-story fixture (render smoke + visual, not full integration).

- [ ] **Step 3: Verify**

Run: `npm run typecheck` && `npm run lint` — clean. Run: `npm run storybook`, open **WorkflowRunPanel** stories; confirm the active-run header shows the `LiveDot` + mono, the run-control chrome is hairline/mono, the start button has the accent treatment; light variant coherent. Stop storybook.

- [ ] **Step 4: Commit**

```bash
git add src/components/workflows/WorkflowRunPanel.tsx src/components/workflows/WorkflowRunPanel.stories.tsx
git commit -m "feat(workflows): WorkflowRunPanel Prism — LiveDot header, mono chrome, accent start"
```

---

### Task 6: Full-slice verification

**Files:** none (verification only).

- [ ] **Step 1: Full gate**

Run: `npm run ci`
Expected: typecheck clean, lint clean (all colors via palette/tokens/`alpha` — the `RoundCard` `.50`/persona conversions removed the raw-ish usages), full Vitest suite green (`LiveDot` + `RoundCard` tests + all existing).

- [ ] **Step 2: Storybook light+dark sweep**

Run: `npm run storybook`. Sweep the four new/updated stories (`LiveDot`, `RoundsTimeline`, `WorkflowStepper`, `WorkflowRunPanel`) in BOTH light and Prism-dark: confirm the `LiveDot` pulse reads in both, the timeline spine/now-node, the running step + persona pulse, and the run header/chrome — and that the **light** variants are coherent (this is the `ProjectDetailPage` proof). Stop storybook.

- [ ] **Step 3: Drive (best-effort — needs backend/auth)**

If available, open `ProjectsPage` → a project's inline detail (dark AdminLayout) with an active run — confirm the timeline spine, running step `LiveDot`, and run header read as Prism-dark; then open the standalone `ProjectDetailPage` (light) for the same run — confirm it's coherent (light with Prism voice), not broken. If no backend, note deferred (covered by the light+dark stories + `LiveDot`/`RoundCard` unit tests).

---

## Self-Review

**Spec coverage:**
- *Shared LiveDot* → Task 1 (full TDD). ✓
- *RoundsTimeline spine + accent now-node* → Task 3. ✓
- *RoundCard: Analyzing→LiveDot, tokenize colors, mono* → Task 2 (full TDD). ✓
- *WorkflowStepper: running→LiveDot, persona pulse, mono* → Task 4. ✓
- *WorkflowRunPanel: header LiveDot, mono chrome, accent start* → Task 5. ✓
- *Reuse invariant (dark + light coherence)* → light + Prism stories in Tasks 3–5 + Task 6 sweep. ✓
- *Fix raw-ish colors / `.50` non-resolution* → Task 2 (`alpha` conversions). ✓

**Placeholder scan:** `LiveDot` (Task 1) and the `RoundCard` edits (Task 2) have complete code. The `RoundCard`/other tests defer their render harness to each file's existing setup where one exists (RoundCard has a test) — the assertion is given. Tasks 3–5 give exact edits at named anchors plus the new spine/story code; the untested integration components are verified via stories + typecheck/lint + QA per the documented Testing reality (not a placeholder — a deliberate, right-sized coverage choice).

**Type consistency:** `LiveDot` (`common/LiveDot`) imported from `../common/LiveDot` in workflow components; `LiveDotProps` fields used consistently; `alpha`/`useTheme` from `@mui/material/styles`.

**Scope:** the five run-progress files + `LiveDot` + four stories. `WorkflowStepList`, page mounts, and run-orchestration logic untouched.
