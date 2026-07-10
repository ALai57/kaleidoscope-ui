import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import AgentCard from './AgentCard';
import type { Agent } from '../../types/agent';

const base: Agent = {
  id: 'a-1',
  agent_type: 'coach',
  name: 'Coach',
  short_name: 'Coach',
  avatar: '🧭',
  color: '#6750A4',
  system_prompt: 'You are a supportive coach who helps the team stay focused.',
  is_default: false,
};

const meta: Meta<typeof AgentCard> = {
  title: 'Agents/AgentCard',
  component: AgentCard,
  parameters: { layout: 'centered' },
  args: { onEdit: () => {} },
  decorators: [
    (Story) => (
      <Box sx={{ width: 240 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AgentCard>;

export const Default: Story = { args: { agent: base } };
export const IsDefault: Story = { args: { agent: { ...base, is_default: true } } };
export const Engineering: Story = {
  args: {
    agent: {
      ...base,
      agent_type: 'engineering_lead',
      name: 'Eng Lead',
      short_name: 'Eng',
      avatar: '🛠️',
      color: '#1139c9',
    },
  },
};
