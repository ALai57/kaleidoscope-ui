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

// https://alphahydrae.com/2021/02/how-to-display-an-image-protected-by-header-based-authentication/
async function displayProtectedImage(
  imageId: string,
  imageUrl: string,
  authToken: string | null,
): Promise<void> {
  const response = await fetchWithAuthentication(imageUrl, authToken);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const imageElement = document.getElementById('full-' + imageId) as HTMLImageElement | null;
  if (imageElement) {
    imageElement.src = objectUrl;
    imageElement.onload = () => URL.revokeObjectURL(objectUrl);
  }
}

export const FullImageCard: React.FC<FullImageCardProps> = ({
  image,
  authToken = null,
  onClick,
}) => {
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (image.src) {
      displayProtectedImage(image.src, image.src, authToken).catch(console.error);
    }
  }, [image, authToken]);

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
          id={'full-' + image.src}
          component="img"
          height={image.height}
          alt={image.src}
          ref={imgRef}
          sx={{ height: '100%' }}
        />
      </CardActionArea>
    </Card>
  );
};
