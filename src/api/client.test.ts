import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { request, ApiError } from './client';

const server = setupServer(
  http.get('/api/test', () => HttpResponse.json({ ok: true })),
  http.get('/api/error', () => new HttpResponse(null, { status: 401 })),
  http.get('/api/auth', ({ request: req }) => {
    const auth = req.headers.get('Authorization');
    return HttpResponse.json({ auth });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('request', () => {
  it('fetches and parses JSON', async () => {
    const result = await request<{ ok: boolean }>('/api/test');
    expect(result.ok).toBe(true);
  });

  it('throws ApiError on non-2xx', async () => {
    await expect(request('/api/error')).rejects.toBeInstanceOf(ApiError);
    await expect(request('/api/error')).rejects.toHaveProperty('status', 401);
  });

  it('attaches Authorization header when token provided', async () => {
    const result = await request<{ auth: string }>('/api/auth', { token: 'abc123' });
    expect(result.auth).toBe('Bearer abc123');
  });
});
