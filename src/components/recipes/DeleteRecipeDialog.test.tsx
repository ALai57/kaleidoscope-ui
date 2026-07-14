import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '../../test/testUtils';
import { DeleteRecipeDialog } from './DeleteRecipeDialog';
import type { Recipe } from '../../types/recipe';

const recipe = { id: 'r1', recipe_url: 'chana-masala', hostname: 'h',
  content: { title: 'Chana Masala', sections: [] }, public_visibility: true,
  created_at: '', modified_at: '' } as Recipe;

const server = setupServer();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderDialog(onDeleted = vi.fn()) {
  const qc = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  render(
    <QueryClientProvider client={qc}>
      <DeleteRecipeDialog recipe={recipe} open onClose={vi.fn()} onDeleted={onDeleted} token="tok" />
    </QueryClientProvider>
  );
  return onDeleted;
}

describe('DeleteRecipeDialog', () => {
  it('keeps Delete disabled until the name matches, then deletes', async () => {
    server.use(http.delete('/recipes/chana-masala', () => new HttpResponse(null, { status: 204 })));
    const onDeleted = renderDialog();
    const del = screen.getByRole('button', { name: /Delete recipe/i });
    expect(del).toBeDisabled();
    fireEvent.change(screen.getByLabelText(/type the recipe name/i), { target: { value: 'chana masala' } });
    expect(del).toBeEnabled();
    fireEvent.click(del);
    await waitFor(() => expect(onDeleted).toHaveBeenCalledOnce());
  });
});
