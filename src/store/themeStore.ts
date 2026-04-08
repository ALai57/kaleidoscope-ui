import { create } from 'zustand';
import type { ThemeParams } from '../types/theme';
import { BASE_THEME } from '../theme';

interface ThemeStore {
  themeParams: ThemeParams;
  setThemeParams: (params: ThemeParams) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  themeParams: BASE_THEME,
  setThemeParams: (themeParams) => set({ themeParams }),
}));
