import * as React from 'react';
import { styled } from '@mui/material/styles';
import { alpha } from '../../theme/alpha';

const Panel = styled('div')(({ theme }) => {
  const { color, radius, elevation } = theme.tokens;
  return {
    position: 'absolute',
    top: 44,
    right: 8,
    zIndex: 20,
    minWidth: 172,
    background: color.surface.raised,
    border: `1px solid ${color.border.strong}`,
    borderRadius: radius.md,
    padding: 5,
    boxShadow: elevation.lg,
  };
});

const Item = styled('button', {
  shouldForwardProp: (p) => p !== 'danger',
})<{ danger?: boolean | undefined }>(({ theme, danger }) => {
  const { color, radius, typography } = theme.tokens;
  return {
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontFamily: typography.mono,
    fontSize: 12,
    color: color.text.primary,
    background: 'transparent',
    border: 'none',
    borderRadius: radius.sm,
    padding: '9px 10px',
    cursor: 'pointer',
    transition: 'background .15s, color .15s',
    '&:hover': danger
      ? { background: alpha(color.status.error, 0.14), color: color.status.error }
      : { background: color.surface.sunken },
    '&:focus-visible': { outline: `2px solid ${color.brand.primary}`, outlineOffset: -2 },
  };
});

export const MenuItem: React.FC<
  { onSelect: () => void; danger?: boolean } & Omit<React.ComponentProps<'button'>, 'onSelect'>
> = ({ onSelect, danger, children, ...rest }) => (
  <Item
    role="menuitem"
    danger={danger}
    onClick={(e) => {
      e.stopPropagation();
      onSelect();
    }}
    {...rest}
  >
    {children}
  </Item>
);

export const Menu: React.FC<{
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  'aria-label'?: string;
}> = ({ open, onClose, children, ...rest }) => {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const onClick = () => onClose();
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <Panel role="menu" onClick={(e) => e.stopPropagation()} {...rest}>
      {children}
    </Panel>
  );
};
