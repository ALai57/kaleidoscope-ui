import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/testUtils';
import { PrismThemeProvider } from '@/components/prism';
import { ShoppingList } from './ShoppingList';
import type { RecipeContent } from '@/types/recipe';

describe('ShoppingList', () => {
  const content: RecipeContent = {
    title: 'T',
    sections: [
      { name: 'Sauce', ingredients: ['2 tomatoes', 'basil'], steps: [] },
      { name: 'Pasta', ingredients: ['200g pasta'], steps: [] },
    ],
  };

  it('lists ingredients per section, reports checks, and shows a running count', async () => {
    const onToggle = vi.fn();
    render(
      <PrismThemeProvider>
        <ShoppingList
          content={content}
          checked={new Set(['0:0'])}
          onToggleIngredient={onToggle}
          onClearChecked={vi.fn()}
        />
      </PrismThemeProvider>,
    );
    expect(screen.getByText(/1\s*\/\s*3/)).toBeInTheDocument();
    expect(screen.getByText('Sauce')).toBeInTheDocument();
    expect(screen.getByText('Pasta')).toBeInTheDocument();
    expect(screen.getByText('200g pasta')).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText('basil'));
    expect(onToggle).toHaveBeenCalledWith('0:1');
  });

  it('reflects the checked set on each checkbox', () => {
    render(
      <PrismThemeProvider>
        <ShoppingList
          content={content}
          checked={new Set(['0:0'])}
          onToggleIngredient={vi.fn()}
          onClearChecked={vi.fn()}
        />
      </PrismThemeProvider>,
    );
    expect(screen.getByLabelText('2 tomatoes')).toBeChecked();
    expect(screen.getByLabelText('basil')).not.toBeChecked();
    expect(screen.getByLabelText('200g pasta')).not.toBeChecked();
  });

  it('clears via Reset', async () => {
    const onClear = vi.fn();
    render(
      <PrismThemeProvider>
        <ShoppingList
          content={content}
          checked={new Set(['0:0'])}
          onToggleIngredient={vi.fn()}
          onClearChecked={onClear}
        />
      </PrismThemeProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(onClear).toHaveBeenCalled();
  });
});
