import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '../test/testUtils';
import RecipesPage from './RecipesPage';

vi.mock('../auth/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    token: 'test-token',
    userProfile: { firstName: 'Admin' },
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

let lastRecipesUrl = '';

const server = setupServer(
  http.get('/recipes', ({ request }) => {
    lastRecipesUrl = request.url;
    return HttpResponse.json([
      {
        id: 'r1',
        recipe_url: 'chana-masala',
        hostname: 'andrewslai.com',
        content: {
          title: 'Chana Masala',
          sections: [{ name: null, ingredients: ['chickpeas', 'flour'], steps: [] }],
        },
        labels: [{ id: 'l1', name: 'indian', group_id: 'g1', group_name: 'ethnicity' }],
        public_visibility: true,
        created_at: '2026-01-01T00:00:00Z',
        modified_at: '2026-01-01T00:00:00Z',
      },
    ]);
  }),
  http.get('/recipe-labels', () =>
    HttpResponse.json([{ id: 'l1', name: 'indian', group_id: 'g1', group_name: 'ethnicity' }])
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderPage(): void {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={qc}>
      <RecipesPage />
    </QueryClientProvider>
  );
}

describe('RecipesPage', () => {
  it('lists recipes with their labels and shows writer actions', async () => {
    renderPage();
    expect(await screen.findByText('Chana Masala')).toBeInTheDocument();
    expect(screen.getAllByText('ethnicity/indian').length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /New recipe/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Manage labels/i })).toBeInTheDocument();
  });

  it('drives the ingredient filter into the query params', async () => {
    renderPage();
    await screen.findByText('Chana Masala');
    fireEvent.change(screen.getByLabelText('Search ingredient'), { target: { value: 'flour' } });
    await waitFor(() => expect(lastRecipesUrl).toContain('ingredient=flour'), { timeout: 2000 });
  });

  it('drives the label filter into the query params when a chip is clicked', async () => {
    renderPage();
    // the filter chip row + card chip both render; click the filter chip (first)
    const chips = await screen.findAllByText('ethnicity/indian');
    fireEvent.click(chips[0] as HTMLElement);
    await waitFor(() => expect(lastRecipesUrl).toContain('label-id=l1'));
  });
});
