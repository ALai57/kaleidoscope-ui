import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { Article } from '../types/article';
import ArticlePage, { ArchiveView } from './ArticlePage';

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('../auth/useKeycloak', () => ({
  useKeycloak: () => ({
    isAuthenticated: false,
    token: undefined,
    userProfile: null,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

vi.mock('../components/editor/RichTextEditor', () => ({
  RichTextEditor: ({ initialContent }: { initialContent: string }) => (
    <div data-testid="rich-text-editor">{initialContent}</div>
  ),
}));

const mockArticle: Article = {
  article_id: 'a1',
  article_url: 'my-first-article',
  article_title: 'My First Article',
  article_tags: 'thoughts',
  public_visibility: true,
  created_at: '2024-01-15T00:00:00Z',
};

const server = setupServer(
  http.get('/compositions/my-first-article', () => HttpResponse.json(mockArticle)),
  http.get('/compositions', () => HttpResponse.json([mockArticle])),
  http.get('/compositions/not-found', () => new HttpResponse(null, { status: 404 }))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ── Helpers ────────────────────────────────────────────────────────────────

const theme = createTheme();

function makeClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false } } });
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={makeClient()}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('ArticlePage', () => {
  it('renders article title after loading', async () => {
    render(
      <QueryClientProvider client={makeClient()}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={['/content/my-first-article']}>
            <Routes>
              <Route path="/content/:slug" element={<ArticlePage />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('My First Article')).toBeTruthy();
    });
  });

  it('shows not found message on 404', async () => {
    render(
      <QueryClientProvider client={makeClient()}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={['/content/not-found']}>
            <Routes>
              <Route path="/content/:slug" element={<ArticlePage />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/article not found/i)).toBeTruthy();
    });
  });
});

describe('ArchiveView', () => {
  it('renders list of articles', async () => {
    render(<ArchiveView />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText('My First Article')).toBeTruthy();
    });
  });
});
