import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { Article } from '../types/article';
import HomePage from './HomePage';

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('../auth/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    token: undefined,
    userProfile: null,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

const mockArticles: Article[] = [
  {
    article_id: 'a1',
    article_url: 'hello-world',
    article_title: 'Hello World',
    article_tags: 'thoughts',
    public_visibility: true,
    created_at: '2024-01-01T00:00:00Z',
  },
];

const server = setupServer(
  http.get('/compositions', () => HttpResponse.json(mockArticles))
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

describe('HomePage', () => {
  it('renders the name heading', () => {
    render(<HomePage />, { wrapper: Wrapper });
    expect(screen.getByText('Andrew Lai')).toBeTruthy();
  });

  it('renders toggle buttons', () => {
    render(<HomePage />, { wrapper: Wrapper });
    expect(screen.getByText('Personal')).toBeTruthy();
    expect(screen.getByText('Professional')).toBeTruthy();
    expect(screen.getByText('CV')).toBeTruthy();
  });

  it('renders recent articles from API', async () => {
    render(<HomePage />, { wrapper: Wrapper });
    await waitFor(() => {
      expect(screen.getByText('Hello World')).toBeTruthy();
    });
  });
});
