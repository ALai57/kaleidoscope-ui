import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getAgentPersona } from '../../types/agent';
import type { Agent } from '../../types/agent';
import type { AdvisorScoreOutput, JudgeDecisionOutput, PendingInputsCodeContextPath, StepRun, StepRunStatus } from '../../types/workflow';
import MarkdownRenderer from '../content/MarkdownRenderer';
import { AdvisorReviewCard } from './AdvisorReviewCard';
import { CodeContextPathInput } from './CodeContextPathInput';
import { TeamLeadCard } from './TeamLeadCard';

// ── Content normalisation ─────────────────────────────────────────────────

function extractDisplayContent(content: string): string {
  try {
    const parsed = JSON.parse(content) as unknown;
    if (
      parsed !== null &&
      typeof parsed === 'object' &&
      'reply' in parsed &&
      typeof (parsed as Record<string, unknown>).reply === 'string'
    ) {
      return (parsed as { reply: string }).reply;
    }
  } catch {
    // Not JSON — use as-is.
  }
  return content;
}

function tryParseJson<T>(content: string): T | undefined {
  try {
    return JSON.parse(content) as T;
  } catch {
    return undefined;
  }
}

/**
 * Parse step output as a score result. Handles both the numeric backend format
 * {overall: number, dimensions: [{name, value, rationale}]} and the legacy
 * status-string format {overall_status, dimensions: [{name, status, rationale}]}.
 */
function parseScoreOutput(content: string | undefined): AdvisorScoreOutput | undefined {
  if (!content) return undefined;
  const raw = tryParseJson<Record<string, unknown>>(content);
  if (!raw || typeof raw !== 'object') return undefined;
  // If it looks like a score result (has `overall` or `overall_status`), return it.
  if (raw.overall !== undefined || raw.overall_status !== undefined) {
    return raw as unknown as AdvisorScoreOutput;
  }
  return undefined;
}

function renderContent(content: string): React.ReactNode {
  return <MarkdownRenderer content={extractDisplayContent(content)} />;
}

// ── Round grouping ────────────────────────────────────────────────────────

interface RoundGroup {
  roundId: string | null;
  steps: StepRun[];
}

/**
 * Group steps by round_id while preserving the order rounds were first seen.
 * Steps without a round_id (sequential steps) form their own group with roundId=null.
 */
function groupByRound(steps: StepRun[]): RoundGroup[] {
  const map = new Map<string | null, StepRun[]>();
  const order: Array<string | null> = [];

  for (const step of steps) {
    const key = step.round_id ?? null;
    if (!map.has(key)) {
      map.set(key, []);
      order.push(key);
    }
    map.get(key)!.push(step);
  }

  return order.map((roundId) => ({
    roundId,
    steps: (map.get(roundId) ?? []).sort((a, b) => a.position - b.position),
  }));
}

// ── Status icon ───────────────────────────────────────────────────────────

const StatusIcon: React.FC<{ status: StepRunStatus }> = ({ status }) => {
  switch (status) {
    case 'completed':
      return <CheckCircleIcon color="success" sx={{ fontSize: 20 }} />;
    case 'failed':
      return <ErrorIcon color="error" sx={{ fontSize: 20 }} />;
    case 'skipped':
      return <RemoveCircleOutlineIcon color="disabled" sx={{ fontSize: 20 }} />;
    case 'running':
      return <CircularProgress size={18} />;
    case 'awaiting_input':
      return <PauseCircleOutlineIcon color="warning" sx={{ fontSize: 20 }} />;
    default:
      return <RadioButtonUncheckedIcon color="disabled" sx={{ fontSize: 20 }} />;
  }
};

// ── Inline response form (used for legacy clarify steps) ──────────────────

interface ResponseFormProps {
  stepRun: StepRun;
  responding: boolean;
  onRespond: (stepRunId: string, answer: string) => void;
  onSkip: (stepRunId: string) => void;
}

const ResponseForm: React.FC<ResponseFormProps> = ({ stepRun, responding, onRespond, onSkip }) => {
  const [answer, setAnswer] = useState('');

  return (
    <Box sx={{ mt: 2 }}>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="caption" color="warning.main" fontWeight={600} sx={{ mb: 1, display: 'block' }}>
        Your input is needed to continue
      </Typography>
      <TextField
        multiline
        minRows={3}
        fullWidth
        size="small"
        placeholder="Type your answer here…"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={responding}
        sx={{ mb: 1.5 }}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => onRespond(stepRun.id, answer)}
          disabled={responding || answer.trim() === ''}
          startIcon={responding ? <CircularProgress size={14} /> : undefined}
        >
          Submit
        </Button>
        <Button
          variant="text"
          size="small"
          color="inherit"
          onClick={() => onSkip(stepRun.id)}
          disabled={responding}
          sx={{ color: 'text.secondary' }}
        >
          Skip
        </Button>
      </Box>
    </Box>
  );
};

// ── Main component ────────────────────────────────────────────────────────

interface WorkflowStepperProps {
  steps: StepRun[];
  streamingStepId?: string | null;
  streamingOutput?: string;
  agents?: Agent[];
  onRespond?: (stepRunId: string, answer: string) => void;
  onRespondMulti?: (stepRunId: string, answers: string[]) => void;
  onSkip?: (stepRunId: string) => void;
  respondingStepId?: string | null;
  /** ID of a task-gen step that is currently running (used by TeamLeadCard) */
  taskGenStepId?: string | null;
  /** Called when the user checks "Remember this path" in the code context path picker */
  onRememberPath?: ((path: string) => void) | undefined;
}

const WorkflowStepper: React.FC<WorkflowStepperProps> = ({
  steps,
  streamingStepId,
  streamingOutput,
  agents = [],
  onRespond,
  onRespondMulti,
  onSkip,
  respondingStepId,
  taskGenStepId,
  onRememberPath,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  if (steps.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No steps in this run.
      </Typography>
    );
  }

  const groups = groupByRound(steps);
  // Separate round groups from the sequential (null-round) group
  const roundGroups = groups.filter((g) => g.roundId !== null);
  const seqGroup = groups.find((g) => g.roundId === null);

  const renderStep = (step: StepRun) => {
    const isStreaming = step.id === streamingStepId;
    const currentOutput = isStreaming ? (streamingOutput ?? step.output) : step.output;
    const outputKind = step.output_kind;

    // ── Score step ──────────────────────────────────────────────────────
    if (outputKind === 'score') {
      // When the step is paused asking for a codebase path, show the picker instead.
      if (
        step.status === 'awaiting_input' &&
        step.pending_inputs?.kind === 'code_context_path'
      ) {
        return (
          <CodeContextPathInput
            key={step.id}
            stepRun={step}
            pendingInputs={step.pending_inputs as PendingInputsCodeContextPath}
            agents={agents}
            responding={respondingStepId === step.id}
            onRespond={(stepRunId, answers) => onRespondMulti?.(stepRunId, answers)}
            onSkip={onSkip ?? (() => undefined)}
            {...(onRememberPath ? { onRememberPath } : {})}
          />
        );
      }

      const scoreOutput = parseScoreOutput(currentOutput);
      return (
        <AdvisorReviewCard
          key={step.id}
          stepName={step.name}
          agentType={step.agent_type}
          stepStatus={isStreaming ? 'running' : step.status}
          scoreOutput={scoreOutput}
          streamingOutput={isStreaming ? (streamingOutput ?? '') : undefined}
          agents={agents}
          isStreaming={isStreaming}
        />
      );
    }

    // ── Decision step (team lead) ────────────────────────────────────────
    if (outputKind === 'decision') {
      const decisionOutput = currentOutput
        ? tryParseJson<JudgeDecisionOutput>(currentOutput)
        : undefined;

      const taskGenRunning = !!taskGenStepId && steps.some(
        (s) => s.id === taskGenStepId && (s.status === 'running' || s.id === streamingStepId)
      );

      return (
        <TeamLeadCard
          key={step.id}
          stepStatus={isStreaming ? 'running' : step.status}
          decisionOutput={decisionOutput}
          stepRunId={step.id}
          onRespond={(stepRunId, answers) => onRespondMulti?.(stepRunId, answers)}
          onSkip={onSkip}
          respondingStepId={respondingStepId}
          taskGenRunning={taskGenRunning}
          isStreaming={isStreaming}
        />
      );
    }

    // ── Generic step ────────────────────────────────────────────────────
    const isAwaitingInput = step.status === 'awaiting_input';
    const hasOutput = !!currentOutput;
    const isSkipped = step.status === 'skipped';

    const isExpanded = isAwaitingInput
      ? true
      : hasOutput && expanded === step.id;

    const persona = getAgentPersona(step.agent_type, agents);

    return (
      <Accordion
        key={step.id}
        expanded={isExpanded}
        onChange={(_, open) => {
          if (!isAwaitingInput) setExpanded(open ? step.id : false);
        }}
        disableGutters
        elevation={0}
        sx={{
          border: 1,
          borderColor: isAwaitingInput ? 'warning.main' : 'divider',
          mb: 0.5,
          borderRadius: 1,
          opacity: isSkipped ? 0.5 : 1,
          '&:before': { display: 'none' },
        }}
      >
        <AccordionSummary
          expandIcon={!isAwaitingInput && hasOutput ? <ExpandMoreIcon /> : null}
          sx={{
            cursor: !isAwaitingInput && hasOutput ? 'pointer' : 'default',
            '& .MuiAccordionSummary-expandIconWrapper': {
              visibility: !isAwaitingInput && hasOutput ? 'visible' : 'hidden',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
            <StatusIcon status={isStreaming ? 'running' : step.status} />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                flex: 1,
                textDecoration: isSkipped ? 'line-through' : 'none',
                color: isSkipped ? 'text.disabled' : 'text.primary',
              }}
            >
              {step.name}
            </Typography>
            {step.is_custom && (
              <Chip label="Custom" size="small" variant="outlined" color="secondary" />
            )}
            {isStreaming && (
              <Typography variant="caption" color="primary.main">
                Running…
              </Typography>
            )}
            {isAwaitingInput && (
              <Chip label="Needs your input" size="small" color="warning" />
            )}
            {step.status === 'skipped' && (
              <Typography variant="caption" color="text.disabled">
                Skipped
              </Typography>
            )}
            <Tooltip title={persona.name} placement="left">
              <Box
                sx={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  bgcolor: persona.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  flexShrink: 0,
                }}
              >
                {persona.avatar}
              </Box>
            </Tooltip>
          </Box>
        </AccordionSummary>

        {(hasOutput || isAwaitingInput) && (
          <AccordionDetails sx={{ pt: 0 }}>
            <Box sx={{ p: 1.5, maxHeight: isAwaitingInput ? 'none' : 400, overflowY: 'auto' }}>
              {hasOutput && renderContent(currentOutput!)}
              {isAwaitingInput && onRespond && onSkip && (
                <ResponseForm
                  stepRun={step}
                  responding={respondingStepId === step.id}
                  onRespond={onRespond}
                  onSkip={onSkip}
                />
              )}
            </Box>
          </AccordionDetails>
        )}
      </Accordion>
    );
  };

  // Determine which round is "current" (has running or awaiting_input steps)
  const currentRoundIdx = (() => {
    for (let i = roundGroups.length - 1; i >= 0; i--) {
      const g = roundGroups[i];
      if (g && g.steps.some((s) => s.status === 'running' || s.status === 'awaiting_input' || s.status === 'pending')) {
        return i;
      }
    }
    return roundGroups.length - 1;
  })();

  const olderGroups = roundGroups.slice(0, currentRoundIdx);
  const currentGroup = roundGroups[currentRoundIdx];

  return (
    <Box>
      {/* Older iterations — collapsed by default when there are multiple rounds */}
      {olderGroups.length > 0 && (
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            mb: 1.5,
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Older iterations
              </Typography>
              <Chip
                label={olderGroups.length}
                size="small"
                variant="outlined"
                sx={{ height: 18, fontSize: '0.65rem' }}
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0, px: 1.5, pb: 1.5 }}>
            {olderGroups.map((group, idx) => (
              <Box key={group.roundId} sx={{ mb: idx < olderGroups.length - 1 ? 1.5 : 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                  <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1 }}>
                    Round {idx + 1}
                  </Typography>
                  <CheckCircleIcon sx={{ fontSize: 14, color: 'success.main' }} />
                </Box>
                {group.steps.map(renderStep)}
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      )}

      {/* Current (most recent) round */}
      {currentGroup && (
        <Box sx={{ mb: roundGroups.length > 1 || (seqGroup && seqGroup.steps.length > 0) ? 1.5 : 0 }}>
          {roundGroups.length > 1 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
              <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1 }}>
                Round {currentRoundIdx + 1}
              </Typography>
            </Box>
          )}
          {currentGroup.steps.map(renderStep)}
        </Box>
      )}

      {/* Sequential steps (Generate Tasks, etc.) */}
      {seqGroup && seqGroup.steps.length > 0 && (
        <Box sx={{ mt: roundGroups.length > 0 ? 0 : 0 }}>
          {roundGroups.length > 0 && (
            <Divider sx={{ mb: 1.5 }}>
              <Typography variant="overline" color="text.secondary">
                Next steps
              </Typography>
            </Divider>
          )}
          {seqGroup.steps.map(renderStep)}
        </Box>
      )}
    </Box>
  );
};

export default WorkflowStepper;
