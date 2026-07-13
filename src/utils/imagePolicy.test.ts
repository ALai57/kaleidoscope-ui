import { describe, it, expect } from 'vitest';
import { checkImages, MAX_IMAGE_BYTES } from './imagePolicy';

function fakeFile(name: string, type: string, size: number): File {
  const f = new File(['x'], name, { type });
  Object.defineProperty(f, 'size', { value: size });
  return f;
}

describe('checkImages', () => {
  it('accepts supported images within the byte limit', () => {
    const ok = fakeFile('a.jpg', 'image/jpeg', 1000);
    const { accepted, oversize, rejected } = checkImages([ok]);
    expect(accepted).toEqual([ok]);
    expect(oversize).toEqual([]);
    expect(rejected).toEqual([]);
  });

  it('flags a supported image over the byte limit as oversize, not rejected', () => {
    const big = fakeFile('big.png', 'image/png', MAX_IMAGE_BYTES + 1);
    const { accepted, oversize, rejected } = checkImages([big]);
    expect(accepted).toEqual([]);
    expect(oversize).toEqual([big]);
    expect(rejected).toEqual([]);
  });

  it('rejects unsupported types with a reason', () => {
    const heic = fakeFile('photo.heic', 'image/heic', 1000);
    const { rejected } = checkImages([heic]);
    expect(rejected).toHaveLength(1);
    expect(rejected[0]?.file).toBe(heic);
    expect(rejected[0]?.reason).toMatch(/JPEG, PNG, WebP or GIF/);
  });

  it('rejects images beyond the 5-per-import cap', () => {
    const files = Array.from({ length: 6 }, (_, i) => fakeFile(`f${i}.jpg`, 'image/jpeg', 1000));
    const { accepted, oversize, rejected } = checkImages(files);
    expect(accepted.length + oversize.length).toBe(5);
    expect(rejected).toHaveLength(1);
    expect(rejected[0]?.reason).toMatch(/5 images/);
  });
});
