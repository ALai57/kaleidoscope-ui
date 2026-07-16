import { describe, it, expect } from 'vitest';
import { GARDEN_FACETS, facetColor, isFacetActive, PULSE_CONFIG, pulseTimeline } from './gardenFacets';
import { makeTokens } from '@/theme';
import { DEFAULT_SEED } from '@/theme';

describe('gardenFacets', () => {
  it('maps the three garden sections to their routes', () => {
    expect(GARDEN_FACETS.map((f) => [f.key, f.route])).toEqual([
      ['writing', '/archive'],
      ['reading', '/library'],
      ['recipes', '/recipes'],
    ]);
  });

  it('reads a color from the token categorical palette by index', () => {
    const tokens = makeTokens(DEFAULT_SEED, 'light', 'default');
    expect(facetColor(tokens, 1, '#000')).toBe(tokens.color.categorical[1]);
  });

  it('falls back when tokens are missing', () => {
    expect(facetColor(undefined, 1, '#abc')).toBe('#abc');
  });

  it('treats /library and its sub-paths as the reading section', () => {
    const reading = GARDEN_FACETS.find((f) => f.key === 'reading')!;
    expect(isFacetActive(reading, '/library')).toBe(true);
    expect(isFacetActive(reading, '/library/123/acquisitions')).toBe(true);
    expect(isFacetActive(reading, '/recipes')).toBe(false);
  });

  it('matches recipes exactly and on detail pages', () => {
    const recipes = GARDEN_FACETS.find((f) => f.key === 'recipes')!;
    expect(isFacetActive(recipes, '/recipes')).toBe(true);
    expect(isFacetActive(recipes, '/recipes/pho')).toBe(true);
  });
});

describe('PULSE_CONFIG', () => {
  it('exposes the full set of tunable knobs with sane defaults', () => {
    expect(Object.keys(PULSE_CONFIG).sort()).toEqual(
      ['enabled', 'fanoutDur', 'glow', 'incomingDur', 'intensity', 'loopGap', 'size', 'stagger'].sort()
    );
    expect(PULSE_CONFIG.incomingDur).toBeGreaterThan(0);
    expect(PULSE_CONFIG.fanoutDur).toBeGreaterThan(0);
    expect(PULSE_CONFIG.size).toBeGreaterThan(0);
    expect(PULSE_CONFIG.intensity).toBeGreaterThan(0);
    expect(PULSE_CONFIG.intensity).toBeLessThanOrEqual(1);
    expect(PULSE_CONFIG.glow).toBeGreaterThanOrEqual(0);
    expect(PULSE_CONFIG.stagger).toBeGreaterThanOrEqual(0);
    expect(PULSE_CONFIG.loopGap).toBeGreaterThanOrEqual(0);
  });
});

describe('pulseTimeline', () => {
  const cfg = { ...PULSE_CONFIG, incomingDur: 1.1, fanoutDur: 0.9, stagger: 0.14, loopGap: 0.9 };

  it('shares one period = incoming + stagger·(n−1) + fanout + loopGap', () => {
    const { period } = pulseTimeline(cfg, 3);
    expect(period).toBeCloseTo(1.1 + 0.14 * 2 + 0.9 + 0.9); // 3.18
  });

  it('leads with the incoming packet starting at the top of the cycle', () => {
    const { spans, period } = pulseTimeline(cfg, 3);
    expect(spans[0]!.key).toBe('incoming');
    expect(spans[0]!.startPct).toBe(0);
    expect(spans[0]!.endPct).toBeCloseTo(cfg.incomingDur / period);
  });

  it('emits one packet per facet, in order, staggered and each fanoutDur long', () => {
    const { spans, period } = pulseTimeline(cfg, 3);
    const facets = spans.slice(1);
    expect(facets.map((s) => s.key)).toEqual(['writing', 'reading', 'recipes']);
    facets.forEach((s, i) => {
      const start = cfg.incomingDur + cfg.stagger * i;
      expect(s.startPct).toBeCloseTo(start / period);
      expect(s.endPct).toBeCloseTo((start + cfg.fanoutDur) / period);
    });
  });

  it('keeps every span within the cycle and preserves the loopGap rest at the end', () => {
    const { spans, period } = pulseTimeline(cfg, 3);
    for (const s of spans) {
      expect(s.startPct).toBeGreaterThanOrEqual(0);
      expect(s.endPct).toBeLessThanOrEqual(1);
    }
    const lastEnd = spans[spans.length - 1]!.endPct;
    expect(lastEnd).toBeCloseTo(1 - cfg.loopGap / period);
  });
});
