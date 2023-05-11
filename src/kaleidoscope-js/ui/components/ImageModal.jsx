import React          from 'react';
import Box            from '@mui/material/Box';
import Modal          from '@mui/material/Modal';
import IconButton     from "@mui/material/IconButton";
import TextField      from "@mui/material/TextField";
import CloseIcon      from "@mui/icons-material/Close";
import FullImageCard  from './FullImageCard';
import ImageThumbnail from './ImageThumbnail';
import InputTags      from './InputTags';
import { useSelectedImage } from './hooks/SelectedImage';

const styleFocus = {
  position:  'absolute',
  top:       '20%',
  left:      '50%',
  transform: 'translate(-50%, -20%)',
  width:     'auto',
  bgcolor:   'background.paper',
  boxShadow: 24,
  p:         4,
};

const editorStyle = {
  position:  'absolute',
  top:       '0%',
  left:      '0%',
  //transform: 'translate(-50%, -50%)',
  width:     '20vw',
  height:    '100vh',
  bgcolor:   'background.paper',
  boxShadow: 24,
  p:         4,
  padding:  "2px",
  overflowY: 'scroll'
};

const styleThumbnails = {
  position:  'absolute',
  bottom:    '10px',
  left:      '0%',
  width:     '78vw',
  height:    '128px',
  bgcolor:   'background.paper',
  boxShadow: 24,
  p:         4,
  padding:   "2px",
  overflowX: "scroll",
};

const ImageModal = ({images, authToken=null, albums=[], open=false, handleClose, contentAdder, contentRemover}) => {
  const { selectedImage, focusNext, focusBack, jumpTo } = useSelectedImage();

  // A different kind of styling
  const EditableField3 = ({label, id, val, disabled}) => {
    return <React.Fragment>
             <TextField label        = {label}
                        id           = {id}
                        type         = "text"
                        defaultValue = {val}
                        disabled     = {disabled}
                        sx           = {{width: '20vw'}}
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

  // TODO: Add a focus button to the Image Thumbnails (highlight yellow or something like that?)
  //       Allow the user to jump to the thumbnail somehow (from the image modal viewer)?
  return (
    <div>
      {images && images.length > 0 &&
       <Modal open            ={open}
              onClose         ={handleClose}
              aria-labelledby ="modal-modal-title"
              aria-describedby="modal-modal-description"
              onKeyDown       ={keypressHandler}
       >
         <div>
           <Box sx={editorStyle}>
             <form>
               <br/>
               <EditableField3 label='Name'         id='name'       val={images[selectedImage].name}       disabled={true}/>
               <EditableField3 label='Created At'   id='created_at' val={images[selectedImage].created_at} disabled={true}/>
               <EditableField3 label='Creator'      id='creator'    val={images[selectedImage].creator}    disabled={true}/>
               <EditableField3 label='Title'        id='title'      val={images[selectedImage].title}/>
               <EditableField3 label='Alt'          id='alt'        val={images[selectedImage].alt}/>
               <InputTags      options={albums}     width='20vw'    vals={} onAdd={InputTags.logger}  onRemove={InputTags.logger}/>
             </form>
           </Box>
           <Box sx={{position: 'absolute', left: '21vw', height: '100vh', width: '80vw'}}>
             <Box sx={styleFocus}>
               <FullImageCard image={images[selectedImage].versions.raw} authToken={authToken}/>
             </Box>
             <Box sx={styleThumbnails}>
               {images && images.map((image, index) =>
                 <ImageThumbnail image    ={image.versions.thumbnail}
                                 authToken={authToken}
                                 key      ={'tmb' + image.versions.thumbnail.src}
                                 onClick  ={() => jumpTo(index)}/>)}
             </Box>
           </Box>
           <IconButton size='large' sx={{position: 'absolute', right:'0%', zIndex: '100'}} onClick={handleClose}>
             <CloseIcon/>
           </IconButton>
         </div>
       </Modal>
      }
    </div>
  );
};

export { ImageModal };
