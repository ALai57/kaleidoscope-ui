import type { Meta, StoryObj } from '@storybook/react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { LiveDot } from './LiveDot';
import { PrismThemeProvider } from '../prism';

const meta: Meta<typeof LiveDot> = {
  title: 'Common/LiveDot',
  component: LiveDot,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof LiveDot>;

export const Playground: Story = {
  args: { size: 8 },
};

/** With a trailing mono label — the common "in progress" affordance. */
export const WithLabel: Story = {
  args: { label: 'Analyzing' },
};

/** `pulse={false}` renders a static dot for settled/non-live states. */
export const Static: Story = {
  args: { label: 'Idle', pulse: false },
};

/** Same dot under the app's default (light) theme and under PrismThemeProvider. */
export const LightAndDark: Story = {
  render: (args) => (
    <Stack direction="row" spacing={4}>
      <Box sx={{ bgcolor: 'background.default', p: 3 }}>
        <LiveDot {...args} />
      </Box>
      <PrismThemeProvider>
        <Box sx={{ bgcolor: 'background.default', p: 3 }}>
          <LiveDot {...args} />
        </Box>
      </PrismThemeProvider>
    </Stack>
  ),
  args: { label: 'Streaming', color: 'success.main' },
};
