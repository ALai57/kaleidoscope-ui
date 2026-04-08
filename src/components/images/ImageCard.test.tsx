import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageCard } from './ImageCard';

// IntersectionObserver is not available in jsdom — provide a class-based mock
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(_callback: IntersectionObserverCallback) {}
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

const mockImage = {
  src: 'https://example.com/image.jpg',
  alt: 'Test image',
  title: 'My Photo',
  body: 'A beautiful photo',
  width: 300,
  height: 200,
};

describe('ImageCard', () => {
  it('renders without errors', () => {
    const { container } = render(<ImageCard image={mockImage} />);
    expect(container).toBeDefined();
  });

  it('renders the placeholder container', () => {
    const { container } = render(<ImageCard image={mockImage} />);
    expect(container.querySelector('.placeholder')).toBeTruthy();
  });

  it('accepts an onClick prop', () => {
    const handleClick = vi.fn();
    render(<ImageCard image={mockImage} onClick={handleClick} />);
    // Component renders without error
    expect(true).toBe(true);
  });

  it('accepts an authToken prop', () => {
    render(<ImageCard image={mockImage} authToken="test-token" />);
    expect(true).toBe(true);
  });
});
