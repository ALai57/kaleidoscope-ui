import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { ArticleBranch } from '../types/article';
import ArticleManagerPage from './ArticleManagerPage';

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('../auth/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    token: 'test-token',
    userProfile: { firstName: 'Admin' },
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

const mockBranches: ArticleBranch[] = [
  {
    branch_id: 'b1',
    branch_name: 'main',
    article_id: 'a1',
    article_url: 'my-first-article',
  },
  {
    branch_id: 'b2',
    branch_name: 'draft',
    article_id: 'a2',
    article_url: 'my-second-article',
  },
];

const server = setupServer(
  http.get('/branches', () => HttpResponse.json(mockBranches))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ── Helpers ────────────────────────────────────────────────────────────────

const theme = createTheme();

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <ThemeProvider theme={theme}>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('ArticleManagerPage', () => {
  it('renders heading', () => {
    render(<ArticleManagerPage />, { wrapper: Wrapper });
    expect(screen.getByText('Article Manager')).toBeTruthy();
  });

  it('renders branch list', async () => {
    render(<ArticleManagerPage />, { wrapper: Wrapper });
    await waitFor(() => {
      expect(screen.getByText('my-first-article')).toBeTruthy();
    });
  });

  it('shows branch count chip', async () => {
    render(<ArticleManagerPage />, { wrapper: Wrapper });
    await waitFor(() => {
      expect(screen.getByText('2 branches')).toBeTruthy();
    });
  });
});
