import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/api/v1/thing', () => HttpResponse.json({ where: 'prefixed' })),
  http.get('/thing', () => HttpResponse.json({ where: 'root' })),
  http.post('/api/v1/up', () => HttpResponse.json({ where: 'prefixed' })),
  http.post('/up', () => HttpResponse.json({ where: 'root' }))
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  vi.unstubAllEnvs();
  vi.resetModules();
});
afterAll(() => server.close());

async function loadClientWithBase(base: string) {
  vi.stubEnv('VITE_API_BASE_URL', base);
  vi.resetModules();
  return import('./client');
}

describe('API base prefixing', () => {
  it('prepends VITE_API_BASE_URL to normal request paths', async () => {
    const { request } = await loadClientWithBase('/api/v1');
    const r = await request<{ where: string }>('/thing');
    expect(r.where).toBe('prefixed');
  });

  it('bypasses the base for request() when absolute is set', async () => {
    const { request } = await loadClientWithBase('/api/v1');
    const r = await request<{ where: string }>('/thing', { absolute: true });
    expect(r.where).toBe('root');
  });

  it('prepends the base for uploadFile by default', async () => {
    const { uploadFile } = await loadClientWithBase('/api/v1');
    const r = await uploadFile<{ where: string }>('/up', new FormData());
    expect(r.where).toBe('prefixed');
  });

  it('bypasses the base for uploadFile when absolute is set', async () => {
    const { uploadFile } = await loadClientWithBase('/api/v1');
    const r = await uploadFile<{ where: string }>('/up', new FormData(), undefined, true);
    expect(r.where).toBe('root');
  });
});
