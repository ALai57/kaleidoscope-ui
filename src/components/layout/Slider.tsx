import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiSlider from '@mui/material/Slider';
import Input from '@mui/material/Input';

export interface SliderProps {
  title?: string;
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({
  title,
  initialValue = 0,
  min = 0,
  max = 100,
  onChange,
}) => {
  const [value, setValue] = React.useState<number>(initialValue);

  const handleChange = (newVal: number): void => {
    setValue(newVal);
    onChange?.(newVal);
  };

  return (
    <Box sx={{ maxWidth: '200px' }}>
      {title && <Typography>{title}</Typography>}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <MuiSlider
            value={value}
            min={min}
            max={max}
            onChange={(_event, newValue) => {
              const val = Array.isArray(newValue) ? (newValue[0] ?? 0) : newValue;
              handleChange(val);
            }}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            onChange={(event) => {
              const val = Number(event.target.value);
              handleChange(val);
            }}
            sx={{ width: '42px' }}
            inputProps={{ min, max, type: 'number', step: 1 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
