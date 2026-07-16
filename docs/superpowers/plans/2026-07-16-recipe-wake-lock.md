# Recipe "Keep screen awake" button — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "keep screen awake" toggle to the recipe page so a cook following a recipe hands-free can stop the device screen from sleeping.

**Architecture:** A reusable `useWakeLock` hook wraps the browser Screen Wake Lock API and handles the tab-hidden auto-release quirk. A presentational `WakeLockButton` consumes it and renders nothing on unsupported browsers. The button mounts in the `RecipePage` header next to the title, visible to everyone.

**Tech Stack:** React 19, TypeScript, MUI 9 (`@mui/material` Button + `@mui/icons-material`), Vitest + Testing Library (jsdom), MSW (not needed here — no network).

## Global Constraints

- TypeScript throughout; import within `src` via relative paths as the surrounding files do (e.g. `./useWakeLock`, `../../test/testUtils`).
- Client/UI state only — no TanStack Query, no Zustand, no `src/api/*` (this is a pure browser-API feature).
- Every feature needs a test (unit). Tests are co-located as `*.test.ts(x)`.
- Theming via MUI/theme tokens, not hardcoded colors.
- `npm run ci` (typecheck + lint + test) must pass before finishing.
- Reference spec: `docs/superpowers/specs/2026-07-16-recipe-wake-lock-design.md`.

## File Structure

| File | Responsibility |
|---|---|
| `src/hooks/useWakeLock.ts` | Hook — all Wake Lock API interaction + visibility re-acquire |
| `src/hooks/useWakeLock.test.ts` | Hook unit tests |
| `src/components/recipes/WakeLockButton.tsx` | Presentational toggle button |
| `src/components/recipes/WakeLockButton.test.tsx` | Component unit tests |
| `src/pages/RecipePage.tsx` | Mount the button in the header |

---

### Task 1: `useWakeLock` hook

**Files:**
- Create: `src/hooks/useWakeLock.ts`
- Test: `src/hooks/useWakeLock.test.ts`

**Interfaces:**
- Consumes: browser `navigator.wakeLock` (`WakeLockSentinel`), `document.visibilityState`, `visibilitychange` event.
- Produces: `useWakeLock(): { isSupported: boolean; isActive: boolean; toggle: () => void }` — imported by Task 2.

- [ ] **Step 1: Write the failing tests**

Create `src/hooks/useWakeLock.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useWakeLock } from './useWakeLock';

type Listener = () => void;

// A fake WakeLockSentinel + navigator.wakeLock, installed on the real navigator.
function installWakeLock() {
  const sentinels: Array<{ released: boolean; release: ReturnType<typeof vi.fn> }> = [];
  const request = vi.fn(async () => {
    const listeners: Listener[] = [];
    const sentinel = {
      released: false,
      release: vi.fn(async function (this: { released: boolean }) {
        this.released = true;
        listeners.forEach((l) => l());
      }),
      addEventListener: (_type: string, cb: Listener) => listeners.push(cb),
      removeEventListener: vi.fn(),
    };
    sentinels.push(sentinel);
    return sentinel;
  });
  Object.defineProperty(navigator, 'wakeLock', {
    value: { request },
    configurable: true,
    writable: true,
  });
  return { request, sentinels };
}

function removeWakeLock() {
  Object.defineProperty(navigator, 'wakeLock', {
    value: undefined,
    configurable: true,
    writable: true,
  });
}

function setVisibility(state: 'visible' | 'hidden') {
  Object.defineProperty(document, 'visibilityState', {
    value: state,
    configurable: true,
  });
  document.dispatchEvent(new Event('visibilitychange'));
}

describe('useWakeLock', () => {
  afterEach(() => {
    removeWakeLock();
    setVisibility('visible');
    vi.restoreAllMocks();
  });

  it('reports unsupported when navigator.wakeLock is absent', () => {
    removeWakeLock();
    const { result } = renderHook(() => useWakeLock());
    expect(result.current.isSupported).toBe(false);
    act(() => result.current.toggle());
    expect(result.current.isActive).toBe(false);
  });

  it('acquires a lock when toggled on', async () => {
    const { request } = installWakeLock();
    const { result } = renderHook(() => useWakeLock());
    expect(result.current.isSupported).toBe(true);
    await act(async () => result.current.toggle());
    expect(request).toHaveBeenCalledWith('screen');
    expect(result.current.isActive).toBe(true);
  });

  it('releases the lock when toggled off', async () => {
    const { sentinels } = installWakeLock();
    const { result } = renderHook(() => useWakeLock());
    await act(async () => result.current.toggle());
    await act(async () => result.current.toggle());
    expect(sentinels[0].release).toHaveBeenCalled();
    expect(result.current.isActive).toBe(false);
  });

  it('re-acquires the lock when the tab becomes visible again', async () => {
    const { request, sentinels } = installWakeLock();
    const { result } = renderHook(() => useWakeLock());
    await act(async () => result.current.toggle());
    // OS releases the lock while hidden.
    await act(async () => {
      await sentinels[0].release();
      setVisibility('hidden');
    });
    expect(result.current.isActive).toBe(false);
    // Coming back to visible re-acquires because the user intended it on.
    await act(async () => setVisibility('visible'));
    expect(request).toHaveBeenCalledTimes(2);
    expect(result.current.isActive).toBe(true);
  });

  it('releases a held lock on unmount', async () => {
    const { sentinels } = installWakeLock();
    const { result, unmount } = renderHook(() => useWakeLock());
    await act(async () => result.current.toggle());
    unmount();
    expect(sentinels[0].release).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/hooks/useWakeLock.test.ts`
Expected: FAIL — "Failed to resolve import './useWakeLock'" / `useWakeLock is not a function`.

- [ ] **Step 3: Write minimal implementation**

Create `src/hooks/useWakeLock.ts`:

```typescript
import { useCallback, useEffect, useRef, useState } from 'react';

interface WakeLockState {
  /** Whether the browser exposes the Screen Wake Lock API. */
  isSupported: boolean;
  /** Whether a screen wake lock is currently held. */
  isActive: boolean;
  /** Toggle the wake lock on/off. No-op when unsupported. */
  toggle: () => void;
}

/**
 * Wraps the browser Screen Wake Lock API. The OS auto-releases the lock when
 * the tab is hidden; this hook re-acquires it on return to visibility if the
 * user had it enabled. Renders inert on browsers without the API.
 */
export function useWakeLock(): WakeLockState {
  const isSupported =
    typeof navigator !== 'undefined' && 'wakeLock' in navigator;

  const [isActive, setIsActive] = useState(false);
  const sentinelRef = useRef<WakeLockSentinel | null>(null);
  // Whether the user wants the lock on — drives visibility re-acquire.
  const intendedRef = useRef(false);

  const acquire = useCallback(async () => {
    if (!isSupported) return;
    try {
      const sentinel = await navigator.wakeLock.request('screen');
      sentinelRef.current = sentinel;
      sentinel.addEventListener('release', () => {
        sentinelRef.current = null;
        setIsActive(false);
      });
      setIsActive(true);
    } catch {
      // Request can reject (denied, low battery, no user activation). Stay off.
      setIsActive(false);
    }
  }, [isSupported]);

  const release = useCallback(async () => {
    const sentinel = sentinelRef.current;
    sentinelRef.current = null;
    setIsActive(false);
    if (sentinel && !sentinel.released) {
      try {
        await sentinel.release();
      } catch {
        // Ignore — the lock is effectively gone either way.
      }
    }
  }, []);

  const toggle = useCallback(() => {
    if (!isSupported) return;
    if (intendedRef.current) {
      intendedRef.current = false;
      void release();
    } else {
      intendedRef.current = true;
      void acquire();
    }
  }, [isSupported, acquire, release]);

  useEffect(() => {
    if (!isSupported) return;
    const onVisibility = () => {
      if (
        document.visibilityState === 'visible' &&
        intendedRef.current &&
        !sentinelRef.current
      ) {
        void acquire();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      intendedRef.current = false;
      void release();
    };
  }, [isSupported, acquire, release]);

  return { isSupported, isActive, toggle };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/hooks/useWakeLock.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useWakeLock.ts src/hooks/useWakeLock.test.ts
git commit -m "feat(recipes): add useWakeLock hook for screen wake lock"
```

---

### Task 2: `WakeLockButton` component

**Files:**
- Create: `src/components/recipes/WakeLockButton.tsx`
- Test: `src/components/recipes/WakeLockButton.test.tsx`

**Interfaces:**
- Consumes: `useWakeLock` from `../../hooks/useWakeLock` (Task 1).
- Produces: `WakeLockButton` — a default-exported and named React component with no props. Imported by Task 3 as `import { WakeLockButton } from '../components/recipes/WakeLockButton';`.

- [ ] **Step 1: Write the failing tests**

Create `src/components/recipes/WakeLockButton.test.tsx`:

```tsx
import { it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { WakeLockButton } from './WakeLockButton';
import * as hook from '../../hooks/useWakeLock';

it('renders nothing when the wake lock API is unsupported', () => {
  vi.spyOn(hook, 'useWakeLock').mockReturnValue({
    isSupported: false,
    isActive: false,
    toggle: vi.fn(),
  });
  const { container } = render(<WakeLockButton />);
  expect(container).toBeEmptyDOMElement();
});

it('shows the off label and toggles on click', () => {
  const toggle = vi.fn();
  vi.spyOn(hook, 'useWakeLock').mockReturnValue({
    isSupported: true,
    isActive: false,
    toggle,
  });
  render(<WakeLockButton />);
  const button = screen.getByRole('button', { name: /keep screen on/i });
  fireEvent.click(button);
  expect(toggle).toHaveBeenCalledOnce();
});

it('shows the active label when the lock is held', () => {
  vi.spyOn(hook, 'useWakeLock').mockReturnValue({
    isSupported: true,
    isActive: true,
    toggle: vi.fn(),
  });
  render(<WakeLockButton />);
  expect(
    screen.getByRole('button', { name: /screen stays on/i }),
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/components/recipes/WakeLockButton.test.tsx`
Expected: FAIL — cannot resolve `./WakeLockButton`.

- [ ] **Step 3: Write minimal implementation**

Create `src/components/recipes/WakeLockButton.tsx`:

```tsx
import React from 'react';
import Button from '@mui/material/Button';
import CoffeeIcon from '@mui/icons-material/Coffee';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useWakeLock } from '../../hooks/useWakeLock';

/**
 * Toggles a screen wake lock so a cook can follow a recipe hands-free without
 * the screen sleeping. Renders nothing on browsers without the Wake Lock API.
 */
export const WakeLockButton: React.FC = () => {
  const { isSupported, isActive, toggle } = useWakeLock();

  if (!isSupported) return null;

  return (
    <Button
      size="small"
      variant={isActive ? 'contained' : 'text'}
      startIcon={isActive ? <BedtimeIcon /> : <CoffeeIcon />}
      onClick={toggle}
    >
      {isActive ? 'Screen stays on' : 'Keep screen on'}
    </Button>
  );
};

export default WakeLockButton;
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/components/recipes/WakeLockButton.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/WakeLockButton.tsx src/components/recipes/WakeLockButton.test.tsx
git commit -m "feat(recipes): add WakeLockButton toggle component"
```

---

### Task 3: Mount the button in the recipe header

**Files:**
- Modify: `src/pages/RecipePage.tsx` (header `Stack`, lines ~53-72)
- Test: `src/pages/RecipePage.test.tsx` (add a case)

**Interfaces:**
- Consumes: `WakeLockButton` from `../components/recipes/WakeLockButton` (Task 2).

- [ ] **Step 1: Add the failing test**

First inspect the existing test file for its render/mocking setup:

Run: `sed -n '1,40p' src/pages/RecipePage.test.tsx`

Add a test asserting the button renders on the recipe page. Follow the file's
existing pattern for providing a recipe (MSW handler or query mock already used
there). Append this case, adapting the recipe-loading setup to match the
existing tests in the file:

```tsx
it('shows the keep-screen-on button in the header', async () => {
  // Reuse whatever recipe-loading setup the other tests in this file use
  // (MSW handler / render helper) so a recipe with a title renders.
  render(<RecipePage />); // adapt to the file's existing render + routing setup
  expect(
    await screen.findByRole('button', { name: /keep screen on/i }),
  ).toBeInTheDocument();
});
```

Note: jsdom has no `navigator.wakeLock`, so `useWakeLock` reports supported =
false and the button would render nothing. To test the mount point, stub support
at the top of this test:

```tsx
import * as wakeLockHook from '../hooks/useWakeLock';

// inside the test, before render:
vi.spyOn(wakeLockHook, 'useWakeLock').mockReturnValue({
  isSupported: true,
  isActive: false,
  toggle: vi.fn(),
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/pages/RecipePage.test.tsx`
Expected: FAIL — no button with name "keep screen on" (not yet mounted).

- [ ] **Step 3: Add the import and mount the button**

In `src/pages/RecipePage.tsx`, add the import alongside the other component imports:

```tsx
import { WakeLockButton } from '../components/recipes/WakeLockButton';
```

Replace the header `Stack` block so the two action buttons are grouped on the
right (keeps layout stable whether or not the auth-gated Edit button shows).
Change this:

```tsx
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "flex-start"
              }}>
              <Typography variant="h3" gutterBottom>
                {recipe.content.title}
              </Typography>
              {isAuthenticated && (
                <Button
                  component={RouterLink}
                  to={`/recipes/${recipe.recipe_url}/edit`}
                  startIcon={<EditIcon />}
                  size="small"
                >
                  Edit
                </Button>
              )}
            </Stack>
```

to:

```tsx
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "flex-start"
              }}>
              <Typography variant="h3" gutterBottom>
                {recipe.content.title}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
                <WakeLockButton />
                {isAuthenticated && (
                  <Button
                    component={RouterLink}
                    to={`/recipes/${recipe.recipe_url}/edit`}
                    startIcon={<EditIcon />}
                    size="small"
                  >
                    Edit
                  </Button>
                )}
              </Stack>
            </Stack>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- src/pages/RecipePage.test.tsx`
Expected: PASS (existing cases + the new one).

- [ ] **Step 5: Run the full CI gate**

Run: `npm run ci`
Expected: typecheck, lint, and full test suite all PASS.

- [ ] **Step 6: Commit**

```bash
git add src/pages/RecipePage.tsx src/pages/RecipePage.test.tsx
git commit -m "feat(recipes): mount keep-screen-on button in recipe header"
```

---

## Self-Review

**Spec coverage:**
- Header placement next to title, visible to everyone → Task 3 (grouped action Stack, not auth-gated). ✓
- Acquire/release on toggle → Task 1 (`toggle` → `acquire`/`release`). ✓
- Visibility re-acquire quirk → Task 1 (`visibilitychange` effect + `intendedRef`). ✓
- Hidden on unsupported browsers → Task 1 (`isSupported`) + Task 2 (`return null`). ✓
- Coffee/Bedtime icons + "Keep screen on"/"Screen stays on" labels → Task 2. ✓
- MUI `Button` `size="small"` matching Edit → Task 2. ✓
- Error handling (request rejects, OS releases) → Task 1 (try/catch, `release` event). ✓
- Tests for hook + component → Tasks 1 & 2; mount test → Task 3. ✓
- Non-goals (no FAB/persistence/auto-enable/timeout) → none added. ✓

**Placeholder scan:** Task 3's test setup intentionally says "adapt to the file's existing render + routing setup" because the recipe-loading harness in `RecipePage.test.tsx` must be matched rather than guessed; Step 1 directs inspecting the file first. All code steps show complete code.

**Type consistency:** `useWakeLock` returns `{ isSupported, isActive, toggle }` — identical shape used in the hook (Task 1), the component (Task 2), and both mock returns (Tasks 2 & 3). `WakeLockButton` is exported both named and default; Tasks 2/3 import it named. ✓
