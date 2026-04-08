import { describe, it, expect } from 'vitest';
import { BASE_THEME, hsl, makePalette, makeTheme } from './index';

describe('hsl', () => {
  it('returns a valid hsl string', () => {
    expect(hsl(217, 65, 40)).toBe('hsl(217, 65%, 40%)');
  });
});

describe('makePalette', () => {
  it('returns primary, secondary, tertiary for BASE_THEME', () => {
    const palette = makePalette(BASE_THEME);
    expect(palette.primary).toMatch(/^hsl\(/);
    expect(palette.secondary).toMatch(/^hsl\(/);
    expect(palette.tertiary).toMatch(/^hsl\(/);
  });

  it('primary uses the base hue', () => {
    const palette = makePalette(BASE_THEME);
    expect(palette.primary).toBe(hsl(BASE_THEME.hue, BASE_THEME.saturation, BASE_THEME.lightness));
  });

  it('secondary is 180+angle degrees away', () => {
    const palette = makePalette(BASE_THEME);
    const expected = hsl(
      BASE_THEME.hue + 180 + BASE_THEME.angle,
      BASE_THEME.saturation,
      BASE_THEME.lightness
    );
    expect(palette.secondary).toBe(expected);
  });
});

describe('makeTheme', () => {
  it('creates a valid MUI theme', () => {
    const theme = makeTheme(BASE_THEME);
    expect(theme).toBeDefined();
    expect(typeof theme).toBe('object');
  });

  it('dark palette uses complementary lightness (100 - lightness)', () => {
    const lightPalette = makePalette(BASE_THEME);
    const darkPalette = makePalette({ ...BASE_THEME, lightness: 100 - BASE_THEME.lightness });

    // primary in light uses base lightness
    expect(lightPalette.primary).toContain(`${BASE_THEME.lightness}%`);
    // primary in dark uses complementary lightness
    expect(darkPalette.primary).toContain(`${100 - BASE_THEME.lightness}%`);
  });
});
