import React          from 'react';
import { Box, TextField, Button, InputLabel, MenuItem, FormControl, Select} from '@mui/material';
import { ImageAdd } from '@styled-icons/boxicons-regular/ImageAdd';
import { Save } from '@styled-icons/boxicons-regular/Save';
import { FullImageCard }  from './FullImageCard';
import { ImageThumbnail } from './ImageThumbnail';
import { InputTags }      from './InputTags';

const styleFocus = {
  width:     'auto',
  maxHeight: '95%',
  maxWidth:  '75%',
  bgcolor:   'background.paper',
  height:    '95%',
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

const logger = (event) => console.log('Clicked!', event.target.files);

const EditableField = ({label, id, val, disabled, onChange} :
  {label: string,
    id: string,
    val: string,
    disabled: boolean,
    onChange?: any}) => {
  return <React.Fragment>
            <TextField label        = {label}
                      id           = {id}
                      type         = "text"
                      defaultValue = {val}
                      disabled     = {disabled}
                      sx           = {{width: '100%'}}
                      onChange     = {onChange}
                      size         ='small'/>
            <br/>
            <br/>
          </React.Fragment>};

const ImageBrowser = ({images, authToken=null, albums=[], startingImage=0, photoManager={}} :
                     {images: any,
                      authToken: any,
                      albums: any,
                      startingImage: number,
                      photoManager: any}) => {

  //console.log("ARGUMENTS", images, albums);
  // console.log("PHOTO MANAGER", photoManager);

  const defaultImage = {src: 'https://andrewslai.com/static/images/nav-bar/favicon.svg'}

  const { addPhoto = logger, editPhoto = logger } = photoManager;
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(startingImage);

  const currentImageVersions = images && images[selectedImageIndex]?.versions
  const [selectedVersion, setSelectedVersion] = React.useState(currentImageVersions?.raw || defaultImage);

  const theSelectedImage = images && images[selectedImageIndex];

  const [title, setTitle] = React.useState(theSelectedImage.title);
  const [description, setDescription] = React.useState(theSelectedImage.description);

  const jumpTo = (newIndex) => {
    setSelectedImageIndex(newIndex)
    const newImage = images[newIndex]

    setSelectedVersion(newImage.versions?.raw || defaultImage)
    setTitle(newImage.title)
    setDescription(newImage.description)
  }

  const focusNext = () => jumpTo(selectedImageIndex === images?.length ? images.length : selectedImageIndex + 1);
  const focusBack = () => jumpTo(selectedImageIndex === 0 ? 0 : selectedImageIndex - 1);

  const keypressHandler = e => {
    switch (e.keyCode) {
        // Left
      case 37: focusBack(); break;
        // Right
      case 39: focusNext(); break;
      default: break;
    };}


  const date = Date.parse(images && images[selectedImageIndex]?.created_at) ;
  const dateFormat: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'};
  const displayDate = images && date && new Date(date).toLocaleString('en-US', dateFormat)

  //console.log("CurrentImageVersions: ", currentImageVersions);
  //console.log("Selected Image:", theSelectedImage)

  // TODO: Add a focus button to the Image Thumbnails (highlight yellow or something like that?)
  //       Allow the user to jump to the thumbnail somehow (from the image modal viewer)?
  return (
    <div>
      <Box sx={{width: '100vw', height: '75vh', textAlign: 'center'}}>
        <Box sx={{...editorStyle, overflow: 'hidden'}}>
          <form>
            <br/>
            {/* For some reason, this isn't refreshing when I update */}
            <EditableField key={theSelectedImage.name}        label='Name'        id='name'        disabled={true}  val={theSelectedImage.name} />
            <EditableField key={theSelectedImage.date}        label='Created At'  id='created_at'  disabled={true}  val={displayDate} />
            <EditableField key={theSelectedImage.creator}     label='Creator'     id='creator'     disabled={true}  val={theSelectedImage.creator}/>
            <EditableField key={theSelectedImage.title}       label='Title'       id='title'       disabled={false} val={title}       onChange={(x) => setTitle(x.target.value)}/>
            <EditableField key={theSelectedImage.description} label='Description' id='description' disabled={false} val={description} onChange={(x) => setDescription(x.target.value)}/>

            <InputTags options={albums} width='100%' vals={[]} onAdd={() => console.log('Added!')} onRemove={() => console.log('Removed!')}/>

            <br/>
            <FormControl fullWidth>
              <InputLabel id="version-select">Version</InputLabel>
              <Select id="version-select"
                      onChange={(ev) => {
                        //console.log("Event", ev)
                        setSelectedVersion(ev.target.value)
                      }}
                      value={selectedVersion}>
                {currentImageVersions && Object.entries(currentImageVersions)?.map(
                  ([name, version] : [string, any]) => <MenuItem key={name} value={version}>{name}</MenuItem>
                )}
              </Select>
            </FormControl>
          </form>
          <br/>
          <br/>
          <Button variant='contained' startIcon={<Save style={{height: '20px'}}/>} component='label' onClick={(x) => editPhoto({photo_title: title,
                                                                                                                                description,
                                                                                                                                "photo-id": images[selectedImageIndex]?.name})}>
            Save
          </Button>
          {" "}
          <Button variant='contained' startIcon={<ImageAdd style={{height: '20px'}}/>} component='label'>
            Add new photo
            <input accept='image/*' type="file" hidden onChange={addPhoto} multiple>
            </input>
          </Button>
        </Box>

        <Box sx={styleFocus}>
          <FullImageCard image={selectedVersion || defaultImage } authToken={authToken}/>
        </Box>
      </Box>
      <div>
        <Box>
          <Box sx={styleThumbnails}>
            {images && images.map((image, index) =>
              <ImageThumbnail image    ={image?.versions?.thumbnail}
                              authToken={authToken}
                              key      ={'tmb' + image?.versions?.thumbnail?.src}
                              onClick  ={() => jumpTo(index)}/>)}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export { ImageBrowser };
