export interface ThemeParams {
  hue: number;
  saturation: number;
  lightness: number;
  angle: number;
  theta: number;
}

export type ColorModePreference = 'light' | 'dark' | 'system';

/** Bump when the persisted ThemeConfig shape changes; normalizeThemeConfig
 *  migrates older/legacy records forward. */
export const CURRENT_THEME_VERSION = 1;

/**
 * The persisted theme shape (stored as JSON in the themes API `config` column).
 * Versioned and extensible: the brand `seed` and color `mode` today, with room
 * to add token `overrides` under a version bump without a backend migration.
 */
export interface ThemeConfig {
  version: typeof CURRENT_THEME_VERSION;
  seed: ThemeParams;
  mode: ColorModePreference;
}
