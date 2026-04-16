import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HistoryIcon from '@mui/icons-material/History';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
  advanceRun,
  skipStep,
  respondToStep,
  runCustomStep,
  updateRunMode,
  getWorkflowRun,
  getWorkflowRuns,
  startWorkflowRun,
  getWorkflowRecommendation,
  streamWorkflowRun,
  getProjectBriefs,
} from '../../api/workflows';
import { updateProjectLocalPaths } from '../../api/projects';
import { getAgents } from '../../api/agents';
import WorkflowStepper from './WorkflowStepper';
import WorkflowActionBar from './WorkflowActionBar';
import WorkflowRecommendationBanner from './WorkflowRecommendationBanner';
import CustomStepDialog from './CustomStepDialog';
import { ScrutinySelector } from './ScrutinySelector';
import { BriefChangeIndicator } from './BriefChangeIndicator';
import { RoundsTimeline } from './RoundsTimeline';
import type { Agent } from '../../types/agent';
import type { RunMode, ScrutinyLevel, WorkflowRun, WorkflowRecommendation, ProjectBrief } from '../../types/workflow';

// ── Helpers ────────────────────────────────────────────────────────────────

function formatRelativeTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 7) return `${diffD}d ago`;
  return d.toLocaleDateString(undefined, {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

// ── Constants ──────────────────────────────────────────────────────────────

const STATUS_COLOR: Record<string, 'default' | 'info' | 'warning' | 'success' | 'error'> = {
  pending: 'default',
  in_progress: 'info',
  awaiting_input: 'warning',
  completed: 'success',
  failed: 'error',
};

const SCRUTINY_LABEL: Record<string, string> = {
  quick: 'Quick',
  standard: 'Standard',
  rigorous: 'Rigorous',
};

// ── WorkflowRunPanel ───────────────────────────────────────────────────────

interface WorkflowRunPanelProps {
  projectId: string;
  run: WorkflowRun;
  token: string | undefined;
}

const WorkflowRunPanel: React.FC<WorkflowRunPanelProps> = ({ projectId, run: initialRun, token }) => {
  const queryClient = useQueryClient();

  const [streamingStepId, setStreamingStepId] = useState<string | null>(null);
  const [streamingOutput, setStreamingOutput] = useState('');
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [postCustomRecs, setPostCustomRecs] = useState<WorkflowRecommendation[]>([]);
  const [respondingStepId, setRespondingStepId] = useState<string | null>(null);
  const [respondSnackbar, setRespondSnackbar] = useState(false);

  const streamAbortRef = useRef<AbortController | null>(null);

  const alreadyDone =
    initialRun.status === 'completed' || initialRun.status === 'failed';

  const { data: run = initialRun } = useQuery({
    queryKey: ['projects', projectId, 'workflow-runs', initialRun.id],
    queryFn: () => getWorkflowRun(projectId, initialRun.id, token),
    refetchInterval: alreadyDone ? false : 3000,
    initialData: initialRun,
  });

  const { data: agents = [] } = useQuery<Agent[]>({
    queryKey: ['agents'],
    queryFn: () => getAgents(token),
  });

  const hasAutonomousSteps = run.steps.some(
    (s) => s.output_kind === 'score' || s.output_kind === 'decision'
  );

  const { data: briefs = [] } = useQuery<ProjectBrief[]>({
    queryKey: ['projects', projectId, 'briefs'],
    queryFn: () => getProjectBriefs(projectId, token),
    enabled: hasAutonomousSteps && !!projectId,
    refetchInterval: hasAutonomousSteps && !alreadyDone ? 5000 : false,
  });

  const briefChanges: Array<{ before: ProjectBrief; after: ProjectBrief }> = [];
  for (let i = 1; i < briefs.length; i++) {
    const before = briefs[i - 1];
    const after = briefs[i];
    if (before && after && after.source !== 'initial') {
      briefChanges.push({ before, after });
    }
  }

  // ── SSE stream ─────────────────────────────────────────────────────────

  const connectStream = useCallback(async () => {
    streamAbortRef.current?.abort();
    const ac = new AbortController();
    streamAbortRef.current = ac;

    setStreamingOutput('');
    setStreamingStepId(null);

    try {
      for await (const event of streamWorkflowRun(projectId, run.id, token)) {
        if (ac.signal.aborted) break;

        if (event.event === 'token') {
          setStreamingOutput((prev) => prev + event.data);
        } else if (event.event === 'step_complete') {
          setStreamingStepId(null);
          setStreamingOutput('');
          void queryClient.invalidateQueries({
            queryKey: ['projects', projectId, 'workflow-runs', run.id],
          });
          void queryClient.invalidateQueries({
            queryKey: ['projects', projectId, 'briefs'],
          });
          void queryClient.invalidateQueries({
            queryKey: ['projects', projectId, 'workflow-runs', run.id, 'rounds'],
          });
        } else if (event.event === 'round_complete') {
          void queryClient.invalidateQueries({
            queryKey: ['projects', projectId, 'workflow-runs', run.id, 'rounds'],
          });
          void queryClient.invalidateQueries({
            queryKey: ['projects', projectId, 'workflow-runs', run.id],
          });
        } else if (event.event === 'done') {
          setStreamingStepId(null);
          setStreamingOutput('');
          void queryClient.invalidateQueries({
            queryKey: ['projects', projectId, 'workflow-runs', run.id],
          });
          void queryClient.invalidateQueries({
            queryKey: ['projects', projectId, 'briefs'],
          });
          void queryClient.invalidateQueries({
            queryKey: ['projects', projectId, 'workflow-runs', run.id, 'rounds'],
          });
          // Also invalidate the runs list so history updates immediately
          void queryClient.invalidateQueries({
            queryKey: ['projects', projectId, 'workflow-runs'],
          });
          break;
        }
      }
    } catch {
      // Stream ended or aborted
    }
  }, [projectId, run.id, token, queryClient]);

  useEffect(() => {
    const runningStep = run.steps.find((s) => s.status === 'running');
    if (runningStep) {
      setStreamingStepId(runningStep.id);
      void connectStream();
    }
    return () => {
      streamAbortRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run.id]);

  // ── Mutations ───────────────────────────────────────────────────────────

  const advanceMutation = useMutation({
    mutationFn: () => advanceRun(projectId, run.id, token),
    onSuccess: () => { void connectStream(); },
  });

  const skipMutation = useMutation({
    mutationFn: () => {
      const currentStep = run.steps.find((s) => s.position === run.current_step);
      if (!currentStep) throw new Error('No current step');
      return skipStep(projectId, run.id, currentStep.id, token);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'workflow-runs', run.id],
      });
    },
  });

  const skipStepMutation = useMutation({
    mutationFn: (stepRunId: string) => skipStep(projectId, run.id, stepRunId, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'workflow-runs', run.id],
      });
    },
  });

  const modeMutation = useMutation({
    mutationFn: (mode: RunMode) => updateRunMode(projectId, run.id, { mode }, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'workflow-runs', run.id],
      });
    },
  });

  const respondMutation = useMutation({
    mutationFn: ({ stepRunId, answers }: { stepRunId: string; answers: string[] }) =>
      respondToStep(projectId, run.id, stepRunId, answers, token),
    onMutate: ({ stepRunId }) => { setRespondingStepId(stepRunId); },
    onSuccess: () => {
      setRespondingStepId(null);
      setRespondSnackbar(true);
      void queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'workflow-runs', run.id],
      });
      void connectStream();
    },
    onError: () => { setRespondingStepId(null); },
  });

  const rememberPathMutation = useMutation({
    mutationFn: (paths: string[]) => updateProjectLocalPaths(projectId, paths, token),
  });

  const customStepMutation = useMutation({
    mutationFn: (body: { name: string; description: string; agent_type: string }) =>
      runCustomStep(projectId, run.id, body, token),
    onSuccess: (result) => {
      setPostCustomRecs(result.recommendation);
      void queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'workflow-runs', run.id],
      });
      void connectStream();
    },
  });

  const newRunMutation = useMutation({
    mutationFn: (workflowId: string) =>
      startWorkflowRun(projectId, { workflow_id: workflowId, mode: 'manual' }, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'workflow-runs'],
      });
    },
  });

  const isStreaming = !!streamingStepId;
  const isComplete = run.status === 'completed' || run.status === 'failed';
  const taskGenStep = run.steps.find((s) => s.output_kind === 'tasks');
  const isLoopWorkflow = run.mode === 'autonomous' && hasAutonomousSteps;

  return (
    <Box>
      {/* Post-custom recommendation */}
      {postCustomRecs.length > 0 && (
        <WorkflowRecommendationBanner
          recommendations={postCustomRecs}
          onAccept={(wfId) => newRunMutation.mutate(wfId)}
          onDismiss={() => setPostCustomRecs([])}
          accepting={!!newRunMutation.isPending}
          token={token}
        />
      )}

      {/* Brief change indicators */}
      {briefChanges.length > 0 && (
        <Box sx={{ mb: 1 }}>
          {briefChanges.map(({ before, after }) => (
            <BriefChangeIndicator
              key={after.id}
              before={before}
              after={after}
              agents={agents}
            />
          ))}
        </Box>
      )}

      {/* Loop workflows → rounds timeline; others → step list */}
      {isLoopWorkflow ? (
        <RoundsTimeline projectId={projectId} run={run} token={token} agents={agents} />
      ) : (
        <>
          <WorkflowStepper
            steps={run.steps}
            streamingStepId={streamingStepId}
            streamingOutput={streamingOutput}
            agents={agents}
            onRespond={(stepRunId, answer) =>
              respondMutation.mutate({ stepRunId, answers: [answer] })
            }
            onRespondMulti={(stepRunId, answers) =>
              respondMutation.mutate({ stepRunId, answers })
            }
            onSkip={(stepRunId) => skipStepMutation.mutate(stepRunId)}
            respondingStepId={respondingStepId}
            taskGenStepId={taskGenStep?.id ?? null}
            onRememberPath={(paths) => rememberPathMutation.mutate(paths)}
          />

          {isComplete && (
            <Alert severity={run.status === 'completed' ? 'success' : 'error'} sx={{ mt: 2 }}>
              {run.status === 'completed'
                ? 'Workflow run completed.'
                : 'Workflow run failed. Check steps for details.'}
            </Alert>
          )}

          <WorkflowActionBar
            run={run}
            isStreaming={isStreaming}
            onAdvance={() => advanceMutation.mutate()}
            onSkip={() => skipMutation.mutate()}
            onCustomAction={() => setCustomDialogOpen(true)}
            onModeChange={(mode) => modeMutation.mutate(mode)}
            advancing={!!advanceMutation.isPending}
            skipping={!!skipMutation.isPending}
            changingMode={!!modeMutation.isPending}
          />
        </>
      )}

      <Snackbar
        open={respondSnackbar}
        autoHideDuration={3000}
        onClose={() => setRespondSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message="Answers submitted — the team is reviewing again"
      />

      <CustomStepDialog
        open={customDialogOpen}
        onClose={() => setCustomDialogOpen(false)}
        onSubmit={async (name, description, agentType) => {
          await customStepMutation.mutateAsync({ name, description, agent_type: agentType });
          setCustomDialogOpen(false);
        }}
        newRecommendations={postCustomRecs}
        onAcceptRecommendation={(wfId) => {
          newRunMutation.mutate(wfId);
          setCustomDialogOpen(false);
        }}
        submitting={!!customStepMutation.isPending}
      />
    </Box>
  );
};

// ── RunHistoryRow ──────────────────────────────────────────────────────────

interface RunHistoryRowProps {
  projectId: string;
  run: WorkflowRun;
  token: string | undefined;
  runNumber: number;
  defaultExpanded?: boolean;
}

const RunHistoryRow: React.FC<RunHistoryRowProps> = ({
  projectId, run, token, runNumber, defaultExpanded = false,
}) => {
  const isLoopRun = run.mode === 'autonomous' && run.steps.some(s => s.output_kind === 'score');
  const roundCount = new Set(
    run.steps.filter(s => s.round_id).map(s => s.round_id)
  ).size;
  const completedSteps = run.steps.filter(s => s.status === 'completed').length;
  const timestamp = run.started_at ?? run.created_at;

  // Extract the last judge summary for loop runs — gives a one-line outcome
  const lastJudgeSummary: string | null = (() => {
    if (!isLoopRun) return null;
    const decisionSteps = run.steps
      .filter(s => s.output_kind === 'decision' && s.output)
      .sort((a, b) => b.position - a.position);
    if (!decisionSteps[0]?.output) return null;
    try {
      const parsed = JSON.parse(decisionSteps[0].output) as { summary?: string };
      return parsed.summary ?? null;
    } catch {
      return null;
    }
  })();

  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      disableGutters
      elevation={0}
      sx={{
        border: 1,
        borderColor: run.status === 'failed' ? 'error.light' : 'divider',
        borderRadius: 1,
        mb: 0.75,
        overflow: 'hidden',
        '&:before': { display: 'none' },
        '&.Mui-expanded': {
          borderColor: run.status === 'failed' ? 'error.light' : 'primary.light',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ fontSize: 18 }} />}
        sx={{
          px: 1.5, py: 0.75, minHeight: 'unset',
          bgcolor: 'action.hover',
          '& .MuiAccordionSummary-content': { my: 0.5, alignItems: 'center', gap: 1, flexWrap: 'wrap' },
        }}
      >
        {/* Run number */}
        <Typography
          variant="caption"
          sx={{ fontFamily: 'monospace', fontSize: '0.68rem', color: 'text.disabled', flexShrink: 0 }}
        >
          #{runNumber}
        </Typography>

        {/* Workflow name */}
        <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary', flexShrink: 0 }}>
          {run.workflow_name ?? 'Free-form run'}
        </Typography>

        {/* Timestamp */}
        <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
          {formatRelativeTime(timestamp)}
        </Typography>

        {/* Judge summary preview (loop runs) */}
        {lastJudgeSummary && (
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{
              flex: 1, overflow: 'hidden', textOverflow: 'ellipsis',
              whiteSpace: 'nowrap', fontSize: '0.68rem', minWidth: 0,
            }}
          >
            — {lastJudgeSummary}
          </Typography>
        )}

        {/* Right-side chips */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto', mr: 1, flexShrink: 0 }}>
          <Chip
            label={run.status.replace(/_/g, ' ')}
            size="small"
            color={STATUS_COLOR[run.status] ?? 'default'}
            sx={{ height: 18, fontSize: '0.62rem', textTransform: 'capitalize' }}
          />
          <Chip
            label={run.mode}
            size="small"
            variant="outlined"
            sx={{ height: 18, fontSize: '0.62rem', textTransform: 'capitalize' }}
          />
          {run.config?.scrutiny && (
            <Chip
              label={SCRUTINY_LABEL[run.config.scrutiny] ?? run.config.scrutiny}
              size="small"
              variant="outlined"
              color="secondary"
              sx={{ height: 18, fontSize: '0.62rem' }}
            />
          )}
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ fontSize: '0.68rem', ml: 0.25 }}
          >
            {isLoopRun
              ? `${roundCount} ${roundCount === 1 ? 'round' : 'rounds'}`
              : `${completedSteps}/${run.steps.length} steps`}
          </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 1.5, pt: 1.25, pb: 1.5, borderTop: 1, borderColor: 'divider' }}>
        <WorkflowRunPanel projectId={projectId} run={run} token={token} />
      </AccordionDetails>
    </Accordion>
  );
};

// ── StartRunControls ───────────────────────────────────────────────────────

interface StartRunControlsProps {
  scrutiny: ScrutinyLevel;
  onScrutinyChange: (s: ScrutinyLevel) => void;
  targetScoreInput: string;
  onTargetScoreChange: (v: string) => void;
  onStart: () => void;
  starting: boolean;
  label?: string;
}

const StartRunControls: React.FC<StartRunControlsProps> = ({
  scrutiny, onScrutinyChange, targetScoreInput, onTargetScoreChange,
  onStart, starting, label = 'Start run',
}) => (
  <Box>
    <ScrutinySelector value={scrutiny} onChange={onScrutinyChange} />
    <Box sx={{ mt: 1.5 }}>
      <Tooltip title="Loop will stop when average score reaches this threshold. Leave empty to let the judge decide.">
        <TextField
          label="Run until score ≥"
          size="small"
          type="number"
          value={targetScoreInput}
          onChange={(e) => onTargetScoreChange(e.target.value)}
          inputProps={{ min: 0, max: 10, step: 0.5 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">/ 10</InputAdornment>,
          }}
          placeholder="Optional"
          sx={{ width: 180 }}
        />
      </Tooltip>
    </Box>
    <Box sx={{ mt: 1.5 }}>
      <Button
        variant="outlined"
        size="small"
        onClick={onStart}
        disabled={starting}
        startIcon={starting ? <CircularProgress size={14} /> : <PlayCircleOutlineIcon />}
      >
        {label}
      </Button>
    </Box>
  </Box>
);

// ── WorkflowTab ────────────────────────────────────────────────────────────

interface WorkflowTabProps {
  projectId: string;
  token: string | undefined;
}

export const WorkflowTab: React.FC<WorkflowTabProps> = ({ projectId, token }) => {
  const queryClient = useQueryClient();

  const [recDismissed, setRecDismissed] = useState(false);
  const [scrutiny, setScrutiny] = useState<ScrutinyLevel>('standard');
  const [targetScoreInput, setTargetScoreInput] = useState('');

  const targetScore = targetScoreInput !== '' ? Number(targetScoreInput) : undefined;

  const { data: runs, isLoading: runsLoading } = useQuery({
    queryKey: ['projects', projectId, 'workflow-runs'],
    queryFn: () => getWorkflowRuns(projectId, token),
    enabled: !!projectId,
  });

  const hasAnyRuns = (runs?.length ?? 0) > 0;

  const { data: recommendations, isLoading: recLoading } = useQuery({
    queryKey: ['projects', projectId, 'workflow-recommendation'],
    queryFn: () => getWorkflowRecommendation(projectId, token),
    enabled: !!projectId && runs !== undefined && !hasAnyRuns,
  });

  const startMutation = useMutation({
    mutationFn: (workflowId?: string) =>
      startWorkflowRun(
        projectId,
        {
          workflow_id: workflowId ?? null,
          mode: 'autonomous',
          scrutiny,
          ...(targetScore !== undefined && !isNaN(targetScore) ? { target_score: targetScore } : {}),
        },
        token
      ),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'workflow-runs'],
      });
    },
  });

  if (runsLoading || recLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  const activeRun = runs?.find(
    (r) => r.status === 'in_progress' || r.status === 'pending' || r.status === 'awaiting_input'
  );

  // History: completed or failed, most recent first
  const historyRuns = (runs ?? [])
    .filter((r) => r.status === 'completed' || r.status === 'failed')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // Global run number (across all runs, for labelling — 1 = oldest)
  const totalRuns = (runs?.length ?? 0);
  // Map run.id → sequential run number (oldest = #1)
  const runNumberMap = new Map<string, number>(
    [...(runs ?? [])]
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .map((r, i) => [r.id, i + 1])
  );

  return (
    <Box>
      {/* ── Active run ───────────────────────────────────────────────────── */}
      {activeRun && (
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <CircularProgress size={14} thickness={5} />
            <Typography variant="overline" color="primary.main" sx={{ lineHeight: 1 }}>
              Run #{runNumberMap.get(activeRun.id)} — in progress
            </Typography>
            <Chip
              label={activeRun.status.replace(/_/g, ' ')}
              size="small"
              color={STATUS_COLOR[activeRun.status] ?? 'default'}
              sx={{ height: 18, fontSize: '0.62rem', textTransform: 'capitalize' }}
            />
            {activeRun.config?.scrutiny && (
              <Chip
                label={SCRUTINY_LABEL[activeRun.config.scrutiny] ?? activeRun.config.scrutiny}
                size="small"
                variant="outlined"
                color="secondary"
                sx={{ height: 18, fontSize: '0.62rem' }}
              />
            )}
          </Box>
          <WorkflowRunPanel projectId={projectId} run={activeRun} token={token} />
        </Box>
      )}

      {/* ── Start new run (when no active run) ──────────────────────────── */}
      {!activeRun && (
        <Box sx={{ mb: historyRuns.length > 0 ? 2 : 0 }}>
          {!recDismissed && recommendations && recommendations.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <WorkflowRecommendationBanner
                recommendations={recommendations}
                onAccept={(wfId) => startMutation.mutate(wfId)}
                onDismiss={() => setRecDismissed(true)}
                accepting={!!startMutation.isPending}
                token={token}
              />
            </Box>
          )}

          {historyRuns.length > 0 ? (
            /* Has prior runs — compact "start new run" strip */
            <Box
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap',
                p: 1.5, border: 1, borderColor: 'divider', borderRadius: 1, bgcolor: 'action.hover',
              }}
            >
              <ScrutinySelector value={scrutiny} onChange={setScrutiny} compact />
              <Tooltip title="Loop will stop when average score reaches this threshold. Leave empty to let the judge decide.">
                <TextField
                  label="Run until ≥"
                  size="small"
                  type="number"
                  value={targetScoreInput}
                  onChange={(e) => setTargetScoreInput(e.target.value)}
                  inputProps={{ min: 0, max: 10, step: 0.5 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">/ 10</InputAdornment>,
                  }}
                  placeholder="Optional"
                  sx={{ width: 160 }}
                />
              </Tooltip>
              <Button
                variant="outlined"
                size="small"
                onClick={() => startMutation.mutate(undefined)}
                disabled={startMutation.isPending}
                startIcon={startMutation.isPending ? <CircularProgress size={14} /> : <PlayCircleOutlineIcon />}
              >
                Start new run
              </Button>
            </Box>
          ) : (
            /* No runs yet — full start controls */
            <StartRunControls
              scrutiny={scrutiny}
              onScrutinyChange={setScrutiny}
              targetScoreInput={targetScoreInput}
              onTargetScoreChange={setTargetScoreInput}
              onStart={() => startMutation.mutate(undefined)}
              starting={!!startMutation.isPending}
              label="Start run"
            />
          )}
        </Box>
      )}

      {/* ── Run history ──────────────────────────────────────────────────── */}
      {historyRuns.length > 0 && (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
            <HistoryIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
            <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1 }}>
              Run history ({historyRuns.length})
            </Typography>
          </Box>

          {historyRuns.map((run, idx) => (
            <RunHistoryRow
              key={run.id}
              projectId={projectId}
              run={run}
              token={token}
              runNumber={runNumberMap.get(run.id) ?? (totalRuns - idx)}
              defaultExpanded={idx === 0 && !activeRun}
            />
          ))}
        </Box>
      )}

      {/* ── Empty state ──────────────────────────────────────────────────── */}
      {!activeRun && historyRuns.length === 0 && !startMutation.isPending && (
        <Box sx={{ mt: 2 }}>
          <Divider />
        </Box>
      )}
    </Box>
  );
};

export default WorkflowRunPanel;
