import React from 'react';
import { Card, CardMedia, CardActionArea } from '@mui/material';
import { ImageVersion } from '@/types/image';

export interface FullImageCardProps {
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

export const FullImageCard: React.FC<FullImageCardProps> = ({
  image,
  authToken = null,
  onClick,
}) => {
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (!image.src) return;
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
  }, [image.src, authToken]);

  return (
    <Card
      sx={{
        float: 'left',
        margin: '5px',
        display: 'inherit',
        height: '100%',
        maxHeight: '100%',
        width: '100%',
      }}
    >
      <CardActionArea sx={{ height: '100%' }} onClick={onClick}>
        <CardMedia
          component="img"
          height={image.height}
          alt=""
          ref={imgRef}
          sx={{ height: '100%' }}
        />
      </CardActionArea>
    </Card>
  );
};
