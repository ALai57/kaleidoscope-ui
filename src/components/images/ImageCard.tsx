import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActionArea, CardActions } from '@mui/material';
import { ImageVersion } from '@/types/image';

export interface ImageCardProps {
  image: ImageVersion & { title?: string; body?: string; alt?: string };
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
  const imageElement = document.getElementById(imageId) as HTMLImageElement | null;
  if (imageElement) {
    imageElement.src = objectUrl;
  }
}

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  authToken = null,
  onClick,
}) => {
  const [inView, setInView] = React.useState(false);
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

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
      { rootMargin: '50px' },
    );
    observerRef.current.observe(container);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [image.src, authToken]);

  return (
    <div
      ref={containerRef}
      className="placeholder"
      style={
        inView
          ? { height: 'fit-content', width: 'fit-content', float: 'left' }
          : { minHeight: '200px', minWidth: '200px', float: 'left' }
      }
    >
      {inView && (
        <Card sx={{ maxWidth: 345, float: 'left', margin: '5px', minHeight: '200px' }}>
          <CardActionArea onClick={onClick}>
            <CardMedia
              id={image.src}
              component="img"
              height={image.height}
              alt={image.alt}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {image.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {image.body}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Edit
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
};
