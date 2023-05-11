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
  const imageElement = document.getElementById('full-' + imageId);
  imageElement.src = objectUrl;
  //imageElement.onload = () => URL.revokeObjectUrl(objectUrl);
}

const FullImageCard = ({image, authToken=null, forceRerender=false}) => {
  React.useEffect(() => {console.log(`Loading ${image.src}`);
                         displayProtectedImage(image.src, image.src, authToken);},
                  );

  return (
    <Card sx={{ float: "left", margin: "5px", minHeight: "200px", display: 'inherit'}}>
      <CardActionArea>
        <CardMedia
          id           ={'full-' + image.src}
          component    ="img"
          height       ={image.height}
          alt          ={image.alt}
          className    ='lazyload thumbnail'
        />
      </CardActionArea>
    </Card>
  );
}

export { FullImageCard };
