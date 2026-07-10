import { describe, it, expect } from 'vitest';
import { normalizeThemeConfig, DEFAULT_THEME_CONFIG } from './config';
import { BASE_THEME } from './index';
import { CURRENT_THEME_VERSION } from '../types/theme';

describe('normalizeThemeConfig', () => {
  it('passes through a current-version config', () => {
    const cfg = {
      version: CURRENT_THEME_VERSION,
      seed: { ...BASE_THEME, hue: 10 },
      mode: 'dark' as const,
      preset: 'prism' as const,
    };
    expect(normalizeThemeConfig(cfg)).toEqual(cfg);
  });

  it('migrates a v1 config forward, defaulting the preset', () => {
    const v1 = { version: 1, seed: { ...BASE_THEME, hue: 10 }, mode: 'dark' as const };
    expect(normalizeThemeConfig(v1)).toEqual({
      version: CURRENT_THEME_VERSION,
      seed: v1.seed,
      mode: 'dark',
      preset: 'default',
    });
  });

  it('defaults an invalid mode to system and an invalid preset to default', () => {
    const cfg = { version: CURRENT_THEME_VERSION, seed: BASE_THEME, mode: 'neon', preset: 'nope' };
    const out = normalizeThemeConfig(cfg);
    expect(out.mode).toBe('system');
    expect(out.preset).toBe('default');
  });

  it('migrates a legacy record whose config WAS the raw ThemeParams', () => {
    const legacy = { hue: 200, saturation: 50, lightness: 40, angle: 90, theta: 45 };
    expect(normalizeThemeConfig(legacy)).toEqual({
      version: CURRENT_THEME_VERSION,
      seed: legacy,
      mode: 'system',
      preset: 'default',
    });
  });

  it('falls back to the default for unrecognized input', () => {
    expect(normalizeThemeConfig(null)).toEqual(DEFAULT_THEME_CONFIG);
    expect(normalizeThemeConfig({ foo: 'bar' })).toEqual(DEFAULT_THEME_CONFIG);
    expect(normalizeThemeConfig(undefined)).toEqual(DEFAULT_THEME_CONFIG);
  });
});
