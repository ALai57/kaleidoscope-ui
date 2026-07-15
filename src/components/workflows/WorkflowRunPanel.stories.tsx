import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import { WorkflowTab } from './WorkflowRunPanel';
import { PrismThemeProvider } from '../prism';
import type { Agent } from '../../types/agent';
import type { WorkflowRun } from '../../types/workflow';

// Render-smoke + visual QA for Task 5 of the Workflow Progress Internals → Prism
// initiative: proves the active-run header's LiveDot + mono overline, the
// run-control chrome's hairline/mono treatment, and the accent-on-hover start
// button all render correctly in both the app's default (light) theme and
// under PrismThemeProvider.
//
// WorkflowTab (the exported piece that owns the active-run header and the
// "start new run" chrome) and the nested WorkflowRunPanel/RunHistoryRow are
// all query-driven (TanStack Query). Each story seeds a fresh QueryClient's
// cache under the exact query keys the components use
// (`['projects', projectId, 'workflow-runs']`, `['agents']`,
// `['projects', projectId, 'workflow-runs', run.id]`) so the real component
// tree renders immediately, no network required. Steps are deliberately kept
// non-'running' so the SSE stream (`streamWorkflowRun`) never connects during
// the story render.

const projectId = 'proj-1';
const startedAt = '2026-01-01T09:00:00Z';

const agents: Agent[] = [
  {
    id: 'a1',
    agent_type: 'coach',
    name: 'Coach',
    short_name: 'Coach',
    avatar: '🧭',
    color: '#6C5CE7',
    system_prompt: '',
    is_default: true,
  },
  {
    id: 'a2',
    agent_type: 'engineering_lead',
    name: 'Engineering Lead',
    short_name: 'Eng Lead',
    avatar: '🛠️',
    color: '#00B894',
    system_prompt: '',
    is_default: true,
  },
];

const runConfig = {
  scrutiny: 'standard' as const,
  max_rounds: 3,
  thresholds: {},
  deadband: 0.5,
};

/** In-progress run: one completed step, one pending (not 'running', so the
 *  panel never opens an SSE connection during the story render). */
const activeRun: WorkflowRun = {
  id: 'run-active',
  project_id: projectId,
  workflow_id: 'wf-1',
  workflow_name: 'Ship the onboarding flow',
  status: 'in_progress',
  mode: 'manual',
  current_step: 1,
  config: runConfig,
  started_at: startedAt,
  created_at: startedAt,
  steps: [
    {
      id: 'step-1',
      step_id: 'wf-step-1',
      position: 0,
      name: 'Draft plan',
      description: 'Coach drafts the initial plan.',
      agent_type: 'coach',
      is_custom: false,
      status: 'completed',
      output: 'Plan drafted.',
      output_kind: 'text',
      started_at: startedAt,
      completed_at: startedAt,
    },
    {
      id: 'step-2',
      step_id: 'wf-step-2',
      position: 1,
      name: 'Engineering review',
      description: 'Engineering lead reviews the plan.',
      agent_type: 'engineering_lead',
      is_custom: false,
      status: 'pending',
      output_kind: 'text',
    },
  ],
};

/** Completed run for the run-history / "start new run" chrome scenario. */
const historyRun: WorkflowRun = {
  id: 'run-history-1',
  project_id: projectId,
  workflow_id: 'wf-1',
  workflow_name: 'Ship the onboarding flow',
  status: 'completed',
  mode: 'manual',
  current_step: 2,
  config: runConfig,
  started_at: startedAt,
  completed_at: startedAt,
  created_at: startedAt,
  steps: [
    {
      id: 'h-step-1',
      step_id: 'wf-step-1',
      position: 0,
      name: 'Draft plan',
      description: 'Coach drafts the initial plan.',
      agent_type: 'coach',
      is_custom: false,
      status: 'completed',
      output: 'Plan drafted.',
      output_kind: 'text',
      started_at: startedAt,
      completed_at: startedAt,
    },
    {
      id: 'h-step-2',
      step_id: 'wf-step-2',
      position: 1,
      name: 'Engineering review',
      description: 'Engineering lead reviews the plan.',
      agent_type: 'engineering_lead',
      is_custom: false,
      status: 'completed',
      output: 'Looks good.',
      output_kind: 'text',
      started_at: startedAt,
      completed_at: startedAt,
    },
  ],
};

/** Fresh QueryClient per story, pre-seeded under the exact query keys
 *  WorkflowTab / WorkflowRunPanel / RunHistoryRow use, so everything renders
 *  immediately without a real backend. `staleTime: Infinity` plus disabled
 *  retries keep the cache authoritative for the render. */
function makeSeededQueryClient(runs: WorkflowRun[]): QueryClient {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });
  queryClient.setQueryData(['projects', projectId, 'workflow-runs'], runs);
  queryClient.setQueryData(['agents'], agents);
  queryClient.setQueryData(['projects', projectId, 'briefs'], []);
  for (const run of runs) {
    queryClient.setQueryData(['projects', projectId, 'workflow-runs', run.id], run);
  }
  return queryClient;
}

const meta: Meta<typeof WorkflowTab> = {
  title: 'Workflows/WorkflowRunPanel',
  component: WorkflowTab,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 720 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WorkflowTab>;

/** Active run — active-run status header: `LiveDot` + mono overline. */
export const Default: Story = {
  name: 'Active run (light)',
  render: () => (
    <QueryClientProvider client={makeSeededQueryClient([activeRun])}>
      <WorkflowTab projectId={projectId} token={undefined} />
    </QueryClientProvider>
  ),
};

export const Prism: Story = {
  name: 'Active run (Prism dark)',
  render: () => (
    <PrismThemeProvider>
      <Box sx={{ bgcolor: 'background.default', p: 3 }}>
        <QueryClientProvider client={makeSeededQueryClient([activeRun])}>
          <WorkflowTab projectId={projectId} token={undefined} />
        </QueryClientProvider>
      </Box>
    </PrismThemeProvider>
  ),
};

/** No active run — "start new run" hairline/mono chrome + accent-on-hover
 *  button, plus the run-history row (also carries mono meta text). */
export const RunHistory: Story = {
  name: 'Run history + start chrome (light)',
  render: () => (
    <QueryClientProvider client={makeSeededQueryClient([historyRun])}>
      <WorkflowTab projectId={projectId} token={undefined} />
    </QueryClientProvider>
  ),
};

export const RunHistoryPrism: Story = {
  name: 'Run history + start chrome (Prism dark)',
  render: () => (
    <PrismThemeProvider>
      <Box sx={{ bgcolor: 'background.default', p: 3 }}>
        <QueryClientProvider client={makeSeededQueryClient([historyRun])}>
          <WorkflowTab projectId={projectId} token={undefined} />
        </QueryClientProvider>
      </Box>
    </PrismThemeProvider>
  ),
};
