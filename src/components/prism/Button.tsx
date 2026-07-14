import { styled } from '@mui/material/styles';

type Variant = 'primary' | 'ghost' | 'danger' | 'subtle';

export const Button = styled('button', {
  shouldForwardProp: (p) => p !== 'variant',
})<{ variant?: Variant }>(({ theme, variant = 'primary' }) => {
  const { color, radius, motion, typography } = theme.tokens;
  const base = {
    fontFamily: typography.mono,
    fontSize: 12.5,
    fontWeight: 600,
    letterSpacing: '0.04em',
    padding: '9px 16px',
    borderRadius: radius.sm,
    border: '1px solid transparent',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
    transition: `transform ${motion.duration.base}ms ${motion.easing.springSettle}, background .2s, box-shadow .3s, border-color .2s, color .2s`,
    '&:hover': { transform: 'translateY(-2px)' },
    '&:active': { transform: 'translateY(0) scale(0.97)' },
    '&:focus-visible': { outline: `2px solid ${color.brand.primary}`, outlineOffset: 2 },
    '&:disabled': { opacity: 0.38, pointerEvents: 'none' as const },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
      '&:hover, &:active': { transform: 'none' },
    },
  };
  const variants: Record<Variant, object> = {
    primary: {
      background: color.brand.primary,
      color: color.surface.base,
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: `0 4px 18px ${color.brand.primary}59`,
      },
    },
    ghost: {
      background: 'transparent',
      color: color.text.primary,
      borderColor: color.border.strong,
      '&:hover': {
        transform: 'translateY(-2px)',
        borderColor: color.brand.primary,
        color: color.brand.primary,
      },
    },
    danger: {
      background: color.status.error,
      color: color.surface.base,
      '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 4px 16px ${color.status.error}59` },
    },
    subtle: {
      background: 'transparent',
      color: color.text.secondary,
      borderColor: color.border.strong,
      '&:hover': { transform: 'translateY(-2px)', color: color.text.primary },
    },
  };
  return { ...base, ...variants[variant] };
});
