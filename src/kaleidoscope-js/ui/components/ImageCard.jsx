import React          from 'react';
import Card           from '@mui/material/Card';
import CardContent    from '@mui/material/CardContent';
import CardMedia      from '@mui/material/CardMedia';
import Typography     from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useInView }  from 'react-cool-inview';
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
  const imageElement = document.getElementById(imageId);
  imageElement.src = objectUrl;
  //imageElement.onload = () => URL.revokeObjectUrl(objectUrl);
}

const ImageCard = ({image, authToken=null, onClick}) => {
  const { observe, inView } = useInView({unobserveOnEnter: true,
                                         rootMargin: "50px",
                                         onEnter: ({unobserve}) => { console.log("Observing!");
                                                                     displayProtectedImage(image.src, image.src, authToken); }});
  return (
    <div className="placeholder" style={inView
                                        ? {height: "fit-content", width: "fit-content", float: "left"}
                                        : {minHeight: "200px", minWidth: "200px", float: "left"}}
         ref={observe}>
      {inView && <Card sx={{ maxWidth: 345, float: "left", margin: "5px", minHeight: "200px"}}>
                   <CardActionArea onClick={ onClick }>
                     <CardMedia
                       id        ={image.src}
                       component ="img"
                       height    ={image.height}
                       alt       ={image.alt}
                       className ='lazyload thumbnail'
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
      }
    </div>
  );
}

export { ImageCard };
