import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { getImageMetadata, addPhoto, editPhoto } from './images';
import type { Image } from '../types/image';

const mockImage: Image = {
  name: 'photo1',
  title: 'Photo 1',
  description: 'A photo',
  creator: 'Andrew',
  created_at: '2024-01-01T00:00:00Z',
  versions: {
    raw: { src: '/raw/photo1.jpg' },
    thumbnail: { src: '/thumb/photo1.jpg', width: 200, height: 150 },
  },
};

const server = setupServer(
  http.get('/v2/photos', ({ request: req }) => {
    const auth = req.headers.get('Authorization');
    return HttpResponse.json([{ ...mockImage, _auth: auth }]);
  }),
  http.post('/v2/photos', async ({ request: req }) => {
    const body = await req.formData();
    const hasFile = body.has('photo1.jpg');
    return HttpResponse.json([{ ...mockImage, _hasFile: hasFile }], { status: 201 });
  }),
  http.put('/v2/photos/p1', () => HttpResponse.json(mockImage))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getImageMetadata', () => {
  it('returns list of images', async () => {
    const images = await getImageMetadata();
    expect(images).toHaveLength(1);
    expect(images[0]?.name).toBe('photo1');
  });

  it('attaches auth header when token provided', async () => {
    const images = await getImageMetadata('tok123');
    expect((images[0] as unknown as Record<string, unknown>)['_auth']).toBe('Bearer tok123');
  });
});

describe('addPhoto', () => {
  it('sends files as FormData', async () => {
    const file = new File(['content'], 'photo1.jpg', { type: 'image/jpeg' });
    const images = await addPhoto([file]);
    expect((images[0] as unknown as Record<string, unknown>)['_hasFile']).toBe(true);
  });
});

describe('editPhoto', () => {
  it('sends PUT request with correct payload', async () => {
    const image = await editPhoto({ photo_id: 'p1', title: 'Updated Title' });
    expect(image.name).toBe('photo1');
  });
});
