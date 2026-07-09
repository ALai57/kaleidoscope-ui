import { describe, it, expect } from 'vitest';
import { normalizeThemeConfig, DEFAULT_THEME_CONFIG } from './config';
import { BASE_THEME } from './index';
import { CURRENT_THEME_VERSION } from '../types/theme';

describe('normalizeThemeConfig', () => {
  it('passes through a current-version config', () => {
    const cfg = { version: 1, seed: { ...BASE_THEME, hue: 10 }, mode: 'dark' as const };
    expect(normalizeThemeConfig(cfg)).toEqual(cfg);
  });

  it('defaults an invalid mode to system', () => {
    const cfg = { version: 1, seed: BASE_THEME, mode: 'neon' };
    expect(normalizeThemeConfig(cfg).mode).toBe('system');
  });

  it('migrates a legacy record whose config WAS the raw ThemeParams', () => {
    const legacy = { hue: 200, saturation: 50, lightness: 40, angle: 90, theta: 45 };
    expect(normalizeThemeConfig(legacy)).toEqual({
      version: CURRENT_THEME_VERSION,
      seed: legacy,
      mode: 'system',
    });
  });

  it('falls back to the default for unrecognized input', () => {
    expect(normalizeThemeConfig(null)).toEqual(DEFAULT_THEME_CONFIG);
    expect(normalizeThemeConfig({ foo: 'bar' })).toEqual(DEFAULT_THEME_CONFIG);
    expect(normalizeThemeConfig(undefined)).toEqual(DEFAULT_THEME_CONFIG);
  });
});
