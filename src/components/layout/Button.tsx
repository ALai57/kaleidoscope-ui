import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export interface ButtonProps {
  onClick?: (() => void) | undefined;
  color?: MuiButtonProps['color'] | undefined;
  text?: React.ReactNode;
  sx?: MuiButtonProps['sx'] | undefined;
  disabled?: boolean | undefined;
}

export const Button: React.FC<ButtonProps> = ({ onClick, color = 'primary', text, sx, disabled }) => (
  <MuiButton
    color={color}
    variant="contained"
    onClick={onClick}
    disabled={disabled ?? false}
    {...(sx ? { sx } : {})}
  >
    {text}
  </MuiButton>
);
