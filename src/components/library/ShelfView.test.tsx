import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { ShelfView } from './ShelfView';
import { renderWithProviders } from './testHelpers';

const shelf = [
  { id: 'r1', 'interest-id': 'i1', kind: 'article', title: 'Alpha', source: 'PBS', url: 'https://a', 'est-time': '10 min', why: 'w1', origin: 'trusted', status: 'shelved', 'added-at': '2026-07-14T00:00:00Z' },
  { id: 'r2', 'interest-id': 'i1', kind: 'podcast', title: 'Beta', source: 'NPR', url: 'https://b', 'est-time': '40 min', why: 'w2', origin: 'novel', status: 'shelved', 'added-at': '2026-07-14T00:00:00Z' },
];

const server = setupServer(
  http.get('/interests/i1/recommendations', ({ request }) => {
    const kind = new URL(request.url).searchParams.get('kind');
    return HttpResponse.json(kind ? shelf.filter((r) => r.kind === kind) : shelf);
  }),
  http.get('/interests/empty/recommendations', () => HttpResponse.json([])),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ShelfView', () => {
  it('renders a card per shelved item and a chip per present kind', async () => {
    renderWithProviders(<ShelfView interestId="i1" token={undefined} />);
    expect(await screen.findByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /podcast/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /article/i })).toBeInTheDocument();
  });

  it('filters the shelf when a kind chip is pressed', async () => {
    renderWithProviders(<ShelfView interestId="i1" token={undefined} />);
    await screen.findByText('Alpha');
    await userEvent.click(screen.getByRole('button', { name: /podcast/i }));
    await waitFor(() => expect(screen.queryByText('Alpha')).not.toBeInTheDocument());
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('shows an empty state when the shelf has no items', async () => {
    renderWithProviders(<ShelfView interestId="empty" token={undefined} />);
    expect(await screen.findByText(/shelf is empty/i)).toBeInTheDocument();
  });
});
