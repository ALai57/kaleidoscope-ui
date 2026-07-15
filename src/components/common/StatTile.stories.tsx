import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import { StatTile } from './StatTile';

const meta: Meta<typeof StatTile> = {
  title: 'Common/StatTile',
  component: StatTile,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof StatTile>;

export const Playground: Story = {
  args: {
    label: 'Active runs',
    value: '128',
    trend: 'up',
    delta: '+12 today',
  },
};

/** A mission-control row: several tiles side by side. */
export const Dashboard: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <StatTile label="Active runs" value="128" status="running" trend="up" delta="+12 today" />
      <StatTile label="Avg latency" value="342" unit="ms" trend="down" delta="-8%" trendTone="success" />
      <StatTile label="Failures" value="3" trend="up" delta="+2" trendTone="error" />
      <StatTile label="Queue depth" value="0" trend="flat" delta="steady" />
    </Box>
  ),
};
