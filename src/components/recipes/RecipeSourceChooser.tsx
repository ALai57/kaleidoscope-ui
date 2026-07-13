import React, { useState } from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { UrlRecipeSource } from './UrlRecipeSource';
import { PhotoRecipeSource } from './PhotoRecipeSource';
import type { AcquiredDraft } from '../../types/recipe';

interface Props {
  onDraft: (acquired: AcquiredDraft) => void;
}

type Mode = 'url' | 'photo';

// Presentation only: decides which self-contained source is on screen. It does
// not branch behavior on source-kind — each source produces the same value.
export const RecipeSourceChooser: React.FC<Props> = ({ onDraft }) => {
  const [mode, setMode] = useState<Mode>('url');

  return (
    <Box sx={{ mb: 2 }}>
      <ToggleButtonGroup
        exclusive
        size="small"
        value={mode}
        onChange={(_, next: Mode | null) => next && setMode(next)}
        sx={{ mb: 1 }}
      >
        <ToggleButton value="url">URL</ToggleButton>
        <ToggleButton value="photo">Photo</ToggleButton>
      </ToggleButtonGroup>
      {mode === 'url' ? (
        <UrlRecipeSource onDraft={onDraft} />
      ) : (
        <PhotoRecipeSource onDraft={onDraft} />
      )}
    </Box>
  );
};
