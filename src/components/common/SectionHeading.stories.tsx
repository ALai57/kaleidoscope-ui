import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { SectionHeading } from './SectionHeading';

const meta: Meta<typeof SectionHeading> = {
  title: 'Common/SectionHeading',
  component: SectionHeading,
  parameters: { layout: 'padded' },
  argTypes: {
    level: { control: 'radio', options: ['h2', 'h3', 'h4'] },
    align: { control: 'radio', options: ['left', 'center'] },
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 640 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SectionHeading>;

export const Playground: Story = {
  args: { eyebrow: '// PROFILE', title: 'About', level: 'h3' },
};

export const WithAction: Story = {
  args: {
    eyebrow: '// WRITING',
    title: 'Recent Writing',
    action: (
      <Link href="#" variant="body2">
        View all →
      </Link>
    ),
  },
};

export const Centered: Story = {
  args: { eyebrow: '// EXPERIENCE', title: 'Career History', align: 'center', level: 'h2' },
};

export const NoEyebrow: Story = {
  args: { title: 'Skills', level: 'h4' },
};
