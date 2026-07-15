import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ManagerPage from './ManagerPage';

vi.mock('../auth/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    token: 'test-token',
    userProfile: { firstName: 'Admin' },
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

// Stat-strip data sources — fixed-length arrays so the counts are deterministic.
vi.mock('../api/articles', () => ({
  getBranches: vi.fn().mockResolvedValue(new Array(12).fill({})),
}));
vi.mock('../api/images', () => ({
  getImageMetadata: vi.fn().mockResolvedValue(new Array(47).fill({})),
}));
vi.mock('../api/projects', () => ({
  getProjects: vi.fn().mockResolvedValue(new Array(5).fill({})),
}));

const theme = createTheme();

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('ManagerPage', () => {
  it('renders all navigation links', () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    expect(screen.getAllByText('Articles').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Images').length).toBeGreaterThan(0);
    expect(screen.getByText('Audiences')).toBeTruthy();
    expect(screen.getByText('UI Customization')).toBeTruthy();
    expect(screen.getAllByText('Projects').length).toBeGreaterThan(0);
  });

  it('renders article link pointing to /articles', () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    const links = screen.getAllByRole('link');
    expect(links.find((el) => el.getAttribute('href') === '/articles')).toBeTruthy();
  });

  it('renders images link pointing to /images', () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    const links = screen.getAllByRole('link');
    expect(links.find((el) => el.getAttribute('href') === '/images')).toBeTruthy();
  });

  it('renders groups link pointing to /groups', () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    const links = screen.getAllByRole('link');
    expect(links.find((el) => el.getAttribute('href') === '/groups')).toBeTruthy();
  });

  it('renders projects link pointing to /projects', () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    const links = screen.getAllByRole('link');
    expect(links.find((el) => el.getAttribute('href') === '/projects')).toBeTruthy();
  });

  it('renders the live stats strip with fetched counts', async () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    // Counts come from the mocked list endpoints (12 branches, 47 images, 5 projects).
    expect(await screen.findByText('12')).toBeTruthy();
    expect(await screen.findByText('47')).toBeTruthy();
    expect(await screen.findByText('5')).toBeTruthy();
  });
});
