import { BASE_THEME } from './index';
import type { ThemeParams, ThemeConfig, ColorModePreference, PresetId } from '../types/theme';
import { CURRENT_THEME_VERSION } from '../types/theme';

/** The default config used before anything is persisted. */
export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  version: CURRENT_THEME_VERSION,
  seed: BASE_THEME,
  mode: 'system',
  preset: 'default',
};

const MODES: ColorModePreference[] = ['light', 'dark', 'system'];
const PRESET_IDS: PresetId[] = ['default', 'prism'];

function coercePreset(x: unknown): PresetId {
  return PRESET_IDS.includes(x as PresetId) ? (x as PresetId) : 'default';
}

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
 *  - a versioned config (v1 or current) with a valid seed → migrated forward
 *    (v1 predates `preset`, so it defaults to 'default')
 *  - a legacy record whose `config` WAS the raw ThemeParams → wrapped
 *  - anything unrecognized → DEFAULT_THEME_CONFIG
 */
export function normalizeThemeConfig(raw: unknown): ThemeConfig {
  if (raw && typeof raw === 'object') {
    const o = raw as Record<string, unknown>;

    // Versioned shape (any known version) with a seed → migrate to current.
    if ((o.version === 1 || o.version === CURRENT_THEME_VERSION) && isThemeParams(o.seed)) {
      const mode = MODES.includes(o.mode as ColorModePreference)
        ? (o.mode as ColorModePreference)
        : 'system';
      return { version: CURRENT_THEME_VERSION, seed: o.seed, mode, preset: coercePreset(o.preset) };
    }

    // Legacy shape: the config itself was the ThemeParams.
    if (isThemeParams(raw)) {
      return { version: CURRENT_THEME_VERSION, seed: raw, mode: 'system', preset: 'default' };
    }
  }

  return DEFAULT_THEME_CONFIG;
}
