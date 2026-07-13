import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useAuthorizedImage } from './useAuthorizedImage';

// No-op observer: never auto-fires, so lazy hooks stay "not in view".
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(_cb: IntersectionObserverCallback) {}
}

const mockFetch = vi.fn();

beforeEach(() => {
  mockFetch.mockReset();
  mockFetch.mockResolvedValue({ blob: () => Promise.resolve(new Blob()) } as Response);
  vi.stubGlobal('fetch', mockFetch);
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
  vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
});

describe('useAuthorizedImage', () => {
  it('fetches immediately when not lazy and returns an object URL', async () => {
    const { result } = renderHook(() => useAuthorizedImage('https://x/img.jpg', 'tok'));
    await waitFor(() => expect(result.current.src).toBe('blob:mock-url'));
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('sends the bearer token in the Authorization header', async () => {
    const { result } = renderHook(() => useAuthorizedImage('https://x/img.jpg', 'tok'));
    await waitFor(() => expect(result.current.src).toBe('blob:mock-url'));
    const init = mockFetch.mock.calls[0][1] as RequestInit;
    expect((init.headers as Headers).get('Authorization')).toBe('Bearer tok');
  });

  it('does not fetch until in view when lazy', async () => {
    renderHook(() => useAuthorizedImage('https://x/img.jpg', 'tok', { lazy: true }));
    await act(async () => { await Promise.resolve(); });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('revokes the object URL on unmount', async () => {
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL');
    const { result, unmount } = renderHook(() => useAuthorizedImage('https://x/img.jpg', 'tok'));
    await waitFor(() => expect(result.current.src).toBe('blob:mock-url'));
    unmount();
    expect(revokeSpy).toHaveBeenCalledWith('blob:mock-url');
  });
});
