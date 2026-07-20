import type { FormControlLabelProps } from '@mui/material';

/**
 * Shared typography for ingredient-checklist labels across the recipe views
 * (timeline detail panel, mobile timeline, shopping list).
 *
 * Without this, a bare `<FormControlLabel>` renders its label as MUI `body1`,
 * which the token scale sets to 1.3rem (~20.8px) — larger than the 15px cooking
 * instructions beside it, inverting the visual hierarchy. Ingredients are
 * reference content, so they sit *below* the method. `fontFamily: 'inherit'`
 * lets each label adopt its container's face (mono in the mission-control
 * panels) instead of MUI's default sans, keeping each surface internally
 * consistent.
 */
export const ingredientLabelSlotProps: FormControlLabelProps['slotProps'] = {
  typography: { sx: { fontSize: 14, lineHeight: 1.5, fontFamily: 'inherit' } },
};
