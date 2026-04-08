import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import OutlinedInput from '@mui/material/OutlinedInput';
import { HexColorPicker } from 'react-colorful';

// Styled wrapper
const StyledPaper = styled(Paper)(({ theme }) => ({
  transition: 'transform 0.3s',
  padding: theme.spacing(2),
  textAlign: 'center',
}));

export interface BasicColorPickerProps {
  color?: string | undefined;
  onChange?: ((color: string) => void) | undefined;
}

export const BasicColorPicker: React.FC<BasicColorPickerProps> = ({
  color = '#000000',
  onChange,
}) => (
  <StyledPaper>
    <HexColorPicker
      color={color}
      onChange={(newColor) => onChange?.(newColor.toUpperCase())}
      style={{ height: '200px', width: '100%' }}
    />
    <br />
    <OutlinedInput
      size="small"
      value={color}
      onChange={(e) => onChange?.(e.target.value)}
      startAdornment={
        <div
          style={{
            backgroundColor: color,
            width: '50%',
            height: '30px',
          }}
        />
      }
    />
  </StyledPaper>
);

export interface ColorPickerProps {
  initialColor?: string | undefined;
  onChange?: ((color: string) => void) | undefined;
  collapsable?: boolean | undefined;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  initialColor = '#000000',
  onChange,
  collapsable = false,
}) => {
  const [color, setColor] = React.useState<string>(initialColor);
  const [open, setOpen] = React.useState<boolean>(!collapsable);

  const handleChange = (newColor: string): void => {
    setColor(newColor.toUpperCase());
    onChange?.(newColor.toUpperCase());
  };

  return (
    <div>
      {/* Swatch */}
      <div
        style={{
          backgroundColor: color,
          width: '28px',
          height: '28px',
          borderRadius: '8px',
          border: '3px solid #fff',
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
        }}
        onClick={() => {
          if (collapsable) setOpen((prev) => !prev);
        }}
      />

      {open && (
        <div
          style={
            collapsable
              ? { position: 'absolute', zIndex: 1000 }
              : {}
          }
        >
          <BasicColorPicker color={color} onChange={handleChange} />
        </div>
      )}
    </div>
  );
};
