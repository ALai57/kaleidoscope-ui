import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { getAgentPersona } from '../../types/agent';
import type { Agent } from '../../types/agent';
import type { PendingInputsCodeContextPath, StepRun } from '../../types/workflow';

// Sentinel value used in the radio group when the user selects manual entry
const MANUAL_VALUE = '__manual__';

interface CodeContextPathInputProps {
  stepRun: StepRun;
  pendingInputs: PendingInputsCodeContextPath;
  agents: Agent[];
  responding: boolean;
  onRespond: (stepRunId: string, answers: string[]) => void;
  onSkip: (stepRunId: string) => void;
  onRememberPath?: ((path: string) => void) | undefined;
}

export const CodeContextPathInput: React.FC<CodeContextPathInputProps> = ({
  stepRun,
  pendingInputs,
  agents,
  responding,
  onRespond,
  onSkip,
  onRememberPath,
}) => {
  const persona = getAgentPersona(stepRun.agent_type, agents);

  const defaultSelected =
    pendingInputs.candidates.length > 0
      ? (pendingInputs.candidates[0]?.path ?? MANUAL_VALUE)
      : MANUAL_VALUE;

  const [selected, setSelected] = useState<string>(defaultSelected);
  const [manualPath, setManualPath] = useState('');
  const [remember, setRemember] = useState(false);

  const isManual = selected === MANUAL_VALUE;
  const effectivePath = isManual ? manualPath.trim() : selected;
  const canSubmit = !!effectivePath;

  const handleSubmit = () => {
    if (!effectivePath) return;
    if (remember && onRememberPath) {
      onRememberPath(effectivePath);
    }
    onRespond(stepRun.id, [effectivePath]);
  };

  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'warning.main',
        borderRadius: 1,
        mb: 0.5,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 1.5,
          py: 1,
          bgcolor: 'action.hover',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tooltip title={persona.name} placement="left">
          <Box
            sx={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              bgcolor: persona.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              flexShrink: 0,
            }}
          >
            {persona.avatar}
          </Box>
        </Tooltip>

        <Typography variant="body2" sx={{ fontWeight: 600, flex: 1 }}>
          {stepRun.name}
        </Typography>

        <Chip label="Needs your input" size="small" color="warning" />
      </Box>

      {/* Body */}
      <Box sx={{ px: 1.5, py: 1.5 }}>
        <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500 }}>
          {pendingInputs.question}
        </Typography>

        <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)}>
          {pendingInputs.candidates.map((candidate) => (
            <FormControlLabel
              key={candidate.path}
              value={candidate.path}
              control={<Radio size="small" disabled={responding} />}
              label={
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: 'monospace', fontSize: '0.8rem', wordBreak: 'break-all' }}
                  >
                    {candidate.path}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {candidate.reason}
                  </Typography>
                </Box>
              }
              sx={{
                mb: 0.5,
                alignItems: 'flex-start',
                '& .MuiRadio-root': { mt: 0.25 },
              }}
            />
          ))}

          <FormControlLabel
            value={MANUAL_VALUE}
            control={<Radio size="small" disabled={responding} />}
            label={
              <Typography variant="body2" color="text.secondary">
                Enter a path manually…
              </Typography>
            }
            sx={{ mb: isManual ? 0.5 : 0 }}
          />
        </RadioGroup>

        {isManual && (
          <TextField
            size="small"
            fullWidth
            placeholder="/path/to/your/codebase"
            value={manualPath}
            onChange={(e) => setManualPath(e.target.value)}
            disabled={responding}
            autoFocus
            sx={{
              mt: 0.25,
              mb: 0.5,
              '& input': { fontFamily: 'monospace', fontSize: '0.85rem' },
            }}
          />
        )}

        <Divider sx={{ my: 1.5 }} />

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleSubmit}
            disabled={responding || !canSubmit}
            startIcon={responding ? <CircularProgress size={14} /> : undefined}
          >
            Use this path
          </Button>
          <Button
            variant="text"
            size="small"
            color="inherit"
            onClick={() => onSkip(stepRun.id)}
            disabled={responding}
            sx={{ color: 'text.secondary' }}
          >
            Skip code review
          </Button>
        </Stack>

        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={responding}
            />
          }
          label={
            <Typography variant="caption" color="text.secondary">
              Remember this path for this project
            </Typography>
          }
        />
      </Box>
    </Box>
  );
};

export default CodeContextPathInput;
