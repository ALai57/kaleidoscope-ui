import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeParams } from '../types/theme';
import { BASE_THEME } from '../theme';

interface ThemeStore {
  /** The active brand seed that drives the live MUI theme (see main.tsx). */
  themeParams: ThemeParams;
  setThemeParams: (params: ThemeParams) => void;
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
      setThemeParams: (themeParams) => set({ themeParams }),
    }),
    { name: 'kaleidoscope-theme' }
  )
);
