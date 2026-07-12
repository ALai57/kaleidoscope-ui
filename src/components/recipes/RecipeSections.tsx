import React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import type { RecipeContent } from '../../types/recipe';

interface RecipeSectionsProps {
  content: RecipeContent;
}

// Per-section blocks: each component (Cake, Frosting, …) shows its own
// ingredient checklist and numbered steps. A single unnamed section renders as
// a plain Ingredients + Instructions pair with no section heading.
export const RecipeSections: React.FC<RecipeSectionsProps> = ({ content }) => {
  const multi = content.sections.length > 1;
  return (
    <Box>
      {content.sections.map((section, si) => {
        const name = section.name?.trim();
        const heading = name || (multi ? `Section ${si + 1}` : null);
        return (
          <Box key={si} sx={{ mt: si === 0 ? 0 : 4 }}>
            {heading && (
              <>
                <Divider sx={{ mb: 1 }} />
                <Typography variant="h4">{heading}</Typography>
              </>
            )}
            <Typography variant="h5" sx={{ mt: 2 }}>
              Ingredients
            </Typography>
            <Box>
              {section.ingredients.map((ing, i) => (
                <FormControlLabel
                  key={`${ing}-${i}`}
                  control={<Checkbox />}
                  label={ing}
                  sx={{ display: 'flex' }}
                />
              ))}
            </Box>
            <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
              Instructions
            </Typography>
            <Box component="ol" sx={{ pl: 3, m: 0 }}>
              {section.steps.map((step, i) => (
                <Typography component="li" key={i} sx={{ mb: 1 }}>
                  {step}
                </Typography>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
