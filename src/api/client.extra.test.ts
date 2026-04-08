import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { request, uploadFile, ApiError } from './client';

const server = setupServer(
  http.post('/api/create', () => HttpResponse.json({ id: 1 })),
  http.delete('/api/item', () => new HttpResponse(null, { status: 204 })),
  http.post('/api/upload', () => HttpResponse.json({ uploaded: true })),
  http.post('/api/upload-fail', () => new HttpResponse(null, { status: 413 })),
  http.get('/api/error-text', () =>
    new HttpResponse('Internal Server Error', { status: 500 })
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('request — additional branches', () => {
  it('sends POST with body', async () => {
    const result = await request<{ id: number }>('/api/create', {
      method: 'POST',
      body: { name: 'test' },
    });
    expect(result.id).toBe(1);
  });

  it('returns undefined for 204 No Content', async () => {
    const result = await request('/api/item', { method: 'DELETE' });
    expect(result).toBeUndefined();
  });

  it('throws ApiError with error text body', async () => {
    try {
      await request('/api/error-text');
      expect.fail('should have thrown');
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError);
      expect((e as ApiError).status).toBe(500);
      expect((e as ApiError).message).toBe('Internal Server Error');
    }
  });

  it('does not set Content-Type body when no body provided', async () => {
    const result = await request<{ id: number }>('/api/create', {
      method: 'POST',
      body: undefined,
    });
    // still works — body is omitted from fetch
    expect(result).toBeDefined();
  });
});

describe('uploadFile — additional branches', () => {
  it('uploads a file and returns JSON', async () => {
    const formData = new FormData();
    formData.append('file', new Blob(['data']), 'test.txt');
    const result = await uploadFile<{ uploaded: boolean }>('/api/upload', formData);
    expect(result.uploaded).toBe(true);
  });

  it('uploads with auth token', async () => {
    const formData = new FormData();
    const result = await uploadFile<{ uploaded: boolean }>(
      '/api/upload',
      formData,
      'my-token'
    );
    expect(result.uploaded).toBe(true);
  });

  it('throws ApiError on upload failure', async () => {
    const formData = new FormData();
    await expect(
      uploadFile('/api/upload-fail', formData)
    ).rejects.toBeInstanceOf(ApiError);
  });
});
