import React from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
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
}

export const ScrutinySelector: React.FC<ScrutinySelectorProps> = ({ value, onChange }) => (
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

export default ScrutinySelector;
