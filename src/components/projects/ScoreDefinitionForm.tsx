import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import type { ScoreDefinition, ScorerType } from '../../types/project';

interface DimensionDraft {
  name: string;
  criteria: string;
}

interface ScoreDefinitionFormProps {
  open: boolean;
  initial?: ScoreDefinition | null;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    description: string;
    scorer_type: ScorerType;
    dimensions: DimensionDraft[];
  }) => void;
  isSubmitting?: boolean;
}

export const ScoreDefinitionForm: React.FC<ScoreDefinitionFormProps> = ({
  open,
  initial,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [scorerType, setScorerType] = useState<ScorerType>(initial?.scorer_type ?? 'general');
  const [dimensions, setDimensions] = useState<DimensionDraft[]>(
    initial?.dimensions?.map((d) => ({ name: d.name, criteria: d.criteria })) ?? [
      { name: '', criteria: '' },
    ]
  );

  const handleAddDimension = () => {
    setDimensions((prev) => [...prev, { name: '', criteria: '' }]);
  };

  const handleRemoveDimension = (index: number) => {
    setDimensions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDimensionChange = (index: number, field: keyof DimensionDraft, value: string) => {
    setDimensions((prev) =>
      prev.map((d, i) => (i === index ? { ...d, [field]: value } : d))
    );
  };

  const handleSubmit = () => {
    onSubmit({ name, description, scorer_type: scorerType, dimensions });
  };

  const isValid =
    name.trim() &&
    description.trim() &&
    dimensions.length > 0 &&
    dimensions.every((d) => d.name.trim() && d.criteria.trim());

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{initial ? 'Edit Score Definition' : 'New Score Definition'}</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2.5}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            placeholder="e.g. Architectural Clarity"
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
            multiline
            rows={2}
            placeholder="Describe what this score measures and how it should be interpreted."
          />

          <FormControl fullWidth>
            <InputLabel>Scorer Type</InputLabel>
            <Select
              value={scorerType}
              label="Scorer Type"
              onChange={(e) => setScorerType(e.target.value as ScorerType)}
            >
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="pm">Product Manager</MenuItem>
              <MenuItem value="engineering_lead">Engineering Lead</MenuItem>
            </Select>
          </FormControl>

          <Divider />

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="subtitle2">Dimensions</Typography>
              <Button startIcon={<AddIcon />} size="small" onClick={handleAddDimension}>
                Add Dimension
              </Button>
            </Box>

            <Stack spacing={2}>
              {dimensions.map((dim, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: 1.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    position: 'relative',
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                      label="Dimension Name"
                      value={dim.name}
                      onChange={(e) => handleDimensionChange(idx, 'name', e.target.value)}
                      size="small"
                      required
                      sx={{ flex: 1 }}
                      placeholder="e.g. Module Design"
                    />
                    {dimensions.length > 1 && (
                      <IconButton size="small" onClick={() => handleRemoveDimension(idx)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                  <TextField
                    label="Criteria"
                    value={dim.criteria}
                    onChange={(e) => handleDimensionChange(idx, 'criteria', e.target.value)}
                    size="small"
                    fullWidth
                    multiline
                    rows={2}
                    required
                    placeholder="Describe how this dimension should be scored in plain English."
                  />
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
        >
          {initial ? 'Save Changes' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
