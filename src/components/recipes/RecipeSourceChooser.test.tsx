import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecipeSourceChooser } from './RecipeSourceChooser';

const captured = vi.hoisted(() => ({
  url: undefined as unknown,
  photo: undefined as unknown,
}));

vi.mock('./UrlRecipeSource', () => ({
  UrlRecipeSource: (props: { onDraft: unknown }) => {
    captured.url = props.onDraft;
    return <div>url-source</div>;
  },
}));
vi.mock('./PhotoRecipeSource', () => ({
  PhotoRecipeSource: (props: { onDraft: unknown }) => {
    captured.photo = props.onDraft;
    return <div>photo-source</div>;
  },
}));

describe('RecipeSourceChooser', () => {
  it('shows the URL source by default and swaps to the photo source on toggle, forwarding onDraft to the visible child', () => {
    const onDraft = vi.fn();
    render(<RecipeSourceChooser onDraft={onDraft} />);

    expect(screen.getByText('url-source')).toBeInTheDocument();
    expect(screen.queryByText('photo-source')).not.toBeInTheDocument();
    expect(captured.url).toBe(onDraft);

    fireEvent.click(screen.getByRole('button', { name: 'Photo' }));

    expect(screen.getByText('photo-source')).toBeInTheDocument();
    expect(screen.queryByText('url-source')).not.toBeInTheDocument();
    expect(captured.photo).toBe(onDraft);
  });
});
