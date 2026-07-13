import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useObjectUrls } from './useObjectUrls';

beforeEach(() => {
  vi.stubGlobal(
    'URL',
    Object.assign(URL, {
      createObjectURL: vi.fn((f: File) => `blob:${f.name}`),
      revokeObjectURL: vi.fn(),
    })
  );
});

function fakeFile(name: string): File {
  return new File(['x'], name, { type: 'image/jpeg' });
}

describe('useObjectUrls', () => {
  it('creates one URL per file', () => {
    const files = [fakeFile('a.jpg'), fakeFile('b.jpg')];
    const { result } = renderHook(() => useObjectUrls(files));
    expect(result.current).toEqual(['blob:a.jpg', 'blob:b.jpg']);
  });

  it('revokes the URLs on unmount', () => {
    const files = [fakeFile('a.jpg')];
    const { unmount } = renderHook(() => useObjectUrls(files));
    unmount();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:a.jpg');
  });
});
