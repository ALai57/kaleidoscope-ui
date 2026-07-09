import { BASE_THEME } from './index';
import type { ThemeParams, ThemeConfig, ColorModePreference } from '../types/theme';
import { CURRENT_THEME_VERSION } from '../types/theme';

/** The default config used before anything is persisted. */
export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  version: CURRENT_THEME_VERSION,
  seed: BASE_THEME,
  mode: 'system',
};

const MODES: ColorModePreference[] = ['light', 'dark', 'system'];

function isThemeParams(x: unknown): x is ThemeParams {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.hue === 'number' &&
    typeof o.saturation === 'number' &&
    typeof o.lightness === 'number' &&
    typeof o.angle === 'number' &&
    typeof o.theta === 'number'
  );
}

/**
 * Coerces an arbitrary persisted value into a current-version ThemeConfig.
 * Handles three cases:
 *  - already a current-version config → passed through (mode defaulted)
 *  - a legacy record whose `config` WAS the raw ThemeParams → wrapped
 *  - anything unrecognized → DEFAULT_THEME_CONFIG
 */
export function normalizeThemeConfig(raw: unknown): ThemeConfig {
  if (raw && typeof raw === 'object') {
    const o = raw as Record<string, unknown>;

    // Current shape (versioned object with a seed).
    if (o.version === CURRENT_THEME_VERSION && isThemeParams(o.seed)) {
      const mode = MODES.includes(o.mode as ColorModePreference)
        ? (o.mode as ColorModePreference)
        : 'system';
      return { version: CURRENT_THEME_VERSION, seed: o.seed, mode };
    }

    // Legacy shape: the config itself was the ThemeParams.
    if (isThemeParams(raw)) {
      return { version: CURRENT_THEME_VERSION, seed: raw, mode: 'system' };
    }
  }

  return DEFAULT_THEME_CONFIG;
}
