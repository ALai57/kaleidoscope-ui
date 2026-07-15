import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import { RoundCard } from './RoundCard';
import type { WorkflowRoundDetail } from '../../types/workflow';

const startedAt = '2026-01-01T00:00:00Z';

const proceedRound: WorkflowRoundDetail = {
  round_number: 2,
  status: 'completed',
  started_at: startedAt,
  brief: { version: 3, content: '' },
  judge: {
    decision: {
      action: 'proceed',
      summary: 'Scores cleared their thresholds — moving to task generation.',
      rationale: 'Both advisors are above the required bar after this round.',
      trade_offs: [
        {
          name: 'Speed vs. safety',
          description: 'Ship faster with a manual rollback, or slower with automation.',
          resolution: 'Chose the automated rollback path.',
          resolved_autonomously: true,
        },
      ],
      recommendations: [
        { action: 'Document the rollback runbook', rationale: 'Ops will need it on launch day.', who: 'user', priority: 'high' },
        { action: 'Cache advisor scores', rationale: 'Avoids recomputing on retry.', who: 'system', priority: 'low' },
      ],
    },
    summary: 'Scores cleared their thresholds — moving to task generation.',
    rationale: 'Both advisors are above the required bar after this round.',
    score_snapshot: {
      coach: { overall: 8.1, dimensions: [{ name: 'Clarity', value: 8, rationale: 'Reads cleanly.' }] },
      engineering_lead: {
        overall: 6.5,
        dimensions: [{ name: 'Feasibility', value: 6, rationale: 'Timeline is tight but workable.' }],
      },
    },
    policy: { max_rounds: 3, current_round: 2 },
    brief_version: 3,
  },
};

const clarifyRound: WorkflowRoundDetail = {
  round_number: 1,
  status: 'in_progress',
  started_at: startedAt,
  judge: {
    decision: {
      action: 'clarify',
      questions: ['Which platforms are in scope?', 'What is the budget ceiling?'],
      summary: 'A few open questions before the team can proceed.',
      rationale: 'Scope and budget are ambiguous.',
    },
    summary: 'A few open questions before the team can proceed.',
    rationale: 'Scope and budget are ambiguous.',
    score_snapshot: { coach: { overall: 5, dimensions: [] } },
    policy: { max_rounds: 3, current_round: 1 },
  },
};

const thresholds = { coach: 7, engineering_lead: 6 };

const meta: Meta<typeof RoundCard> = {
  title: 'Workflows/RoundCard',
  component: RoundCard,
  parameters: { layout: 'padded' },
  args: { thresholds },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 560 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RoundCard>;

export const Analyzing: Story = {
  args: { round: { round_number: 1, status: 'in_progress', started_at: startedAt } },
};

export const Proceed: Story = {
  args: { round: proceedRound },
};

export const AwaitingInput: Story = {
  args: { round: clarifyRound, awaitingInput: true },
};
