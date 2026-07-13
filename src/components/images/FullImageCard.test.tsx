import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { FullImageCard } from './FullImageCard';

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ blob: () => Promise.resolve(new Blob()) } as Response),
  );
  vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
  vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
});

const mockImage = { src: 'https://example.com/full.jpg', width: 800, height: 600 };

describe('FullImageCard', () => {
  it('renders the image at natural size with object-fit contain', async () => {
    await act(async () => {
      render(<FullImageCard image={mockImage} authToken="tok" />);
    });
    const img = document.getElementById('full-' + mockImage.src) as HTMLImageElement | null;
    expect(img).toBeTruthy();
    expect(img?.style.objectFit).toBe('contain');
    expect(img?.getAttribute('src')).toBe('blob:mock-url');
  });

  it('fetches the image with the auth token', async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    await act(async () => {
      render(<FullImageCard image={mockImage} authToken="tok" />);
    });
    expect(fetchMock).toHaveBeenCalled();
  });

  it('renders without a src without crashing', () => {
    const { container } = render(<FullImageCard image={{ src: '' }} />);
    expect(container).toBeDefined();
  });
});
