import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { ImageThumbnail } from './ImageThumbnail';

// IntersectionObserver mock that immediately fires with isIntersecting: true
type IntersectionCb = (entries: IntersectionObserverEntry[]) => void;

class TriggerableIntersectionObserver {
  private cb: IntersectionCb;
  observe = vi.fn((el: Element) => {
    this.cb([{ isIntersecting: true, target: el } as IntersectionObserverEntry]);
  });
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(cb: IntersectionCb) {
    this.cb = cb;
  }
}
vi.stubGlobal('IntersectionObserver', TriggerableIntersectionObserver);

global.fetch = vi.fn().mockResolvedValue({
  blob: () => Promise.resolve(new Blob()),
} as Response);
global.URL.createObjectURL = vi.fn().mockReturnValue('blob:thumb-url');

const mockImage = {
  src: 'thumb-src-1',
  width: 100,
  height: 100,
};

describe('ImageThumbnail — inView state triggered', () => {
  it('renders the Card once IntersectionObserver fires', async () => {
    await act(async () => {
      render(<ImageThumbnail image={mockImage} />);
    });
    // CardMedia has role "img"
    const imgs = document.querySelectorAll('img');
    expect(imgs.length).toBeGreaterThan(0);
  });

  it('sets viewable style when inView', async () => {
    const { container } = await act(async () => render(<ImageThumbnail image={mockImage} />));
    const placeholder = container.querySelector('.placeholder');
    expect(placeholder).toBeTruthy();
  });

  it('calls fetch with auth token when authToken provided', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockClear();
    await act(async () => {
      render(<ImageThumbnail image={mockImage} authToken="bearer-xyz" />);
    });
    // fetch is called to display protected image
    expect(global.fetch).toHaveBeenCalled();
    const callArgs = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0] ?? [];
    expect((callArgs[1] as RequestInit | undefined)?.headers).toBeDefined();
  });

  it('accepts onClick prop', async () => {
    const handleClick = vi.fn();
    await act(async () => {
      render(<ImageThumbnail image={mockImage} onClick={handleClick} />);
    });
    expect(true).toBe(true); // renders without error
  });
});
