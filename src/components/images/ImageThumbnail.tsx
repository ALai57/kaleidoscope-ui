import React from 'react';
import { Box, Card, CardMedia, CardActionArea } from '@mui/material';
import { ImageVersion } from '@/types/image';

export interface ImageThumbnailProps {
  image: ImageVersion;
  authToken?: string | null;
  onClick?: () => void;
}

async function fetchWithAuthentication(url: string, authToken: string | null): Promise<Response> {
  const headers = new Headers();
  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }
  return fetch(url, { headers });
}

async function displayProtectedImage(
  imageId: string,
  imageUrl: string,
  authToken: string | null,
): Promise<void> {
  const response = await fetchWithAuthentication(imageUrl, authToken);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const imageElement = document.getElementById('thumbnail-' + imageId) as HTMLImageElement | null;
  if (imageElement) {
    imageElement.src = objectUrl;
  }
}

const viewableStyle = {
  height: 'fit-content',
  width: 'fit-content',
  float: 'left' as const,
};

const placeholderStyle = {
  height: '100px',
  width: '100px',
  float: 'left' as const,
};

const imageSizes = { xs: '70px', sm: '100px' };

export const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  image,
  authToken = null,
  onClick,
}) => {
  const [inView, setInView] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observerRef.current?.disconnect();
          if (image.src) {
            displayProtectedImage(image.src, image.src, authToken).catch(console.error);
          }
        }
      },
      { rootMargin: '5px' },
    );
    observerRef.current.observe(container);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [image.src, authToken]);

  return (
    <Box
      ref={containerRef}
      className="placeholder"
      sx={inView ? viewableStyle : placeholderStyle}
    >
      {inView && (
        <Card
          sx={{
            float: 'left',
            margin: '5px',
            height: imageSizes,
            width: imageSizes,
          }}
        >
          <CardActionArea>
            <CardMedia
              id={'thumbnail-' + image.src}
              component="img"
              height="100px"
              alt={image.src}
              onClick={onClick}
              sx={{ overflow: 'hidden' }}
            />
          </CardActionArea>
        </Card>
      )}
    </Box>
  );
};
