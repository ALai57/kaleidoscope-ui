import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PhotoRecipeSource } from './PhotoRecipeSource';
import { MAX_IMAGE_BYTES } from '../../utils/imagePolicy';

vi.mock('../../auth/useAuth', () => ({
  useAuth: () => ({ token: 'test-token', isAuthenticated: true }),
}));

beforeEach(() => {
  vi.stubGlobal(
    'URL',
    Object.assign(URL, {
      createObjectURL: vi.fn((f: File) => `blob:${f.name}`),
      revokeObjectURL: vi.fn(),
    })
  );
});

const server = setupServer(
  http.post('/recipes/scrape-photo', () =>
    HttpResponse.json({
      recipe: { title: 'From Photo', sections: [{ name: null, ingredients: ['y'], steps: [] }] },
      suggested_labels: [],
      techniques: { acquire: 'claude-vision', parse: 'llm', normalize: 'single-section' },
      warnings: [],
    })
  )
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function imageFile(name: string, type: string, size: number): File {
  const f = new File(['x'], name, { type });
  Object.defineProperty(f, 'size', { value: size });
  return f;
}

function renderSource(onDraft = vi.fn()) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const { container } = render(
    <QueryClientProvider client={qc}>
      <PhotoRecipeSource onDraft={onDraft} />
    </QueryClientProvider>
  );
  const input = container.querySelector('input[type="file"]') as HTMLInputElement;
  return { onDraft, input };
}

describe('PhotoRecipeSource', () => {
  it('shows a thumbnail and enables Import after a valid file is selected', async () => {
    const { input } = renderSource();
    fireEvent.change(input, { target: { files: [imageFile('page.jpg', 'image/jpeg', 1000)] } });

    expect(await screen.findByRole('img')).toHaveAttribute('src', 'blob:page.jpg');
    expect(screen.getByRole('button', { name: /Import \(1\)/ })).toBeEnabled();
  });

  it('rejects an unsupported type with a message and no thumbnail', () => {
    const { input } = renderSource();
    fireEvent.change(input, { target: { files: [imageFile('p.heic', 'image/heic', 1000)] } });

    expect(screen.getByText(/Unsupported type/)).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('flags an oversize image with a resize note', () => {
    const { input } = renderSource();
    fireEvent.change(input, {
      target: { files: [imageFile('big.jpg', 'image/jpeg', MAX_IMAGE_BYTES + 1)] },
    });

    // per-thumbnail chip (exact string → matches only the Chip, not the summary)
    expect(screen.getByText('will be resized')).toBeInTheDocument();
    // aggregate summary caption (substring unique to the summary)
    expect(screen.getByText(/will be resized before upload/i)).toBeInTheDocument();
  });

  it('emits an AcquiredDraft with sourceUrl null on success', async () => {
    const { input, onDraft } = renderSource();
    fireEvent.change(input, { target: { files: [imageFile('page.jpg', 'image/jpeg', 1000)] } });
    fireEvent.click(screen.getByRole('button', { name: /Import \(1\)/ }));

    await waitFor(() => expect(onDraft).toHaveBeenCalledTimes(1));
    expect(onDraft).toHaveBeenCalledWith({
      draft: expect.objectContaining({ recipe: expect.objectContaining({ title: 'From Photo' }) }),
      sourceUrl: null,
    });
  });
});
