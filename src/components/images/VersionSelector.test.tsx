import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VersionSelector } from './VersionSelector';

const mockVersions = {
  raw: { src: 'https://example.com/raw.jpg', width: 1200, height: 800 },
  thumbnail: { src: 'https://example.com/thumb.jpg', width: 100, height: 75 },
};

describe('VersionSelector', () => {
  it('renders without errors', () => {
    const { container } = render(
      <VersionSelector
        imageVersions={mockVersions}
        selectedVersion={mockVersions.raw}
        onVersionChange={vi.fn()}
      />,
    );
    expect(container).toBeDefined();
  });

  it('renders a select element', () => {
    render(
      <VersionSelector
        imageVersions={mockVersions}
        selectedVersion={mockVersions.raw}
        onVersionChange={vi.fn()}
      />,
    );
    // MUI Select renders a combobox
    expect(screen.getByRole('combobox')).toBeDefined();
  });

  it('handles undefined imageVersions gracefully', () => {
    const { container } = render(
      <VersionSelector
        imageVersions={undefined}
        selectedVersion={undefined}
        onVersionChange={vi.fn()}
      />,
    );
    expect(container).toBeDefined();
  });
});
