import { describe, it, expect } from 'vitest';
import { BASE_THEME, makeTheme } from './index';
import { makeTokens } from './tokens';
import type { ThemeParams } from '../types/theme';
import {
  contrastRatio,
  meetsAA,
  meetsAALarge,
  onColor,
  adaptiveColor,
  hexToRgb,
  WCAG_AA_LARGE,
} from './contrast';

describe('hexToRgb', () => {
  it('parses 6-digit hex', () => {
    expect(hexToRgb('#1139c9')).toEqual([17, 57, 201]);
  });
  it('expands 3-digit hex', () => {
    expect(hexToRgb('#fff')).toEqual([255, 255, 255]);
  });
});

describe('contrastRatio', () => {
  it('is ~21 for black on white', () => {
    expect(contrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 0);
  });
  it('is ~1 for a color on itself', () => {
    expect(contrastRatio('#777777', '#777777')).toBeCloseTo(1, 1);
  });
});

describe('onColor', () => {
  it('picks dark text on a light surface', () => {
    expect(meetsAA(onColor('#ffffff'), '#ffffff')).toBe(true);
    expect(onColor('#ffffff')).toBe('#111111');
  });
  it('picks light text on a dark surface', () => {
    expect(onColor('#121212')).toBe('#ffffff');
  });
});

describe('adaptiveColor', () => {
  it('produces a color meeting the target ratio against a dark surface', () => {
    const c = adaptiveColor('#1139c9', '#121212', 4.5);
    expect(contrastRatio(c, '#121212')).toBeGreaterThanOrEqual(4.5);
  });
});

// The a11y gate: a generated theme must never ship low-contrast text on its
// brand/status surfaces. Runs across a spread of seed hues so a bad seed is
// caught, not just the default.
describe('a11y gate: generated theme contrast', () => {
  const seeds: Array<[string, ThemeParams]> = [
    ['base', BASE_THEME],
    ['red', { ...BASE_THEME, hue: 0 }],
    ['green', { ...BASE_THEME, hue: 130 }],
    ['cyan', { ...BASE_THEME, hue: 190 }],
    ['magenta', { ...BASE_THEME, hue: 300 }],
  ];

  it.each(seeds)('%s: primary contrastText meets AA against primary', (_name, params) => {
    const theme = makeTheme(params);
    expect(
      meetsAA(theme.palette.primary.contrastText, theme.palette.primary.main)
    ).toBe(true);
  });

  it.each(seeds)('%s: every status color has AA-legible text', (_name, params) => {
    const theme = makeTheme(params);
    for (const role of ['success', 'warning', 'error', 'info'] as const) {
      expect(meetsAA(theme.palette[role].contrastText, theme.palette[role].main)).toBe(true);
    }
  });

  it.each(seeds)('%s: dark-mode brand stays legible on the dark surface', (_name, params) => {
    const dark = makeTokens(params, 'dark');
    expect(meetsAALarge(dark.color.brand.primary, dark.color.surface.base)).toBe(true);
  });
});
