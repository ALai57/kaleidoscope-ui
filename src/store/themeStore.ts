import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeParams, PresetId } from '../types/theme';
import { BASE_THEME, PRESETS } from '../theme';

interface ThemeStore {
  /** The active brand seed that drives the live MUI theme (see main.tsx). */
  themeParams: ThemeParams;
  /** The active design-language preset (structural tokens: radius/motion/type). */
  preset: PresetId;
  setThemeParams: (params: ThemeParams) => void;
  /** Switches preset AND resets the seed to that preset's default. The theme
   *  picker uses this; `ThemeBootstrap` sets `preset` directly (via setState) so
   *  it can restore a saved seed without the reset. */
  setPreset: (preset: PresetId) => void;
}

/**
 * Persisted to localStorage for instant paint on reload (no flash of the
 * default theme). The themes API remains the cross-device source of truth and
 * reconciles this on startup (see ThemeBootstrap in main.tsx).
 */
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      themeParams: BASE_THEME,
      preset: 'default',
      setThemeParams: (themeParams) => set({ themeParams }),
      setPreset: (preset) => set({ preset, themeParams: PRESETS[preset].seed }),
    }),
    { name: 'kaleidoscope-theme' }
  )
);
