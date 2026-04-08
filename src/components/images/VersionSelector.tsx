import React from 'react';
import { MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { ImageVersion } from '@/types/image';

export interface VersionSelectorProps {
  imageVersions: Record<string, ImageVersion> | undefined;
  selectedVersion: ImageVersion | undefined;
  onVersionChange: (event: SelectChangeEvent<ImageVersion>) => void;
}

export const VersionSelector: React.FC<VersionSelectorProps> = ({
  onVersionChange,
  selectedVersion,
  imageVersions,
}) => (
  <Select
    fullWidth
    id="version-select"
    onChange={onVersionChange}
    value={selectedVersion ?? ('' as unknown as ImageVersion)}
    size="small"
  >
    {imageVersions &&
      Object.entries(imageVersions).map(([name, version]) => (
        <MenuItem key={name} value={version as unknown as string}>
          {name}
        </MenuItem>
      ))}
  </Select>
);
