import React from 'react';
import { Box } from '@mui/material';
import { ImageVersion } from '@/types/image';
import { useAuthorizedImage } from './useAuthorizedImage';

export interface ImageThumbnailProps {
  image: ImageVersion;
  authToken?: string | null;
  onClick?: () => void;
  selected?: boolean;
}

export const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  image,
  authToken = null,
  onClick,
  selected = false,
}) => {
  const { containerRef, src } = useAuthorizedImage(image.src, authToken, {
    lazy: true,
    rootMargin: '50px',
  });

  return (
    <Box
      ref={containerRef}
      className="placeholder"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      sx={{
        aspectRatio: '1 / 1',
        width: '100%',
        borderRadius: 1,
        overflow: 'hidden',
        cursor: 'pointer',
        bgcolor: 'action.hover',
        outline: selected ? '3px solid' : '1px solid',
        outlineColor: selected ? 'primary.main' : 'divider',
        outlineOffset: '-1px',
        '&:focus-visible': { outline: '3px solid', outlineColor: 'primary.main' },
      }}
    >
      {src && (
        <img
          src={src}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
    </Box>
  );
};
