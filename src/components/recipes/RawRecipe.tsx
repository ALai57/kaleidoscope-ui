import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import type { RecipeContent } from '@/types/recipe';
import { pickLaneColors, componentId } from '@/utils/cookTimeline';

const Card = styled('section', { shouldForwardProp: (prop) => prop !== 'sec' })<{ sec: string }>(
  ({ theme, sec }) => ({
    background: theme.tokens.color.surface.raised,
    border: `1px solid ${theme.tokens.color.border.subtle}`,
    borderLeft: `3px solid ${sec}`,
    borderRadius: theme.tokens.radius.md,
    boxShadow: theme.tokens.elevation.md,
    padding: '15px 18px 18px',
    '& + &': { marginTop: 16 },
  })
);

const Name = styled('h3', { shouldForwardProp: (prop) => prop !== 'sec' })<{ sec: string }>(
  ({ theme, sec }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontFamily: theme.tokens.typography.mono,
    fontWeight: 600,
    fontSize: 16,
    margin: '0 0 4px',
    color: sec,
    '& .sdot': { width: 11, height: 11, borderRadius: 3, background: sec, flex: '0 0 auto' },
  })
);

const Label = styled('h5')(({ theme }) => ({
  fontFamily: theme.tokens.typography.mono,
  fontSize: 10.5,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: theme.tokens.color.text.disabled,
  margin: '16px 0 8px',
  paddingTop: 12,
  borderTop: `1px solid ${theme.tokens.color.border.subtle}`,
  '&:first-of-type': { paddingTop: 8, borderTop: 0 },
}));

export interface RawRecipeProps {
  content: RecipeContent;
}

// Plain, color-coded full-recipe view: one card per section (accent bar +
// title in the section's lane color), ingredients then instructions as
// plain text. The lane color and label match `componentId`/`pickLaneColors`
// so a section reads as the same color and name everywhere (Gantt, here).
export const RawRecipe: React.FC<RawRecipeProps> = ({ content }) => {
  const theme = useTheme();
  const colors = pickLaneColors(content.sections.length, theme.tokens.color.categorical);
  return (
    <div>
      {content.sections.map((s, i) => {
        // Guard for noUncheckedIndexedAccess: colors has one entry per
        // section (via pickLaneColors), but index access still types as
        // possibly-undefined — fall back to a theme color rather than a
        // literal.
        const sec = colors[i] ?? theme.tokens.color.brand.primary;
        return (
          <Card key={i} sec={sec}>
            <Name sec={sec}>
              <span className="sdot" />
              {componentId(s, i)}
            </Name>
            <Label>Ingredients</Label>
            <ul>
              {s.ingredients.map((ing, j) => (
                <li key={j}>{ing}</li>
              ))}
            </ul>
            <Label>Instructions</Label>
            <ol>
              {s.steps.map((step, j) => (
                <li key={j}>{step}</li>
              ))}
            </ol>
          </Card>
        );
      })}
    </div>
  );
};
