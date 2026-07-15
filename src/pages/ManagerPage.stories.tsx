import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ManagerPage from './ManagerPage';
import { PrismThemeProvider } from '../components/prism';
import { AuthContext } from '../auth/AuthProvider';
import type { AuthContextValue } from '../auth/AuthProvider';

// Render-smoke + visual QA for the Manager hub (P2 slice 4). ManagerPage runs
// three list queries to feed the StatTile strip; this story seeds a fresh
// QueryClient's cache under the exact keys the page uses (`['branches']`,
// `['images']`, `['projects']`) so the real page tree renders immediately with
// representative counts, no network required. Wrapped in PrismThemeProvider so
// the story shows the intended dark mission-control treatment.

const makeClient = () => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  client.setQueryData(['branches'], new Array(12).fill({}));
  client.setQueryData(['images'], new Array(47).fill({}));
  client.setQueryData(['projects'], new Array(5).fill({}));
  return client;
};

// ManagerPage reads useAuth() directly, which throws outside a real
// AuthProvider (it wraps Auth0Provider — not available in Storybook, which
// has no Auth0 tenant to talk to). Storybook has no page-level auth-mocking
// convention yet (existing page stories don't render an auth-reading page —
// e.g. NavBar.stories.tsx drives NavBar directly via props, sidestepping
// useAuth entirely), so this supplies a minimal authenticated value through
// the same AuthContext the real AuthProvider populates — the same shape
// ManagerPage.test.tsx mocks via `vi.mock('../auth/useAuth', ...)`, just
// wired through the context Storybook can actually provide.
const mockAuthValue: AuthContextValue = {
  isAuthenticated: true,
  isLoading: false,
  token: 'story-token',
  userProfile: { firstName: 'Admin', realm_access: { roles: ['localhost:admin'] } },
  login: () => {},
  logout: () => {},
};

const meta: Meta<typeof ManagerPage> = {
  title: 'Pages/ManagerPage',
  component: ManagerPage,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
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

type Story = StoryObj<typeof ManagerPage>;

export const Hub: Story = {};
