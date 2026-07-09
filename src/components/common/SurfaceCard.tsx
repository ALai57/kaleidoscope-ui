import React from 'react';
import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';

/**
 * The design system's shared card *surface* — border, radius, paper background,
 * and optional hover elevation — extracted from the ~10 hand-rolled cards
 * (WorkflowCard, ProjectCard, AgentCard, RoundCard, …) that each re-implemented
 * (and sometimes hardcoded) this treatment.
 *
 * It deliberately owns only the surface, not a fixed header/body/footer layout:
 * those cards' internals vary too much (centered avatar vs. header row vs.
 * accordion) to force into slots. Compose your content as children.
 *
 * Colors come from the token-derived MUI palette (`divider`,
 * `background.paper`) and radius from `theme.shape` (both mode-reactive), so
 * SurfaceCard stays correct in dark mode and is the one place to restyle the
 * card surface app-wide.
 */
export interface SurfaceCardProps extends Omit<BoxProps, 'ref'> {
  /** Raises the card on hover (a visual affordance, independent of clickability). */
  interactive?: boolean;
  /** MUI shadow level at rest (0 = flat/outlined, the default). */
  restingElevation?: number;
  /** MUI shadow level on hover when `interactive`. */
  hoverElevation?: number;
}

export const SurfaceCard: React.FC<SurfaceCardProps> = ({
  interactive = false,
  restingElevation = 0,
  hoverElevation = 3,
  sx,
  children,
  ...rest
}) => (
  <Box
    sx={[
      {
        border: 1,
        borderColor: 'divider',
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        bgcolor: 'background.paper',
        boxShadow: restingElevation,
        transition: 'box-shadow 0.2s',
        // pointer only when actually clickable
        ...(rest.onClick ? { cursor: 'pointer' } : {}),
        ...(interactive ? { '&:hover': { boxShadow: hoverElevation } } : {}),
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
    {...rest}
  >
    {children}
  </Box>
);
