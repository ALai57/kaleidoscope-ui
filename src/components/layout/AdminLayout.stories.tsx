import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { MemoryRouter } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';

const meta: Meta<typeof AdminLayout> = {
  title: 'Layout/AdminLayout',
  component: AdminLayout,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/projects']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AdminLayout>;

export const Default: Story = {
  args: {
    title: 'Projects',
    isAuthenticated: true,
    user: { firstName: 'Andrew' },
    actions: (
      <Button variant="contained" size="small" startIcon={<AddIcon />}>
        New Project
      </Button>
    ),
    children: (
      <Typography variant="body1" sx={{
        color: "text.secondary"
      }}>
        Page content sits here, to the right of the rail and under the top bar.
      </Typography>
    ),
  },
};
