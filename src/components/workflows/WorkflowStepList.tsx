import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import type { WorkflowStepInput } from '../../api/workflows';

interface WorkflowStepListProps {
  steps: WorkflowStepInput[];
  onChange: (steps: WorkflowStepInput[]) => void;
}

const WorkflowStepList: React.FC<WorkflowStepListProps> = ({ steps, onChange }) => {
  const addStep = () => {
    onChange([...steps, { name: '', description: '', position: steps.length }]);
  };

  const removeStep = (index: number) => {
    const updated = steps.filter((_, i) => i !== index).map((s, i) => ({ ...s, position: i }));
    onChange(updated);
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= steps.length) return;
    const updated = [...steps];
    const a = updated[index]!;
    const b = updated[swapIndex]!;
    updated[index] = b;
    updated[swapIndex] = a;
    onChange(updated.map((s, i) => ({ ...s, position: i })));
  };

  const updateStep = (index: number, field: keyof WorkflowStepInput, value: string | number) => {
    const updated = steps.map((s, i) => (i === index ? { ...s, [field]: value } : s));
    onChange(updated);
  };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Steps
      </Typography>

      {steps.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          No steps yet. Add the first step below.
        </Typography>
      )}

      {steps.map((step, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            gap: 1,
            mb: 1.5,
            alignItems: 'flex-start',
            p: 1.5,
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              mt: 1.5,
              minWidth: 20,
              textAlign: 'center',
              color: 'text.disabled',
              fontWeight: 700,
            }}
          >
            {index + 1}
          </Typography>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              label="Step name"
              value={step.name}
              onChange={(e) => updateStep(index, 'name', e.target.value)}
              size="small"
              fullWidth
              placeholder="e.g. Evaluate product idea"
            />
            <TextField
              label="Instructions (sent verbatim to agent)"
              value={step.description}
              onChange={(e) => updateStep(index, 'description', e.target.value)}
              size="small"
              fullWidth
              multiline
              rows={2}
              placeholder="Describe what the agent should do…"
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
            <IconButton
              size="small"
              onClick={() => moveStep(index, 'up')}
              disabled={index === 0}
              aria-label="Move step up"
            >
              <ArrowUpwardIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => moveStep(index, 'down')}
              disabled={index === steps.length - 1}
              aria-label="Move step down"
            >
              <ArrowDownwardIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => removeStep(index)}
              aria-label="Remove step"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ))}

      <Button size="small" startIcon={<AddIcon />} onClick={addStep} variant="outlined">
        Add step
      </Button>
    </Box>
  );
};

export default WorkflowStepList;
