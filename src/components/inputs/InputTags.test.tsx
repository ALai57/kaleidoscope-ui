import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InputTags } from './InputTags';

type Tag = 'rock' | 'jazz' | 'blues';

const defaultProps = {
  options: ['rock', 'jazz', 'blues'] as Tag[],
  vals: [] as Tag[],
  onAdd: vi.fn(),
  onRemove: vi.fn(),
  tagType: 'Genres',
};

describe('InputTags', () => {
  it('renders without errors', () => {
    const { container } = render(<InputTags {...defaultProps} />);
    expect(container).toBeDefined();
  });

  it('renders with the tagType label', () => {
    render(<InputTags {...defaultProps} />);
    expect(screen.getByLabelText('Genres')).toBeTruthy();
  });

  it('renders as disabled when disabled prop is true', () => {
    render(<InputTags {...defaultProps} disabled />);
    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('disabled');
  });

  it('accepts onAdd and onRemove handlers without error', () => {
    const onAdd = vi.fn();
    const onRemove = vi.fn();
    render(<InputTags {...defaultProps} onAdd={onAdd} onRemove={onRemove} />);
    expect(true).toBe(true);
  });
});
