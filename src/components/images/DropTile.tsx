import React from 'react';
import { Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export interface DropTileProps {
  onAdd: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading?: boolean;
}

/** The Prism upload affordance: a dashed square tile wrapping a hidden file
 *  input. Token-driven so it renders correctly under both the Prism dark theme
 *  and a light theme. */
export const DropTile: React.FC<DropTileProps> = ({ onAdd, isUploading = false }) => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const mono = tokens?.typography.mono ?? 'monospace';
  const settle = tokens?.motion.easing.springSettle ?? 'ease';
  const durBase = tokens?.motion.duration.base ?? 250;
  const radius = theme.shape.borderRadius;
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Box
      component="label"
      data-testid="drop-tile"
      role="button"
      aria-label="Add photo"
      tabIndex={isUploading ? -1 : 0}
      aria-disabled={isUploading || undefined}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!isUploading) {
            inputRef.current?.click();
          }
        }
      }}
      sx={{
        aspectRatio: '1 / 1',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.75,
        borderRadius: `${radius}px`,
        border: '1.5px dashed',
        borderColor: 'divider',
        color: 'text.secondary',
        cursor: isUploading ? 'default' : 'pointer',
        textAlign: 'center',
        px: 1,
        opacity: isUploading ? 0.6 : 1,
        transition: `border-color ${durBase}ms, color ${durBase}ms, background-color ${durBase}ms`,
        '&:hover': isUploading
          ? {}
          : {
              borderColor: 'primary.main',
              color: 'primary.main',
              bgcolor: alpha(theme.palette.primary.main, 0.12),
            },
        '& svg': { transition: `transform ${durBase}ms ${settle}` },
        '&:hover svg': isUploading ? {} : { transform: 'translateY(-2px)' },
        '@media (prefers-reduced-motion: reduce)': { '&:hover svg': { transform: 'none' } },
      }}
    >
      <AddPhotoAlternateIcon sx={{ fontSize: 22 }} />
      <Box
        component="span"
        sx={{
          fontFamily: mono,
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {isUploading ? 'Uploading…' : 'Add photo'}
      </Box>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        multiple
        disabled={isUploading}
        onChange={onAdd}
      />
    </Box>
  );
};
