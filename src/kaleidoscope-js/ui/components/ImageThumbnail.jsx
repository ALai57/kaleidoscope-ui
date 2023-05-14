import React            from 'react';
import { Card, CardMedia, CardActionArea } from '@mui/material';
import { useInView }     from 'react-cool-inview';
import 'lazysizes';

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
  const imageElement = document.getElementById('thumbnail-' + imageId);
  imageElement.src = objectUrl;
  //imageElement.onload = () => URL.revokeObjectUrl(objectUrl);
}

const ImageThumbnail = ({image={}, authToken=null, onClick}) => {
  const { observe, inView } = useInView({unobserveOnEnter: true,
                                         rootMargin:      "5px",
                                         onEnter: ({unobserve}) => { console.log(`Loading Thumbnail ${image.src}!`);
                                                                     displayProtectedImage(image.src, image.src, authToken); }});

  return (
    <div className="placeholder" style={inView
                                        ? {height: "fit-content", width: "fit-content", float: "left"}
                                        : {height: "100px", width: "100px", float: "left"}}
         ref={observe}>
        {inView && <Card sx={{float: "left", margin: "5px", height: "100px", width: "100px"}}>
                       <CardActionArea >
                           <CardMedia id        ={'thumbnail-'+ image.src}
                                      component ="img"
                                      height    ="100px"
                                      alt       ={image.alt}
                                      onClick   ={onClick}
                                      sx        ={{overflow: 'hidden'}}
                                      className ='lazyload' />
                       </CardActionArea>
                   </Card>
      }
    </div>
  );
}

export { ImageThumbnail };
