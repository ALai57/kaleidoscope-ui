interface AnimatedEl extends HTMLElement {
  _scrollAnim?: number;
}

const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function animateScrollTo(
  el: HTMLElement,
  to: number,
  opts: { reduced?: boolean } = {},
): void {
  const target = el as AnimatedEl;
  const from = target.scrollTop;
  const dist = to - from;
  if (opts.reduced || Math.abs(dist) < 2) {
    target.scrollTop = to;
    return;
  }
  const dur = Math.min(720, Math.max(340, Math.abs(dist) * 0.9));
  const token = (target._scrollAnim ?? 0) + 1;
  target._scrollAnim = token;
  const start = performance.now();
  const step = (now: number) => {
    if (target._scrollAnim !== token) return; // superseded by a newer scroll
    const t = Math.min(1, (now - start) / dur);
    target.scrollTop = from + dist * easeInOutCubic(t);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
