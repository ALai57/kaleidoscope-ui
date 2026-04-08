import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

export interface ButtonProps {
  onClick?: () => void;
  color?: MuiButtonProps['color'];
  text?: React.ReactNode;
  sx?: MuiButtonProps['sx'];
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  color = 'primary',
  text,
  sx,
  disabled,
}) => {
  const theme = useTheme();
  const primaryLight = (theme.palette as unknown as Record<string, Record<string, string>>)
    ?.primary?.light;

  return (
    <MuiButton
      color={color}
      variant="contained"
      onClick={onClick}
      disabled={disabled ?? false}
      sx={{
        backgroundColor: primaryLight,
        ...sx,
      }}
    >
      {text}
    </MuiButton>
  );
};
