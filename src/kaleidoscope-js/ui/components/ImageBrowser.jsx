import React          from 'react';
import Box            from '@mui/material/Box';
import TextField      from "@mui/material/TextField";
import { FullImageCard }  from './FullImageCard';
import { ImageThumbnail } from './ImageThumbnail';
import { InputTags }      from './InputTags';

const styleFocus = {
  width:     'auto',
  minWidth:  '50%',
  maxHeight: '60vh',
  bgcolor:   'background.paper',
  boxShadow: 24,
  p:         4,
  display:   'inline-block',
};

const editorStyle = {
  top:       '0%',
  left:      '0%',
  //transform: 'translate(-50%, -50%)',
  width:     '20vw',
  height:    '70vh',
  bgcolor:   'background.paper',
  boxShadow: 24,
  p:         4,
  padding:  "4px",
  overflowY: 'scroll',
  display:   'inline-block',
  float:     'left'
};

const styleThumbnails = {
  bottom:    '10px',
  left:      '0%',
  height:    '128px',
  bgcolor:   'background.paper',
  boxShadow: 24,
  p:         4,
  padding:   "2px",
  overflowX: "scroll",

};

const ImageBrowser = ({images, authToken=null, albums=[], startingImage=0}) => {

  console.log("ARGUMENTS", images, albums);

  const [selectedImage, jumpTo] = React.useState(startingImage);
  const focusNext = () => jumpTo(selectedImage === len(images) ? len(images) : selectedImage + 1);
  const focusBack = () => jumpTo(selectedImage === 0 ? 0 : selectedImage - 1);

  // A different kind of styling
  const EditableField = ({label, id, val, disabled}) => {
    return <React.Fragment>
             <TextField label        = {label}
                        id           = {id}
                        type         = "text"
                        defaultValue = {val}
                        disabled     = {disabled}
                        sx           = {{width: '100%'}}
                        size         ='small'/>
             <br/>
             <br/>
           </React.Fragment>};

  const keypressHandler = e => {
    switch (e.keyCode) {
        // Left
      case 37: focusBack(); break;
        // Right
      case 39: focusNext(); break;
      default: break;
    };}

  const defaultImage = {src: 'https://andrewslai.com/images/nav-bar/favicon.svg'}

  // TODO: Add a focus button to the Image Thumbnails (highlight yellow or something like that?)
  //       Allow the user to jump to the thumbnail somehow (from the image modal viewer)?
  return (
    <div>
      <Box sx={{width: '100vw', height: '75vh', textAlign: 'center'}}>
    <Box sx={{...editorStyle, overflow: 'hidden'}}>
      <form>
        <br/>
        <EditableField label='Name'         id='name'       val={images && images[selectedImage].name}       disabled={true}/>
        <EditableField label='Created At'   id='created_at' val={images && images[selectedImage].created_at} disabled={true}/>
        <EditableField label='Creator'      id='creator'    val={images && images[selectedImage].creator}    disabled={true}/>
        <EditableField label='Title'        id='title'      val={images && images[selectedImage].title}/>
        <EditableField label='Alt'          id='alt'        val={images && images[selectedImage].alt}/>

        <InputTags options={albums} width='100%' vals={[]} onAdd={() => console.log('Added!')} onRemove={() => console.log('Removed!')}/>
      </form>
    </Box>

    <Box sx={styleFocus}>
        <FullImageCard image={images ? images[selectedImage].versions.raw : defaultImage } authToken={authToken}/>
      </Box>
      </Box>
      <div>
        <Box>
          <Box sx={styleThumbnails}>
            {images && images.map((image, index) =>
              <ImageThumbnail image    ={image.versions.thumbnail}
                              authToken={authToken}
                              key      ={'tmb' + image.versions.thumbnail.src}
                              onClick  ={() => jumpTo(index)}/>)}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export { ImageBrowser };