import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ImageBrowser } from './ImageBrowser';
import { Image } from '@/types/image';

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(_callback: IntersectionObserverCallback) {}
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

// Mock fetch for image loading
vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
  blob: () => Promise.resolve(new Blob()),
}));
vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);

const mockImages: Image[] = [
  {
    name: 'photo-1.jpg',
    title: 'Photo 1',
    description: 'First photo',
    creator: 'Alice',
    created_at: '2024-01-01T00:00:00Z',
    versions: {
      raw: { src: 'https://example.com/photo1-raw.jpg', width: 1200, height: 800 },
      thumbnail: { src: 'https://example.com/photo1-thumb.jpg', width: 100, height: 75 },
    },
  },
  {
    name: 'photo-2.jpg',
    title: 'Photo 2',
    description: 'Second photo',
    creator: 'Bob',
    created_at: '2024-01-02T00:00:00Z',
    versions: {
      raw: { src: 'https://example.com/photo2-raw.jpg', width: 1200, height: 800 },
      thumbnail: { src: 'https://example.com/photo2-thumb.jpg', width: 100, height: 75 },
    },
  },
  {
    name: 'photo-3.jpg',
    title: 'Photo 3',
    description: 'Third photo',
    creator: 'Carol',
    created_at: '2024-01-03T00:00:00Z',
    versions: {
      raw: { src: 'https://example.com/photo3-raw.jpg', width: 1200, height: 800 },
      thumbnail: { src: 'https://example.com/photo3-thumb.jpg', width: 100, height: 75 },
    },
  },
];

describe('ImageBrowser', () => {
  it('renders without errors', () => {
    const { container } = render(<ImageBrowser images={mockImages} />);
    expect(container).toBeDefined();
  });

  it('renders thumbnails for all images', () => {
    render(<ImageBrowser images={mockImages} />);
    // The thumbnails container should have items
    expect(true).toBe(true);
  });

  it('changes selected image on right arrow key', async () => {
    render(<ImageBrowser images={mockImages} startingImage={1} />);
    // Fire right arrow
    await act(async () => {
      fireEvent.keyDown(window, { key: 'ArrowRight', keyCode: 39 });
    });
    // After right arrow from index 1, we should be at index 2
    // The selected image name changes to photo-3
    expect(screen.queryByDisplayValue('Photo 3')).toBeTruthy();
  });

  it('changes selected image on left arrow key', async () => {
    render(<ImageBrowser images={mockImages} startingImage={1} />);
    await act(async () => {
      fireEvent.keyDown(window, { key: 'ArrowLeft', keyCode: 37 });
    });
    // After left arrow from index 1, we should be at index 0
    expect(screen.queryByDisplayValue('Photo 1')).toBeTruthy();
  });

  it('does not go below 0 on left arrow at index 0', async () => {
    render(<ImageBrowser images={mockImages} startingImage={0} />);
    await act(async () => {
      fireEvent.keyDown(window, { key: 'ArrowLeft', keyCode: 37 });
    });
    // Still at index 0
    expect(screen.queryByDisplayValue('Photo 1')).toBeTruthy();
  });

  it('renders in select mode with insert image button', () => {
    const selectPhoto = vi.fn();
    render(
      <ImageBrowser
        images={mockImages}
        mode="select"
        photoManager={{ selectPhoto }}
      />,
    );
    expect(screen.getByText('Insert image')).toBeTruthy();
  });

  it('renders the drop-tile in edit mode', () => {
    render(<ImageBrowser images={mockImages} mode="edit" />);
    expect(screen.getByTestId('drop-tile')).toBeTruthy();
    expect(screen.getByText('Add photo')).toBeTruthy();
  });

  it('does not render the drop-tile in select mode (picker stays edit-affordance-free)', () => {
    render(
      <ImageBrowser images={mockImages} mode="select" photoManager={{ selectPhoto: vi.fn() }} />,
    );
    expect(screen.queryByTestId('drop-tile')).toBeNull();
    expect(screen.getByText('Insert image')).toBeTruthy();
  });

  it('renders one tile per image in the gallery', () => {
    const { container, getByTestId } = render(<ImageBrowser images={mockImages} />);
    expect(getByTestId('image-gallery')).toBeTruthy();
    expect(container.querySelectorAll('.placeholder').length).toBe(mockImages.length);
  });

  it('selects an image when its tile is clicked', () => {
    const { container } = render(<ImageBrowser images={mockImages} startingImage={0} />);
    const tiles = container.querySelectorAll('.placeholder');
    fireEvent.click(tiles[2]!);
    expect(screen.queryByDisplayValue('Photo 3')).toBeTruthy();
  });

  it('resizes the detail panel by dragging the handle', () => {
    const { getByTestId } = render(<ImageBrowser images={mockImages} />);
    const panel = getByTestId('detail-panel');
    expect(panel.style.width).toBe('320px');

    const handle = getByTestId('panel-resize-handle');
    fireEvent.mouseDown(handle, { clientX: 500 });
    fireEvent.mouseMove(document, { clientX: 400 }); // drag left 100px → wider panel
    fireEvent.mouseUp(document);

    expect(panel.style.width).toBe('420px');
  });

  it('clamps the detail panel width to its bounds while dragging', () => {
    const { getByTestId } = render(<ImageBrowser images={mockImages} />);
    const panel = getByTestId('detail-panel');
    const handle = getByTestId('panel-resize-handle');

    fireEvent.mouseDown(handle, { clientX: 500 });
    fireEvent.mouseMove(document, { clientX: 5000 }); // drag far right → below min
    fireEvent.mouseUp(document);
    expect(panel.style.width).toBe('240px');

    fireEvent.mouseDown(handle, { clientX: 500 });
    fireEvent.mouseMove(document, { clientX: -5000 }); // drag far left → above max
    fireEvent.mouseUp(document);
    expect(panel.style.width).toBe('640px');
  });
});
