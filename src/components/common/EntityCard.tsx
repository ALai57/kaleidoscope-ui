import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { SurfaceCard } from './SurfaceCard';
import { StatusChip } from './StatusChip';
import type { SurfaceCardProps } from './SurfaceCard';

/**
 * The common "header-row card" pattern — a leading avatar/icon, a title +
 * subtitle, a top-right slot (status or actions), a body, and an optional
 * footer of actions — layered on top of `SurfaceCard` (which owns the surface).
 *
 * This is the `EntityCard` Phase 3 deferred: the ~10 hand-rolled entity cards
 * (AgentCard, WorkflowCard, TeamLeadCard, …) share this header/body/actions
 * skeleton even though their bodies differ. Compose the body as children.
 *
 * The title uses the preset's heading voice (mono under Prism) via
 * `theme.tokens`, with a bare-MUI fallback, so the card re-skins with the
 * active preset instead of hardcoding the Prism look.
 */
export interface EntityCardProps extends Omit<SurfaceCardProps, 'title'> {
  /** Primary heading. Rendered in the preset's heading voice. */
  title: React.ReactNode;
  /** Secondary line under the title. */
  subtitle?: React.ReactNode;
  /** Leading avatar/icon element (already sized by the caller). */
  avatar?: React.ReactNode;
  /** A domain status shown as a StatusChip in the top-right. */
  status?: string;
  /** Custom top-right content; overrides `status` when both are given. */
  headerAction?: React.ReactNode;
  /** Footer actions, rendered below a divider. */
  actions?: React.ReactNode;
}

export const EntityCard: React.FC<EntityCardProps> = ({
  title,
  subtitle,
  avatar,
  status,
  headerAction,
  actions,
  children,
  sx,
  ...surface
}) => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const headingMono = tokens?.typography.headingFamily === 'mono';
  const titleFamily = headingMono ? (tokens?.typography.mono ?? 'monospace') : 'inherit';

  const headerRight = headerAction ?? (status ? <StatusChip status={status} dot /> : null);

  return (
    <SurfaceCard sx={[{ p: 2 }, ...(Array.isArray(sx) ? sx : [sx])]} {...surface}>
      {/* Header row */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        {avatar && <Box sx={{ flexShrink: 0 }}>{avatar}</Box>}
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography
            component="div"
            sx={{
              fontFamily: titleFamily,
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: headingMono ? '0.03em' : undefined,
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Typography>
          {subtitle != null && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {headerRight && <Box sx={{ flexShrink: 0 }}>{headerRight}</Box>}
      </Box>

      {/* Body */}
      {children != null && <Box sx={{ mt: 1.5 }}>{children}</Box>}

      {/* Footer actions */}
      {actions != null && (
        <>
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {actions}
          </Box>
        </>
      )}
    </SurfaceCard>
  );
};
