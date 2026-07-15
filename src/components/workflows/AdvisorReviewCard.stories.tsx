import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import { AdvisorReviewCard } from './AdvisorReviewCard';
import type { AdvisorScoreOutput } from '../../types/workflow';

const scored: AdvisorScoreOutput = {
  overall: 8.2,
  dimensions: [
    { name: 'Clarity', value: 9, rationale: 'Reads cleanly end to end.' },
    { name: 'Feasibility', value: 6, rationale: 'Timeline is tight given the dependencies.' },
    { name: 'Risk', value: 4, rationale: 'No rollback plan is described.' },
  ],
  context_path: 'src/core',
};

const statusOnly: AdvisorScoreOutput = {
  overall_status: 'needs_work',
  dimensions: [
    { name: 'Coverage', status: 'clear', rationale: '' },
    { name: 'Edge cases', status: 'needs_work', rationale: 'Empty-input path is unhandled.' },
  ],
};

const meta: Meta<typeof AdvisorReviewCard> = {
  title: 'Workflows/AdvisorReviewCard',
  component: AdvisorReviewCard,
  parameters: { layout: 'padded' },
  args: { stepName: 'Security review', agentType: 'engineering_lead' },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 560 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AdvisorReviewCard>;

export const Reviewing: Story = {
  args: { stepStatus: 'running', isStreaming: true },
};

export const Scored: Story = {
  args: { stepStatus: 'completed', scoreOutput: scored },
};

export const StatusOnly: Story = {
  args: { stepStatus: 'completed', scoreOutput: statusOnly },
};

export const Failed: Story = {
  args: {
    stepStatus: 'failed',
    scoreOutput: { dimensions: [], failed: true, reason: 'scorer timed out after 60s' },
  },
};
