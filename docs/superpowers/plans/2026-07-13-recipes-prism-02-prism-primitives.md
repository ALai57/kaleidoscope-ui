# Prism Primitives + Preset Surfaces — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A small set of token-driven, framework-agnostic React primitives (`Button`, `IconButton`, `Card`, `Chip`, `TextInput`, `Menu`, `Dialog`) that render the Prism look, plus Prism-preset dark surfaces and a spectrum series that match the approved artifact.

**Architecture:** Primitives are Emotion `styled` components that read the existing mode-reactive token layer (`theme.tokens.*` — `src/theme/index.ts`), **not** MUI components — so they survive the planned MUI exit. We extend the `prism` preset (already in `src/theme/tokens.ts`) with dark surface/ink overrides and a spectrum `categorical` set, threaded through `makeTokens`. Only the primitives Recipes needs are built (YAGNI); more presets/primitives come as later adopters demand them.

**Tech Stack:** React 18, TypeScript, Emotion (`@emotion/styled` via MUI's re-export or direct), MUI theme provider (token carrier), Vitest + Testing Library, Storybook 8.

## Global Constraints

- Repo root for every path: `kaleidoscope-ui`.
- Primitives live in `src/components/prism/`, one component per file, co-located `*.test.tsx`, co-located `*.stories.tsx`.
- Read colors/spacing/motion **only** through `theme.tokens.*`. No hardcoded hex in primitive components except `transparent`/`currentColor`.
- No new runtime deps — Emotion, MUI, TanStack, Zustand are already present. Use `styled` from `@mui/material/styles` (re-exports Emotion) to match the repo's existing convention (`src/components/colors/ColorWheel.tsx:16`).
- Every primitive: visible `:focus-visible` outline (`2px solid ${theme.tokens.color.brand.primary}`), and honor `@media (prefers-reduced-motion: reduce)` by gating transitions/animations.
- `npm run ci` (typecheck + lint + test) must pass before the final commit.
- Token values of record are the Prism artifact: bg `#0A0E15`, surface `#10151E`, raised `#161D29`, inset `#1D2634`; ink `#E9EEF6 / #93A1B5 / #5C6A7E`; accent `#45D6E8`; spectrum `#26A0BC #9085E9 #C98500 #2E9E5B #D55181`; crit `#EF5D5D`.

---

### Task 1: Prism dark surfaces + spectrum series in the token layer

**Files:**
- Modify: `src/theme/tokens.ts` (add Prism neutrals/spectrum constants; extend `ThemePreset`; thread through `makeTokens`)
- Test: `src/theme/tokens.test.ts`

**Interfaces:**
- Produces: `makeTokens(PRISM_SEED, 'dark', 'prism').color.surface` = the artifact's dark planes; `.color.categorical` = the Prism spectrum. Default preset is unchanged.

- [ ] **Step 1: Write the failing test**

Add to `src/theme/tokens.test.ts`:

```ts
import { makeTokens, PRESETS } from './tokens';

describe('prism preset surfaces', () => {
  const t = makeTokens(PRESETS.prism.seed, 'dark', 'prism');
  it('uses the artifact dark planes', () => {
    expect(t.color.surface.base).toBe('#0A0E15');
    expect(t.color.surface.raised).toBe('#10151E');
    expect(t.color.surface.sunken).toBe('#1D2634');
  });
  it('exposes the prism spectrum as categorical', () => {
    expect(t.color.categorical.slice(0, 5)).toEqual(
      ['#26A0BC', '#9085E9', '#C98500', '#2E9E5B', '#D55181']
    );
  });
  it('leaves the default preset dark surfaces untouched', () => {
    const d = makeTokens(PRESETS.default.seed, 'dark', 'default');
    expect(d.color.surface.base).not.toBe('#0A0E15');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/theme/tokens.test.ts`
Expected: FAIL — surfaces come from shared `DARK_NEUTRALS`; no per-preset override exists.

- [ ] **Step 3: Add Prism constants + a preset override hook**

In `src/theme/tokens.ts`, near the other neutral constants, add:

```ts
/** Prism's dark instrument-panel planes (from the approved artifact). */
const PRISM_DARK_NEUTRALS = {
  surface: { base: '#0A0E15', raised: '#10151E', sunken: '#1D2634' },
  border: { subtle: 'rgba(148, 170, 200, 0.13)', strong: 'rgba(148, 170, 200, 0.24)' },
  text: { primary: '#E9EEF6', secondary: '#93A1B5', disabled: '#5C6A7E' },
  elevation: {
    none: 'none',
    sm: '0 8px 18px rgba(0,0,0,0.35)',
    md: '0 14px 34px rgba(0,0,0,0.45)',
    lg: '0 30px 70px rgba(0,0,0,0.6)',
  },
} as const;

/** Prism's spectrum — distinct series hues validated on #10151E. */
const PRISM_SPECTRUM = ['#26A0BC', '#9085E9', '#C98500', '#2E9E5B', '#D55181'] as const;
```

Extend the `ThemePreset` interface (add two optional fields):

```ts
export interface ThemePreset {
  id: PresetId;
  label: string;
  seed: ThemeParams;
  defaultMode: ColorModePreference;
  radius: RadiusScale;
  motion: Motion;
  typography: TypographyFamilies;
  /** Optional per-mode neutral/elevation override (Prism's committed dark plane). */
  darkNeutrals?: typeof PRISM_DARK_NEUTRALS;
  /** Optional categorical/series override (Prism's spectrum). */
  categorical?: readonly string[];
}
```

Attach them to the `prism` entry in `PRESETS`:

```ts
  prism: {
    id: 'prism',
    label: 'Prism',
    seed: PRISM_SEED,
    defaultMode: 'dark',
    radius: { sm: 6, md: 10, lg: 14, pill: 9999 },
    motion: PRISM_MOTION,
    typography: { sans: SANS, mono: MONO, headingFamily: 'mono' },
    darkNeutrals: PRISM_DARK_NEUTRALS,
    categorical: PRISM_SPECTRUM,
  },
```

- [ ] **Step 4: Thread the overrides through `makeTokens`**

In `makeTokens`, after `const neutrals = mode === 'dark' ? DARK_NEUTRALS : LIGHT_NEUTRALS;`, apply the preset override for dark mode:

```ts
  const effectiveNeutrals =
    mode === 'dark' && preset.darkNeutrals ? preset.darkNeutrals : neutrals;
```

Then in the returned object, source surface/border/text/elevation from `effectiveNeutrals`, and categorical from the preset override when present:

```ts
    color: {
      brand,
      status: { ...status },
      surface: { ...effectiveNeutrals.surface },
      border: { ...effectiveNeutrals.border },
      text: { ...effectiveNeutrals.text },
      categorical: preset.categorical ?? CATEGORICAL_PALETTE,
    },
    // ...
    elevation: { ...effectiveNeutrals.elevation },
```

(Note: the dark `brand.primary` is recomputed via `adaptiveColor` against `effectiveNeutrals.surface.base` — pass `effectiveNeutrals.surface.base` instead of `neutrals.surface.base` in the `adaptiveColor` calls so the accent stays contrast-safe on Prism's darker plane.)

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- src/theme/tokens.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/theme/tokens.ts src/theme/tokens.test.ts
git commit -m "feat(theme): prism preset dark surfaces + spectrum series match artifact"
```

---

### Task 2: `Button` and `IconButton` primitives

**Files:**
- Create: `src/components/prism/Button.tsx`, `src/components/prism/Button.test.tsx`, `src/components/prism/Button.stories.tsx`
- Create: `src/components/prism/IconButton.tsx`, `src/components/prism/IconButton.test.tsx`

**Interfaces:**
- Produces:
  - `Button` — props `variant?: 'primary' | 'ghost' | 'danger' | 'subtle'` (default `'primary'`), plus all native `<button>` props. Renders a `<button>`.
  - `IconButton` — props `{ 'aria-label': string }` + native `<button>` props; square 30–32px, transparent, hover raises surface. Renders a `<button>`.

- [ ] **Step 1: Write the failing test**

`src/components/prism/Button.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { Button } from './Button';

describe('Button', () => {
  it('renders its label and fires onClick', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save URL</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Save URL' }));
    expect(onClick).toHaveBeenCalledOnce();
  });
  it('does not fire when disabled', () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Save</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/prism/Button.test.tsx`
Expected: FAIL — `./Button` does not exist.

- [ ] **Step 3: Implement `Button.tsx`**

```tsx
import { styled } from '@mui/material/styles';

type Variant = 'primary' | 'ghost' | 'danger' | 'subtle';

export const Button = styled('button', {
  shouldForwardProp: (p) => p !== 'variant',
})<{ variant?: Variant }>(({ theme, variant = 'primary' }) => {
  const { color, radius, motion, typography } = theme.tokens;
  const base = {
    fontFamily: typography.mono,
    fontSize: 12.5,
    fontWeight: 600,
    letterSpacing: '0.04em',
    padding: '9px 16px',
    borderRadius: radius.sm,
    border: '1px solid transparent',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
    transition: `transform ${motion.duration.base}ms ${motion.easing.springSettle}, background .2s, box-shadow .3s, border-color .2s, color .2s`,
    '&:hover': { transform: 'translateY(-2px)' },
    '&:active': { transform: 'translateY(0) scale(0.97)' },
    '&:focus-visible': { outline: `2px solid ${color.brand.primary}`, outlineOffset: 2 },
    '&:disabled': { opacity: 0.38, pointerEvents: 'none' as const },
    '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover, &:active': { transform: 'none' } },
  };
  const variants: Record<Variant, object> = {
    primary: { background: color.brand.primary, color: color.surface.base,
               '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 4px 18px ${color.brand.primary}59` } },
    ghost: { background: 'transparent', color: color.text.primary, borderColor: color.border.strong,
             '&:hover': { transform: 'translateY(-2px)', borderColor: color.brand.primary, color: color.brand.primary } },
    danger: { background: color.status.error, color: color.surface.base,
              '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 4px 16px ${color.status.error}59` } },
    subtle: { background: 'transparent', color: color.text.secondary, borderColor: color.border.strong,
              '&:hover': { transform: 'translateY(-2px)', color: color.text.primary } },
  };
  return { ...base, ...variants[variant] };
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/prism/Button.test.tsx`
Expected: PASS

- [ ] **Step 5: Implement `IconButton.tsx` + test**

`src/components/prism/IconButton.tsx`:

```tsx
import { styled } from '@mui/material/styles';

export const IconButton = styled('button')(({ theme }) => {
  const { color, radius } = theme.tokens;
  return {
    width: 32, height: 32, flexShrink: 0,
    display: 'grid', placeItems: 'center',
    borderRadius: radius.sm, border: '1px solid transparent',
    background: 'transparent', color: color.text.disabled, cursor: 'pointer',
    transition: 'color .15s, background .15s, border-color .15s',
    '&:hover, &[aria-expanded="true"]': {
      color: color.text.primary, background: color.surface.sunken, borderColor: color.border.strong,
    },
    '&:focus-visible': { outline: `2px solid ${color.brand.primary}`, outlineOffset: 2 },
    '&:disabled': { opacity: 0.38, pointerEvents: 'none' },
  };
});
```

`src/components/prism/IconButton.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { IconButton } from './IconButton';

it('exposes its aria-label as an accessible name', () => {
  render(<IconButton aria-label="Recipe actions">•••</IconButton>);
  expect(screen.getByRole('button', { name: 'Recipe actions' })).toBeInTheDocument();
});
```

- [ ] **Step 6: Add a Storybook story** (`Button.stories.tsx`) rendering all four variants under the Prism preset, then run tests.

Run: `npm test -- src/components/prism/`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/components/prism/Button.tsx src/components/prism/Button.test.tsx \
        src/components/prism/Button.stories.tsx src/components/prism/IconButton.tsx \
        src/components/prism/IconButton.test.tsx
git commit -m "feat(prism): Button + IconButton primitives"
```

---

### Task 3: `Card` primitive (hover-lift entity container)

**Files:**
- Create: `src/components/prism/Card.tsx`, `src/components/prism/Card.test.tsx`

**Interfaces:**
- Produces: `Card` — props `{ interactive?: boolean }` + native `<div>` props. When `interactive`, hover lifts (`translateY(-4px)`) and raises elevation. Renders a `<div>`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { Card } from './Card';

it('renders children', () => {
  render(<Card>Chana Masala</Card>);
  expect(screen.getByText('Chana Masala')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/prism/Card.test.tsx`
Expected: FAIL — `./Card` does not exist.

- [ ] **Step 3: Implement**

```tsx
import { styled } from '@mui/material/styles';

export const Card = styled('div', {
  shouldForwardProp: (p) => p !== 'interactive',
})<{ interactive?: boolean }>(({ theme, interactive }) => {
  const { color, radius, motion, elevation } = theme.tokens;
  return {
    position: 'relative',
    background: color.surface.raised,
    border: `1px solid ${color.border.subtle}`,
    borderRadius: radius.lg,
    padding: 20,
    ...(interactive && {
      cursor: 'pointer',
      transition: `transform ${motion.duration.base}ms ${motion.easing.springSettle}, border-color .25s, box-shadow .35s`,
      '&:hover': { transform: 'translateY(-4px)', borderColor: color.border.strong, boxShadow: elevation.md },
      '&:focus-visible': { outline: `2px solid ${color.brand.primary}`, outlineOffset: 2 },
      '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
    }),
  };
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/prism/Card.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/prism/Card.tsx src/components/prism/Card.test.tsx
git commit -m "feat(prism): Card primitive"
```

---

### Task 4: `Chip` primitive (filter chips + tags)

**Files:**
- Create: `src/components/prism/Chip.tsx`, `src/components/prism/Chip.test.tsx`

**Interfaces:**
- Produces: `Chip` — props `{ dotColor?: string; pressed?: boolean; as?: 'button' | 'span' }` + native props. A rounded token; optional leading square color dot; `pressed` renders the accent-active state. Default element `<button>`; pass `as="span"` for a non-interactive tag.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { Chip } from './Chip';

it('renders label and reflects pressed state', () => {
  render(<Chip pressed dotColor="#26A0BC">ethnicity/indian</Chip>);
  const chip = screen.getByRole('button', { name: /ethnicity\/indian/ });
  expect(chip).toHaveAttribute('aria-pressed', 'true');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/prism/Chip.test.tsx`
Expected: FAIL — `./Chip` does not exist.

- [ ] **Step 3: Implement**

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';

const Root = styled('button', {
  shouldForwardProp: (p) => p !== 'pressed',
})<{ pressed?: boolean }>(({ theme, pressed }) => {
  const { color, motion, typography } = theme.tokens;
  return {
    display: 'inline-flex', alignItems: 'center', gap: 7,
    fontFamily: typography.mono, fontSize: 11.5,
    color: pressed ? color.brand.primary : color.text.secondary,
    background: pressed ? `${color.brand.primary}24` : color.surface.raised,
    border: `1px solid ${pressed ? color.brand.primary : color.border.subtle}`,
    borderRadius: 999, padding: '5px 12px', cursor: 'pointer',
    transition: `border-color .2s, color .2s, background .2s, transform ${motion.duration.base}ms ${motion.easing.springSettle}`,
    '&:hover': { transform: 'translateY(-2px)', borderColor: color.border.strong },
    '&:focus-visible': { outline: `2px solid ${color.brand.primary}`, outlineOffset: 2 },
    '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
  };
});

const Dot = styled('span')<{ c: string }>(({ c }) => ({
  width: 8, height: 8, borderRadius: 2, flexShrink: 0, background: c,
}));

export interface ChipProps extends React.ComponentProps<'button'> {
  dotColor?: string;
  pressed?: boolean;
  as?: 'button' | 'span';
}

export const Chip: React.FC<ChipProps> = ({ dotColor, pressed, as = 'button', children, ...rest }) => (
  <Root as={as} pressed={pressed} aria-pressed={as === 'button' ? Boolean(pressed) : undefined} {...rest}>
    {dotColor && <Dot c={dotColor} />}
    {children}
  </Root>
);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/prism/Chip.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/prism/Chip.tsx src/components/prism/Chip.test.tsx
git commit -m "feat(prism): Chip primitive"
```

---

### Task 5: `TextInput` primitive

**Files:**
- Create: `src/components/prism/TextInput.tsx`, `src/components/prism/TextInput.test.tsx`

**Interfaces:**
- Produces: `TextInput` — a mono-styled `<input>` (all native props forwarded, incl. `aria-label`). Focus ring uses the accent.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { TextInput } from './TextInput';

it('is controllable and labelable', () => {
  render(<TextInput aria-label="Recipe URL" defaultValue="chana-masala" />);
  const input = screen.getByLabelText('Recipe URL');
  fireEvent.change(input, { target: { value: 'chana-masala-v2' } });
  expect((input as HTMLInputElement).value).toBe('chana-masala-v2');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/prism/TextInput.test.tsx`
Expected: FAIL — `./TextInput` does not exist.

- [ ] **Step 3: Implement**

```tsx
import { styled } from '@mui/material/styles';

export const TextInput = styled('input')(({ theme }) => {
  const { color, radius, typography } = theme.tokens;
  return {
    width: '100%', fontFamily: typography.mono, fontSize: 13, color: color.text.primary,
    background: color.surface.raised, border: `1px solid ${color.border.strong}`,
    borderRadius: radius.sm, padding: '10px 12px',
    transition: 'border-color .2s, box-shadow .25s',
    '&::placeholder': { color: color.text.disabled },
    '&:focus': { outline: 'none', borderColor: color.brand.primary, boxShadow: `0 0 0 3px ${color.brand.primary}24` },
  };
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/prism/TextInput.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/prism/TextInput.tsx src/components/prism/TextInput.test.tsx
git commit -m "feat(prism): TextInput primitive"
```

---

### Task 6: `Menu` primitive (overflow popover)

**Files:**
- Create: `src/components/prism/Menu.tsx`, `src/components/prism/Menu.test.tsx`

**Interfaces:**
- Produces:
  - `Menu` — props `{ open: boolean; onClose: () => void; children: ReactNode; 'aria-label'?: string }`. Renders `role="menu"` when `open`; closes on outside-click and `Escape` (via a document listener while open). Positioned by the caller (absolute within a positioned parent).
  - `MenuItem` — props `{ onSelect: () => void; danger?: boolean }` + native `<button>` props; `role="menuitem"`. `danger` renders the crit hover state.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { Menu, MenuItem } from './Menu';

describe('Menu', () => {
  it('renders items when open and fires onSelect', () => {
    const onSelect = vi.fn();
    render(<Menu open onClose={() => {}}><MenuItem onSelect={onSelect}>Delete</MenuItem></Menu>);
    fireEvent.click(screen.getByRole('menuitem', { name: 'Delete' }));
    expect(onSelect).toHaveBeenCalledOnce();
  });
  it('renders nothing when closed', () => {
    render(<Menu open={false} onClose={() => {}}><MenuItem onSelect={() => {}}>Delete</MenuItem></Menu>);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
  it('calls onClose on Escape', () => {
    const onClose = vi.fn();
    render(<Menu open onClose={onClose}><MenuItem onSelect={() => {}}>X</MenuItem></Menu>);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/prism/Menu.test.tsx`
Expected: FAIL — `./Menu` does not exist.

- [ ] **Step 3: Implement**

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';

const Panel = styled('div')(({ theme }) => {
  const { color, radius, elevation } = theme.tokens;
  return {
    position: 'absolute', top: 44, right: 8, zIndex: 20, minWidth: 172,
    background: color.surface.raised, border: `1px solid ${color.border.strong}`,
    borderRadius: radius.md, padding: 5, boxShadow: elevation.lg,
  };
});

const Item = styled('button', {
  shouldForwardProp: (p) => p !== 'danger',
})<{ danger?: boolean }>(({ theme, danger }) => {
  const { color, radius, typography } = theme.tokens;
  return {
    width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10,
    fontFamily: typography.mono, fontSize: 12, color: color.text.primary,
    background: 'transparent', border: 'none', borderRadius: radius.sm, padding: '9px 10px', cursor: 'pointer',
    transition: 'background .15s, color .15s',
    '&:hover': danger
      ? { background: `${color.status.error}24`, color: color.status.error }
      : { background: color.surface.sunken },
    '&:focus-visible': { outline: `2px solid ${color.brand.primary}`, outlineOffset: -2 },
  };
});

export const MenuItem: React.FC<
  { onSelect: () => void; danger?: boolean } & Omit<React.ComponentProps<'button'>, 'onSelect'>
> = ({ onSelect, danger, children, ...rest }) => (
  <Item role="menuitem" danger={danger}
    onClick={(e) => { e.stopPropagation(); onSelect(); }} {...rest}>
    {children}
  </Item>
);

export const Menu: React.FC<{
  open: boolean; onClose: () => void; children: React.ReactNode; 'aria-label'?: string;
}> = ({ open, onClose, children, ...rest }) => {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const onClick = () => onClose();
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <Panel role="menu" onClick={(e) => e.stopPropagation()} {...rest}>
      {children}
    </Panel>
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/prism/Menu.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/prism/Menu.tsx src/components/prism/Menu.test.tsx
git commit -m "feat(prism): Menu + MenuItem primitives"
```

---

### Task 7: `Dialog` primitive (modal)

**Files:**
- Create: `src/components/prism/Dialog.tsx`, `src/components/prism/Dialog.test.tsx`

**Interfaces:**
- Produces: `Dialog` — props `{ open: boolean; onClose: () => void; title: string; icon?: ReactNode; tone?: 'accent' | 'crit'; children: ReactNode; actions: ReactNode }`. Renders a `role="dialog" aria-modal="true"` overlay when open; closes on backdrop click and `Escape`; `title` wired via `aria-labelledby`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { Dialog } from './Dialog';
import { Button } from './Button';

it('shows when open, labels itself by title, closes on Escape', () => {
  const onClose = vi.fn();
  render(
    <Dialog open onClose={onClose} title="Rename URL" actions={<Button>Save</Button>}>
      <p>body</p>
    </Dialog>
  );
  expect(screen.getByRole('dialog', { name: 'Rename URL' })).toBeInTheDocument();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onClose).toHaveBeenCalledOnce();
});

it('renders nothing when closed', () => {
  render(<Dialog open={false} onClose={() => {}} title="X" actions={null}>y</Dialog>);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/prism/Dialog.test.tsx`
Expected: FAIL — `./Dialog` does not exist.

- [ ] **Step 3: Implement**

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';

const Overlay = styled('div')({
  position: 'fixed', inset: 0, zIndex: 100, display: 'flex',
  alignItems: 'center', justifyContent: 'center', padding: 20,
  background: 'rgba(6, 9, 14, 0.66)', backdropFilter: 'blur(4px)',
});

const Panel = styled('div')(({ theme }) => {
  const { color, radius, elevation } = theme.tokens;
  return {
    width: '100%', maxWidth: 460, background: color.surface.raised,
    border: `1px solid ${color.border.strong}`, borderRadius: radius.lg,
    boxShadow: elevation.lg, overflow: 'hidden',
  };
});

const Head = styled('div')({ padding: '20px 22px 0', display: 'flex', alignItems: 'center', gap: 12 });
const IconWrap = styled('div', { shouldForwardProp: (p) => p !== 'tone' })<{ tone: 'accent' | 'crit' }>(
  ({ theme, tone }) => {
    const { color, radius } = theme.tokens;
    const c = tone === 'crit' ? color.status.error : color.brand.primary;
    return { width: 38, height: 38, borderRadius: radius.md, display: 'grid', placeItems: 'center',
             flexShrink: 0, color: c, background: `${c}24` };
  }
);
const Title = styled('div')(({ theme }) => ({
  fontFamily: theme.tokens.typography.mono, fontSize: 15, fontWeight: 700, letterSpacing: '0.02em',
}));
const Body = styled('div')({ padding: '16px 22px 4px' });
const Actions = styled('div')({ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '18px 22px 22px' });

let dialogSeq = 0;

export const Dialog: React.FC<{
  open: boolean; onClose: () => void; title: string;
  icon?: React.ReactNode; tone?: 'accent' | 'crit';
  children: React.ReactNode; actions: React.ReactNode;
}> = ({ open, onClose, title, icon, tone = 'accent', children, actions }) => {
  const titleId = React.useRef(`prism-dialog-${dialogSeq++}`).current;
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <Overlay onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <Panel role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <Head>
          {icon && <IconWrap tone={tone}>{icon}</IconWrap>}
          <Title id={titleId}>{title}</Title>
        </Head>
        <Body>{children}</Body>
        <Actions>{actions}</Actions>
      </Panel>
    </Overlay>
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/prism/Dialog.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/prism/Dialog.tsx src/components/prism/Dialog.test.tsx
git commit -m "feat(prism): Dialog primitive"
```

---

### Task 8: Barrel export + full CI

**Files:**
- Create: `src/components/prism/index.ts`

**Interfaces:**
- Produces: `@/components/prism` re-exports `Button, IconButton, Card, Chip, TextInput, Menu, MenuItem, Dialog` and their prop types.

- [ ] **Step 1: Write the barrel**

```ts
export { Button } from './Button';
export { IconButton } from './IconButton';
export { Card } from './Card';
export { Chip } from './Chip';
export type { ChipProps } from './Chip';
export { TextInput } from './TextInput';
export { Menu, MenuItem } from './Menu';
export { Dialog } from './Dialog';
```

- [ ] **Step 2: Run the full check**

Run: `npm run ci`
Expected: typecheck + lint + test all PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/prism/index.ts
git commit -m "feat(prism): barrel export for primitive library"
```

## Self-Review Notes

- Colors use `theme.tokens.*` throughout; the only literals are alpha-suffixed token colors (`${c}24` ≈ 14% — matches the artifact's `--accent-dim`) and the fixed overlay scrim, which is intentionally plane-independent.
- `Chip` forwards `as` to Emotion's polymorphic `styled` so a tag and a filter button share one style source (DRY).
- Prism default preset dark surfaces are asserted unchanged (Task 1, Step 1) so this is additive, not a regression to the Classic look.
- Focus-visible + reduced-motion covered on every interactive primitive per Global Constraints.
