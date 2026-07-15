import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { CheckInDialog } from './CheckInDialog';
import { renderWithProviders } from './testHelpers';
import type { Interest } from '../../types/interest';

const interest: Interest = {
  id: 'i1', user_id: 'u', intent: 'Tech and power',
  taste_profile: { trusted_sources: ['PBS Frontline'], novelty_ratio: 0.5 },
  created_at: 'x', updated_at: 'x',
};

let lastRecPut: { id: string; body: unknown } | null = null;
let lastInterestPut: unknown = null;
const server = setupServer(
  http.get('/interests/i1/recommendations', () => HttpResponse.json([
    { id: 'r1', 'interest-id': 'i1', kind: 'article', title: 'Novel One', source: 'The Verge', url: 'https://a', 'est-time': '9 min', why: 'w', origin: 'novel', status: 'shelved', 'added-at': 'x' },
  ])),
  http.put('/interests/i1/recommendations/r1', async ({ request }) => {
    lastRecPut = { id: 'r1', body: await request.json() };
    return HttpResponse.json({ id: 'r1', 'interest-id': 'i1', kind: 'article', title: 'Novel One', source: 'The Verge', url: 'https://a', 'est-time': '9 min', why: 'w', origin: 'novel', status: 'shelved', 'added-at': 'x' });
  }),
  http.put('/interests/i1', async ({ request }) => {
    lastInterestPut = await request.json();
    return HttpResponse.json({ ...interest, 'user-id': 'u', 'taste-profile': { 'trusted-sources': ['PBS Frontline', 'The Verge'] }, 'created-at': 'x', 'updated-at': 'x' });
  }),
);
beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers(); lastRecPut = null; lastInterestPut = null; });
afterAll(() => server.close());

describe('CheckInDialog', () => {
  it('marks an item as landed (keeps it shelved) and offers to promote its novel source', async () => {
    renderWithProviders(<CheckInDialog open onClose={vi.fn()} interest={interest} token={undefined} />);
    expect(await screen.findByText('Novel One')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /landed/i }));
    // promotion offer for the novel source
    const promote = await screen.findByRole('button', { name: /promote The Verge/i });
    await userEvent.click(promote);
    await waitFor(() => expect(lastInterestPut).toMatchObject({ 'taste-profile': { 'trusted-sources': ['PBS Frontline', 'The Verge'] } }));
  });

  it('archives an item marked not for me', async () => {
    renderWithProviders(<CheckInDialog open onClose={vi.fn()} interest={interest} token={undefined} />);
    await screen.findByText('Novel One');
    await userEvent.click(screen.getByRole('button', { name: /not for me/i }));
    await waitFor(() => expect(lastRecPut).toEqual({ id: 'r1', body: { status: 'archived' } }));
  });
});
