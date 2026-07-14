import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Dialog, Button, TextInput } from '../prism';
import { updateRecipe } from '../../api/recipes';
import { ApiError } from '../../api/client';
import { slugify } from '../../utils/url';
import type { Recipe } from '../../types/recipe';

interface Props {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
  onRenamed: (newSlug: string) => void;
  token?: string | undefined;
}

export const RenameRecipeUrlDialog: React.FC<Props> = ({ recipe, open, onClose, onRenamed, token }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset the editable slug + error whenever the dialog (re)opens for a
    // recipe; the dialog isn't remounted between opens, so a `key` reset
    // isn't available and this effect is the correct place to sync local
    // edit state from the prop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open && recipe) { setValue(recipe.recipe_url); setError(null); }
  }, [open, recipe]);

  const slug = slugify(value);
  const unchanged = !recipe || slug === recipe.recipe_url;
  const invalid = slug.length === 0 || unchanged;

  const rename = useMutation({
    mutationFn: () => updateRecipe(recipe!.recipe_url, { recipe_url: slug }, token),
    onSuccess: () => onRenamed(slug),
    onError: (e) => setError(e instanceof ApiError && e.status === 409
      ? extractError(e.message)
      : 'Could not rename the URL. Please try again.'),
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Rename URL"
      tone="accent"
      icon={<LinkGlyph />}
      actions={
        <>
          <Button variant="subtle" onClick={onClose}>Cancel</Button>
          <Button variant="primary" disabled={invalid || rename.isPending} onClick={() => { setError(null); rename.mutate(); }}>
            Save URL
          </Button>
        </>
      }
    >
      <p style={{ fontSize: 13.5, lineHeight: 1.5 }}>
        The URL is this recipe&apos;s public address, not its identity — changing it keeps the
        recipe and its history. Old links will stop resolving.
      </p>
      <label htmlFor="recipe-slug" style={{ display: 'block', marginTop: 14, marginBottom: 7, fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        Recipe URL
      </label>
      <TextInput id="recipe-slug" aria-label="Recipe URL" value={value} spellCheck={false}
        autoComplete="off" onChange={(e) => { setValue(e.target.value); setError(null); }} />
      <p style={{ marginTop: 9, fontSize: 11 }}>
        {error ?? `Public address → /recipes/${slug || '…'}`}
      </p>
    </Dialog>
  );
};

// Backend returns { error: "..." }; ApiError.message is the raw JSON body text.
function extractError(body: string): string {
  try { return (JSON.parse(body).error as string) ?? body; } catch { return body; }
}

const LinkGlyph: React.FC = () => (
  <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8.5 11.5 a3.5 3.5 0 0 0 5 0 l2.5-2.5 a3.5 3.5 0 0 0-5-5 l-1 1" />
    <path d="M11.5 8.5 a3.5 3.5 0 0 0-5 0 l-2.5 2.5 a3.5 3.5 0 0 0 5 5 l1-1" />
  </svg>
);
