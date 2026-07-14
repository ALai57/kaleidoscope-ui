import { describe, it, expect } from 'vitest';
import { BASE_THEME, hsl, makePalette, makeTheme, makePrismTheme } from './index';
import type { Tokens } from './index';

type Scheme = { tokens: Tokens };
// The base MUI Theme type doesn't surface `colorSchemes` unless the CSS-vars
// types are active; the schemes exist at runtime, so narrow through this.
const schemes = (t: ReturnType<typeof makeTheme>) =>
  (t as unknown as { colorSchemes: { light: Scheme; dark: Scheme } }).colorSchemes;

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

  it('exposes the design tokens on theme.tokens', () => {
    const theme = makeTheme(BASE_THEME);
    expect(theme.tokens).toBeDefined();
    expect(theme.tokens.color.brand.primary).toBe(makePalette(BASE_THEME).primary);
    expect(theme.tokens.space.md).toBe(16);
  });

  it('derives the MUI palette and shape from tokens', () => {
    const theme = makeTheme(BASE_THEME);
    expect(theme.palette.primary.main).toBe(makePalette(BASE_THEME).primary);
    expect(theme.palette.success.main).toBe(theme.tokens.color.status.success);
    // shape.borderRadius is derived from the radius.md token (8)
    expect(theme.shape.borderRadius).toBe(theme.tokens.radius.md);
  });

  it('carries mode-specific tokens on each color scheme', () => {
    // theme.tokens is mode-reactive: MUI swaps in the active scheme's tokens
    // when the color mode changes, so each scheme must carry its own set.
    const { light, dark } = schemes(makeTheme(BASE_THEME));
    expect(light.tokens.mode).toBe('light');
    expect(dark.tokens.mode).toBe('dark');
    expect(light.tokens.color.surface.base).not.toBe(dark.tokens.color.surface.base);
  });
});

describe('makePrismTheme', () => {
  it('is pinned to the Prism dark instrument-panel surfaces', () => {
    const t = makePrismTheme();
    expect(t.tokens.color.surface.base).toBe('#0A0E15');
    expect(t.tokens.color.categorical.slice(0, 5)).toEqual([
      '#26A0BC',
      '#9085E9',
      '#C98500',
      '#2E9E5B',
      '#D55181',
    ]);
  });

  it('carries the Prism dark tokens in BOTH color schemes', () => {
    const { light, dark } = schemes(makePrismTheme());
    expect(light.tokens.color.surface.base).toBe('#0A0E15');
    expect(dark.tokens.color.surface.base).toBe('#0A0E15');
  });
});
