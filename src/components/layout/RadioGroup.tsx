import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import MuiRadio from '@mui/material/Radio';
import MuiRadioGroup from '@mui/material/RadioGroup';

export interface RadioGroupOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  groupName?: string | undefined;
  value?: string | undefined;
  elements?: RadioGroupOption[] | undefined;
  onChange?: ((value: string) => void) | undefined;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  groupName,
  value,
  elements = [],
  onChange,
}) => {
  const [currentValue, setCurrentValue] = React.useState<string>(value ?? '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  return (
    <FormControl>
      {groupName && <FormLabel>{groupName}</FormLabel>}
      <MuiRadioGroup value={currentValue} onChange={handleChange}>
        {elements.map((element) => (
          <FormControlLabel
            key={element.value}
            value={element.value}
            label={element.label}
            control={<MuiRadio />}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};
