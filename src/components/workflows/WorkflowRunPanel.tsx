import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import {
  advanceRun,
  skipStep,
  runCustomStep,
  updateRunMode,
  getWorkflowRun,
  startWorkflowRun,
  getWorkflowRecommendation,
  streamWorkflowRun,
} from '../../api/workflows';
import WorkflowStepper from './WorkflowStepper';
import WorkflowActionBar from './WorkflowActionBar';
import WorkflowRecommendationBanner from './WorkflowRecommendationBanner';
import CustomStepDialog from './CustomStepDialog';
import type { RunMode, WorkflowRun, WorkflowRecommendation } from '../../types/workflow';

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

  const streamAbortRef = useRef<AbortController | null>(null);

  // Poll the run while it's in-flight so the panel stays fresh
  const { data: run = initialRun } = useQuery({
    queryKey: ['projects', projectId, 'workflow-runs', initialRun.id],
    queryFn: () => getWorkflowRun(projectId, initialRun.id, token),
    refetchInterval: 3000,
    initialData: initialRun,
  });

  // ── SSE stream ──────────────────────────────────────────────────────────

  const connectStream = useCallback(async () => {
    // Abort any existing stream
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
        } else if (event.event === 'done') {
          setStreamingStepId(null);
          setStreamingOutput('');
          void queryClient.invalidateQueries({
            queryKey: ['projects', projectId, 'workflow-runs', run.id],
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

  const modeMutation = useMutation({
    mutationFn: (mode: RunMode) => updateRunMode(projectId, run.id, { mode }, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'workflow-runs', run.id],
      });
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

  // Recommendation for new run after custom step
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

      {/* Step list */}
      <WorkflowStepper
        steps={run.steps}
        streamingStepId={streamingStepId}
        streamingOutput={streamingOutput}
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
    queryFn: () => import('../../api/workflows').then((m) => m.getWorkflowRuns(projectId, token)),
    enabled: !!projectId,
  });

  const { data: recommendations, isLoading: recLoading } = useQuery({
    queryKey: ['projects', projectId, 'workflow-recommendation'],
    queryFn: () => getWorkflowRecommendation(projectId, token),
    enabled: !!projectId && runs !== undefined && runs.length === 0,
  });

  const [recDismissed, setRecDismissed] = useState(false);

  const startMutation = useMutation({
    mutationFn: (workflowId?: string) =>
      startWorkflowRun(
        projectId,
        { workflow_id: workflowId ?? null, mode: 'manual' },
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

  return (
    <Box>
      {/* Recommendation banner (only if no runs yet and not dismissed) */}
      {!recDismissed && recommendations && recommendations.length > 0 && runs?.length === 0 && (
        <WorkflowRecommendationBanner
          recommendations={recommendations}
          onAccept={(wfId) => startMutation.mutate(wfId)}
          onDismiss={() => setRecDismissed(true)}
          accepting={!!startMutation.isPending}
          token={token}
        />
      )}

      {/* Last completed run summary */}
      {latestCompleted && (
        <Alert
          severity={latestCompleted.status === 'completed' ? 'success' : 'error'}
          sx={{ mb: 2 }}
        >
          Last run ({latestCompleted.workflow_name ?? 'free-form'}):{' '}
          {latestCompleted.status === 'completed' ? 'completed' : 'failed'}.
        </Alert>
      )}

      {/* Start a new run */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => startMutation.mutate(undefined)}
          disabled={startMutation.isPending}
          startIcon={startMutation.isPending ? <CircularProgress size={14} /> : undefined}
        >
          Start free-form run
        </Button>
      </Box>
    </Box>
  );
};

export default WorkflowRunPanel;
