import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { CatalogCard } from './CatalogCard';
import { renderWithProviders, makeTestQueryClient } from './testHelpers';
import type { Recommendation } from '../../types/interest';

const rec: Recommendation = {
  id: 'r1', interest_id: 'i1', kind: 'article', title: 'Power & Silicon',
  source: 'PBS Frontline', url: 'https://x', est_time: '18 min',
  why: 'Matches your interest in tech and power', origin: 'novel',
  status: 'shelved', added_at: '2026-07-14T00:00:00Z',
};

const server = setupServer(
  http.put('/interests/i1/recommendations/r1', () =>
    HttpResponse.json({ ...rec, status: 'archived', origin: 'novel', kind: 'article', 'interest-id': 'i1', 'est-time': '18 min', 'added-at': '2026-07-14T00:00:00Z' })),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CatalogCard', () => {
  it('shows the catalog code, title, source, est time, why, and a NEW SOURCE tag for novel items', () => {
    renderWithProviders(<CatalogCard rec={rec} interestId="i1" token={undefined} />);
    expect(screen.getByText('ART')).toBeInTheDocument();
    expect(screen.getByText('Power & Silicon')).toBeInTheDocument();
    expect(screen.getByText('PBS Frontline')).toBeInTheDocument();
    expect(screen.getByText('18 min')).toBeInTheDocument();
    expect(screen.getByText(/Matches your interest/)).toBeInTheDocument();
    expect(screen.getByText('NEW SOURCE')).toBeInTheDocument();
  });

  it('shows a TRUSTED tag for trusted items', () => {
    renderWithProviders(<CatalogCard rec={{ ...rec, origin: 'trusted' }} interestId="i1" token={undefined} />);
    expect(screen.getByText('TRUSTED')).toBeInTheDocument();
  });

  it('archives via the status menu', async () => {
    const client = makeTestQueryClient();
    const spy = vi.spyOn(client, 'invalidateQueries');
    renderWithProviders(<CatalogCard rec={rec} interestId="i1" token={undefined} canEdit />, { client });
    await userEvent.click(screen.getByRole('button', { name: /card actions/i }));
    await userEvent.click(screen.getByRole('menuitem', { name: /archive/i }));
    await waitFor(() => expect(spy).toHaveBeenCalledWith({ queryKey: ['interests', 'i1', 'shelf'] }));
  });

  it('links the title to the source url', () => {
    renderWithProviders(<CatalogCard rec={rec} interestId="i1" token={undefined} />);
    expect(screen.getByRole('link', { name: /Power & Silicon/ })).toHaveAttribute('href', 'https://x');
  });

  it('hides the writer-only card actions menu by default (public read-only shelf)', () => {
    renderWithProviders(<CatalogCard rec={rec} interestId="i1" token={undefined} />);
    expect(screen.queryByRole('button', { name: /card actions/i })).toBeNull();
  });

  it('shows the card actions menu when canEdit is true', () => {
    renderWithProviders(<CatalogCard rec={rec} interestId="i1" token={undefined} canEdit />);
    expect(screen.getByRole('button', { name: /card actions/i })).toBeInTheDocument();
  });
});
