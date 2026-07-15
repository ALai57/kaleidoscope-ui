import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import WorkflowStepper from './WorkflowStepper';
import { PrismThemeProvider } from '../prism';
import type { Agent } from '../../types/agent';
import type { StepRun } from '../../types/workflow';

// Render-smoke + visual QA for Task 4 of the Workflow Progress Internals → Prism
// initiative: proves the running step's LiveDot, mono status labels, and the
// persona avatar's accent pulse render correctly in both the app's default
// (light) theme and under PrismThemeProvider.
//
// WorkflowStepper takes step data as props (no query dependency), so this
// story seeds a small StepRun fixture directly — no network/QueryClient needed.

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

const steps: StepRun[] = [
  {
    id: 'step-1',
    step_id: 'brief',
    position: 0,
    name: 'Draft brief',
    description: 'Coach drafts the initial brief.',
    agent_type: 'coach',
    is_custom: false,
    status: 'completed',
    output: 'The brief is ready for review.',
    started_at: startedAt,
    completed_at: startedAt,
  },
  {
    id: 'step-2',
    step_id: 'review',
    position: 1,
    name: 'Engineering review',
    description: 'Engineering lead reviews feasibility.',
    agent_type: 'engineering_lead',
    is_custom: false,
    status: 'running',
    started_at: startedAt,
  },
  {
    id: 'step-3',
    step_id: 'clarify',
    position: 2,
    name: 'Clarify scope',
    description: 'Waiting on user input to proceed.',
    agent_type: 'coach',
    is_custom: false,
    status: 'awaiting_input',
    started_at: startedAt,
  },
  {
    id: 'step-4',
    step_id: 'tasks',
    position: 3,
    name: 'Generate tasks',
    description: 'Not started yet.',
    agent_type: 'engineering_lead',
    is_custom: false,
    status: 'pending',
  },
];

const meta: Meta<typeof WorkflowStepper> = {
  title: 'Workflows/WorkflowStepper',
  component: WorkflowStepper,
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
type Story = StoryObj<typeof WorkflowStepper>;

export const Default: Story = {
  args: {
    steps,
    streamingStepId: 'step-2',
    streamingOutput: 'Reviewing the feasibility of the rollout plan…',
    agents,
  },
};

export const Prism: Story = {
  render: (args) => (
    <PrismThemeProvider>
      <Box sx={{ bgcolor: 'background.default', p: 3 }}>
        <WorkflowStepper {...args} />
      </Box>
    </PrismThemeProvider>
  ),
  args: {
    steps,
    streamingStepId: 'step-2',
    streamingOutput: 'Reviewing the feasibility of the rollout plan…',
    agents,
  },
};
