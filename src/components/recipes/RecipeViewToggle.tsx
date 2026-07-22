import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

export type RecipeView = 'timeline' | 'shopping' | 'raw';

const OPTIONS: { value: RecipeView; label: string }[] = [
  { value: 'timeline', label: 'Timeline' },
  { value: 'shopping', label: 'Shopping list' },
  { value: 'raw', label: 'Raw recipe' },
];

// Prism-style segmented control: an inset track of mono, uppercase labels with
// the active segment lit in the brand accent — visually of a piece with the
// cook-timeline panel below it. Reads from theme.tokens, so it obeys light/dark.
const Track = styled(ToggleButtonGroup)(({ theme }) => ({
  gap: 3,
  padding: 3,
  borderRadius: theme.tokens.radius.md,
  border: `1px solid ${theme.tokens.color.border.subtle}`,
  background: theme.tokens.color.surface.sunken,
}));

const Segment = styled(ToggleButton)(({ theme }) => ({
  '&.MuiToggleButtonGroup-grouped': {
    margin: 0,
    border: 'none',
    borderRadius: theme.tokens.radius.sm,
  },
  padding: '6px 14px',
  fontFamily: theme.tokens.typography.mono,
  fontSize: 12,
  fontWeight: 600,
  lineHeight: 1.2,
  letterSpacing: '.1em',
  textTransform: 'uppercase',
  color: theme.tokens.color.text.secondary,
  '&:hover': {
    background: theme.tokens.color.surface.raised,
  },
  '&.Mui-selected': {
    color: theme.tokens.color.brand.primary,
    background: alpha(theme.tokens.color.brand.primary, 0.12),
    boxShadow: `inset 0 -2px 0 ${theme.tokens.color.brand.primary}`,
  },
  '&.Mui-selected:hover': {
    background: alpha(theme.tokens.color.brand.primary, 0.18),
  },
}));

export const RecipeViewToggle: React.FC<{
  value: RecipeView;
  onChange: (v: RecipeView) => void;
}> = ({ value, onChange }) => (
  <Track
    exclusive
    size="small"
    value={value}
    onChange={(_, next) => {
      if (next) onChange(next as RecipeView);
    }}
    aria-label="Recipe view"
  >
    {OPTIONS.map((o) => (
      <Segment key={o.value} value={o.value}>
        {o.label}
      </Segment>
    ))}
  </Track>
);
