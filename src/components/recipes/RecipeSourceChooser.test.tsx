import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecipeSourceChooser } from './RecipeSourceChooser';

vi.mock('./UrlRecipeSource', () => ({
  UrlRecipeSource: () => <div>url-source</div>,
}));
vi.mock('./PhotoRecipeSource', () => ({
  PhotoRecipeSource: () => <div>photo-source</div>,
}));

describe('RecipeSourceChooser', () => {
  it('shows the URL source by default and swaps to the photo source on toggle', () => {
    render(<RecipeSourceChooser onDraft={vi.fn()} />);

    expect(screen.getByText('url-source')).toBeInTheDocument();
    expect(screen.queryByText('photo-source')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Photo' }));

    expect(screen.getByText('photo-source')).toBeInTheDocument();
    expect(screen.queryByText('url-source')).not.toBeInTheDocument();
  });
});
