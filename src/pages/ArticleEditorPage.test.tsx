import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { ArticleBranch, ArticleVersion } from '../types/article';
import ArticleEditorPage from './ArticleEditorPage';

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

vi.mock('../components/editor/RichTextEditor', () => ({
  RichTextEditor: ({
    initialContent,
    onChange,
  }: {
    initialContent: string;
    onChange?: (html: string) => void;
  }) => (
    <div data-testid="rich-text-editor">
      <div data-testid="editor-content">{initialContent}</div>
      <button onClick={() => onChange?.('<p>Updated content</p>')}>Update content</button>
    </div>
  ),
}));

const mockBranches: ArticleBranch[] = [
  {
    branch_id: 'b1',
    branch_name: 'main',
    article_id: 'a1',
    article_url: 'my-article',
  },
];

const mockVersion: ArticleVersion = {
  version_id: 'v1',
  branch_id: 'b1',
  content: '<p>Hello world</p>',
  title: 'My Article',
  created_at: '2024-01-01T00:00:00Z',
};

let saveCalled = false;

const server = setupServer(
  http.get('/branches', () => HttpResponse.json(mockBranches)),
  http.get('/branches/:id/versions', () => HttpResponse.json([mockVersion])),
  http.get('/v2/photos', () => HttpResponse.json([])),
  http.post('/articles/:url/branches/:name/versions', async () => {
    saveCalled = true;
    return HttpResponse.json(mockVersion, { status: 201 });
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  saveCalled = false;
});
afterAll(() => server.close());

// ── Helpers ────────────────────────────────────────────────────────────────

const theme = createTheme();

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/articles/my-article/edit']}>
          <Routes>
            <Route path="/articles/:slug/edit" element={children} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('ArticleEditorPage', () => {
  it('renders heading', () => {
    render(<ArticleEditorPage />, { wrapper: Wrapper });
    expect(screen.getByText('Article Editor')).toBeTruthy();
  });

  it('renders RichTextEditor with version content', async () => {
    render(<ArticleEditorPage />, { wrapper: Wrapper });
    await waitFor(() => {
      expect(screen.getByTestId('rich-text-editor')).toBeTruthy();
    });
    await waitFor(() => {
      expect(screen.getByText('<p>Hello world</p>')).toBeTruthy();
    });
  });

  it('renders branch selector', async () => {
    render(<ArticleEditorPage />, { wrapper: Wrapper });
    await waitFor(() => {
      expect(screen.getByTestId('branch-selector')).toBeTruthy();
    });
  });

  it('save button fires mutation', async () => {
    render(<ArticleEditorPage />, { wrapper: Wrapper });

    await waitFor(() => screen.getByTestId('save-button'));

    fireEvent.click(screen.getByTestId('save-button'));

    await waitFor(() => {
      expect(saveCalled).toBe(true);
    });
  });
});
