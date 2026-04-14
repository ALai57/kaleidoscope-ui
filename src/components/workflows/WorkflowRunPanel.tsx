import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
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
import { getAgents } from '../../api/agents';
import WorkflowStepper from './WorkflowStepper';
import WorkflowActionBar from './WorkflowActionBar';
import WorkflowRecommendationBanner from './WorkflowRecommendationBanner';
import CustomStepDialog from './CustomStepDialog';
import { ScrutinySelector } from './ScrutinySelector';
import { BriefChangeIndicator } from './BriefChangeIndicator';
import type { Agent } from '../../types/agent';
import type { RunMode, ScrutinyLevel, WorkflowRun, WorkflowRecommendation, ProjectBrief } from '../../types/workflow';

interface WorkflowRunPanelProps {
  projectId: string;
  run: WorkflowRun;
  token: string | undefined;
}

const STATUS_COLOR: Record<string, 'default' | 'info' | 'warning' | 'success' | 'error'> = {
  pending: 'default',
  in_progress: 'info',
  awaiting_input: 'warning',
  completed: 'success',
  failed: 'error',
};

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

  // Poll the run while it's in-flight so the panel stays fresh.
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

  // Fetch project briefs when the run has autonomous steps (score/decision output kinds)
  const hasAutonomousSteps = run.steps.some(
    (s) => s.output_kind === 'score' || s.output_kind === 'decision'
  );

  const { data: briefs = [] } = useQuery<ProjectBrief[]>({
    queryKey: ['projects', projectId, 'briefs'],
    queryFn: () => getProjectBriefs(projectId, token),
    enabled: hasAutonomousSteps && !!projectId,
    refetchInterval: hasAutonomousSteps && !alreadyDone ? 5000 : false,
  });

  // Build a list of brief changes (versions after initial) to show as callouts
  const briefChanges: Array<{ before: ProjectBrief; after: ProjectBrief }> = [];
  for (let i = 1; i < briefs.length; i++) {
    const before = briefs[i - 1];
    const after = briefs[i];
    if (before && after && after.source !== 'initial') {
      briefChanges.push({ before, after });
    }
  }

  // ── SSE stream ──────────────────────────────────────────────────────────

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
          // Re-fetch briefs on step completion so change indicators update
          void queryClient.invalidateQueries({
            queryKey: ['projects', projectId, 'briefs'],
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
          break;
        }
      }
    } catch {
      // Stream ended or aborted — ignore
    }
  }, [projectId, run.id, token, queryClient]);

  // Connect stream when a step starts running
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
    onSuccess: () => {
      void connectStream();
    },
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
    onMutate: ({ stepRunId }) => {
      setRespondingStepId(stepRunId);
    },
    onSuccess: () => {
      setRespondingStepId(null);
      setRespondSnackbar(true);
      void queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'workflow-runs', run.id],
      });
      void connectStream();
    },
    onError: () => {
      setRespondingStepId(null);
    },
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

  // Identify the task-gen step (output_kind: 'tasks') for TeamLeadCard's taskGenRunning prop
  const taskGenStep = run.steps.find((s) => s.output_kind === 'tasks');

  return (
    <Box>
      {/* Run header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {run.workflow_name ?? 'Free-form run'}
        </Typography>
        <Chip
          label={run.status.replace('_', ' ')}
          size="small"
          color={STATUS_COLOR[run.status] ?? 'default'}
          sx={{ textTransform: 'capitalize' }}
        />
        <Chip
          label={run.mode}
          size="small"
          variant="outlined"
          sx={{ textTransform: 'capitalize' }}
        />
        {run.config?.scrutiny && (
          <Chip
            label={run.config.scrutiny === 'quick' ? 'Quick check' : run.config.scrutiny === 'rigorous' ? 'Rigorous review' : 'Standard review'}
            size="small"
            variant="outlined"
            color="secondary"
          />
        )}
      </Box>

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

      {/* Brief change indicators (shown before the step list so user sees what was edited) */}
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

      {/* Step list */}
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
      />

      {/* Completion summary */}
      {isComplete && (
        <Alert severity={run.status === 'completed' ? 'success' : 'error'} sx={{ mt: 2 }}>
          {run.status === 'completed'
            ? 'Workflow run completed.'
            : 'Workflow run failed. Check steps for details.'}
        </Alert>
      )}

      {/* Action bar */}
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

      {/* Respond success feedback */}
      <Snackbar
        open={respondSnackbar}
        autoHideDuration={3000}
        onClose={() => setRespondSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message="Answers submitted — the team is reviewing again"
      />

      {/* Custom step dialog */}
      <CustomStepDialog
        open={customDialogOpen}
        onClose={() => setCustomDialogOpen(false)}
        onSubmit={async (name, description, agentType) => {
          await customStepMutation.mutateAsync({
            name,
            description,
            agent_type: agentType,
          });
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

// ── Wrapper: no run yet ────────────────────────────────────────────────────

interface WorkflowTabProps {
  projectId: string;
  token: string | undefined;
}

export const WorkflowTab: React.FC<WorkflowTabProps> = ({ projectId, token }) => {
  const queryClient = useQueryClient();

  const { data: runs, isLoading: runsLoading } = useQuery({
    queryKey: ['projects', projectId, 'workflow-runs'],
    queryFn: () => getWorkflowRuns(projectId, token),
    enabled: !!projectId,
  });

  const { data: recommendations, isLoading: recLoading } = useQuery({
    queryKey: ['projects', projectId, 'workflow-recommendation'],
    queryFn: () => getWorkflowRecommendation(projectId, token),
    enabled: !!projectId && runs !== undefined && runs.length === 0,
  });

  const [recDismissed, setRecDismissed] = useState(false);
  const [scrutiny, setScrutiny] = useState<ScrutinyLevel>('standard');

  const startMutation = useMutation({
    mutationFn: (workflowId?: string) =>
      startWorkflowRun(
        projectId,
        { workflow_id: workflowId ?? null, mode: 'autonomous', scrutiny },
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

  if (activeRun) {
    return <WorkflowRunPanel projectId={projectId} run={activeRun} token={token} />;
  }

  const latestCompleted = runs?.find(
    (r) => r.status === 'completed' || r.status === 'failed'
  );

  if (latestCompleted) {
    return (
      <Box>
        <WorkflowRunPanel projectId={projectId} run={latestCompleted} token={token} />
        <Box sx={{ mt: 2, pt: 1.5, borderTop: 1, borderColor: 'divider' }}>
          <ScrutinySelector value={scrutiny} onChange={setScrutiny} />
          <Box sx={{ mt: 1.5 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => startMutation.mutate(undefined)}
              disabled={startMutation.isPending}
              startIcon={startMutation.isPending ? <CircularProgress size={14} /> : undefined}
            >
              Start new run
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  // No runs yet: show recommendation or free-form start.
  return (
    <Box>
      {!recDismissed && recommendations && recommendations.length > 0 && (
        <WorkflowRecommendationBanner
          recommendations={recommendations}
          onAccept={(wfId) => startMutation.mutate(wfId)}
          onDismiss={() => setRecDismissed(true)}
          accepting={!!startMutation.isPending}
          token={token}
        />
      )}

      <Divider sx={{ my: 2 }} />

      <ScrutinySelector value={scrutiny} onChange={setScrutiny} />

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => startMutation.mutate(undefined)}
          disabled={startMutation.isPending}
          startIcon={startMutation.isPending ? <CircularProgress size={14} /> : undefined}
        >
          Start run
        </Button>
      </Box>
    </Box>
  );
};

export default WorkflowRunPanel;
