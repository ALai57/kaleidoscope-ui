import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GroupsPage from './GroupsPage';
import { AuthContext } from '../auth/AuthProvider';
import type { AuthContextValue } from '../auth/AuthProvider';
import { PrismThemeProvider } from '../components/prism';
import type { Group } from '../types/group';

// Render-smoke + visual QA for the GroupsPage Prism re-skin (P3 slice). The page
// runs a `['groups']` query and reads `useAuth()` directly, so this seeds a fresh
// QueryClient's cache with groups that HAVE members (so the accordion member rows
// render) and bridges auth via the real AuthContext.Provider with a mock value.

const groups: Group[] = [
  {
    group_id: 'g1',
    display_name: 'Family',
    memberships: [
      { membership_id: 'm1', membership_created_at: '2026-01-01T00:00:00Z', alias: 'Mom', email: 'mom@example.com' },
      { membership_id: 'm2', membership_created_at: '2026-01-02T00:00:00Z', alias: null, email: 'dad@example.com' },
    ],
  },
  { group_id: 'g2', display_name: 'Close Friends', memberships: [] },
];

const authValue: AuthContextValue = {
  isAuthenticated: true,
  isLoading: false,
  token: 'story-token',
  userProfile: { firstName: 'Admin', realm_access: { roles: ['localhost:admin'] } },
  login: () => {},
  logout: () => {},
};

const makeClient = () => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  client.setQueryData(['groups'], groups);
  return client;
};

const meta: Meta<typeof GroupsPage> = {
  title: 'Pages/GroupsPage',
  component: GroupsPage,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthContext.Provider value={authValue}>
          <QueryClientProvider client={makeClient()}>
            <PrismThemeProvider>
              <Story />
            </PrismThemeProvider>
          </QueryClientProvider>
        </AuthContext.Provider>
      </MemoryRouter>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof GroupsPage>;

export const Default: Story = {};
