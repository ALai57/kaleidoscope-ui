import { useEffect, useMemo, useRef } from 'react';

/**
 * Returns a debounced version of `callback` that only fires after `delayMs`
 * have elapsed since the last invocation. Used to keep the theme picker
 * responsive: the picker updates its own swatch instantly, but the (expensive,
 * leonardo-driven) theme rebuild is deferred until the user pauses.
 *
 * The latest `callback` is always used, and any pending timer is cleared on
 * unmount.
 */
export function useDebouncedCallback<A extends unknown[]>(
  callback: (...args: A) => void,
  delayMs: number
): (...args: A) => void {
  const callbackRef = useRef(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  return useMemo(
    () =>
      (...args: A) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => callbackRef.current(...args), delayMs);
      },
    [delayMs]
  );
}
