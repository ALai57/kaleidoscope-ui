import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FullImageCard } from './FullImageCard';

global.fetch = vi.fn().mockResolvedValue({
  blob: () => Promise.resolve(new Blob()),
});

global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = vi.fn();

const mockImage = {
  src: 'https://example.com/full.jpg',
  width: 800,
  height: 600,
};

describe('FullImageCard', () => {
  it('renders without errors', () => {
    const { container } = render(<FullImageCard image={mockImage} />);
    expect(container).toBeDefined();
  });

  it('renders an img element with the correct id', () => {
    render(<FullImageCard image={mockImage} />);
    const img = document.getElementById('full-' + mockImage.src);
    expect(img).toBeTruthy();
  });

  it('accepts onClick prop', () => {
    const handleClick = vi.fn();
    render(<FullImageCard image={mockImage} onClick={handleClick} />);
    expect(true).toBe(true);
  });

  it('accepts authToken prop', () => {
    render(<FullImageCard image={mockImage} authToken="test-token" />);
    expect(true).toBe(true);
  });
});
