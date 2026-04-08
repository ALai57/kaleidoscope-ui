import React from 'react';
import { Box, TextField, Button, InputLabel, FormControl } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Save } from '@styled-icons/boxicons-regular/Save';
import { Image, ImageVersion } from '@/types/image';
import { VersionSelector } from './VersionSelector';
import { InputTags } from '@/components/inputs/InputTags';

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
  albums: string[];
  showVersionSelector?: boolean;
}

interface EditableFieldProps {
  label: string;
  id: string;
  val: string;
  disabled: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  id,
  val,
  disabled,
  onChange,
}) => (
  <React.Fragment>
    <TextField
      label={label}
      id={id}
      type="text"
      defaultValue={val}
      disabled={disabled}
      sx={{ width: '100%', paddingTop: '7px', paddingBottom: '7px' }}
      onChange={onChange}
      size="small"
    />
    <br />
  </React.Fragment>
);

export const EditorPanel: React.FC<EditorPanelProps> = ({
  selectedImage,
  selectedVersion,
  mode,
  onVersionChange,
  onEditPhoto,
  albums,
  showVersionSelector = true,
}) => {
  const [title, setTitle] = React.useState<string>(selectedImage?.title ?? '');
  const [description, setDescription] = React.useState<string>(
    selectedImage?.description ?? '',
  );

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

  const SaveButton: React.FC = () => (
    <Button
      variant="contained"
      startIcon={<Save style={{ height: '20px' }} />}
      component="label"
      sx={{ margin: '5px' }}
      onClick={() =>
        onEditPhoto({
          photo_title: title,
          description,
          'photo-id': selectedImage?.name ?? '',
        })
      }
    >
      Save
    </Button>
  );

  return (
    <Box>
      <form>
        <br />
        <EditableField
          key={(selectedImage?.name ?? '') + 'ef-1'}
          label="Name"
          id="name"
          disabled
          val={selectedImage?.name ?? ''}
        />
        <EditableField
          key={(selectedImage?.name ?? '') + 'ef-2'}
          label="Created At"
          id="created_at"
          disabled
          val={displayDate}
        />
        <EditableField
          key={(selectedImage?.name ?? '') + 'ef-3'}
          label="Creator"
          id="creator"
          disabled
          val={selectedImage?.creator ?? ''}
        />
        <EditableField
          key={(selectedImage?.name ?? '') + 'ef-4'}
          label="Title"
          id="title"
          disabled={mode !== 'edit'}
          val={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <EditableField
          key={(selectedImage?.name ?? '') + 'ef-5'}
          label="Description"
          id="description"
          disabled={mode !== 'edit'}
          val={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <InputTags
          options={albums}
          disabled={mode !== 'edit'}
          width="100%"
          vals={[]}
          onAdd={() => console.log('Added!')}
          onRemove={() => console.log('Removed!')}
        />

        <br />
        {showVersionSelector && imageVersions && (
          <FormControl fullWidth>
            <InputLabel id="version-select">Version</InputLabel>
            <VersionSelector
              onVersionChange={onVersionChange}
              selectedVersion={selectedVersion}
              imageVersions={imageVersions}
            />
          </FormControl>
        )}
      </form>
      <br />
      {mode === 'edit' && <SaveButton />}
    </Box>
  );
};
