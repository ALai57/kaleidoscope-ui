import { styled } from '@mui/material/styles';
import { alpha } from '../../theme/alpha';

export const TextInput = styled('input')(({ theme }) => {
  const { color, radius, typography } = theme.tokens;
  return {
    width: '100%',
    fontFamily: typography.mono,
    fontSize: 13,
    color: color.text.primary,
    background: color.surface.raised,
    border: `1px solid ${color.border.strong}`,
    borderRadius: radius.sm,
    padding: '10px 12px',
    transition: 'border-color .2s, box-shadow .25s',
    '&::placeholder': { color: color.text.disabled },
    '&:focus': {
      outline: 'none',
      borderColor: color.brand.primary,
      boxShadow: `0 0 0 3px ${alpha(color.brand.primary, 0.14)}`,
    },
  };
});
