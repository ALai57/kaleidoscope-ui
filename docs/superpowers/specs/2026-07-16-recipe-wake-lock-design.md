# Recipe "Keep screen awake" button — Design

**Date:** 2026-07-16
**Status:** Approved for planning

## Summary

Add a "keep screen awake" toggle to the recipe page so a cook following a recipe
hands-free can stop the device screen from dimming or sleeping. The toggle wraps
the browser [Screen Wake Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API).

## Requirements

- A button in the recipe page header (next to the title), visible to **everyone**
  including anonymous public readers — it's a cooking convenience, not an admin tool.
- Toggling it **on** acquires a screen wake lock; toggling **off** releases it.
- The lock survives tab visibility changes: the OS auto-releases a wake lock when
  the tab is hidden (user switches apps / locks the phone). When the page becomes
  visible again, re-acquire the lock **if the user had it enabled**.
- On browsers without the API (older Safari, Firefox), the button does not render.
- Icon/label style: **Coffee / Bedtime**.
  - Off state: `Coffee` icon, label "Keep screen on".
  - On state: `Bedtime` icon, label "Screen stays on".
- Match the existing header Edit button: MUI `Button`, `size="small"`.

## Non-goals (YAGNI)

- No floating action button.
- No persistence across page loads / navigations (re-toggle each visit).
- No auto-enable on page load.
- No auto-disable timeout.

## Architecture

Two co-located units plus a one-line mount, following existing repo conventions
(`src/hooks/useDebouncedCallback.ts`, `src/components/recipes/*`).

### 1. `src/hooks/useWakeLock.ts`

A reusable hook encapsulating all Wake Lock API interaction.

**Returns:** `{ isSupported: boolean; isActive: boolean; toggle: () => void }`

**Behavior:**

- `isSupported` = `'wakeLock' in navigator` (evaluated once). When false, the hook
  is inert: `isActive` stays false and `toggle` is a no-op.
- Internal state: the current `WakeLockSentinel | null` (held in a ref) and an
  `isActive` boolean (React state driving the UI). Also an "intended" flag (ref)
  recording whether the user wants the lock on — this drives re-acquisition.
- `toggle()`:
  - If currently active → release the sentinel, set intended = false, `isActive = false`.
  - If currently inactive → `await navigator.wakeLock.request('screen')`, store the
    sentinel, set intended = true, `isActive = true`. On request failure (rejected
    promise, e.g. permissions/low battery) leave `isActive = false`.
- Listens for the sentinel's `release` event to sync `isActive = false` if the lock
  drops for reasons outside our control.
- `visibilitychange` listener: when `document.visibilityState === 'visible'` and
  intended = true but there is no live sentinel, re-acquire the lock.
- Cleanup on unmount: release any held sentinel and remove listeners.

**Why a ref for the sentinel + intended flag:** the visibility handler and release
handler need the latest values without re-subscribing on every state change.

### 2. `src/components/recipes/WakeLockButton.tsx`

Presentational component consuming the hook. No props required.

- Calls `useWakeLock()`.
- If `!isSupported` → returns `null`.
- Otherwise renders a MUI `Button`, `size="small"`:
  - `startIcon`: `Bedtime` when `isActive`, else `Coffee`.
  - Label: "Screen stays on" when `isActive`, else "Keep screen on".
  - `onClick={toggle}`.
  - Reflect active state visually (e.g. `variant="contained"` when active vs
    `variant="text"`/default when off) so the toggle state is obvious.

### 3. `src/pages/RecipePage.tsx` (mount)

In the existing header `Stack` (`direction="row"`, `justifyContent="space-between"`),
place `<WakeLockButton />` next to the title. Because the Edit button is auth-gated
and the wake-lock button is not, group the two action buttons in a small inner
`Stack direction="row"` on the right so layout is stable whether or not Edit shows.

## Data flow

```
RecipePage
  └─ Stack (header)
       ├─ Typography (title)
       └─ Stack (actions)
            ├─ WakeLockButton ──uses──> useWakeLock ──> navigator.wakeLock
            └─ Button "Edit" (auth only)
```

No server state, no store, no API calls. Purely client-side browser API.

## Error handling

- Unsupported browser: button hidden (`isSupported` false).
- `request('screen')` rejects (low battery, denied, not user-activated): swallow the
  error, keep `isActive = false`. No crash, no error toast — the button just stays off.
- OS silently releases the lock (tab hidden): `release` event fires → `isActive = false`;
  re-acquired on next `visibilitychange` to visible if the user intended it on.

## Testing

Repo requires a test per feature. Both co-located as `*.test.ts(x)`.

### `src/hooks/useWakeLock.test.ts`

Mock `navigator.wakeLock` with a fake `request` returning a fake sentinel
(`{ released: false, release: vi.fn(), addEventListener, removeEventListener }`).

- Unsupported: with `wakeLock` absent from `navigator`, `isSupported` is false and
  `toggle` is a no-op.
- Toggle on: calls `request('screen')`, `isActive` becomes true.
- Toggle off: calls the sentinel's `release()`, `isActive` becomes false.
- Visibility re-acquire: with intended on and no live sentinel, dispatching
  `visibilitychange` (visible) calls `request` again.
- Unmount releases a held sentinel.

### `src/components/recipes/WakeLockButton.test.tsx`

- Supported: renders the button with the "Keep screen on" label; clicking toggles
  label/icon to the active state.
- Unsupported: renders nothing.

## Files touched

| File | Change |
|---|---|
| `src/hooks/useWakeLock.ts` | new — hook |
| `src/hooks/useWakeLock.test.ts` | new — hook tests |
| `src/components/recipes/WakeLockButton.tsx` | new — button component |
| `src/components/recipes/WakeLockButton.test.tsx` | new — component tests |
| `src/pages/RecipePage.tsx` | edit — mount button in header |
