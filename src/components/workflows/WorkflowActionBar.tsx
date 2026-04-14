import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import AddTaskIcon from '@mui/icons-material/AddTask';
import type { RunMode, WorkflowRun } from '../../types/workflow';

interface WorkflowActionBarProps {
  run: WorkflowRun;
  isStreaming: boolean;
  onAdvance: () => void;
  onSkip: () => void;
  onCustomAction: () => void;
  onModeChange: (mode: RunMode) => void;
  advancing: boolean;
  skipping: boolean;
  changingMode: boolean;
}

const WorkflowActionBar: React.FC<WorkflowActionBarProps> = ({
  run,
  isStreaming,
  onAdvance,
  onSkip,
  onCustomAction,
  onModeChange,
  advancing,
  skipping,
  changingMode,
}) => {
  const isComplete = run.status === 'completed' || run.status === 'failed';
  const isAwaitingInput = run.status === 'awaiting_input';
  const currentStepRun = run.steps.find((s) => s.position === run.current_step);
  const hasNextStep = run.current_step < run.steps.length;
  const isManual = run.mode === 'manual';
  const busy = isStreaming || advancing || skipping;

  if (isComplete) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mt: 2,
        pt: 1.5,
        borderTop: 1,
        borderColor: 'divider',
        flexWrap: 'wrap',
      }}
    >
      {/* Advance — only in manual mode with a pending step, not while awaiting input */}
      {isManual && hasNextStep && !isAwaitingInput && (
        <Tooltip title="Execute the next workflow step">
          <span>
            <Button
              variant="contained"
              size="small"
              startIcon={advancing ? <CircularProgress size={14} /> : <PlayArrowIcon />}
              onClick={onAdvance}
              disabled={busy}
            >
              Advance
            </Button>
          </span>
        </Tooltip>
      )}

      {/* Awaiting input hint — replaces Advance/Skip */}
      {isAwaitingInput && (
        <Typography variant="caption" color="warning.main" sx={{ fontStyle: 'italic' }}>
          Respond to the step above to continue
        </Typography>
      )}

      {/* Skip — only for pending steps, not awaiting_input (skip lives inline in the stepper) */}
      {!isAwaitingInput && currentStepRun && currentStepRun.status === 'pending' && (
        <Tooltip title="Skip this step">
          <span>
            <Button
              variant="outlined"
              size="small"
              startIcon={skipping ? <CircularProgress size={14} /> : <SkipNextIcon />}
              onClick={onSkip}
              disabled={busy}
            >
              Skip
            </Button>
          </span>
        </Tooltip>
      )}

      {/* Custom action */}
      <Tooltip title="Run a custom ad-hoc action">
        <span>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddTaskIcon />}
            onClick={onCustomAction}
            disabled={busy}
          >
            Custom Action
          </Button>
        </span>
      </Tooltip>

      {/* Mode toggle */}
      <Box sx={{ ml: 'auto' }}>
        <ToggleButtonGroup
          value={run.mode}
          exclusive
          size="small"
          onChange={(_, v: RunMode | null) => {
            if (v && v !== run.mode) onModeChange(v);
          }}
          disabled={changingMode || busy}
        >
          <ToggleButton value="manual">Manual</ToggleButton>
          <ToggleButton value="autonomous">Autonomous</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

export default WorkflowActionBar;
