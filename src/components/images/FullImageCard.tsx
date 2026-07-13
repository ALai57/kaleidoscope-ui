import React from 'react';
import { Box } from '@mui/material';
import { ImageVersion } from '@/types/image';
import { useAuthorizedImage } from './useAuthorizedImage';

export interface FullImageCardProps {
  image: ImageVersion;
  authToken?: string | null;
  onClick?: () => void;
}

export const FullImageCard: React.FC<FullImageCardProps> = ({
  image,
  authToken = null,
  onClick,
}) => {
  const { src } = useAuthorizedImage(image.src, authToken, { lazy: false });

  return (
    <Box
      onClick={onClick}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {src && (
        <img
          id={`full-${image.src}`}
          src={src}
          alt=""
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      )}
    </Box>
  );
};
