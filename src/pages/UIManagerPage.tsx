import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { AdminLayout } from '../components/layout/AdminLayout';
import { Button } from '../components/layout/Button';
import { ColorPicker } from '../components/colors/ColorPicker';
import { PresetPicker } from '../components/common/PresetPicker';
import { useAuth } from '../auth/useAuth';
import { useThemeStore } from '../store/themeStore';
import { useDebouncedCallback } from '../hooks/useDebouncedCallback';
import { getThemes, updateTheme } from '../api/themes';
import type { ThemeRecord } from '../api/themes';
import { CURRENT_THEME_VERSION } from '../types/theme';
import type { ThemeConfig } from '../types/theme';
import { hsl } from '../theme';
import { toHex, toHsl } from '../theme/contrast';

// ── Helpers ────────────────────────────────────────────────────────────────

/** Current brand seed as a hex color for the picker's initial value. */
function seedToHex(hue: number, saturation: number, lightness: number): string {
  return toHex(hsl(hue, saturation, lightness));
}

// ── Page ───────────────────────────────────────────────────────────────────

const UIManagerPage: React.FC = () => {
  const { token } = useAuth();
  const { mode, setMode } = useColorScheme();
  const { themeParams, setThemeParams, preset } = useThemeStore();
  // The picker updates its own swatch instantly; defer the (leonardo-driven)
  // theme rebuild until the user pauses dragging.
  const debouncedSetThemeParams = useDebouncedCallback(setThemeParams, 120);

  // Load themes from API (to get the record ID for saving)
  const { data: themes = [] } = useQuery({
    queryKey: ['themes'],
    queryFn: () => getThemes(token),
  });

  const saveThemeMutation = useMutation({
    mutationFn: (record: ThemeRecord) => updateTheme(record, token),
  });

  const handleSave = () => {
    const config: ThemeConfig = {
      version: CURRENT_THEME_VERSION,
      seed: themeParams,
      mode: mode ?? 'system',
      preset,
    };
    const existing = themes[0];
    if (existing) {
      saveThemeMutation.mutate({ ...existing, config });
    } else {
      saveThemeMutation.mutate({
        id: '00000000-0000-0000-0000-000000000000',
        display_name: 'My theme',
        config,
      });
    }
  };

  const currentColor = seedToHex(themeParams.hue, themeParams.saturation, themeParams.lightness);

  return (
    // The theme workbench renders under the *live* app theme (not the fixed
    // Prism chrome) so edits to color/preset/mode preview in place.
    <AdminLayout title="UI Manager" disablePrismTheme>
      {/* Design-language preset */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Design language
      </Typography>
      <PresetPicker sx={{ mb: 3, maxWidth: 560 }} />

      {/* Dark mode toggle */}
      <FormControlLabel
        control={
          <Switch
            checked={mode === 'dark'}
            onChange={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            slotProps={{ input: { 'aria-label': 'toggle dark mode' } }}
          />
        }
        label="Dark mode"
        sx={{ mb: 3 }}
      />

      {/* Color picker */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        <ColorPicker
          initialColor={currentColor}
          onChange={(color) => {
            // Convert the picked hex back into brand seed params so it drives
            // the live theme (main.tsx builds the theme from the store).
            const { h, s, l } = toHsl(color);
            debouncedSetThemeParams({ ...themeParams, hue: h, saturation: s, lightness: l });
          }}
        />
      </Box>

      {/* Save button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          text={saveThemeMutation.isPending ? 'Saving…' : 'Save theme'}
          onClick={handleSave}
          disabled={saveThemeMutation.isPending}
        />
      </Box>

      {saveThemeMutation.isSuccess && (
        <Typography
          sx={{
            color: 'success.main',
            mt: 1,
            textAlign: 'center',
          }}
        >
          Theme saved!
        </Typography>
      )}
    </AdminLayout>
  );
};

export default UIManagerPage;
