export interface ThemeParams {
  hue: number;
  saturation: number;
  lightness: number;
  angle: number;
  theta: number;
}

export type ColorModePreference = 'light' | 'dark' | 'system';

/** Identifier of a design-language preset (structural tokens + default seed).
 *  The preset table itself lives in `theme/tokens.ts` (`PRESETS`); this type is
 *  here so the persisted config and non-theme code can name a preset without a
 *  circular import back into the theme layer. */
export type PresetId = 'default' | 'prism';

/** Bump when the persisted ThemeConfig shape changes; normalizeThemeConfig
 *  migrates older/legacy records forward. v2 added `preset`. */
export const CURRENT_THEME_VERSION = 2;

/**
 * The persisted theme shape (stored as JSON in the themes API `config` column).
 * Versioned and extensible: the brand `seed`, color `mode`, and design-language
 * `preset` today, with room to add token `overrides` under a version bump
 * without a backend migration.
 */
export interface ThemeConfig {
  version: typeof CURRENT_THEME_VERSION;
  seed: ThemeParams;
  mode: ColorModePreference;
  preset: PresetId;
}
