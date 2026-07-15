import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { moveItem } from '../../utils/recipe';
import type { RecipeSection } from '../../types/recipe';

// Editor-facing section: `name` is always a string (never null) for a
// controlled input, and each list keeps at least one (possibly blank) row so
// there is always somewhere to type. Converted to/from the API `RecipeSection`
// at the page boundary via toEditSection / toSection.
export interface EditSection {
  name: string;
  ingredients: string[];
  steps: string[];
}

export function emptyEditSection(): EditSection {
  return { name: '', ingredients: [''], steps: [''] };
}

export function toEditSection(s: RecipeSection): EditSection {
  return {
    name: s.name ?? '',
    ingredients: s.ingredients.length ? s.ingredients : [''],
    steps: s.steps.length ? s.steps : [''],
  };
}

export function toSection(s: EditSection): RecipeSection {
  return {
    name: s.name.trim() === '' ? null : s.name.trim(),
    ingredients: s.ingredients.map((i) => i.trim()).filter((i) => i !== ''),
    steps: s.steps.map((st) => st.trim()).filter((st) => st !== ''),
  };
}

interface RecipeSectionsEditorProps {
  sections: EditSection[];
  onChange: (sections: EditSection[]) => void;
}

// Progressive: with one section, only Ingredients + Steps show. "Add section"
// appends a section and reveals name fields + card chrome on all of them.
export const RecipeSectionsEditor: React.FC<RecipeSectionsEditorProps> = ({
  sections,
  onChange,
}) => {
  const multi = sections.length > 1;

  const patchSection = (si: number, patch: Partial<EditSection>): void =>
    onChange(sections.map((s, i) => (i === si ? { ...s, ...patch } : s)));
  const addSection = (): void => onChange([...sections, emptyEditSection()]);
  const removeSection = (si: number): void => onChange(sections.filter((_, i) => i !== si));
  const moveSection = (si: number, dir: -1 | 1): void => onChange(moveItem(sections, si, dir));

  const renderRows = (
    si: number,
    key: 'ingredients' | 'steps',
    label: string,
    placeholder: string
  ): React.ReactNode => {
    const list = sections[si]?.[key] ?? [];
    const setList = (next: string[]): void =>
      patchSection(si, key === 'ingredients' ? { ingredients: next } : { steps: next });
    return (
      <Box>
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          {label}
        </Typography>
        {list.map((value, ri) => (
          <Stack
            key={ri}
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
              mb: 1
            }}>
            <TextField
              fullWidth
              size="small"
              value={value}
              placeholder={placeholder}
              onChange={(e) => setList(list.map((x, idx) => (idx === ri ? e.target.value : x)))}
            />
            <IconButton
              aria-label={`move ${label} ${ri + 1} up`}
              disabled={ri === 0}
              onClick={() => setList(moveItem(list, ri, -1))}
            >
              <ArrowUpwardIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label={`move ${label} ${ri + 1} down`}
              disabled={ri === list.length - 1}
              onClick={() => setList(moveItem(list, ri, 1))}
            >
              <ArrowDownwardIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label={`remove ${label} ${ri + 1}`}
              onClick={() => setList(list.filter((_, idx) => idx !== ri))}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}
        <Button startIcon={<AddIcon />} size="small" onClick={() => setList([...list, ''])}>
          Add {label.toLowerCase()}
        </Button>
      </Box>
    );
  };

  return (
    <Stack spacing={3}>
      {sections.map((section, si) => (
        <Box
          key={si}
          sx={multi ? { p: 2, border: 1, borderColor: 'divider', borderRadius: 1 } : {}}
        >
          {multi && (
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                mb: 1
              }}>
              <TextField
                fullWidth
                size="small"
                label="Section name"
                placeholder="e.g. Cake"
                value={section.name}
                onChange={(e) => patchSection(si, { name: e.target.value })}
              />
              <IconButton
                aria-label={`move section ${si + 1} up`}
                disabled={si === 0}
                onClick={() => moveSection(si, -1)}
              >
                <ArrowUpwardIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label={`move section ${si + 1} down`}
                disabled={si === sections.length - 1}
                onClick={() => moveSection(si, 1)}
              >
                <ArrowDownwardIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label={`remove section ${si + 1}`}
                onClick={() => removeSection(si)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          )}
          {renderRows(si, 'ingredients', 'Ingredients', '2 cups flour')}
          {renderRows(si, 'steps', 'Steps', 'Preheat the oven to 350°F')}
        </Box>
      ))}
      <Box>
        <Button startIcon={<AddIcon />} size="small" onClick={addSection}>
          Add section
        </Button>
      </Box>
    </Stack>
  );
};
