import * as React from 'react';
import { styled } from '@mui/material/styles';

const Root = styled('button', {
  shouldForwardProp: (p) => p !== 'pressed',
})<{ pressed?: boolean | undefined }>(({ theme, pressed }) => {
  const { color, motion, typography } = theme.tokens;
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    fontFamily: typography.mono,
    fontSize: 11.5,
    color: pressed ? color.brand.primary : color.text.secondary,
    background: pressed ? `${color.brand.primary}24` : color.surface.raised,
    border: `1px solid ${pressed ? color.brand.primary : color.border.subtle}`,
    borderRadius: 999,
    padding: '5px 12px',
    cursor: 'pointer',
    transition: `border-color .2s, color .2s, background .2s, transform ${motion.duration.base}ms ${motion.easing.springSettle}`,
    '&:hover': { transform: 'translateY(-2px)', borderColor: color.border.strong },
    '&:focus-visible': { outline: `2px solid ${color.brand.primary}`, outlineOffset: 2 },
    '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
  };
});

const Dot = styled('span')<{ c: string }>(({ c }) => ({
  width: 8,
  height: 8,
  borderRadius: 2,
  flexShrink: 0,
  background: c,
}));

export interface ChipProps extends React.ComponentProps<'button'> {
  dotColor?: string;
  pressed?: boolean;
  as?: 'button' | 'span';
}

export const Chip: React.FC<ChipProps> = ({ dotColor, pressed, as = 'button', children, ...rest }) => (
  <Root
    as={as}
    pressed={pressed}
    aria-pressed={as === 'button' ? Boolean(pressed) : undefined}
    {...rest}
  >
    {dotColor && <Dot c={dotColor} />}
    {children}
  </Root>
);
