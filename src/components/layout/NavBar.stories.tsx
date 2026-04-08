import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { NavBar } from './NavBar';

const meta: Meta<typeof NavBar> = {
  title: 'Layout/NavBar',
  component: NavBar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Unauthenticated: Story = {
  args: {
    isAuthenticated: false,
  },
};

export const Authenticated: Story = {
  args: {
    isAuthenticated: true,
    user: { firstName: 'Alice', lastName: 'Smith' },
  },
};

export const SiteAdmin: Story = {
  args: {
    isAuthenticated: true,
    user: {
      firstName: 'Admin',
      realm_access: { roles: ['localhost:admin'] },
    },
  },
};
