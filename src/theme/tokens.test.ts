import { describe, it, expect } from 'vitest';
import { BASE_THEME } from './index';
import { hsl, makeBrand, makeTokens } from './tokens';

describe('hsl', () => {
  it('returns a valid hsl string', () => {
    expect(hsl(217, 65, 40)).toBe('hsl(217, 65%, 40%)');
  });
});

describe('makeBrand', () => {
  it('derives primary, secondary, tertiary from params', () => {
    const brand = makeBrand(BASE_THEME);
    expect(brand.primary).toBe(hsl(BASE_THEME.hue, BASE_THEME.saturation, BASE_THEME.lightness));
    expect(brand.secondary).toBe(
      hsl(BASE_THEME.hue + 180 + BASE_THEME.angle, BASE_THEME.saturation, BASE_THEME.lightness)
    );
    expect(brand.tertiary).toBe(
      hsl(BASE_THEME.hue + 180 - BASE_THEME.angle, BASE_THEME.saturation, BASE_THEME.lightness)
    );
  });
});

describe('makeTokens', () => {
  it('produces a full token set with all role groups', () => {
    const t = makeTokens(BASE_THEME);
    expect(t.mode).toBe('light');
    expect(Object.keys(t.color)).toEqual(
      expect.arrayContaining(['brand', 'status', 'surface', 'border', 'text'])
    );
    expect(t.color.status).toEqual(
      expect.objectContaining({ success: expect.any(String), error: expect.any(String) })
    );
    expect(t.space.md).toBe(16);
    expect(t.radius.md).toBe(8);
    expect(t.elevation.md).toContain('rgba');
    expect(t.typography.scale.body1.fontSize).toBe('1.3rem');
  });

  it('defaults to light mode', () => {
    expect(makeTokens(BASE_THEME).mode).toBe('light');
  });

  it('dark mode flips brand lightness and swaps neutrals', () => {
    const light = makeTokens(BASE_THEME, 'light');
    const dark = makeTokens(BASE_THEME, 'dark');
    expect(dark.mode).toBe('dark');
    expect(light.color.brand.primary).toContain(`${BASE_THEME.lightness}%`);
    expect(dark.color.brand.primary).toContain(`${100 - BASE_THEME.lightness}%`);
    // neutral surfaces differ between modes
    expect(dark.color.surface.base).not.toBe(light.color.surface.base);
  });
});
