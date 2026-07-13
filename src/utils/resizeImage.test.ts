import { describe, it, expect, beforeEach, vi } from 'vitest';
import { resizeImage } from './resizeImage';
import { MAX_IMAGE_BYTES } from './imagePolicy';

function blobOfSize(bytes: number): Blob {
  const b = new Blob([], { type: 'image/jpeg' });
  Object.defineProperty(b, 'size', { value: bytes });
  return b;
}

let toBlobSizes: number[];

beforeEach(() => {
  // First encode is too big; second is under the limit — exercises the shrink loop.
  toBlobSizes = [MAX_IMAGE_BYTES * 2, MAX_IMAGE_BYTES - 10];
  vi.stubGlobal(
    'createImageBitmap',
    vi.fn(async () => ({ width: 4000, height: 3000, close: vi.fn() }))
  );
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ({ drawImage: vi.fn() })) as never;
  HTMLCanvasElement.prototype.toBlob = function (cb: BlobCallback): void {
    const size = toBlobSizes.shift() ?? MAX_IMAGE_BYTES - 10;
    cb(blobOfSize(size));
  } as never;
});

describe('resizeImage', () => {
  it('returns a JPEG File under the byte limit', async () => {
    const big = new File(['x'], 'huge.png', { type: 'image/png' });
    Object.defineProperty(big, 'size', { value: MAX_IMAGE_BYTES * 3 });

    const out = await resizeImage(big);

    expect(out.type).toBe('image/jpeg');
    expect(out.size).toBeLessThanOrEqual(MAX_IMAGE_BYTES);
    expect(out.name).toMatch(/\.jpe?g$/i);
  });
});
