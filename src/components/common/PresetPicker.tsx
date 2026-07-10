import React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { PRESETS } from '../../theme';
import { useThemeStore } from '../../store/themeStore';
import { useSelectPreset } from '../../theme/useSelectPreset';
import type { PresetId } from '../../types/theme';

/**
 * The runtime entry point for design-language presets: a segmented control that
 * lets a user switch between "Classic" and "Prism". Selecting an option calls
 * `useSelectPreset`, which applies the preset's structural tokens + default seed
 * *and* drops the app into the preset's default color mode (Prism → dark).
 *
 * Each option previews its own preset by rendering its label in that preset's
 * typography voice and radius — reading straight from `PRESETS` — so the picker
 * doubles as a tiny live specimen of the look you're about to select.
 */

// One-line summary of each preset's personality, shown under its name.
const PRESET_BLURB: Record<PresetId, string> = {
  default: 'Adaptive sans, standard motion',
  prism: 'Mono voice, spring motion, dark by default',
};

export interface PresetPickerProps {
  sx?: SxProps<Theme>;
}

export const PresetPicker: React.FC<PresetPickerProps> = ({ sx }) => {
  const theme = useTheme();
  const active = useThemeStore((s) => s.preset);
  const selectPreset = useSelectPreset();

  const tokens = theme.tokens;
  const durBase = tokens?.motion.duration.base ?? 250;
  const settle = tokens?.motion.easing.springSettle ?? 'ease';

  return (
    <Box
      role="radiogroup"
      aria-label="Design language preset"
      sx={[
        {
          display: 'flex',
          gap: 1.5,
          flexWrap: 'wrap',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {Object.values(PRESETS).map((preset) => {
        const selected = preset.id === active;
        // Each option previews its own preset's voice + radius, not the live one.
        const optionFamily =
          preset.typography.headingFamily === 'mono' ? preset.typography.mono : preset.typography.sans;
        return (
          <ButtonBase
            key={preset.id}
            role="radio"
            aria-checked={selected}
            onClick={() => selectPreset(preset.id)}
            focusRipple
            sx={{
              flex: '1 1 180px',
              justifyContent: 'flex-start',
              textAlign: 'left',
              p: 2,
              borderRadius: `${preset.radius.md}px`,
              border: '1px solid',
              borderColor: selected ? 'primary.main' : 'divider',
              bgcolor: selected ? alpha(theme.palette.primary.main, 0.1) : 'background.paper',
              transition: `border-color ${durBase}ms, background-color ${durBase}ms, transform ${durBase}ms ${settle}`,
              '&:hover': {
                borderColor: 'primary.main',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, width: '100%' }}>
              <Typography
                component="span"
                sx={{
                  fontFamily: optionFamily,
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  letterSpacing: preset.typography.headingFamily === 'mono' ? '0.12em' : '0.01em',
                  textTransform: preset.typography.headingFamily === 'mono' ? 'uppercase' : 'none',
                  color: selected ? 'primary.main' : 'text.primary',
                }}
              >
                {preset.label}
              </Typography>
              <Typography
                component="span"
                sx={{ fontSize: '0.75rem', color: 'text.secondary', lineHeight: 1.4 }}
              >
                {PRESET_BLURB[preset.id]}
              </Typography>
            </Box>
          </ButtonBase>
        );
      })}
    </Box>
  );
};
