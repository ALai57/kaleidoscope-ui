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
      <div>{initialContent}</div>
      <button onClick={() => onChange?.('<p>Updated</p>')}>Update</button>
    </div>
  ),
}));

const mockBranches: ArticleBranch[] = [
  { branch_id: 'b1', branch_name: 'main', article_id: 'a1', article_url: 'my-article' },
];

const mockVersion: ArticleVersion = {
  version_id: 'v1',
  branch_id: 'b1',
  content: '<p>Hello</p>',
  title: 'My Article',
  created_at: '2024-01-01T00:00:00Z',
};

let publishCalled = false;

const server = setupServer(
  http.get('/branches', () => HttpResponse.json(mockBranches)),
  http.get('/branches/:id/versions', () => HttpResponse.json([mockVersion])),
  http.get('/v2/photos', () => HttpResponse.json([])),
  http.post('/articles/:url/branches/:name/versions', () =>
    HttpResponse.json(mockVersion, { status: 201 })
  ),
  http.put('/articles/:url/branches/:name/publish', async () => {
    publishCalled = true;
    return new HttpResponse(null, { status: 204 });
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  publishCalled = false;
});
afterAll(() => server.close());

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

describe('ArticleEditorPage — additional branches', () => {
  it('publish button fires publish mutation', async () => {
    render(<ArticleEditorPage />, { wrapper: Wrapper });

    await waitFor(() => screen.getByTestId('publish-button'));
    fireEvent.click(screen.getByTestId('publish-button'));

    await waitFor(() => {
      expect(publishCalled).toBe(true);
    });
  });

  it('renders with no slug (all branches visible)', async () => {
    function NoSlugWrapper({ children }: { children: React.ReactNode }) {
      return (
        <QueryClientProvider
          client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
        >
          <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['/editor']}>
              <Routes>
                <Route path="/editor" element={children} />
              </Routes>
            </MemoryRouter>
          </ThemeProvider>
        </QueryClientProvider>
      );
    }
    render(<ArticleEditorPage />, { wrapper: NoSlugWrapper });
    await waitFor(() => screen.getByText('Article Editor'));
    expect(screen.getByText('Article Editor')).toBeTruthy();
  });
});
