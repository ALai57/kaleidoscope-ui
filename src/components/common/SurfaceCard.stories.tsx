import type { Meta, StoryObj } from '@storybook/react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SurfaceCard } from './SurfaceCard';
import { StatusChip } from './StatusChip';

const meta: Meta<typeof SurfaceCard> = {
  title: 'Common/SurfaceCard',
  component: SurfaceCard,
  parameters: { layout: 'centered' },
  argTypes: {
    interactive: { control: 'boolean' },
    restingElevation: { control: { type: 'number', min: 0, max: 24 } },
    hoverElevation: { control: { type: 'number', min: 0, max: 24 } },
  },
};

export default meta;
type Story = StoryObj<typeof SurfaceCard>;

const SampleContent = () => (
  <Box sx={{ p: 2, minWidth: 260 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Project title
      </Typography>
      <StatusChip status="executing" label="executing" variant="filled" sx={{ textTransform: 'capitalize' }} />
    </Box>
    <Typography variant="body2" color="text.secondary">
      Any content composes inside the shared surface.
    </Typography>
  </Box>
);

export const Outlined: Story = {
  args: { children: <SampleContent /> },
};

export const Interactive: Story = {
  args: { interactive: true, children: <SampleContent /> },
};

export const Raised: Story = {
  args: { restingElevation: 2, children: <SampleContent /> },
};
