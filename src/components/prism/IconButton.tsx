import { styled } from '@mui/material/styles';

export const IconButton = styled('button')(({ theme }) => {
  const { color, radius } = theme.tokens;
  return {
    width: 32,
    height: 32,
    flexShrink: 0,
    display: 'grid',
    placeItems: 'center',
    borderRadius: radius.sm,
    border: '1px solid transparent',
    background: 'transparent',
    color: color.text.disabled,
    cursor: 'pointer',
    transition: 'color .15s, background .15s, border-color .15s',
    '&:hover, &[aria-expanded="true"]': {
      color: color.text.primary,
      background: color.surface.sunken,
      borderColor: color.border.strong,
    },
    '&:focus-visible': { outline: `2px solid ${color.brand.primary}`, outlineOffset: 2 },
    '&:disabled': { opacity: 0.38, pointerEvents: 'none' },
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  };
});
