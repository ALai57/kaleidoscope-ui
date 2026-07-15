import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NavBar } from './NavBar';
import { makeTheme, PRESETS } from '../../theme';

const meta: Meta<typeof NavBar> = {
  title: 'Layout/NavBar',
  component: NavBar,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/about']}>
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

// The same NavBar under the Prism preset (cyan accent, 6px radii, spring
// motion) — proving the bar re-skins purely from the preset's tokens. Prism
// defaults to dark mode, where its accent is designed to live.
export const PrismPreset: Story = {
  args: {
    isAuthenticated: true,
    user: { firstName: 'Admin', realm_access: { roles: ['localhost:admin'] } },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={makeTheme(PRESETS.prism.seed, 'prism')} defaultMode="dark">
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};
