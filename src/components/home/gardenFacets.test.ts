import { describe, it, expect } from 'vitest';
import { GARDEN_FACETS, facetColor, isFacetActive } from './gardenFacets';
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
