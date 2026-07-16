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
  const isSupported = typeof navigator !== 'undefined' && Boolean(navigator.wakeLock);

  const [isActive, setIsActive] = useState(false);
  const sentinelRef = useRef<WakeLockSentinel | null>(null);
  // Whether the user wants the lock on — drives visibility re-acquire.
  const intendedRef = useRef(false);

  const acquire = useCallback(async () => {
    if (!isSupported) return;
    try {
      const sentinel = await navigator.wakeLock.request('screen');
      if (!isSupported || !intendedRef.current) {
        // The user toggled off (or support vanished) while the request was
        // in flight — don't strand a lock nothing points at.
        try {
          await sentinel.release();
        } catch {
          // Ignore — the lock is effectively gone either way.
        }
        return;
      }
      sentinelRef.current = sentinel;
      sentinel.addEventListener('release', () => {
        sentinelRef.current = null;
        setIsActive(false);
      });
      setIsActive(true);
    } catch {
      // Request can reject (denied, low battery, no user activation). Stay off
      // and reset intent so the next toggle retries instead of no-op'ing.
      intendedRef.current = false;
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
      if (document.visibilityState === 'visible' && intendedRef.current && !sentinelRef.current) {
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
