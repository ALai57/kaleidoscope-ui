import { styled } from '@mui/material/styles';
import { alpha } from '../../../theme/alpha';

export const Details = styled('details')(({ theme }) => {
  const { color } = theme.tokens;
  return {
    borderTop: `1px solid ${color.border.subtle}`,
    '& > summary': { listStyle: 'none' },
    '& > summary::-webkit-details-marker': { display: 'none' },
    borderRadius: 0,
    '&:first-of-type': { borderTop: 'none' },
  };
});

export const Summary = styled('summary')(({ theme }) => {
  const { color, typography } = theme.tokens;
  return {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '11px 18px',
    fontFamily: typography.mono,
    fontSize: 11.5,
    color: color.text.secondary,
    letterSpacing: '0.04em',
    transition: 'background .15s',
    '&:hover': { background: color.surface.sunken },
    '&:focus-visible': { outline: `2px solid ${color.brand.primary}`, outlineOffset: 2 },
  };
});

/** Rotating chevron; parent must be `details[open]` to rotate. */
export const Twisty = styled('span')(({ theme }) => ({
  color: theme.tokens.color.text.disabled,
  display: 'inline-flex',
  transition: `transform ${theme.tokens.motion.duration.base}ms ${theme.tokens.motion.easing.springSettle}`,
  'details[open] > summary &': { transform: 'rotate(90deg)' },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}));

export const Pre = styled('pre', { shouldForwardProp: (p) => p !== 'wrap' })<{ wrap?: boolean }>(
  ({ theme, wrap }) => ({
    margin: 0,
    padding: '12px 14px',
    overflowX: 'auto',
    fontFamily: theme.tokens.typography.mono,
    fontSize: 12,
    lineHeight: 1.6,
    color: theme.tokens.color.text.primary,
    whiteSpace: wrap ? 'pre-wrap' : 'pre',
  }),
);

export const IoBlock = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.tokens.color.border.subtle}`,
  borderRadius: theme.tokens.radius.sm,
  overflow: 'hidden',
  background: theme.tokens.color.surface.base,
}));

export const IoHead = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 12px',
  borderBottom: `1px solid ${theme.tokens.color.border.subtle}`,
  background: theme.tokens.color.surface.raised,
}));

export const Role = styled('span', { shouldForwardProp: (p) => p !== 'kind' })<{
  kind?: 'sys' | 'user' | 'asst';
}>(({ theme, kind }) => {
  const { color, typography } = theme.tokens;
  const tint =
    kind === 'sys' ? color.status.warning
      : kind === 'user' ? color.brand.primary
      : kind === 'asst' ? color.categorical[3]
      : color.text.disabled;
  return {
    fontFamily: typography.mono,
    fontSize: 10,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: tint,
  };
});

export const StatTile = styled('div')(({ theme }) => ({
  background: theme.tokens.color.surface.sunken,
  border: `1px solid ${theme.tokens.color.border.subtle}`,
  borderRadius: theme.tokens.radius.md,
  padding: '14px 16px 12px',
}));

export const Handoff = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  margin: '2px 0 2px 46px',
  fontFamily: theme.tokens.typography.mono,
  fontSize: 11,
  color: theme.tokens.color.text.disabled,
  '& .pill': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '4px 12px',
    borderRadius: theme.tokens.radius.pill,
    background: theme.tokens.color.surface.sunken,
    border: `1px solid ${theme.tokens.color.border.strong}`,
    color: theme.tokens.color.text.primary,
  },
  '& .pill .t': { color: theme.tokens.color.brand.primary, fontWeight: 600 },
}));

export const WarnBox = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 10,
  alignItems: 'flex-start',
  margin: '0 18px 16px',
  padding: '12px 14px',
  background: alpha(theme.tokens.color.status.warning, 0.14),
  border: `1px solid ${alpha(theme.tokens.color.status.warning, 0.35)}`,
  borderRadius: theme.tokens.radius.md,
  fontFamily: theme.tokens.typography.mono,
  fontSize: 12.5,
  color: theme.tokens.color.text.primary,
}));

export const ErrBox = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 10,
  alignItems: 'flex-start',
  margin: '16px 22px',
  padding: '14px 16px',
  background: alpha(theme.tokens.color.status.error, 0.14),
  border: `1px solid ${alpha(theme.tokens.color.status.error, 0.35)}`,
  borderRadius: theme.tokens.radius.md,
  fontFamily: theme.tokens.typography.mono,
  fontSize: 12.5,
  color: theme.tokens.color.text.primary,
}));
