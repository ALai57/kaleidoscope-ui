import type { Meta, StoryObj } from '@storybook/react';
import Stack from '@mui/material/Stack';
import { StatusChip } from './StatusChip';

const meta: Meta<typeof StatusChip> = {
  title: 'Common/StatusChip',
  component: StatusChip,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['small', 'medium'] },
    variant: { control: 'radio', options: ['filled', 'outlined'] },
  },
};

export default meta;
type Story = StoryObj<typeof StatusChip>;

export const Playground: Story = {
  args: { status: 'in_progress' },
};

/** Every tone with its default label. */
export const AllTones: Story = {
  render: (args) => (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <StatusChip {...args} status="success" />
      <StatusChip {...args} status="warning" />
      <StatusChip {...args} status="error" />
      <StatusChip {...args} status="info" />
      <StatusChip {...args} status="pending" />
      <StatusChip {...args} status="neutral" label="Draft" />
    </Stack>
  ),
};

/** Domain statuses resolve to the right tone (e.g. completed → success). */
export const DomainStatuses: Story = {
  render: (args) => (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <StatusChip {...args} status="completed" />
      <StatusChip {...args} status="failed" />
      <StatusChip {...args} status="awaiting_input" />
      <StatusChip {...args} status="in_progress" />
      <StatusChip {...args} status="pending" />
    </Stack>
  ),
};

export const Filled: Story = {
  args: { status: 'completed', variant: 'filled' },
};
