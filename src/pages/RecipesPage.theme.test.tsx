import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';
import { render } from '../test/testUtils';
import RecipesPage from './RecipesPage';

vi.mock('../auth/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    token: undefined,
    userProfile: null,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

// Probe the ambient color mode from a recipe card — content that used to be
// pinned dark by PrismThemeProvider.
vi.mock('../components/recipes/RecipeCard', () => ({
  RecipeCard: () => {
    const { palette } = useTheme();
    return <div data-testid="recipe-probe" data-mode={palette.mode} />;
  },
}));

const server = setupServer(
  http.get('/recipes', () =>
    HttpResponse.json([
      {
        id: 'r1',
        recipe_url: 'chana-masala',
        hostname: 'andrewslai.com',
        content: { title: 'Chana Masala', sections: [{ name: null, ingredients: ['chickpeas'], steps: [] }] },
        labels: [],
        public_visibility: true,
        created_at: '2026-01-01T00:00:00Z',
        modified_at: '2026-01-01T00:00:00Z',
      },
    ])
  ),
  http.get('/recipe-labels', () => HttpResponse.json([]))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('RecipesPage theme', () => {
  it('renders recipe cards under the ambient app theme (obeys light/dark)', async () => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    // testUtils.render provides the light default app theme.
    render(
      <QueryClientProvider client={qc}>
        <RecipesPage />
      </QueryClientProvider>
    );
    const probe = await screen.findByTestId('recipe-probe');
    expect(probe.getAttribute('data-mode')).toBe('light');
  });
});
