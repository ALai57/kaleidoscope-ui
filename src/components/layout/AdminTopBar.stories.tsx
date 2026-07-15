import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { AdminTopBar } from './AdminTopBar';

const meta: Meta<typeof AdminTopBar> = {
  title: 'Layout/AdminTopBar',
  component: AdminTopBar,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof AdminTopBar>;

export const Default: Story = {
  args: { title: 'Projects' },
};

export const WithActions: Story = {
  args: {
    title: 'Projects',
    actions: (
      <Button variant="contained" size="small" startIcon={<AddIcon />}>
        New Project
      </Button>
    ),
  },
};
