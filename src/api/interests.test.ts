import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import {
  getInterests, createInterest, updateInterest, deleteInterest,
  getShelf, updateRecommendationStatus, curate, respondToCurationStep,
} from './interests';

// Real API returns kebab-case; the client converts to snake_case.
const interestWire = {
  id: 'i1', 'user-id': 'reader@example.com', intent: 'Modern jazz history',
  'taste-profile': { 'novelty-ratio': 0.5, 'trusted-sources': ['PBS Frontline'] },
  'project-id': 'p1', 'created-at': '2026-07-14T00:00:00Z', 'updated-at': '2026-07-14T00:00:00Z',
};
const recWire = {
  id: 'r1', 'interest-id': 'i1', kind: 'article', title: 'A Piece', source: 'PBS Frontline',
  url: 'https://x', 'est-time': '18 min', why: 'because', origin: 'trusted',
  status: 'shelved', 'added-at': '2026-07-14T00:00:00Z',
};

let lastBody: unknown = null;
let lastUrl = '';
const server = setupServer(
  http.get('/interests', () => HttpResponse.json([interestWire])),
  http.post('/interests', async ({ request }) => {
    lastBody = await request.json();
    return HttpResponse.json(interestWire);
  }),
  http.put('/interests/i1', async ({ request }) => {
    lastBody = await request.json();
    return HttpResponse.json({ ...interestWire, 'taste-profile': { 'novelty-ratio': 0.8 } });
  }),
  http.delete('/interests/i1', () => new HttpResponse(null, { status: 204 })),
  http.get('/interests/i1/recommendations', ({ request }) => {
    lastUrl = request.url;
    return HttpResponse.json([recWire]);
  }),
  http.put('/interests/i1/recommendations/r1', async ({ request }) => {
    lastBody = await request.json();
    return HttpResponse.json({ ...recWire, status: 'archived' });
  }),
  http.post('/interests/i1/curate', async ({ request }) => {
    lastBody = await request.json();
    return HttpResponse.json({
      status: 'completed', 'run-id': 'run1',
      summary: { total: 6, trusted: 3, novel: 3 }, shelved: [recWire],
    });
  }),
  http.post('/interests/i1/curation-runs/run1/steps/step1/respond', async ({ request }) => {
    lastBody = await request.json();
    return HttpResponse.json({ status: 'completed', 'run-id': 'run1', summary: { total: 1, trusted: 1, novel: 0 }, shelved: [recWire] });
  }),
);

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers(); lastBody = null; lastUrl = ''; });
afterAll(() => server.close());

describe('interests API client', () => {
  it('getInterests returns snake_case interests', async () => {
    const [i] = await getInterests();
    expect(i.user_id).toBe('reader@example.com');
    expect(i.taste_profile.novelty_ratio).toBe(0.5);
    expect(i.project_id).toBe('p1');
  });

  it('createInterest sends the intent + taste_profile (converted to kebab on the wire)', async () => {
    await createInterest({ intent: 'x', taste_profile: { novelty_ratio: 0.3 } });
    expect(lastBody).toEqual({ intent: 'x', 'taste-profile': { 'novelty-ratio': 0.3 } });
  });

  it('updateInterest merges a taste-profile edit', async () => {
    const updated = await updateInterest('i1', { taste_profile: { novelty_ratio: 0.8 } });
    expect(updated.taste_profile.novelty_ratio).toBe(0.8);
    expect(lastBody).toEqual({ 'taste-profile': { 'novelty-ratio': 0.8 } });
  });

  it('deleteInterest resolves on 204', async () => {
    await expect(deleteInterest('i1')).resolves.toBeUndefined();
  });

  it('getShelf builds status + kind query params', async () => {
    const shelf = await getShelf('i1', { status: 'shelved', kind: 'article' });
    expect(shelf[0].est_time).toBe('18 min');
    expect(lastUrl).toContain('status=shelved');
    expect(lastUrl).toContain('kind=article');
  });

  it('getShelf omits absent filters', async () => {
    await getShelf('i1', {});
    expect(lastUrl).not.toContain('status=');
    expect(lastUrl).not.toContain('kind=');
  });

  it('updateRecommendationStatus sends the new status', async () => {
    const rec = await updateRecommendationStatus('i1', 'r1', 'archived');
    expect(rec.status).toBe('archived');
    expect(lastBody).toEqual({ status: 'archived' });
  });

  it('curate returns a completed result with a numeric summary', async () => {
    const result = await curate('i1', { scrutiny: 'standard', shelf_size: 6 });
    expect(result.status).toBe('completed');
    if (result.status === 'completed') expect(result.summary).toEqual({ total: 6, trusted: 3, novel: 3 });
    expect(lastBody).toEqual({ scrutiny: 'standard', 'shelf-size': 6 });
  });

  it('respondToCurationStep posts answers and resumes the run', async () => {
    const result = await respondToCurationStep('i1', 'run1', 'step1', ['jazz after 1959']);
    expect(result.status).toBe('completed');
    expect(lastBody).toEqual({ answers: ['jazz after 1959'] });
  });
});
