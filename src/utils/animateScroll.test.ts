import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
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

  describe('the animated (rAF) path', () => {
    beforeEach(() => {
      vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'performance', 'Date'] });
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it('progresses scrollTop toward the target and lands exactly on it', () => {
      const el = { scrollTop: 0 } as HTMLElement;
      animateScrollTo(el, 200, { reduced: false });
      // No frame has run yet — the loop only mutates scrollTop from a rAF callback.
      expect(el.scrollTop).toBe(0);

      // dur = clamp(340, |dist| * 0.9, 720) = 340ms for a 200px scroll.
      vi.advanceTimersByTime(170);
      expect(el.scrollTop).toBeGreaterThan(0);
      expect(el.scrollTop).toBeLessThan(200);

      vi.advanceTimersByTime(400); // well past dur — the final frame clamps t to 1
      expect(el.scrollTop).toBe(200);
    });

    it('supersedes a still-running animation when called again', () => {
      const el = { scrollTop: 0 } as HTMLElement;
      animateScrollTo(el, 1000, { reduced: false }); // dur = 720ms
      vi.advanceTimersByTime(100);
      const midway = el.scrollTop;
      expect(midway).toBeGreaterThan(0);
      expect(midway).toBeLessThan(1000);

      animateScrollTo(el, 50, { reduced: false });
      vi.advanceTimersByTime(400); // past the second animation's duration
      // Lands on the SECOND target — the first animation's stale frames
      // stopped mutating scrollTop once superseded.
      expect(el.scrollTop).toBe(50);
    });
  });
});
