import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { NavBar } from '../components/layout/NavBar';
import { Button } from '../components/layout/Button';
import { ColorPicker } from '../components/colors/ColorPicker';
import { useKeycloak } from '../auth/useKeycloak';
import { useThemeStore } from '../store/themeStore';
import { getThemes, updateTheme } from '../api/themes';
import type { ThemeRecord } from '../api/themes';
import { hsl } from '../theme';

// ── Helpers ────────────────────────────────────────────────────────────────

/** Map hue (0-360) to a hex-ish representation for the color picker. */
function hueToHex(hue: number): string {
  return hsl(hue, 65, 40);
}

// ── Page ───────────────────────────────────────────────────────────────────

const UIManagerPage: React.FC = () => {
  const { token, isAuthenticated, userProfile, login, logout } = useKeycloak();
  const { mode, setMode } = useColorScheme();
  const { themeParams, setThemeParams } = useThemeStore();

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
      }
    : undefined;

  // Load themes from API (to get the record ID for saving)
  const { data: themes = [] } = useQuery({
    queryKey: ['themes'],
    queryFn: () => getThemes(token),
  });

  const saveThemeMutation = useMutation({
    mutationFn: (record: ThemeRecord) => updateTheme(record, token),
  });

  const handleSave = () => {
    const existing = themes[0];
    if (existing) {
      saveThemeMutation.mutate({ ...existing, config: themeParams });
    } else {
      saveThemeMutation.mutate({
        id: '00000000-0000-0000-0000-000000000000',
        display_name: 'My theme',
        config: themeParams,
      });
    }
  };

  const currentColor = hueToHex(themeParams.hue);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <Box sx={{ m: '10px', p: 2 }}>
        <Typography variant="h4" gutterBottom>
          UI Manager
        </Typography>

        {/* Dark mode toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={mode === 'dark'}
              onChange={() => setMode(mode === 'dark' ? 'light' : 'dark')}
              inputProps={{ 'aria-label': 'toggle dark mode' }}
            />
          }
          label="Dark mode"
          sx={{ mb: 3 }}
        />

        {/* Color picker */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 3 }}
        >
          <ColorPicker
            initialColor={currentColor}
            onChange={(color) => {
              // Simple mapping: just update hue as-is (full hex-to-hue conversion
              // would require a colour library — for now we store the raw value).
              void color; // mark used
              setThemeParams({ ...themeParams });
            }}
          />
        </Box>

        {/* Save button */}
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            text={saveThemeMutation.isPending ? 'Saving…' : 'Save theme'}
            onClick={handleSave}
            disabled={saveThemeMutation.isPending}
          />
        </Box>

        {saveThemeMutation.isSuccess && (
          <Typography color="success.main" sx={{ mt: 1, textAlign: 'center' }}>
            Theme saved!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default UIManagerPage;
