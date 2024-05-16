import React from 'react';
import { Card, CardMedia, CardActionArea } from '@mui/material';

function fetchWithAuthentication(url, authToken) {
  const headers = new Headers();
  if (authToken) { headers.set('Authorization', `Bearer ${authToken}`)};
  return fetch(url, { headers });
}

// https://alphahydrae.com/2021/02/how-to-display-an-image-protected-by-header-based-authentication/
async function displayProtectedImage(imageId, imageUrl, authToken) {
  // Fetch the image.
  const response = await fetchWithAuthentication(imageUrl, authToken);

  // Create an object URL from the data.
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  // Update the source of the image.
  const imageElement = document.getElementById('full-' + imageId) as HTMLImageElement;
  imageElement.src = objectUrl;

  imageElement.onload = () => URL.revokeObjectURL(objectUrl);
}

const logger = () => console.log("Clicked photo");

const FullImageCard = ({image, authToken=null, forceRerender=false, onClick=logger}) => {
  React.useEffect(() => {console.log(`Loading ${image.src}`);
                         displayProtectedImage(image.src, image.src, authToken);},
                  [image]);

  return (
    <Card sx={{ float: "left", margin: "5px", display: 'inherit', height: '100%', maxHeight: '100%', width: '100%'}}>
      <CardActionArea sx={{height: '100%'}}
        onClick={onClick}>
        <CardMedia
          id           ={'full-' + image.src}
          component    ="img"
          height       ={image.height}
          alt          ={image.alt}
          className    ='lazyload'
          sx = {{height: '100%'}}
        />
      </CardActionArea>
    </Card>
  );
}

export { FullImageCard };
