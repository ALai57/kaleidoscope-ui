import { describe, it, expect } from 'vitest';
import { BASE_THEME } from './index';
import { hsl, makeBrand, makeTokens, PRESETS } from './tokens';
import { contrastRatio, WCAG_AA_LARGE } from './contrast';

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

  it('light mode uses the raw seed-derived brand color', () => {
    const light = makeTokens(BASE_THEME, 'light');
    expect(light.color.brand.primary).toContain(`${BASE_THEME.lightness}%`);
  });

  it('dark mode recomputes a contrast-safe brand color (not a lightness flip)', () => {
    const light = makeTokens(BASE_THEME, 'light');
    const dark = makeTokens(BASE_THEME, 'dark');
    expect(dark.mode).toBe('dark');
    // no longer the naive hsl flip — it's a leonardo-generated hex
    expect(dark.color.brand.primary).toMatch(/^#[0-9a-fA-F]{6}$/);
    // and it is actually legible against the dark surface
    expect(
      contrastRatio(dark.color.brand.primary, dark.color.surface.base)
    ).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    expect(dark.color.surface.base).not.toBe(light.color.surface.base);
  });

  it('applies the preset’s structural tokens (radius/motion/type voice)', () => {
    const prism = makeTokens(BASE_THEME, 'light', 'prism');
    const classic = makeTokens(BASE_THEME, 'light', 'default');
    expect(prism.preset).toBe('prism');
    expect(prism.radius.sm).toBe(PRESETS.prism.radius.sm);
    expect(prism.radius.sm).not.toBe(classic.radius.sm);
    expect(prism.typography.headingFamily).toBe('mono');
    expect(prism.motion.easing.springSnap).toBe(PRESETS.prism.motion.easing.springSnap);
  });
});

describe('PRESETS', () => {
  it('defaults Prism to dark mode and Classic to system', () => {
    expect(PRESETS.prism.defaultMode).toBe('dark');
    expect(PRESETS.default.defaultMode).toBe('system');
  });
});
