import { useColorScheme } from '@mui/material/styles';
import { useThemeStore } from '../store/themeStore';
import { PRESETS } from './tokens';
import type { PresetId } from '../types/theme';

/**
 * The user-facing preset switch. Selecting a preset applies its structural
 * tokens + default seed (via the store's `setPreset`) *and* its default color
 * mode (via MUI's color-scheme system) — so choosing Prism drops the app into
 * dark, where its cyan accent is designed to live. The user can still toggle
 * mode afterward with the DarkModeToggle.
 *
 * This is deliberately separate from `ThemeBootstrap` (main.tsx), which restores
 * a user's *saved* mode from the themes API rather than the preset default.
 */
export function useSelectPreset(): (id: PresetId) => void {
  const setPreset = useThemeStore((s) => s.setPreset);
  const { setMode } = useColorScheme();
  return (id: PresetId) => {
    setPreset(id);
    setMode(PRESETS[id].defaultMode);
  };
}
