import React from 'react';
import { Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ImageVersion } from '@/types/image';
import { useAuthorizedImage } from './useAuthorizedImage';

export interface ImageThumbnailProps {
  image: ImageVersion;
  authToken?: string | null;
  onClick?: () => void;
  selected?: boolean;
  /** Filename shown in the hover/focus overlay. */
  name?: string;
}

export const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  image,
  authToken = null,
  onClick,
  selected = false,
  name,
}) => {
  const { containerRef, src } = useAuthorizedImage(image.src, authToken, {
    lazy: true,
    rootMargin: '50px',
  });
  const theme = useTheme();
  const tokens = theme.tokens;
  const mono = tokens?.typography.mono ?? 'monospace';
  const settle = tokens?.motion.easing.springSettle ?? 'ease';
  const durBase = tokens?.motion.duration.base ?? 250;
  const radius = theme.shape.borderRadius;

  const dims = image.width && image.height ? `${image.width}×${image.height}` : undefined;

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
        position: 'relative',
        aspectRatio: '1 / 1',
        width: '100%',
        borderRadius: `${radius}px`,
        overflow: 'hidden',
        cursor: 'pointer',
        bgcolor: 'action.hover',
        border: '1px solid',
        borderColor: selected ? 'primary.main' : 'divider',
        boxShadow: selected
          ? `0 0 0 1px ${theme.palette.primary.main}, 0 0 14px ${alpha(theme.palette.primary.main, 0.35)}`
          : 'none',
        transition: `transform ${durBase}ms ${settle}, border-color ${durBase}ms, box-shadow ${durBase}ms`,
        '&:hover': {
          transform: 'translateY(-4px) scale(1.02)',
          borderColor: selected ? 'primary.main' : 'text.disabled',
          boxShadow: theme.shadows[6],
        },
        '&:hover .thumbOverlay, &:focus-visible .thumbOverlay': {
          opacity: 1,
          transform: 'none',
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: '-1px',
        },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '&:hover': { transform: 'none' },
        },
      }}
    >
      {src && (
        <img
          src={src}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
      {name && (
        <Box
          className="thumbOverlay"
          sx={{
            position: 'absolute',
            insetInline: 0,
            bottom: 0,
            px: 1,
            pt: 2.5,
            pb: 0.75,
            background: `linear-gradient(transparent, ${alpha(theme.palette.common.black, 0.85)})`,
            opacity: 0,
            transform: 'translateY(6px)',
            transition: `opacity ${durBase}ms, transform ${durBase}ms ${settle}`,
            pointerEvents: 'none',
            '@media (prefers-reduced-motion: reduce)': { transform: 'none', transition: 'none' },
          }}
        >
          <Box
            sx={{
              fontFamily: mono,
              fontSize: '10.5px',
              fontWeight: 600,
              color: 'common.white',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {name}
          </Box>
          {dims && (
            <Box sx={{ fontFamily: mono, fontSize: '10px', color: alpha(theme.palette.common.white, 0.7) }}>
              {dims}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
