import { it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { RecipeCard } from './RecipeCard';
import type { Recipe } from '../../types/recipe';

const recipe = { id: 'r1', recipe_url: 'chana-masala', hostname: 'h',
  content: { title: 'Chana Masala', sections: [{ name: null, ingredients: ['chickpeas'], steps: [] }] },
  labels: [{ id: 'l1', name: 'indian', group_id: 'g1', group_name: 'ethnicity' }],
  public_visibility: true, created_at: '', modified_at: '' } as Recipe;

it('opens the kebab menu and routes actions', () => {
  const onOpen = vi.fn(), onRename = vi.fn(), onDelete = vi.fn();
  render(<RecipeCard recipe={recipe} canManage onOpen={onOpen} onRename={onRename} onDelete={onDelete} />);
  expect(screen.getByText('Chana Masala')).toBeInTheDocument();
  expect(screen.getByText('/recipes/chana-masala')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /recipe actions/i }));
  // Opening the kebab must not open the recipe.
  expect(onOpen).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('menuitem', { name: /rename url/i }));
  expect(onRename).toHaveBeenCalledOnce();
  // Selecting a menu item must not also fire the card's onOpen.
  expect(onOpen).not.toHaveBeenCalled();
});

it('hides the kebab when the viewer cannot manage', () => {
  render(<RecipeCard recipe={recipe} canManage={false} onOpen={vi.fn()} onRename={vi.fn()} onDelete={vi.fn()} />);
  expect(screen.queryByRole('button', { name: /recipe actions/i })).not.toBeInTheDocument();
});

it('renders the total-time footer only when the recipe has prep/cook time', () => {
  const timed = { ...recipe,
    content: { ...recipe.content, prep_time_minutes: 15, cook_time_minutes: 30 } } as Recipe;
  render(<RecipeCard recipe={timed} canManage={false} onOpen={vi.fn()} onRename={vi.fn()} onDelete={vi.fn()} />);
  expect(screen.getByText('45')).toBeInTheDocument();
  expect(screen.getByText('min')).toBeInTheDocument();
});

it('omits the total-time footer when the recipe has no prep/cook time', () => {
  render(<RecipeCard recipe={recipe} canManage={false} onOpen={vi.fn()} onRename={vi.fn()} onDelete={vi.fn()} />);
  expect(screen.queryByText('min')).not.toBeInTheDocument();
});
