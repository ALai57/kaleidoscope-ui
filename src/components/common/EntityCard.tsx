import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { SurfaceCard } from './SurfaceCard';
import { StatusChip } from './StatusChip';
import type { SurfaceCardProps } from './SurfaceCard';

/**
 * The common "header + body + actions" card, layered on `SurfaceCard` (which
 * owns the surface). Two shapes, chosen by `variant`:
 *
 * - `card` (default) — a uniform-padded content card: an avatar/icon + title/
 *   subtitle header row, an optional top-right status/action slot, a body, and
 *   an optional footer of actions. Used by AgentCard, WorkflowCard.
 * - `panel` — a status panel: a full-bleed *filled* header bar (its own bg + a
 *   bottom divider) over a separately-padded body, with an optional accent
 *   border. This is the shell the workflow status cards (TeamLeadCard,
 *   AdvisorReviewCard, RoundCard) each hand-rolled. Their headers are bespoke,
 *   so pass composite nodes as `title`/`headerAction`; the primitive owns the
 *   border, the header-bar chrome, and the body padding.
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
  /** `card` = uniform padding (default); `panel` = filled header bar + full-bleed body. */
  variant?: 'card' | 'panel';
  /** Border color — the status accent. Overrides SurfaceCard's `divider`. */
  accentColor?: string;
  /** `panel` only: the header bar background. Defaults to `action.hover`. */
  headerColor?: string;
  /** `panel` only: whether the header bar has a bottom divider. Defaults to
   *  "has a body" (i.e. only divide the header from a body that follows). */
  headerDivider?: boolean;
}

export const EntityCard: React.FC<EntityCardProps> = ({
  title,
  subtitle,
  avatar,
  status,
  headerAction,
  actions,
  variant = 'card',
  accentColor,
  headerColor = 'action.hover',
  headerDivider,
  children,
  sx,
  ...surface
}) => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const headingMono = tokens?.typography.headingFamily === 'mono';
  const titleFamily = headingMono ? (tokens?.typography.mono ?? 'monospace') : 'inherit';
  const isPanel = variant === 'panel';

  // Treat the common `{cond && <X/>}` idiom (which yields `false`) as "empty",
  // so a falsy body/footer doesn't render an empty padded box.
  const hasBody = children != null && children !== false;
  const hasActions = actions != null && actions !== false;

  const headerRight = headerAction ?? (status ? <StatusChip status={status} dot /> : null);
  const hasHeader = title != null || avatar != null || headerRight != null;
  const showHeaderDivider = isPanel && (headerDivider ?? hasBody);
  const accentSx = accentColor ? { borderColor: accentColor } : {};

  const titleNode =
    title != null ? (
      <Typography
        component="div"
        sx={{
          fontFamily: titleFamily,
          fontWeight: isPanel ? 600 : 700,
          fontSize: isPanel ? '0.8125rem' : '1rem',
          letterSpacing: headingMono ? '0.03em' : undefined,
          lineHeight: 1.3,
          // In card variant a title is a single line; in panel it may be a
          // composite node (label + inline indicators) that should wrap freely.
          ...(isPanel
            ? {}
            : { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
        }}
      >
        {title}
      </Typography>
    ) : null;

  return (
    <SurfaceCard
      sx={[
        isPanel ? { p: 0, overflow: 'hidden', ...accentSx } : { p: 2, ...accentSx },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...surface}
    >
      {/* Header */}
      {hasHeader && (
        <Box
          sx={{
            display: 'flex',
            alignItems: isPanel ? 'center' : 'flex-start',
            gap: 1.5,
            ...(isPanel
              ? {
                  px: 1.5,
                  py: 1,
                  bgcolor: headerColor,
                  borderBottom: showHeaderDivider ? 1 : 0,
                  borderColor: 'divider',
                }
              : {}),
          }}
        >
          {avatar && <Box sx={{ flexShrink: 0 }}>{avatar}</Box>}
          <Box sx={{ minWidth: 0, flexGrow: 1 }}>
            {titleNode}
            {subtitle != null && (
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mt: 0.25
                }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {headerRight && <Box sx={{ flexShrink: 0 }}>{headerRight}</Box>}
        </Box>
      )}
      {/* Body */}
      {hasBody && <Box sx={isPanel ? { px: 1.5, py: 1 } : { mt: 1.5 }}>{children}</Box>}
      {/* Footer actions */}
      {hasActions && (
        <>
          <Divider {...(isPanel ? {} : { sx: { my: 1.5 } })} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexWrap: 'wrap',
              // card variant relies on the divider's my:1.5 for spacing; panel
              // is full-bleed so the footer needs its own padding.
              ...(isPanel ? { px: 1.5, py: 1 } : {}),
            }}
          >
            {actions}
          </Box>
        </>
      )}
    </SurfaceCard>
  );
};
