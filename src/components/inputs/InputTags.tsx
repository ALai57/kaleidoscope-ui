import React from 'react';
import Autocomplete, {
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export interface InputTagsProps<T extends string> {
  options: T[];
  vals: T[];
  onAdd: (val: T) => void;
  onRemove: (val: T) => void;
  tagType?: string;
  disabled?: boolean;
  width?: string | number;
}

function InputTags<T extends string>({
  options = [] as unknown as T[],
  width = 500,
  onAdd,
  vals,
  onRemove,
  tagType = 'Albums',
  disabled = false,
}: InputTagsProps<T>): React.ReactElement {
  const handleChange = (
    _event: React.SyntheticEvent,
    _list: T[],
    reason: AutocompleteChangeReason,
    detail?: AutocompleteChangeDetails<T>,
  ): void => {
    if (reason === 'selectOption' && detail) {
      onAdd(detail.option);
    } else if (reason === 'removeOption' && detail) {
      onRemove(detail.option);
    }
  };

  return (
    <Stack spacing={3} sx={{ width }}>
      <Autocomplete<T, true>
        multiple
        disabled={disabled}
        id="tags-standard"
        options={options}
        getOptionLabel={(option: T) => option}
        isOptionEqualToValue={(option: T, value: T) => option === value}
        onChange={handleChange}
        defaultValue={vals}
        renderInput={(params) => (
          <TextField
            // MUI v6 AutocompleteRenderInputParams is incompatible with exactOptionalPropertyTypes
            // due to optional className fields; spreading through unknown is safe here.
            {...(params as unknown as React.ComponentProps<typeof TextField>)}
            type="text"
            label={tagType}
            placeholder={tagType}
            size="small"
          />
        )}
      />
    </Stack>
  );
}

export { InputTags };
