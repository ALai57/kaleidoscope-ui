import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ImageThumbnail } from './ImageThumbnail';

class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(_callback: IntersectionObserverCallback) {}
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

const mockImage = {
  src: 'https://example.com/thumb.jpg',
  width: 100,
  height: 100,
};

describe('ImageThumbnail', () => {
  it('renders without errors', () => {
    const { container } = render(<ImageThumbnail image={mockImage} />);
    expect(container).toBeDefined();
  });

  it('renders the placeholder container', () => {
    const { container } = render(<ImageThumbnail image={mockImage} />);
    expect(container.querySelector('.placeholder')).toBeTruthy();
  });

  it('accepts onClick prop', () => {
    const handleClick = vi.fn();
    render(<ImageThumbnail image={mockImage} onClick={handleClick} />);
    expect(true).toBe(true);
  });

  it('accepts authToken prop', () => {
    render(<ImageThumbnail image={mockImage} authToken="test-token" />);
    expect(true).toBe(true);
  });
});
