import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { RecipeSections } from './RecipeSections';

describe('RecipeSections', () => {
  it('renders a single unnamed section with no section-name heading', () => {
    render(
      <RecipeSections
        content={{
          title: 'Stew',
          sections: [{ name: null, ingredients: ['carrots'], steps: ['Simmer'] }],
        }}
      />
    );
    expect(screen.getByText('carrots')).toBeInTheDocument();
    expect(screen.getByText('Simmer')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Section 1' })).not.toBeInTheDocument();
  });

  it('renders per-section name headings and numbered steps for a multi-section recipe', () => {
    render(
      <RecipeSections
        content={{
          title: 'Layer Cake',
          sections: [
            { name: 'Cake', ingredients: ['flour'], steps: ['Mix', 'Bake'] },
            { name: 'Frosting', ingredients: ['butter'], steps: ['Whip'] },
          ],
        }}
      />
    );
    expect(screen.getByRole('heading', { name: 'Cake' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Frosting' })).toBeInTheDocument();
    const lists = screen.getAllByRole('list');
    expect(within(lists[0] as HTMLElement).getAllByRole('listitem')).toHaveLength(2);
  });
});
