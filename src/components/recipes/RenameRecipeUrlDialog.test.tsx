import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '../../test/testUtils';
import { RenameRecipeUrlDialog } from './RenameRecipeUrlDialog';
import type { Recipe } from '../../types/recipe';

const recipe = { id: 'r1', recipe_url: 'chana-masala', hostname: 'h',
  content: { title: 'Chana Masala', sections: [] }, public_visibility: true,
  created_at: '', modified_at: '' } as Recipe;

const server = setupServer();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderDialog(onRenamed = vi.fn()) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  render(
    <QueryClientProvider client={qc}>
      <RenameRecipeUrlDialog recipe={recipe} open onClose={vi.fn()} onRenamed={onRenamed} token="tok" />
    </QueryClientProvider>
  );
  return onRenamed;
}

describe('RenameRecipeUrlDialog', () => {
  it('renames and calls onRenamed with the new slug', async () => {
    server.use(http.put('/recipes/chana-masala', () =>
      HttpResponse.json({ ...recipe, recipe_url: 'chana-masala-v2' })));
    const onRenamed = renderDialog();
    const input = screen.getByLabelText(/Recipe URL/i);
    fireEvent.change(input, { target: { value: 'Chana Masala V2' } });
    fireEvent.click(screen.getByRole('button', { name: /Save URL/i }));
    await waitFor(() => expect(onRenamed).toHaveBeenCalledWith('chana-masala-v2'));
  });

  it('shows the backend 409 collision message inline', async () => {
    server.use(http.put('/recipes/chana-masala', () =>
      HttpResponse.json({ error: "URL 'pad-thai' is already in use" }, { status: 409 })));
    renderDialog();
    fireEvent.change(screen.getByLabelText(/Recipe URL/i), { target: { value: 'pad-thai' } });
    fireEvent.click(screen.getByRole('button', { name: /Save URL/i }));
    expect(await screen.findByText(/already in use/i)).toBeInTheDocument();
  });
});
