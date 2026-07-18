import * as React from 'react';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import type { RecipeContent } from '@/types/recipe';
import { componentId, ingredientKey, pickLaneColors } from '@/utils/cookTimeline';

const Summary = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  marginBottom: 16,
  fontFamily: theme.tokens.typography.mono,
  fontSize: 12,
  color: theme.tokens.color.text.secondary,
  '& .big': { color: theme.tokens.color.text.primary, fontSize: 20, fontWeight: 600 },
}));

const Grid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: 14,
});

const SectionCard = styled('div')(({ theme }) => ({
  background: theme.tokens.color.surface.base,
  border: `1px solid ${theme.tokens.color.border.subtle}`,
  borderRadius: theme.tokens.radius.md,
  overflow: 'hidden',
}));

// Custom "sec" prop must not land on the DOM element — use shouldForwardProp
// (matches RawRecipe's pattern) to keep test output warning-free.
const SectionHeader = styled('header', { shouldForwardProp: (prop) => prop !== 'sec' })<{
  sec: string;
}>(({ theme, sec }) => ({
  borderLeft: `3px solid ${sec}`,
  padding: '10px 14px',
  fontFamily: theme.tokens.typography.mono,
  fontWeight: 600,
  fontSize: 13,
  color: theme.tokens.color.text.primary,
  background: theme.tokens.color.surface.raised,
}));

const IngredientList = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '4px 10px 10px',
});

export interface ShoppingListProps {
  content: RecipeContent;
  checked: ReadonlySet<string>;
  onToggleIngredient: (key: string) => void;
  onClearChecked: () => void;
}

// Whole-recipe checkable ingredient list. Controlled: the checked set lives
// in RecipePage (shared with the Timeline view's own ingredient checklist)
// so this component never owns state — it only reports toggles/clears.
export const ShoppingList: React.FC<ShoppingListProps> = ({
  content,
  checked,
  onToggleIngredient,
  onClearChecked,
}) => {
  const theme = useTheme();
  const colors = pickLaneColors(content.sections.length, theme.tokens.color.categorical);
  const total = content.sections.reduce((n, s) => n + s.ingredients.length, 0);
  const checkedCount = content.sections.reduce(
    (n, s, i) => n + s.ingredients.filter((_, j) => checked.has(ingredientKey(i, j))).length,
    0
  );

  return (
    <div>
      <Summary>
        <span className="big">
          {checkedCount}/{total}
        </span>
        ingredients checked
        <Button
          onClick={onClearChecked}
          size="small"
          variant="outlined"
          sx={{ marginLeft: 'auto' }}
        >
          Reset list
        </Button>
      </Summary>
      <Grid>
        {content.sections.map((s, i) => {
          const sec = colors[i] ?? theme.tokens.color.brand.primary;
          return (
            <SectionCard key={i}>
              <SectionHeader sec={sec}>{componentId(s, i)}</SectionHeader>
              <IngredientList>
                {s.ingredients.map((ing, j) => {
                  const key = ingredientKey(i, j);
                  return (
                    <FormControlLabel
                      key={j}
                      control={
                        <Checkbox
                          checked={checked.has(key)}
                          onChange={() => onToggleIngredient(key)}
                          slotProps={{ input: { 'aria-label': ing } }}
                        />
                      }
                      label={ing}
                    />
                  );
                })}
              </IngredientList>
            </SectionCard>
          );
        })}
      </Grid>
    </div>
  );
};
