import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test/testUtils';
import { PrismThemeProvider } from '@/components/prism';
import { RawRecipe } from './RawRecipe';
import type { RecipeContent } from '@/types/recipe';

describe('RawRecipe', () => {
  it('renders every section, ingredient, and step', () => {
    const content: RecipeContent = {
      title: 'Test Dish',
      sections: [
        { name: 'Sauce', ingredients: ['2 tomatoes'], steps: ['Simmer sauce'] },
        { name: 'Pasta', ingredients: ['200g pasta'], steps: ['Boil pasta'] },
      ],
    };
    render(
      <PrismThemeProvider>
        <RawRecipe content={content} />
      </PrismThemeProvider>,
    );
    expect(screen.getByText('Sauce')).toBeInTheDocument();
    expect(screen.getByText('2 tomatoes')).toBeInTheDocument();
    expect(screen.getByText('Simmer sauce')).toBeInTheDocument();
    expect(screen.getByText('Boil pasta')).toBeInTheDocument();
  });
});
