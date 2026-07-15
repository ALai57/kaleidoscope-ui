import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import { PresetPicker } from './PresetPicker';

const meta: Meta<typeof PresetPicker> = {
  title: 'Common/PresetPicker',
  component: PresetPicker,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 560 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PresetPicker>;

export const Default: Story = {};
