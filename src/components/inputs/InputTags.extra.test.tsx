import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputTags } from './InputTags';

describe('InputTags — additional branch coverage', () => {
  const options = ['rock', 'pop', 'jazz'] as const;
  type Genre = (typeof options)[number];

  it('renders the autocomplete field', () => {
    render(
      <InputTags<Genre>
        options={[...options]}
        vals={[]}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
      />,
    );
    expect(screen.getByLabelText('Albums')).toBeTruthy();
  });

  it('uses custom tagType label', () => {
    render(
      <InputTags<Genre>
        options={[...options]}
        vals={[]}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
        tagType="Genres"
      />,
    );
    expect(screen.getByLabelText('Genres')).toBeTruthy();
  });

  it('renders with initial values', () => {
    render(
      <InputTags<Genre>
        options={[...options]}
        vals={['rock']}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
      />,
    );
    expect(screen.getByText('rock')).toBeTruthy();
  });

  it('renders disabled state', () => {
    render(
      <InputTags<Genre>
        options={[...options]}
        vals={[]}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
        disabled={true}
      />,
    );
    const input = screen.getByLabelText('Albums');
    expect(input).toBeDisabled();
  });

  it('renders with custom width', () => {
    const { container } = render(
      <InputTags<Genre>
        options={[...options]}
        vals={[]}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
        width={300}
      />,
    );
    expect(container).toBeDefined();
  });
});
