import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Dialog, Button, TextInput } from '../prism';
import { deleteRecipe } from '../../api/recipes';
import type { Recipe } from '../../types/recipe';

interface Props {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
  onDeleted: () => void;
  token?: string | undefined;
}

export const DeleteRecipeDialog: React.FC<Props> = ({ recipe, open, onClose, onDeleted, token }) => {
  const [confirm, setConfirm] = useState('');
  useEffect(() => {
    // Reset the typed confirmation whenever the dialog (re)opens; the dialog
    // isn't remounted between opens, so a `key` reset isn't available and
    // this effect is the correct place to sync local edit state from `open`.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setConfirm('');
  }, [open]);

  const matches = !!recipe && confirm.trim().toLowerCase() === recipe.content.title.toLowerCase();

  const del = useMutation({
    mutationFn: () => deleteRecipe(recipe!.recipe_url, token),
    onSuccess: onDeleted,
  });

  const title = recipe?.content.title ?? '';
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Delete recipe"
      tone="crit"
      icon={<TrashGlyph />}
      actions={
        <>
          <Button variant="subtle" onClick={onClose}>Cancel</Button>
          <Button variant="danger" disabled={!matches || del.isPending} onClick={() => del.mutate()}>
            Delete recipe
          </Button>
        </>
      }
    >
      <p style={{ fontSize: 13.5, lineHeight: 1.5 }}>
        Delete <b>{title}</b>? This removes the recipe, its sections, and label
        associations. This can&apos;t be undone.
      </p>
      <div style={{ marginTop: 14 }}>
        <TextInput aria-label={`Type the recipe name to confirm`} value={confirm} spellCheck={false}
          autoComplete="off" placeholder={`Type "${title}" to confirm`}
          onChange={(e) => setConfirm(e.target.value)} />
      </div>
    </Dialog>
  );
};

const TrashGlyph: React.FC = () => (
  <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 6 h12 M8 6 V4.5 a1 1 0 0 1 1-1 h2 a1 1 0 0 1 1 1 V6 M6.5 6 l.6 9 a1.5 1.5 0 0 0 1.5 1.4 h2.8 a1.5 1.5 0 0 0 1.5-1.4 l.6-9" />
  </svg>
);
