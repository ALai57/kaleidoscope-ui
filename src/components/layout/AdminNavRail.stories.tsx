import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { MemoryRouter } from 'react-router-dom';
import { AdminNavRail } from './AdminNavRail';

const meta: Meta<typeof AdminNavRail> = {
  title: 'Layout/AdminNavRail',
  component: AdminNavRail,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story, ctx) => (
      <MemoryRouter initialEntries={[(ctx.parameters.route as string) ?? '/projects']}>
        <Box sx={{ display: 'flex', height: '520px' }}>
          <Story />
        </Box>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AdminNavRail>;

export const Unauthenticated: Story = {
  parameters: { route: '/projects' },
};

export const OnWorkflows: Story = {
  parameters: { route: '/workflows' },
  args: { isAuthenticated: true, user: { firstName: 'Andrew' } },
};
