import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

/**
 * The kaleidoscope wordmark glyph — six wedges + a hub. Wedge fills come from the
 * theme's categorical palette (mode-independent identity hues) so the mark
 * re-colors with the active preset instead of hardcoding brand hex. Shared by
 * the public NavBar and the admin nav rail.
 */
const WEDGE_PATHS = [
  'M15 15 L15 3 A12 12 0 0 1 25.4 9Z',
  'M15 15 L25.4 9 A12 12 0 0 1 25.4 21Z',
  'M15 15 L25.4 21 A12 12 0 0 1 15 27Z',
  'M15 15 L15 27 A12 12 0 0 1 4.6 21Z',
  'M15 15 L4.6 21 A12 12 0 0 1 4.6 9Z',
  'M15 15 L4.6 9 A12 12 0 0 1 15 3Z',
];

export interface KaleidoscopeMarkProps {
  /** Rendered width/height in px. */
  size?: number;
  className?: string;
}

export const KaleidoscopeMark: React.FC<KaleidoscopeMarkProps> = ({ size = 30, className }) => {
  const theme = useTheme();
  const wedgeColors = theme.tokens?.color.categorical ?? [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
  ];

  return (
    <Box
      component="svg"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 30 30"
      aria-hidden="true"
      sx={{ flexShrink: 0 }}
    >
      {WEDGE_PATHS.map((d, i) => (
        <path key={d} d={d} fill={wedgeColors[i % wedgeColors.length]} />
      ))}
      <circle cx="15" cy="15" r="4.5" fill={theme.palette.background.default} />
      <circle cx="15" cy="15" r="4.5" fill="none" stroke={theme.palette.primary.main} strokeWidth="1" />
    </Box>
  );
};
