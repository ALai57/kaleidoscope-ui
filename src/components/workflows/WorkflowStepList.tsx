import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
      {/* Step cards */}
      {steps.map((step, index) => (
        <Box
          key={index}
          sx={{ display: 'flex', gap: 0, mb: 0 }}
        >
          {/* Timeline track */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, flexShrink: 0 }}>
            {/* Number badge */}
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.72rem',
                fontWeight: 700,
                flexShrink: 0,
                mt: '14px',
              }}
            >
              {index + 1}
            </Box>
            {/* Connector line */}
            {index < steps.length - 1 && (
              <Box
                sx={{
                  width: 2,
                  flex: 1,
                  minHeight: 16,
                  bgcolor: 'divider',
                  my: 0.5,
                }}
              />
            )}
          </Box>

          {/* Card */}
          <Box
            sx={{
              flex: 1,
              mb: index < steps.length - 1 ? 0 : 2,
              pb: index < steps.length - 1 ? 2 : 0,
              pt: '8px',
            }}
          >
            <Box
              sx={{
                border: 1,
                borderColor: 'divider',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                '&:focus-within': {
                  borderColor: 'primary.main',
                  boxShadow: '0 0 0 2px rgba(99,102,241,0.08)',
                },
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
            >
              {/* Card header row: step name + controls */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  px: 1.5,
                  pt: 1,
                  pb: 0.5,
                  gap: 0.5,
                }}
              >
                <InputBase
                  value={step.name}
                  onChange={(e) => updateStep(index, 'name', e.target.value)}
                  placeholder="Step name…"
                  fullWidth
                  sx={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    '& input': { p: 0 },
                  }}
                />
                <Tooltip title="Move up">
                  <span>
                    <IconButton
                      size="small"
                      onClick={() => moveStep(index, 'up')}
                      disabled={index === 0}
                      sx={{ opacity: index === 0 ? 0.25 : 0.5, '&:hover': { opacity: 1 } }}
                    >
                      <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Move down">
                  <span>
                    <IconButton
                      size="small"
                      onClick={() => moveStep(index, 'down')}
                      disabled={index === steps.length - 1}
                      sx={{ opacity: index === steps.length - 1 ? 0.25 : 0.5, '&:hover': { opacity: 1 } }}
                    >
                      <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Remove step">
                  <IconButton
                    size="small"
                    onClick={() => removeStep(index)}
                    sx={{ opacity: 0.4, '&:hover': { opacity: 1, color: 'error.main' } }}
                  >
                    <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Divider */}
              <Box sx={{ mx: 1.5, borderTop: 1, borderColor: 'divider' }} />

              {/* Instructions */}
              <InputBase
                value={step.description}
                onChange={(e) => updateStep(index, 'description', e.target.value)}
                placeholder="What should the agent do? (sent verbatim)"
                fullWidth
                multiline
                minRows={2}
                sx={{
                  px: 1.5,
                  py: 1,
                  fontSize: '0.82rem',
                  color: 'text.secondary',
                  alignItems: 'flex-start',
                  '& textarea': { p: 0, lineHeight: 1.55 },
                }}
              />
            </Box>
          </Box>
        </Box>
      ))}

      {/* Empty state */}
      {steps.length === 0 && (
        <Box
          sx={{
            border: 2,
            borderStyle: 'dashed',
            borderColor: 'divider',
            borderRadius: 2,
            py: 4,
            mb: 2,
            textAlign: 'center',
            color: 'text.disabled',
          }}
        >
          <Typography variant="body2">No steps yet</Typography>
          <Typography variant="caption">Add the first step to define this workflow</Typography>
        </Box>
      )}

      {/* Add step */}
      <Button
        size="small"
        startIcon={<AddIcon />}
        onClick={addStep}
        sx={{
          color: 'text.secondary',
          borderStyle: 'dashed',
          '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
        }}
        variant="outlined"
      >
        Add step
      </Button>
    </Box>
  );
};

export default WorkflowStepList;
