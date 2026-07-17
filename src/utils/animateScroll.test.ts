import { describe, it, expect } from 'vitest';
import { animateScrollTo } from './animateScroll';

describe('animateScrollTo', () => {
  it('jumps instantly when reduced motion is requested', () => {
    const el = { scrollTop: 0 } as HTMLElement;
    animateScrollTo(el, 120, { reduced: true });
    expect(el.scrollTop).toBe(120);
  });

  it('snaps immediately for sub-pixel distances', () => {
    const el = { scrollTop: 100 } as HTMLElement;
    animateScrollTo(el, 101, { reduced: false });
    expect(el.scrollTop).toBe(101);
  });
});
