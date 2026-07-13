import React from 'react';

export interface UseAuthorizedImageOptions {
  /** Defer the fetch until the container scrolls into view. Default false. */
  lazy?: boolean;
  /** IntersectionObserver rootMargin when lazy. Default '50px'. */
  rootMargin?: string;
}

export interface UseAuthorizedImageResult {
  containerRef: React.RefObject<HTMLDivElement | null>;
  src: string | undefined;
  inView: boolean;
  status: 'idle' | 'loading' | 'loaded' | 'error';
}

async function fetchWithAuthentication(url: string, token: string | null): Promise<Response> {
  const headers = new Headers();
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return fetch(url, { headers });
}

/**
 * Fetches a protected image with a Bearer token, exposes the resulting object
 * URL, and owns its lifecycle — revoking on unmount and on url/token change
 * (the old per-component code revoked only on img.onload, leaking on unmount).
 * When `lazy`, defers the fetch until the container intersects the viewport.
 */
export function useAuthorizedImage(
  url: string | undefined,
  token: string | null,
  options: UseAuthorizedImageOptions = {},
): UseAuthorizedImageResult {
  const { lazy = false, rootMargin = '50px' } = options;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(!lazy);
  const [src, setSrc] = React.useState<string | undefined>(undefined);
  const [status, setStatus] = React.useState<UseAuthorizedImageResult['status']>('idle');

  // Lazy: observe the container and flip inView on first intersection.
  React.useEffect(() => {
    if (!lazy) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lazy, rootMargin]);

  // Fetch once in view; own the object URL.
  React.useEffect(() => {
    if (!inView || !url) return;
    let cancelled = false;
    let objectUrl: string | undefined;
    setStatus('loading');
    fetchWithAuthentication(url, token)
      .then((res) => res.blob())
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setSrc(objectUrl);
        setStatus('loaded');
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(err);
        setStatus('error');
      });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [inView, url, token]);

  return { containerRef, src, inView, status };
}
