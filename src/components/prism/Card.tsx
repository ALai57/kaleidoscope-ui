import { styled } from '@mui/material/styles';

export const Card = styled('div', {
  shouldForwardProp: (p) => p !== 'interactive',
})<{ interactive?: boolean }>(({ theme, interactive }) => {
  const { color, radius, motion, elevation } = theme.tokens;
  return {
    position: 'relative',
    background: color.surface.raised,
    border: `1px solid ${color.border.subtle}`,
    borderRadius: radius.lg,
    padding: 20,
    ...(interactive && {
      cursor: 'pointer',
      transition: `transform ${motion.duration.base}ms ${motion.easing.springSettle}, border-color .25s, box-shadow .35s`,
      '&:hover': { transform: 'translateY(-4px)', borderColor: color.border.strong, boxShadow: elevation.md },
      '&:focus-visible': { outline: `2px solid ${color.brand.primary}`, outlineOffset: 2 },
      '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
    }),
  };
});
