import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  getWorkflowRunRounds,
  advanceRun,
  respondToStep,
  forceProceed,
  skipStep,
} from '../../api/workflows';
import { updateProjectLocalPaths } from '../../api/projects';
import { RoundCard } from './RoundCard';
import { RoundActionBar } from './RoundActionBar';
import { CodeContextPathInput } from './CodeContextPathInput';
import type { Agent } from '../../types/agent';
import type { WorkflowRun, PendingInputsCodeContextPath } from '../../types/workflow';

interface RoundsTimelineProps {
  projectId: string;
  run: WorkflowRun;
  token: string | undefined;
  agents: Agent[];
}

export const RoundsTimeline: React.FC<RoundsTimelineProps> = ({ projectId, run, token, agents }) => {
  const queryClient = useQueryClient();
  const [respondSnackbar, setRespondSnackbar] = useState(false);

  const isRunComplete = run.status === 'completed' || run.status === 'failed';

  // Fetch rounds — poll while the run is still active
  const { data: rounds = [], isLoading } = useQuery({
    queryKey: ['projects', projectId, 'workflow-runs', run.id, 'rounds'],
    queryFn: () => getWorkflowRunRounds(projectId, run.id, token),
    refetchInterval: isRunComplete ? false : 3000,
  });

  // ── Mutations ──────────────────────────────────────────────────────────

  const invalidateRun = () => {
    void queryClient.invalidateQueries({
      queryKey: ['projects', projectId, 'workflow-runs', run.id],
    });
    void queryClient.invalidateQueries({
      queryKey: ['projects', projectId, 'workflow-runs', run.id, 'rounds'],
    });
  };

  const advanceMutation = useMutation({
    mutationFn: () => advanceRun(projectId, run.id, token),
    onSuccess: invalidateRun,
  });

  const proceedMutation = useMutation({
    mutationFn: () => forceProceed(projectId, run.id, token),
    onSuccess: invalidateRun,
  });

  // Find the currently awaiting_input step (for the "Add context" / code-context-path flow)
  const awaitingStep = run.steps.find((s) => s.status === 'awaiting_input');

  const respondMutation = useMutation({
    mutationFn: ({ stepRunId, answers }: { stepRunId: string; answers: string[] }) =>
      respondToStep(projectId, run.id, stepRunId, answers, token),
    onSuccess: () => {
      setRespondSnackbar(true);
      invalidateRun();
    },
  });

  const skipMutation = useMutation({
    mutationFn: (stepRunId: string) => skipStep(projectId, run.id, stepRunId, token),
    onSuccess: invalidateRun,
  });

  const rememberPathMutation = useMutation({
    mutationFn: (paths: string[]) => updateProjectLocalPaths(projectId, paths, token),
  });

  // ── Derived state ──────────────────────────────────────────────────────

  const latestRound = rounds[rounds.length - 1];
  const olderRounds = rounds.slice(0, -1);

  // A round is "in progress" only when the run itself is actively working — not when it's
  // paused waiting for user input (awaiting_input). In that case we want the action buttons
  // enabled so the user can respond or force-proceed.
  const roundInProgress =
    !isRunComplete &&
    run.status !== 'awaiting_input' &&
    (latestRound?.status === 'in_progress' || run.status === 'in_progress');

  // When the run is paused for code-context-path input, extract the pending inputs so we
  // can render the dedicated CodeContextPathInput form.
  const pendingCodeContext =
    run.status === 'awaiting_input' &&
    awaitingStep?.pending_inputs?.kind === 'code_context_path'
      ? (awaitingStep.pending_inputs as PendingInputsCodeContextPath)
      : undefined;

  const showActionBar =
    !isRunComplete &&
    run.status !== 'failed' &&
    rounds.length > 0;

  // ── Render ─────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  // ── Completed run: flat history list ──────────────────────────────────────
  // No "latest vs older" distinction — all rounds are history, show them all.
  if (isRunComplete) {
    return (
      <Box>
        {rounds.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
            No round data recorded for this run.
          </Typography>
        ) : (
          rounds.map((round) => (
            <RoundCard
              key={round.round_number}
              round={round}
              thresholds={run.config?.thresholds}
              agents={agents}
            />
          ))
        )}
        <Alert
          severity={run.status === 'completed' ? 'success' : 'error'}
          sx={{ mt: 1 }}
        >
          {run.status === 'completed'
            ? `Completed after ${rounds.length} ${rounds.length === 1 ? 'round' : 'rounds'}.`
            : 'Run failed. Check the step list for details.'}
        </Alert>
      </Box>
    );
  }

  // ── Active run ─────────────────────────────────────────────────────────────

  if (rounds.length === 0) {
    return (
      <Box sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CircularProgress size={16} />
          <Typography variant="body2" color="text.secondary">
            Starting first round…
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {/* Earlier rounds */}
      {olderRounds.length > 0 && (
        <Box sx={{ mb: 1 }}>
          {olderRounds.map((round) => (
            <RoundCard key={round.round_number} round={round} thresholds={run.config?.thresholds} agents={agents} />
          ))}
          {latestRound && (
            <Divider sx={{ my: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CheckCircleIcon sx={{ fontSize: 12, color: 'success.main' }} />
                <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1, fontSize: '0.65rem' }}>
                  {olderRounds.length} earlier {olderRounds.length === 1 ? 'round' : 'rounds'}
                </Typography>
              </Box>
            </Divider>
          )}
        </Box>
      )}

      {/* Current round */}
      {latestRound && (
        <Box>
          <RoundCard
            round={latestRound}
            thresholds={run.config?.thresholds}
            agents={agents}
            awaitingInput={run.status === 'awaiting_input' && !!awaitingStep}
          />

          {/* Awaiting-input section */}
          {run.status === 'awaiting_input' && (
            <Box sx={{ mt: 1, mb: 1 }}>
              {awaitingStep ? (
                <>
                  {pendingCodeContext ? (
                    <CodeContextPathInput
                      stepRun={awaitingStep}
                      pendingInputs={pendingCodeContext}
                      agents={agents}
                      responding={respondMutation.isPending}
                      onRespond={(stepRunId, answers) => respondMutation.mutate({ stepRunId, answers })}
                      onSkip={(stepRunId) => skipMutation.mutate(stepRunId)}
                      onRememberPath={(paths) => rememberPathMutation.mutate(paths)}
                    />
                  ) : (
                    <Alert severity="warning" variant="outlined">
                      <AlertTitle>{awaitingStep.name} needs your input</AlertTitle>
                      Use <strong>Add context</strong> below to provide additional information and
                      resume the round.
                    </Alert>
                  )}
                </>
              ) : (
                <Alert severity="warning" variant="outlined">
                  <AlertTitle>Workflow paused</AlertTitle>
                  The run is waiting for input before it can continue. Use{' '}
                  <strong>Add context</strong> below or <strong>Generate tasks</strong> to skip
                  ahead.
                </Alert>
              )}
            </Box>
          )}

          {/* Action bar */}
          {showActionBar && (
            <RoundActionBar
              roundInProgress={roundInProgress}
              advancing={advanceMutation.isPending}
              proceeding={proceedMutation.isPending}
              responding={respondMutation.isPending}
              onAdvance={() => advanceMutation.mutate()}
              onAddContext={(text) => {
                if (!awaitingStep) return;
                respondMutation.mutate({ stepRunId: awaitingStep.id, answers: [text] });
              }}
              onForceProceed={() => proceedMutation.mutate()}
              noRespondTarget={!awaitingStep || !!pendingCodeContext}
            />
          )}
        </Box>
      )}

      <Snackbar
        open={respondSnackbar}
        autoHideDuration={3000}
        onClose={() => setRespondSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message="Context submitted — it will be used in the next round"
      />
    </Box>
  );
};

export default RoundsTimeline;
