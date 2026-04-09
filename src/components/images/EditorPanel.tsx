import React from 'react';
import { Box, TextField, Button, InputLabel, FormControl, Stack } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Save } from '@styled-icons/boxicons-regular/Save';
import { Image, ImageVersion } from '@/types/image';
import { VersionSelector } from './VersionSelector';

export interface EditPhotoPayload {
  photo_title: string;
  description: string;
  'photo-id': string;
}

export interface EditorPanelProps {
  selectedImage: Image | undefined;
  selectedVersion: ImageVersion | undefined;
  mode: 'edit' | 'select';
  onVersionChange: (event: SelectChangeEvent<ImageVersion>) => void;
  onEditPhoto: (payload: EditPhotoPayload) => void;
  showVersionSelector?: boolean;
  isSaving?: boolean;
}

interface SaveButtonProps {
  onSave: () => void;
  isSaving?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onSave, isSaving = false }) => (
  <Button
    variant="contained"
    startIcon={<Save style={{ height: '20px' }} />}
    sx={{ mt: 1 }}
    onClick={onSave}
    disabled={isSaving}
  >
    {isSaving ? 'Saving…' : 'Save'}
  </Button>
);

export const EditorPanel: React.FC<EditorPanelProps> = ({
  selectedImage,
  selectedVersion,
  mode,
  onVersionChange,
  onEditPhoto,
  showVersionSelector = true,
  isSaving = false,
}) => {
  const [title, setTitle] = React.useState<string>(selectedImage?.title ?? '');
  const [description, setDescription] = React.useState<string>(selectedImage?.description ?? '');

  const date = Date.parse(selectedImage?.created_at ?? '');
  const dateFormat: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  };
  const displayDate = isNaN(date) ? '' : new Date(date).toLocaleString('en-US', dateFormat);
  const imageVersions = selectedImage?.versions as Record<string, ImageVersion> | undefined;

  return (
    <Box>
      <Stack spacing={1}>
        <TextField label="Name" size="small" disabled fullWidth value={selectedImage?.name ?? ''} />
        <TextField label="Created At" size="small" disabled fullWidth value={displayDate} />
        <TextField label="Creator" size="small" disabled fullWidth value={selectedImage?.creator ?? ''} />
        <TextField
          label="Title"
          size="small"
          fullWidth
          disabled={mode !== 'edit'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          size="small"
          fullWidth
          multiline
          minRows={2}
          disabled={mode !== 'edit'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {showVersionSelector && imageVersions && (
          <FormControl fullWidth size="small">
            <InputLabel id="version-select">Version</InputLabel>
            <VersionSelector
              onVersionChange={onVersionChange}
              selectedVersion={selectedVersion}
              imageVersions={imageVersions}
            />
          </FormControl>
        )}
      </Stack>

      {mode === 'edit' && (
        <SaveButton
          isSaving={isSaving}
          onSave={() =>
            onEditPhoto({
              photo_title: title,
              description,
              'photo-id': selectedImage?.name ?? '',
            })
          }
        />
      )}
    </Box>
  );
};
