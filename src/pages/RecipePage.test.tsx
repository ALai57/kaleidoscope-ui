import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '../theme';
import RecipePage from './RecipePage';

vi.mock('../auth/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    token: undefined,
    userProfile: null,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

const server = setupServer(
  http.get('/recipes/layer-cake', () =>
    HttpResponse.json({
      id: 'r1',
      recipe_url: 'layer-cake',
      hostname: 'andrewslai.com',
      content: {
        title: 'Layer Cake',
        sections: [
          { name: 'Cake', ingredients: ['2 cups flour'], steps: ['Mix', 'Bake'] },
          { name: 'Frosting', ingredients: ['1 cup butter'], steps: ['Whip'] },
        ],
      },
      labels: [],
      public_visibility: true,
      created_at: '2026-01-01T00:00:00Z',
      modified_at: '2026-01-01T00:00:00Z',
    })
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderPage(): void {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  rtlRender(
    <ThemeProvider theme={makeTheme(BASE_THEME)}>
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/recipes/layer-cake']}>
          <Routes>
            <Route path="/recipes/:slug" element={<RecipePage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

describe('RecipePage', () => {
  it('renders each section with its ingredients and steps', async () => {
    renderPage();
    expect(await screen.findByRole('heading', { name: 'Cake' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Frosting' })).toBeInTheDocument();
    expect(screen.getByText('2 cups flour')).toBeInTheDocument();
    expect(screen.getByText('Whip')).toBeInTheDocument();
  });
});
