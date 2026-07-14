import * as React from 'react';
import { styled } from '@mui/material/styles';
import { alpha } from '../../theme/alpha';

const Root = styled('button', { shouldForwardProp: (p) => p !== 'done' })<{ done?: boolean }>(
  ({ theme, done }) => {
    const { color, radius, typography } = theme.tokens;
    return {
      marginLeft: 'auto',
      fontFamily: typography.mono,
      fontSize: 10.5,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: done ? color.status.success : color.text.disabled,
      background: done ? alpha(color.status.success, 0.14) : 'transparent',
      border: `1px solid ${done ? color.status.success : color.border.strong}`,
      borderRadius: radius.sm,
      padding: '3px 9px',
      cursor: 'pointer',
      transition: 'color .15s, border-color .15s, background .15s',
      '&:hover': {
        color: color.brand.primary,
        borderColor: color.brand.primary,
        background: alpha(color.brand.primary, 0.14),
      },
      '&:focus-visible': { outline: `2px solid ${color.brand.primary}`, outlineOffset: 2 },
    };
  },
);

export interface CopyButtonProps extends Omit<React.ComponentProps<'button'>, 'children'> {
  text: string;
  label?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label = 'Copy',
  onClick,
  ...rest
}) => {
  const [done, setDone] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  React.useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <Root
      type="button"
      done={done}
      onClick={async (e) => {
        e.stopPropagation();
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          clearTimeout(timer.current);
          timer.current = setTimeout(() => setDone(false), 1400);
        } catch {
          /* clipboard unavailable — leave label unchanged */
        }
        onClick?.(e);
      }}
      {...rest}
    >
      {done ? 'Copied' : label}
    </Root>
  );
};
