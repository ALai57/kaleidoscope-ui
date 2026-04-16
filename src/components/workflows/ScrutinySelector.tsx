import React from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import type { ScrutinyLevel } from '../../types/workflow';

interface ScrutinyOption {
  value: ScrutinyLevel;
  label: string;
  description: string;
}

const OPTIONS: ScrutinyOption[] = [
  {
    value: 'quick',
    label: 'Quick check',
    description: 'Experiments and prototypes',
  },
  {
    value: 'standard',
    label: 'Standard review',
    description: 'Most features',
  },
  {
    value: 'rigorous',
    label: 'Rigorous review',
    description: 'High-stakes or hard-to-reverse decisions',
  },
];

interface ScrutinySelectorProps {
  value: ScrutinyLevel;
  onChange: (level: ScrutinyLevel) => void;
  /** When true, renders as a compact inline Select instead of radio buttons */
  compact?: boolean;
}

export const ScrutinySelector: React.FC<ScrutinySelectorProps> = ({ value, onChange, compact = false }) => {
  if (compact) {
    return (
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as ScrutinyLevel)}
        size="small"
        sx={{ minWidth: 150, fontSize: '0.82rem' }}
      >
        {OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '0.82rem' }}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    );
  }

  return (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
        How much scrutiny does this idea need?
      </Typography>
      <RadioGroup
        value={value}
        onChange={(e) => onChange(e.target.value as ScrutinyLevel)}
      >
        {OPTIONS.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio size="small" />}
            label={
              <Box component="span">
                <Typography component="span" variant="body2" sx={{ fontWeight: 500 }}>
                  {opt.label}
                </Typography>
                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 0.75 }}
                >
                  — {opt.description}
                </Typography>
              </Box>
            }
            sx={{ mb: 0.25 }}
          />
        ))}
      </RadioGroup>
    </Box>
  );
};

export default ScrutinySelector;
