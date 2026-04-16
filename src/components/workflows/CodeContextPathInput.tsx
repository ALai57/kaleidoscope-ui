import React, { useState } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { getAgentPersona } from '../../types/agent';
import type { Agent } from '../../types/agent';
import type { CodeContextPathCandidate, PendingInputsCodeContextPath, StepRun } from '../../types/workflow';

// ── Path helper ────────────────────────────────────────────────────────────

function pathBasename(p: string): string {
  const trimmed = p.replace(/\/+$/, '');
  return trimmed.split('/').pop() || trimmed;
}

// ── Option type (candidates + ad-hoc paths) ────────────────────────────────

interface PathOption {
  path: string;
  reason?: string;
  /** True when the user typed a custom path not in the candidate list */
  isCustom?: boolean;
}

const filter = createFilterOptions<PathOption>();

// ── Component ──────────────────────────────────────────────────────────────

interface CodeContextPathInputProps {
  stepRun: StepRun;
  pendingInputs: PendingInputsCodeContextPath;
  agents: Agent[];
  responding: boolean;
  onRespond: (stepRunId: string, answers: string[]) => void;
  onSkip: (stepRunId: string) => void;
  onRememberPath?: ((paths: string[]) => void) | undefined;
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

  // Pre-build the options list from candidates
  const candidateOptions: PathOption[] = pendingInputs.candidates.map(
    (c: CodeContextPathCandidate) => ({ path: c.path, reason: c.reason })
  );

  // Default: top-ranked candidate pre-selected
  const defaultSelected: PathOption[] = candidateOptions.length > 0 ? [candidateOptions[0]!] : [];
  const [selected, setSelected] = useState<PathOption[]>(defaultSelected);
  const [remember, setRemember] = useState(false);

  const selectedPaths = selected.map((o) => o.path);
  const canSubmit = selectedPaths.length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    if (remember && onRememberPath) {
      onRememberPath(selectedPaths);
    }
    onRespond(stepRun.id, selectedPaths);
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

        <Autocomplete<PathOption, true, false, true>
          multiple
          freeSolo
          size="small"
          disableCloseOnSelect
          options={candidateOptions}
          value={selected}
          disabled={responding}
          onChange={(_, newValue) => {
            // newValue elements can be string (freeSolo typed entry) or PathOption
            const normalised: PathOption[] = newValue.map((v) =>
              typeof v === 'string'
                ? { path: v, isCustom: true }
                : v.isCustom
                ? v
                : v
            );
            setSelected(normalised);
          }}
          // Allow typing a path not in the list — show an "Add …" option
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            const inputValue = params.inputValue.trim();
            if (
              inputValue !== '' &&
              !options.some((o) => o.path === inputValue)
            ) {
              filtered.push({ path: inputValue, isCustom: true });
            }
            return filtered;
          }}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.path
          }
          isOptionEqualToValue={(option, value) => option.path === value.path}
          renderTags={(tagValues, getTagProps) =>
            tagValues.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Tooltip key={key} title={option.path} placement="top">
                  <Chip
                    {...tagProps}
                    icon={<FolderOpenIcon sx={{ fontSize: 14 }} />}
                    label={
                      <Typography component="span" sx={{ fontFamily: 'monospace', fontSize: '0.72rem' }}>
                        {pathBasename(option.path)}
                      </Typography>
                    }
                    size="small"
                    sx={{ maxWidth: 240, '& .MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis' } }}
                  />
                </Tooltip>
              );
            })
          }
          renderOption={(props, option) => {
            const { key, ...optionProps } = props as React.HTMLAttributes<HTMLLIElement> & { key: React.Key };
            return (
              <li key={key} {...optionProps}>
                <Box sx={{ py: 0.25 }}>
                  <Typography sx={{ fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: 1.4 }}>
                    {option.isCustom ? `Add "${option.path}"` : option.path}
                  </Typography>
                  {option.reason && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.3 }}>
                      {option.reason}
                    </Typography>
                  )}
                </Box>
              </li>
            );
          }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          renderInput={(params) => (
            <TextField
              {...(params as any)}
              placeholder={selected.length === 0 ? 'Select or type a repository path…' : ''}
            />
          )}
        />

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5, mb: 1.5 }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleSubmit}
            disabled={responding || !canSubmit}
            startIcon={responding ? <CircularProgress size={14} /> : undefined}
          >
            {selectedPaths.length > 1
              ? `Review ${selectedPaths.length} repos`
              : 'Review selected repo'}
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
              Remember {selectedPaths.length > 1 ? 'these paths' : 'this path'} for this project
            </Typography>
          }
        />
      </Box>
    </Box>
  );
};

export default CodeContextPathInput;
