import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import ProjectsPage from './ProjectsPage';
import { makeTheme, BASE_THEME } from '../../theme';

vi.mock('../../auth/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    token: 'test-token',
    userProfile: { firstName: 'Andrew' },
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

import { useIsMobile } from '@/hooks/useIsMobile';
vi.mock('@/hooks/useIsMobile', () => ({ useIsMobile: vi.fn(() => false) }));
const mockUseIsMobile = vi.mocked(useIsMobile);

const server = setupServer(http.get('/projects', () => HttpResponse.json([])));

beforeEach(() => mockUseIsMobile.mockReturnValue(false));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const theme = makeTheme(BASE_THEME, 'default');

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter initialEntries={['/projects']}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('ProjectsPage', () => {
  it('renders inside the AdminLayout shell (top-bar title + rail nav)', () => {
    render(<ProjectsPage />, { wrapper: Wrapper });
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
    // Rail section links — Projects is the active route.
    expect(screen.getByRole('link', { name: 'Workflows' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page');
  });

  it('shows the empty state and its New Project actions', async () => {
    render(<ProjectsPage />, { wrapper: Wrapper });
    await waitFor(() => {
      expect(screen.getByText('No projects yet')).toBeInTheDocument();
    });
    // Top-bar action + empty-state CTA.
    expect(screen.getByRole('button', { name: 'New Project' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create first project/i })).toBeInTheDocument();
  });

  it('hides the graph/list view toggle on mobile', () => {
    mockUseIsMobile.mockReturnValue(true);
    render(<ProjectsPage />, { wrapper: Wrapper });
    // the "graph view" ToggleButton is only rendered on desktop
    expect(screen.queryByRole('button', { name: /graph view/i })).toBeNull();
  });
});
