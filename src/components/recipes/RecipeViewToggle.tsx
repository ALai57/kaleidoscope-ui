import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export type RecipeView = 'timeline' | 'shopping' | 'raw';

const OPTIONS: { value: RecipeView; label: string }[] = [
  { value: 'timeline', label: 'Timeline' },
  { value: 'shopping', label: 'Shopping list' },
  { value: 'raw', label: 'Raw recipe' },
];

export const RecipeViewToggle: React.FC<{
  value: RecipeView;
  onChange: (v: RecipeView) => void;
}> = ({ value, onChange }) => (
  <ToggleButtonGroup
    exclusive
    size="small"
    value={value}
    onChange={(_, next) => {
      if (next) onChange(next as RecipeView);
    }}
    aria-label="Recipe view"
    sx={{ mb: 2 }}
  >
    {OPTIONS.map((o) => (
      <ToggleButton key={o.value} value={o.value}>
        {o.label}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
);
