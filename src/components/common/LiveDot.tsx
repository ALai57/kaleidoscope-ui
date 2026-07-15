import React from 'react';
import Box from '@mui/material/Box';

export interface LiveDotProps {
  /** Dot diameter in px (default 8). */
  size?: number;
  /** Palette path or color string for the dot + label (default accent). */
  color?: string;
  /** Optional trailing mono label (e.g. "Analyzing"). */
  label?: string;
  /** Whether the dot pulses (default true). */
  pulse?: boolean;
}

/**
 * A token-driven pulsing "live" dot — the Prism signal for in-progress/streaming
 * state, replacing bare spinners. Modeled on StatusChip's internal StatusDot: the
 * dot inherits `color` via `currentColor`, and pulses a box-shadow ring using
 * `theme.tokens.motion` with fallbacks, so it is correct in both light and dark.
 */
export const LiveDot: React.FC<LiveDotProps> = ({
  size = 8,
  color = 'primary.main',
  label,
  pulse = true,
}) => {
  const dot = (
    <Box
      component="span"
      aria-hidden="true"
      data-testid="live-dot"
      sx={(theme) => {
        const period = theme.tokens ? theme.tokens.motion.duration.slow * 4 : 1600;
        const easing = theme.tokens?.motion.easing.easeOut ?? 'ease-out';
        return {
          width: size,
          height: size,
          borderRadius: '50%',
          flexShrink: 0,
          color,
          bgcolor: 'currentColor',
          ...(pulse && {
            animation: `live-pulse ${period}ms ${easing} infinite`,
            '@keyframes live-pulse': {
              '0%': { boxShadow: '0 0 0 0 currentColor' },
              '70%': { boxShadow: '0 0 0 5px transparent' },
              '100%': { boxShadow: '0 0 0 0 transparent' },
            },
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }),
        };
      }}
    />
  );

  if (!label) return dot;

  return (
    <Box
      component="span"
      sx={(theme) => ({
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        color,
        fontFamily: theme.tokens?.typography.mono ?? 'monospace',
        fontSize: '0.72rem',
        lineHeight: 1,
      })}
    >
      {dot}
      {label}
    </Box>
  );
};
