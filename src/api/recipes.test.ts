import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  importRecipeFromUrl,
  importRecipeFromPhoto,
  getLabels,
  createLabel,
  createLabelGroup,
  addRecipeAudience,
  qualifiedLabelName,
} from './recipes';
import { ApiError } from './client';
import type { Recipe } from '../types/recipe';

const mockRecipe: Recipe = {
  id: 'r1',
  recipe_url: 'chana-masala',
  hostname: 'andrewslai.com',
  content: {
    title: 'Chana Masala',
    sections: [{ name: null, ingredients: ['2 cups chickpeas', '1 tbsp flour'], steps: ['Cook'] }],
  },
  labels: [],
  public_visibility: true,
  created_at: '2026-01-01T00:00:00Z',
  modified_at: '2026-01-01T00:00:00Z',
};

const server = setupServer(
  http.get('/recipes', ({ request: req }) => {
    const url = new URL(req.url);
    return HttpResponse.json([
      { ...mockRecipe, _ingredient: url.searchParams.get('ingredient'), _label: url.searchParams.get('label-id') },
    ]);
  }),
  http.get('/recipes/chana-masala', () => HttpResponse.json(mockRecipe)),
  http.get('/recipes/missing', () => new HttpResponse(null, { status: 404 })),
  http.post('/recipes', async ({ request: req }) => {
    const body = (await req.json()) as Record<string, unknown>;
    return HttpResponse.json({ ...mockRecipe, ...body }, { status: 200 });
  }),
  http.put('/recipes/chana-masala', async ({ request: req }) => {
    const body = (await req.json()) as Record<string, unknown>;
    return HttpResponse.json({ ...mockRecipe, ...body });
  }),
  http.delete('/recipes/chana-masala', () => new HttpResponse(null, { status: 204 })),
  http.post('/recipes/scrape', () =>
    HttpResponse.json({
      recipe: { title: 'Scraped', sections: [{ name: null, ingredients: ['x'], steps: [] }] },
      suggested_labels: ['indian'],
      techniques: { acquire: 'fetch', parse: 'json-ld', normalize: 'single-section' },
      warnings: [],
      scrape_processing_run_id: 'run-url-1',
    })
  ),
  http.post('/recipes/scrape-photo', async ({ request: req }) => {
    const form = await req.formData();
    const keys = [...form.keys()];
    return HttpResponse.json({
      recipe: { title: 'From Photo', sections: [{ name: null, ingredients: ['y'], steps: [] }] },
      suggested_labels: [],
      techniques: { acquire: 'claude-vision', parse: 'llm', normalize: 'single-section' },
      warnings: [],
      _uploaded: keys,
    });
  }),
  http.get('/recipe-labels', () =>
    HttpResponse.json([{ id: 'l1', name: 'indian', group_id: 'g1', group_name: 'ethnicity' }])
  ),
  http.post('/recipe-labels', async ({ request: req }) => {
    const body = (await req.json()) as Record<string, unknown>;
    return HttpResponse.json({ id: 'l2', ...body });
  }),
  http.post('/recipe-label-groups', async ({ request: req }) => {
    const body = (await req.json()) as Record<string, unknown>;
    return HttpResponse.json({ id: 'g2', ...body });
  }),
  http.put('/recipe-audiences', async ({ request: req }) => {
    const body = (await req.json()) as Record<string, unknown>;
    return HttpResponse.json({ id: 'aud1', ...body });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('recipes api', () => {
  it('getRecipes sends the bearer token and forwards filters', async () => {
    const result = await getRecipes({ ingredient: 'flour', labelId: 'l1' }, 'tok');
    expect(result[0]).toMatchObject({ _ingredient: 'flour', _label: 'l1' });
  });

  it('getRecipe returns a single recipe with parsed content', async () => {
    const recipe = await getRecipe('chana-masala');
    expect(recipe.content.title).toBe('Chana Masala');
    expect(recipe.content.sections[0]?.ingredients).toHaveLength(2);
  });

  it('getRecipe surfaces ApiError on 404', async () => {
    await expect(getRecipe('missing')).rejects.toBeInstanceOf(ApiError);
  });

  it('createRecipe derives the slug from the title when recipe_url is omitted', async () => {
    const created = await createRecipe({
      content: { title: 'My New Dish!', sections: [{ name: null, ingredients: ['a'], steps: [] }] },
    });
    expect(created).toMatchObject({ recipe_url: 'my-new-dish' });
  });

  it('createRecipe forwards an explicit recipe_url and label_ids', async () => {
    const created = (await createRecipe({
      content: { title: 'X', sections: [{ name: null, ingredients: [], steps: [] }] },
      recipe_url: 'custom',
      label_ids: ['l1'],
    })) as Recipe & { label_ids: string[] };
    expect(created.recipe_url).toBe('custom');
    expect(created.label_ids).toEqual(['l1']);
  });

  it('updateRecipe PUTs the patch', async () => {
    const updated = (await updateRecipe('chana-masala', { public_visibility: false })) as Recipe;
    expect(updated.public_visibility).toBe(false);
  });

  it('updateRecipe sends a renamed recipe_url as kebab-case recipe-url', async () => {
    let received: unknown;
    server.use(
      http.put('/recipes/chana-masala', async ({ request }) => {
        received = await request.json();
        return HttpResponse.json({ id: 'r1', recipe_url: 'chana-masala-v2', hostname: 'h',
          content: { title: 'Chana Masala', sections: [] }, public_visibility: true,
          created_at: '', modified_at: '' });
      })
    );
    const out = await updateRecipe('chana-masala', { recipe_url: 'chana-masala-v2' }, 'tok');
    expect(received).toEqual({ 'recipe-url': 'chana-masala-v2' });
    expect(out.recipe_url).toBe('chana-masala-v2');
  });

  it('deleteRecipe resolves on 204', async () => {
    await expect(deleteRecipe('chana-masala')).resolves.toBeUndefined();
  });

  it('importRecipeFromUrl returns a draft with a techniques map', async () => {
    const result = await importRecipeFromUrl('http://example.com/r');
    expect(result.techniques.parse).toBe('json-ld');
    expect(result.suggested_labels).toContain('indian');
  });

  it('importRecipeFromUrl surfaces the scrape processing run id for lineage', async () => {
    const result = await importRecipeFromUrl('http://example.com/r');
    expect(result.scrape_processing_run_id).toBe('run-url-1');
  });

  it('importRecipeFromPhoto posts each file as a distinct indexed part (duplicate filenames do not collide)', async () => {
    // two pages sharing a filename must not collapse into one multipart field
    const p1 = new File(['a'], 'IMG_0001.JPG', { type: 'image/jpeg' });
    const p2 = new File(['b'], 'IMG_0001.JPG', { type: 'image/jpeg' });
    const result = (await importRecipeFromPhoto([p1, p2])) as unknown as {
      recipe: { title: string };
      _uploaded: string[];
    };
    expect(result.recipe.title).toBe('From Photo');
    expect(result._uploaded).toEqual(['image-0', 'image-1']);
  });

  it('getLabels returns labels with group names', async () => {
    const labels = await getLabels();
    expect(labels[0]).toMatchObject({ name: 'indian', group_name: 'ethnicity' });
  });

  it('createLabel sends name + group_id', async () => {
    const label = (await createLabel('mexican', 'g1')) as { name: string; group_id: string };
    expect(label).toMatchObject({ name: 'mexican', group_id: 'g1' });
  });

  it('createLabelGroup sends the name', async () => {
    const group = (await createLabelGroup('cuisine')) as { name: string };
    expect(group.name).toBe('cuisine');
  });

  it('addRecipeAudience sends recipe_id and group_id', async () => {
    const aud = (await addRecipeAudience('r1', 'grp1')) as { recipe_id: string; group_id: string };
    expect(aud).toMatchObject({ recipe_id: 'r1', group_id: 'grp1' });
  });
});

describe('qualifiedLabelName', () => {
  it('qualifies grouped labels and leaves ungrouped ones bare', () => {
    expect(qualifiedLabelName({ id: '1', name: 'indian', group_name: 'ethnicity' })).toBe(
      'ethnicity/indian'
    );
    expect(qualifiedLabelName({ id: '2', name: 'baking' })).toBe('baking');
  });
});
