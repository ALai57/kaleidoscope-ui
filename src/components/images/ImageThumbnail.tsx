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
  const imgRef = React.useRef<HTMLImageElement>(null);
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  // Intersection observer for lazy loading — only marks the thumbnail as visible
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observerRef.current?.disconnect();
        }
      },
      { rootMargin: '5px' },
    );
    observerRef.current.observe(container);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Fetch and display the protected image after the element is rendered
  React.useEffect(() => {
    if (!inView || !image.src) return;
    const element = imgRef.current;
    if (!element) return;

    let cancelled = false;

    fetchWithAuthentication(image.src, authToken)
      .then((response) => response.blob())
      .then((blob) => {
        if (cancelled) return;
        const objectUrl = URL.createObjectURL(blob);
        element.src = objectUrl;
        element.onload = () => URL.revokeObjectURL(objectUrl);
      })
      .catch((err) => {
        if (!cancelled) console.error(err);
      });

    return () => {
      cancelled = true;
    };
  }, [inView, image.src, authToken]);

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
              component="img"
              height="100px"
              alt=""
              ref={imgRef}
              onClick={onClick}
              sx={{ overflow: 'hidden' }}
            />
          </CardActionArea>
        </Card>
      )}
    </Box>
  );
};
