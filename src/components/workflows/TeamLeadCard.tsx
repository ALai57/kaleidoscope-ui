import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import type {
  JudgeDecisionOutput,
  StepRunStatus,
} from '../../types/workflow';

// ── Refine variant ────────────────────────────────────────────────────────

const RefineBody: React.FC<{ decision: { action: 'refine'; agent_to_refine: string; summary: string; rationale: string } }> = ({ decision }) => (
  <Box>
    <Typography variant="body2" sx={{ mb: 1 }}>
      {decision.summary}
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
      {decision.rationale}
    </Typography>
  </Box>
);

// ── Clarify variant ───────────────────────────────────────────────────────

interface ClarifyBodyProps {
  decision: { action: 'clarify'; questions: string[]; summary: string; rationale: string };
  /** True once the user has submitted answers and the step is now completed */
  submitted: boolean;
  onRespond: (answers: string[]) => void;
  responding: boolean;
  onSkip: () => void;
}

const ClarifyBody: React.FC<ClarifyBodyProps> = ({ decision, submitted, onRespond, responding, onSkip }) => {
  const [answers, setAnswers] = useState<string[]>(
    () => decision.questions.map(() => '')
  );

  const allAnswered = answers.every((a) => a.trim() !== '');

  const handleChange = (idx: number, value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  // Show confirmation once submitted
  if (submitted) {
    return (
      <Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {decision.summary}
        </Typography>
        <Divider sx={{ my: 1.5 }} />
        <Stack direction="row" spacing={1} alignItems="center">
          <ReplayIcon sx={{ fontSize: 16, color: 'primary.main' }} />
          <Typography variant="caption" color="primary.main" fontWeight={600}>
            Answers submitted — team is reviewing again…
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {decision.summary}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
        {decision.rationale}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="caption" color="warning.main" fontWeight={600} sx={{ mb: 1.5, display: 'block' }}>
        Your input is needed to continue
      </Typography>

      <Stack spacing={2}>
        {decision.questions.map((question, idx) => (
          <Box key={idx}>
            <Typography variant="body2" sx={{ mb: 0.75, fontWeight: 500 }}>
              {question}
            </Typography>
            <TextField
              multiline
              minRows={2}
              fullWidth
              size="small"
              placeholder="Your answer…"
              value={answers[idx]}
              onChange={(e) => handleChange(idx, e.target.value)}
              disabled={responding}
            />
          </Box>
        ))}
      </Stack>

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2 }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => onRespond(answers)}
          disabled={responding || !allAnswered}
          startIcon={responding ? <CircularProgress size={14} /> : undefined}
        >
          Submit
        </Button>
        <Button
          variant="text"
          size="small"
          color="inherit"
          onClick={onSkip}
          disabled={responding}
          sx={{ color: 'text.secondary' }}
        >
          Skip
        </Button>
      </Box>
    </Box>
  );
};

// ── Proceed variant ───────────────────────────────────────────────────────

interface ProceedBodyProps {
  decision: { action: 'proceed'; unresolved?: string[]; summary: string; rationale: string };
  taskGenRunning: boolean;
}

const ProceedBody: React.FC<ProceedBodyProps> = ({ decision, taskGenRunning }) => (
  <Box>
    <Typography variant="body2" sx={{ mb: 1 }}>
      {decision.summary}
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
      {decision.rationale}
    </Typography>

    {decision.unresolved && decision.unresolved.length > 0 && (
      <Alert severity="info" sx={{ mb: 1.5, py: 0.5 }}>
        <Typography variant="caption">
          The following gaps could not be fully resolved and will appear as investigation tasks:{' '}
          <strong>{decision.unresolved.join(', ')}</strong>
        </Typography>
      </Alert>
    )}

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {taskGenRunning ? (
        <>
          <CircularProgress size={14} />
          <Typography variant="caption" color="primary.main">
            Generating task list…
          </Typography>
        </>
      ) : (
        <>
          <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
          <Typography variant="caption" color="success.main">
            Task list generated
          </Typography>
        </>
      )}
    </Box>
  </Box>
);

// ── Main component ────────────────────────────────────────────────────────

interface TeamLeadCardProps {
  stepStatus: StepRunStatus;
  /** Parsed decision output. Undefined while running. */
  decisionOutput?: JudgeDecisionOutput | undefined;
  /** Called when user submits answers to a clarify action */
  onRespond?: ((stepRunId: string, answers: string[]) => void) | undefined;
  stepRunId: string;
  respondingStepId?: string | null | undefined;
  onSkip?: ((stepRunId: string) => void) | undefined;
  /** True when the task-gen step that follows is currently running */
  taskGenRunning?: boolean;
  isStreaming?: boolean;
}

const ACTION_ICON: Record<string, React.ReactNode> = {
  refine: <AutoFixHighIcon sx={{ fontSize: 16 }} />,
  clarify: <HelpOutlineIcon sx={{ fontSize: 16 }} />,
  proceed: <CheckCircleIcon sx={{ fontSize: 16 }} />,
};

const ACTION_LABEL: Record<string, string> = {
  refine: 'Refining brief',
  clarify: 'Waiting for your input',
  proceed: 'Proceeding to tasks',
};

const ACTION_COLOR: Record<string, string> = {
  refine: 'info.main',
  clarify: 'warning.main',
  proceed: 'success.main',
};

export const TeamLeadCard: React.FC<TeamLeadCardProps> = ({
  stepStatus,
  decisionOutput,
  onRespond,
  stepRunId,
  respondingStepId,
  onSkip,
  taskGenRunning = false,
  isStreaming = false,
}) => {
  const isRunning = isStreaming || stepStatus === 'running';
  const action = decisionOutput?.action;

  return (
    <Box
      sx={{
        border: 2,
        borderColor: action === 'clarify' && stepStatus === 'awaiting_input'
          ? 'warning.main'
          : action === 'proceed'
            ? 'success.main'
            : isRunning
              ? 'primary.main'
              : 'divider',
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
          gap: 1,
          px: 1.5,
          py: 1,
          bgcolor: 'action.hover',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 700, flex: 1 }}>
          Team Lead
        </Typography>

        {isRunning && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <CircularProgress size={14} />
            <Typography variant="caption" color="primary.main">
              Reviewing…
            </Typography>
          </Stack>
        )}

        {!isRunning && action && (
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: ACTION_COLOR[action] }}>
            {ACTION_ICON[action]}
            <Typography variant="caption" sx={{ color: ACTION_COLOR[action], fontWeight: 600 }}>
              {ACTION_LABEL[action]}
            </Typography>
          </Stack>
        )}
      </Box>

      {/* Body */}
      {!isRunning && decisionOutput && (
        <Box sx={{ px: 1.5, py: 1.25 }}>
          {decisionOutput.action === 'refine' && (
            <RefineBody decision={decisionOutput} />
          )}

          {decisionOutput.action === 'clarify' && (
            <ClarifyBody
              decision={decisionOutput}
              submitted={stepStatus === 'completed'}
              onRespond={(answers) => onRespond?.(stepRunId, answers)}
              responding={respondingStepId === stepRunId}
              onSkip={() => onSkip?.(stepRunId)}
            />
          )}

          {decisionOutput.action === 'proceed' && (
            <ProceedBody
              decision={decisionOutput}
              taskGenRunning={taskGenRunning}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default TeamLeadCard;
