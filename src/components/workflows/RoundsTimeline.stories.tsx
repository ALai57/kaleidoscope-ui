import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import { RoundsTimeline } from './RoundsTimeline';
import { PrismThemeProvider } from '../prism';
import type { Agent } from '../../types/agent';
import type { WorkflowRun, WorkflowRoundDetail } from '../../types/workflow';

// Render-smoke + visual QA for Task 3 of the Workflow Progress Internals → Prism
// initiative: proves the hairline spine + accent LiveDot "now" node render
// correctly in both the app's default (light) theme and under PrismThemeProvider.
//
// RoundsTimeline fetches its rounds via TanStack Query (`useQuery`), so each
// story seeds a fresh QueryClient's cache under the exact query key the
// component uses (`['projects', projectId, 'workflow-runs', run.id, 'rounds']`)
// — this renders the real component tree immediately, no network required.

const projectId = 'proj-1';
const startedAt = '2026-01-01T00:00:00Z';

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

const thresholds = { coach: 7, engineering_lead: 6 };

const olderRound: WorkflowRoundDetail = {
  round_number: 1,
  status: 'completed',
  started_at: startedAt,
  completed_at: startedAt,
  brief: { version: 1, content: '' },
  judge: {
    decision: {
      action: 'refine',
      agent_to_refine: 'engineering_lead',
      refinement_prompt: 'Tighten the rollout plan.',
      summary: 'Engineering lead needs another pass on the rollout plan.',
      rationale: 'Feasibility score is below threshold.',
    },
    summary: 'Engineering lead needs another pass on the rollout plan.',
    rationale: 'Feasibility score is below threshold.',
    score_snapshot: {
      coach: { overall: 8, dimensions: [] },
      engineering_lead: { overall: 5, dimensions: [] },
    },
    policy: { max_rounds: 3, current_round: 1 },
  },
};

const inProgressRound: WorkflowRoundDetail = {
  round_number: 2,
  status: 'in_progress',
  started_at: startedAt,
};

const rounds: WorkflowRoundDetail[] = [olderRound, inProgressRound];

const run: WorkflowRun = {
  id: 'run-1',
  project_id: projectId,
  workflow_id: 'wf-1',
  workflow_name: 'Refine & score',
  status: 'in_progress',
  mode: 'autonomous',
  current_step: 1,
  steps: [],
  config: { scrutiny: 'standard', max_rounds: 3, thresholds, deadband: 0.5 },
  created_at: startedAt,
};

/** Fresh QueryClient per story, pre-seeded with the rounds fixture under the
 *  component's exact query key, so the timeline renders immediately without a
 *  real backend. `staleTime: Infinity` keeps the cache authoritative for the
 *  render; the component's own `refetchInterval` may still fire in the
 *  background, which is expected polling behavior and does not affect the
 *  seeded render. */
function makeSeededQueryClient(): QueryClient {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });
  queryClient.setQueryData(['projects', projectId, 'workflow-runs', run.id, 'rounds'], rounds);
  return queryClient;
}

const meta: Meta<typeof RoundsTimeline> = {
  title: 'Workflows/RoundsTimeline',
  component: RoundsTimeline,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 640 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RoundsTimeline>;

export const Default: Story = {
  render: () => (
    <QueryClientProvider client={makeSeededQueryClient()}>
      <RoundsTimeline projectId={projectId} run={run} token={undefined} agents={agents} />
    </QueryClientProvider>
  ),
};

export const Prism: Story = {
  render: () => (
    <PrismThemeProvider>
      <Box sx={{ bgcolor: 'background.default', p: 3 }}>
        <QueryClientProvider client={makeSeededQueryClient()}>
          <RoundsTimeline projectId={projectId} run={run} token={undefined} agents={agents} />
        </QueryClientProvider>
      </Box>
    </PrismThemeProvider>
  ),
};
