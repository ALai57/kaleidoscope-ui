import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EditorPanel } from './EditorPanel';

const mockImage = {
  name: 'test-photo.jpg',
  title: 'Test Photo',
  description: 'A test photo',
  creator: 'Andrew',
  created_at: '2024-01-15T10:30:00Z',
  versions: {
    raw: { src: 'https://example.com/raw.jpg', width: 1200, height: 800 },
    thumbnail: { src: 'https://example.com/thumb.jpg', width: 100, height: 75 },
  },
};

const defaultProps = {
  selectedImage: mockImage,
  selectedVersion: mockImage.versions.raw,
  mode: 'edit' as const,
  onVersionChange: vi.fn(),
  onEditPhoto: vi.fn(),
  albums: ['Travel', 'Family'],
};

describe('EditorPanel', () => {
  it('renders without errors', () => {
    const { container } = render(<EditorPanel {...defaultProps} />);
    expect(container).toBeDefined();
  });

  it('renders image name field', () => {
    render(<EditorPanel {...defaultProps} />);
    expect(screen.getByLabelText('Name')).toBeTruthy();
  });

  it('renders title field', () => {
    render(<EditorPanel {...defaultProps} />);
    expect(screen.getByLabelText('Title')).toBeTruthy();
  });

  it('renders save button in edit mode', () => {
    render(<EditorPanel {...defaultProps} />);
    expect(screen.getByRole('button', { name: /save/i })).toBeTruthy();
  });

  it('does not render save button in select mode', () => {
    render(<EditorPanel {...defaultProps} mode="select" />);
    expect(screen.queryByRole('button', { name: /save/i })).toBeNull();
  });

  it('renders without a selectedImage', () => {
    const { container } = render(
      <EditorPanel {...defaultProps} selectedImage={undefined} />,
    );
    expect(container).toBeDefined();
  });
});
