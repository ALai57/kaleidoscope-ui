import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useWakeLock } from './useWakeLock';

type Listener = () => void;

// A fake WakeLockSentinel + navigator.wakeLock, installed on the real navigator.
function installWakeLock() {
  const sentinels: Array<{
    released: boolean;
    release: ReturnType<typeof vi.fn<() => Promise<void>>>;
  }> = [];
  const request = vi.fn(async () => {
    const listeners: Listener[] = [];
    const sentinel = {
      released: false,
      release: vi.fn(async () => {
        sentinel.released = true;
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
    expect(sentinels[0]!.release).toHaveBeenCalled();
    expect(result.current.isActive).toBe(false);
  });

  it('re-acquires the lock when the tab becomes visible again', async () => {
    const { request, sentinels } = installWakeLock();
    const { result } = renderHook(() => useWakeLock());
    await act(async () => result.current.toggle());
    // OS releases the lock while hidden.
    await act(async () => {
      await sentinels[0]!.release();
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
    expect(sentinels[0]!.release).toHaveBeenCalled();
  });
});
