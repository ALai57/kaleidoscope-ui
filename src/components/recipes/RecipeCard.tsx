import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, IconButton, Menu, MenuItem, Chip } from '../prism';
import { qualifiedLabelName } from '../../api/recipes';
import { previewIngredients } from '../../utils/recipe';
import type { Recipe } from '../../types/recipe';

interface Props {
  recipe: Recipe;
  canManage: boolean;
  onOpen: () => void;
  onRename: () => void;
  onDelete: () => void;
}

export const RecipeCard: React.FC<Props> = ({ recipe, canManage, onOpen, onRename, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const spectrum = theme.tokens.color.categorical;
  const ingredientCount = recipe.content.sections.reduce((n, s) => n + s.ingredients.length, 0);
  const totalMinutes = (recipe.content.prep_time_minutes ?? 0) + (recipe.content.cook_time_minutes ?? 0);

  return (
    <Card interactive onClick={onOpen} style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 176 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{recipe.content.title}</div>
          <div style={{ fontFamily: theme.tokens.typography.mono, fontSize: 11, color: theme.tokens.color.text.disabled, marginTop: 4 }}>
            /recipes/{recipe.recipe_url}
          </div>
        </div>
        {canManage && (
          <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <IconButton aria-label="Recipe actions" aria-haspopup="menu" aria-expanded={menuOpen}
              onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}>
              <DotsGlyph />
            </IconButton>
            <Menu open={menuOpen} onClose={() => setMenuOpen(false)} aria-label={`Actions for ${recipe.content.title}`}>
              <MenuItem onSelect={() => { setMenuOpen(false); onRename(); }}>Rename URL…</MenuItem>
              <MenuItem onSelect={() => { setMenuOpen(false); onOpen(); }}>Open recipe</MenuItem>
              <MenuItem danger onSelect={() => { setMenuOpen(false); onDelete(); }}>Delete…</MenuItem>
            </Menu>
          </div>
        )}
      </div>

      <div style={{ fontSize: 13, color: theme.tokens.color.text.secondary, lineHeight: 1.5,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {previewIngredients(recipe.content)}
      </div>

      {recipe.labels && recipe.labels.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
          {recipe.labels.map((l, i) => (
            <Chip key={l.id} as="span" dotColor={spectrum[i % spectrum.length]!}>{qualifiedLabelName(l)}</Chip>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 14, paddingTop: 12, borderTop: `1px solid ${theme.tokens.color.border.subtle}`,
        fontFamily: theme.tokens.typography.mono, fontSize: 11, color: theme.tokens.color.text.disabled }}>
        <span><b style={{ color: theme.tokens.color.text.secondary }}>{ingredientCount}</b> ingredients</span>
        {totalMinutes > 0 && (
          <span><b style={{ color: theme.tokens.color.text.secondary }}>{totalMinutes}</b> min</span>
        )}
      </div>
    </Card>
  );
};

const DotsGlyph: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <circle cx="10" cy="4.5" r="1.5" /><circle cx="10" cy="10" r="1.5" /><circle cx="10" cy="15.5" r="1.5" />
  </svg>
);
