import React         from 'react';
import { ImageCard } from './ImageCard'

const logImageClick = (image, n) => event => console.log(`Clicked image ${n} ${JSON.stringify(image)}`);

const ImageCardGallery = ({ images, authToken=null, clickHandler }) => (
  <div style={{height: "85vh", overflowY: "scroll"}}>
    {images && images.map((image, idx) => <ImageCard image={image}
                                                     authToken={authToken}
                                                     key={image.src}
                                                     onClick={clickHandler ? clickHandler(image, idx) : logImageClick(image, idx)}
                                          />)}
  </div>
);

export { ImageCardGallery };
