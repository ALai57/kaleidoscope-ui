import type { Meta, StoryObj } from '@storybook/react-vite';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { StirrerIcon } from './StirrerIcon';
import { PrismThemeProvider } from '../prism';

const meta: Meta<typeof StirrerIcon> = {
  title: 'Recipes/StirrerIcon',
  component: StirrerIcon,
  parameters: { layout: 'centered' },
  args: { active: true, size: 96 },
};

export default meta;
type Story = StoryObj<typeof StirrerIcon>;

/** The animated cook, on the Prism dark plane where the accent lives. */
export const Active: Story = {
  render: (args) => (
    <PrismThemeProvider>
      <Box sx={{ bgcolor: 'background.default', color: 'primary.main', p: 4 }}>
        <StirrerIcon {...args} />
      </Box>
    </PrismThemeProvider>
  ),
};

/** Static frame (also the `prefers-reduced-motion` fallback). */
export const Static: Story = {
  args: { active: false },
  render: (args) => (
    <PrismThemeProvider>
      <Box sx={{ bgcolor: 'background.default', color: 'primary.main', p: 4 }}>
        <StirrerIcon {...args} />
      </Box>
    </PrismThemeProvider>
  ),
};

/** At button scale, the size it ships in the overlay. */
export const IconScale: Story = {
  render: (args) => (
    <PrismThemeProvider>
      <Stack
        direction="row"
        spacing={3}
        sx={{ bgcolor: 'background.default', color: 'primary.main', p: 4, alignItems: 'center' }}
      >
        <StirrerIcon {...args} size={16} />
        <StirrerIcon {...args} size={20} />
        <StirrerIcon {...args} size={24} />
      </Stack>
    </PrismThemeProvider>
  ),
};
