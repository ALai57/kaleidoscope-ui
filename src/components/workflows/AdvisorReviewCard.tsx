import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import BlockIcon from '@mui/icons-material/Block';
import { getAgentPersona } from '../../types/agent';
import type { Agent } from '../../types/agent';
import type { AdvisorScoreOutput, AdvisorStatus, StepRunStatus } from '../../types/workflow';

// ── Score helpers ─────────────────────────────────────────────────────────

function valueToStatus(v: number): AdvisorStatus {
  if (v >= 7) return 'clear';
  if (v >= 5) return 'needs_work';
  return 'blocked';
}

function resolveStatus(dim: { value?: number; status?: AdvisorStatus }): AdvisorStatus {
  if (dim.status) return dim.status;
  if (dim.value !== undefined) return valueToStatus(dim.value);
  return 'needs_work';
}

function resolveOverallStatus(output: AdvisorScoreOutput): AdvisorStatus | undefined {
  if (output.overall_status) return output.overall_status;
  if (output.overall !== undefined) return valueToStatus(output.overall);
  return undefined;
}

const STATUS_LABELS: Record<AdvisorStatus, string> = {
  clear: 'Clear',
  needs_work: 'Needs work',
  blocked: 'Blocked',
};

const STATUS_CHIP_COLOR: Record<AdvisorStatus, 'success' | 'warning' | 'error'> = {
  clear: 'success',
  needs_work: 'warning',
  blocked: 'error',
};

const DimensionStatusIcon: React.FC<{ status: AdvisorStatus }> = ({ status }) => {
  switch (status) {
    case 'clear':
      return <CheckCircleIcon sx={{ fontSize: 14, color: 'success.main', flexShrink: 0 }} />;
    case 'needs_work':
      return <WarningAmberIcon sx={{ fontSize: 14, color: 'warning.main', flexShrink: 0 }} />;
    case 'blocked':
      return <BlockIcon sx={{ fontSize: 14, color: 'error.main', flexShrink: 0 }} />;
  }
};

// ── Dimension row ─────────────────────────────────────────────────────────

interface DimensionRowProps {
  name: string;
  value?: number | undefined;
  status: AdvisorStatus;
  rationale: string;
}

const DimensionRow: React.FC<DimensionRowProps> = ({ name, value, status, rationale }) => (
  <Box
    sx={{
      display: 'flex',
      gap: 1,
      py: 0.75,
      borderBottom: 1,
      borderColor: 'divider',
      '&:last-child': { borderBottom: 0 },
    }}
  >
    <Box sx={{ pt: 0.2 }}>
      <DimensionStatusIcon status={status} />
    </Box>
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {name}
        </Typography>
        {value !== undefined ? (
          <Typography
            variant="caption"
            sx={{
              color: status === 'clear' ? 'success.main' : status === 'blocked' ? 'error.main' : 'warning.main',
              fontWeight: 600,
            }}
          >
            {value.toFixed(1)} / 10
          </Typography>
        ) : (
          <Typography variant="caption" color="text.secondary">
            {STATUS_LABELS[status]}
          </Typography>
        )}
      </Box>
      {rationale && status !== 'clear' && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
          {rationale}
        </Typography>
      )}
    </Box>
  </Box>
);

// ── Main component ────────────────────────────────────────────────────────

interface AdvisorReviewCardProps {
  stepName: string;
  agentType: string;
  stepStatus: StepRunStatus;
  scoreOutput?: AdvisorScoreOutput | undefined;
  streamingOutput?: string | undefined;
  agents?: Agent[];
  isStreaming?: boolean;
}

export const AdvisorReviewCard: React.FC<AdvisorReviewCardProps> = ({
  stepName,
  agentType,
  stepStatus,
  scoreOutput,
  agents = [],
  isStreaming = false,
}) => {
  const persona = getAgentPersona(agentType, agents);
  const isRunning = isStreaming || stepStatus === 'running';
  const isFailed = stepStatus === 'failed' || scoreOutput?.failed;

  const overallStatus = scoreOutput ? resolveOverallStatus(scoreOutput) : undefined;

  return (
    <Box
      sx={{
        border: 1,
        borderColor: isFailed ? 'error.main' : isRunning ? 'primary.main' : 'divider',
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
          borderBottom: scoreOutput ? 1 : 0,
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

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {stepName}
          </Typography>
          {!isRunning && scoreOutput?.context_path && (
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              Reviewed with {scoreOutput.context_path}
            </Typography>
          )}
        </Box>

        {isRunning && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <CircularProgress size={14} />
            <Typography variant="caption" color="primary.main">
              Reviewing…
            </Typography>
          </Stack>
        )}
        {!isRunning && isFailed && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <ErrorIcon color="error" sx={{ fontSize: 16 }} />
            <Typography variant="caption" color="error.main">
              Could not complete review
            </Typography>
          </Stack>
        )}
        {!isRunning && !isFailed && scoreOutput?.overall !== undefined && (
          <Chip
            label={`${scoreOutput.overall.toFixed(1)} / 10`}
            size="small"
            color={overallStatus ? STATUS_CHIP_COLOR[overallStatus] : 'default'}
            variant="filled"
          />
        )}
        {!isRunning && !isFailed && overallStatus && scoreOutput?.overall === undefined && (
          <Chip
            label={STATUS_LABELS[overallStatus]}
            size="small"
            color={STATUS_CHIP_COLOR[overallStatus]}
            variant="filled"
          />
        )}
      </Box>

      {/* Body */}
      {!isRunning && (
        <Box sx={{ px: 1.5, py: 1 }}>
          {isFailed && (
            <Typography variant="caption" color="text.secondary">
              {scoreOutput?.reason
                ? `Reason: ${scoreOutput.reason}`
                : 'The review could not be completed. This domain will be treated as uncertain.'}
            </Typography>
          )}

          {!isFailed && scoreOutput && scoreOutput.dimensions.length > 0 && (
            <Box>
              {scoreOutput.dimensions.map((dim) => {
                const status = resolveStatus(dim);
                return (
                  <DimensionRow
                    key={dim.name}
                    name={dim.name}
                    value={dim.value}
                    status={status}
                    rationale={dim.rationale}
                  />
                );
              })}
            </Box>
          )}

          {!isFailed && scoreOutput && scoreOutput.dimensions.length === 0 && (
            <Typography variant="caption" color="text.secondary">
              No dimension breakdown available.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AdvisorReviewCard;
