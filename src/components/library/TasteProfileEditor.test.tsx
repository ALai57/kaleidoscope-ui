import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { TasteProfileEditor } from './TasteProfileEditor';
import { renderWithProviders } from './testHelpers';
import type { Interest } from '../../types/interest';

const interest: Interest = {
  id: 'i1', user_id: 'u', intent: 'Tech and power',
  taste_profile: {
    keywords: ['surveillance'], formats: ['article'], lengths: ['under 20 min'],
    trusted_sources: ['PBS Frontline'], novelty_ratio: 0.5, cadence: 'weekly',
  },
  created_at: '2026-07-14T00:00:00Z', updated_at: '2026-07-14T00:00:00Z',
};

let lastPutBody: unknown = null;
const server = setupServer(
  http.put('/interests/i1', async ({ request }) => {
    lastPutBody = await request.json();
    return HttpResponse.json({ ...interest, 'user-id': 'u', 'taste-profile': { 'novelty-ratio': 0.8 }, 'created-at': interest.created_at, 'updated-at': interest.updated_at });
  }),
);
beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers(); lastPutBody = null; });
afterAll(() => server.close());

describe('TasteProfileEditor', () => {
  it('renders existing profile values', () => {
    renderWithProviders(<TasteProfileEditor interest={interest} token={undefined} />);
    expect(screen.getByText('surveillance')).toBeInTheDocument();
    expect(screen.getByText('PBS Frontline')).toBeInTheDocument();
    const dial = screen.getByRole('slider', { name: /novelty/i }) as HTMLInputElement;
    expect(dial.value).toBe('0.5');
  });

  it('adds a trusted source', async () => {
    renderWithProviders(<TasteProfileEditor interest={interest} token={undefined} />);
    await userEvent.type(screen.getByLabelText(/add trusted source/i), 'The Hill{enter}');
    expect(screen.getByText('The Hill')).toBeInTheDocument();
  });

  it('saves the whole taste profile (dial + sources) in one PUT', async () => {
    renderWithProviders(<TasteProfileEditor interest={interest} token={undefined} />);
    // jsdom doesn't emulate range drag; set the value directly and dispatch input.
    const dial = screen.getByRole('slider', { name: /novelty/i }) as HTMLInputElement;
    fireEvent.change(dial, { target: { value: '0.8' } });
    await userEvent.click(screen.getByRole('button', { name: /save profile/i }));
    await waitFor(() => expect(lastPutBody).not.toBeNull());
    expect(lastPutBody).toMatchObject({ 'taste-profile': { 'novelty-ratio': 0.8, 'trusted-sources': ['PBS Frontline'] } });
  });
});
