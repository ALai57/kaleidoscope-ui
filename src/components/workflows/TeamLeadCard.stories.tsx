import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { TeamLeadCard } from './TeamLeadCard';
import type { JudgeDecisionOutput } from '../../types/workflow';

const refine: JudgeDecisionOutput = {
  action: 'refine',
  agent_to_refine: 'pm',
  refinement_prompt: 'Tighten the success metrics.',
  summary: 'Sending the brief back to the PM for sharper metrics.',
  rationale: 'The current success criteria are not measurable.',
};

const clarify: JudgeDecisionOutput = {
  action: 'clarify',
  questions: ['What is the launch deadline?', 'Which tenants are in scope?'],
  summary: 'A couple of open questions before we can proceed.',
  rationale: 'Scope and timing are ambiguous.',
};

const proceed: JudgeDecisionOutput = {
  action: 'proceed',
  unresolved: ['Exact rollout order'],
  summary: 'Brief is solid — generating the task list.',
  rationale: 'All critical dimensions are clear.',
};

const meta: Meta<typeof TeamLeadCard> = {
  title: 'Workflows/TeamLeadCard',
  component: TeamLeadCard,
  parameters: { layout: 'padded' },
  args: { stepRunId: 's1', onRespond: () => {}, onSkip: () => {} },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 560 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TeamLeadCard>;

export const Reviewing: Story = {
  args: { stepStatus: 'running', isStreaming: true },
};

export const Refine: Story = {
  args: { stepStatus: 'completed', decisionOutput: refine },
};

export const Clarify: Story = {
  args: { stepStatus: 'awaiting_input', decisionOutput: clarify },
};

export const ClarifySubmitted: Story = {
  args: { stepStatus: 'completed', decisionOutput: clarify },
};

export const Proceed: Story = {
  args: { stepStatus: 'completed', decisionOutput: proceed },
};

export const ProceedGenerating: Story = {
  args: { stepStatus: 'completed', decisionOutput: proceed, taskGenRunning: true },
};
