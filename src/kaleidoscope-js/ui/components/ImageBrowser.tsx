import React from "react";
import {
  Box,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Modal,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ImageAdd } from "@styled-icons/boxicons-regular/ImageAdd";
import { Save } from "@styled-icons/boxicons-regular/Save";
import { FullImageCard } from "./FullImageCard";
import { ImageThumbnail } from "./ImageThumbnail";
import { InputTags } from "./InputTags";

const styleFocus = {
  width: "auto",
  maxHeight: "95%",
  maxWidth: "75%",
  bgcolor: "background.paper",
  height: "95%",
  boxShadow: 24,
  p: 4,
  display: "inline-block",
};

const styleFocusSmall = {
  width: "auto",
  maxHeight: "95%",
  maxWidth: "95%",
  bgcolor: "background.paper",
  height: "95%",
  boxShadow: 24,
  p: 4,
  padding: "6px",
  display: "inline-block",
};

const editorStyle = {
  top: "0%",
  left: "0%",
  //transform: 'translate(-50%, -50%)',
  width: "20vw",
  height: "65vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  padding: "4px",
  overflowY: "scroll",
  display: "inline-block",
  float: "left",
};

const styleThumbnails = {
  bottom: "10px",
  left: "0%",
  height: "128px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  padding: "2px",
  overflowX: "scroll",
};

const logger = (event) => console.log("Clicked!", event.target.files);

const EditableField = ({
  label,
  id,
  val,
  disabled,
  onChange,
}: {
  label: string;
  id: string;
  val: string;
  disabled: boolean;
  onChange?: any;
}) => {
  return (
    <React.Fragment>
      <TextField
        label={label}
        id={id}
        type="text"
        defaultValue={val}
        disabled={disabled}
        sx={{ width: "100%", paddingTop: "7px", paddingBottom: "7px" }}
        onChange={onChange}
        size="small"
      />
      <br />
    </React.Fragment>
  );
};

const defaultImage = {
  src: "https://andrewslai.com/static/images/nav-bar/favicon.svg",
};

const VersionSelector = ({
  onVersionChange,
  selectedVersion,
  imageVersions,
}) => (
  <Select
    fullWidth
    id="version-select"
    onChange={onVersionChange}
    value={selectedVersion}
    size="small"
  >
    {imageVersions &&
      Object.entries(imageVersions)?.map(([name, version]: [string, any]) => (
        <MenuItem key={name} value={version}>
          {name}
        </MenuItem>
      ))}
  </Select>
);

const EditorPanel = ({
  selectedImage,
  selectedVersion,
  mode,
  onVersionChange,
  onEditPhoto,
  albums,
  showVersionSelector = true,
}) => {
  const [title, setTitle] = React.useState<string>(selectedImage?.title || "");
  const [description, setDescription] = React.useState<string>(
    selectedImage?.description || ""
  );

  const date = Date.parse(selectedImage?.created_at);
  const dateFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  const displayDate = new Date(date).toLocaleString("en-US", dateFormat);
  const imageVersions = selectedImage?.versions;

  const SaveButton = () => (
    <Button
      variant="contained"
      startIcon={<Save style={{ height: "20px" }} />}
      component="label"
      sx={{ margin: "5px" }}
      onClick={(x) =>
        onEditPhoto({
          photo_title: title,
          description,
          "photo-id": selectedImage?.name,
        })
      }
    >
      Save
    </Button>
  );

  return (
    <Box>
      <form>
        <br />
        <EditableField
          key={selectedImage?.name + "ef-1"}
          label="Name"
          id="name"
          disabled={true}
          val={selectedImage?.name}
        />
        <EditableField
          key={selectedImage?.name + "ef-2"}
          label="Created At"
          id="created_at"
          disabled={true}
          val={displayDate}
        />
        <EditableField
          key={selectedImage?.name + "ef-3"}
          label="Creator"
          id="creator"
          disabled={true}
          val={selectedImage?.creator}
        />
        <EditableField
          key={selectedImage?.name + "ef-4"}
          label="Title"
          id="title"
          disabled={mode === "edit" ? false : true}
          val={title}
          onChange={(x) => setTitle(x.target.value)}
        />
        <EditableField
          key={selectedImage?.name + "ef-5"}
          label="Description"
          id="description"
          disabled={mode === "edit" ? false : true}
          val={description}
          onChange={(x) => setDescription(x.target.value)}
        />

        <InputTags
          options={albums}
          disabled={mode === "edit" ? false : true}
          width="100%"
          vals={[]}
          onAdd={() => console.log("Added!")}
          onRemove={() => console.log("Removed!")}
        />

        <br />
        {showVersionSelector && (
          <FormControl fullWidth>
            <InputLabel id="version-select">Version</InputLabel>
            <VersionSelector
              onVersionChange={onVersionChange}
              selectedVersion={selectedVersion}
              imageVersions={imageVersions}
            />
          </FormControl>
        )}
      </form>
      <br />
      {mode === "edit" && <SaveButton />}
    </Box>
  );
};

const ImageBrowser = ({
  images,
  authToken = null,
  albums = [],
  startingImage = 0,
  photoManager = {},
  mode = "edit",
}: {
  images: any;
  authToken: any;
  albums: any;
  startingImage: number;
  photoManager: any;
  mode: any;
}) => {
  //console.log("ARGUMENTS", images, albums);
  // console.log("PHOTO MANAGER", photoManager);

  const {
    addPhoto = logger,
    editPhoto = logger,
    selectPhoto = logger,
  } = photoManager;
  const [selectedImageIndex, setSelectedImageIndex] =
    React.useState(startingImage);

  const currentImageVersions = images && images[selectedImageIndex]?.versions;
  currentImageVersions.sort(
    (a, b) =>
      new Date(b["created-at"]).valueOf() - new Date(a["created-at"]).valueOf()
  );
  const [selectedVersion, setSelectedVersion] = React.useState(
    currentImageVersions?.raw || defaultImage
  );

  const theSelectedImage = images ? images[selectedImageIndex] : {};
  const imageVersions = theSelectedImage?.versions;

  const jumpTo = (newIndex) => {
    setSelectedImageIndex(newIndex);
    const newImage = images[newIndex];

    setSelectedVersion(newImage.versions?.raw || defaultImage);
  };

  const [modalOpen, setModalOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const onVersionChange = (ev) => {
    //console.log("Event", ev)
    setSelectedVersion(ev.target.value);
  };

  const focusNext = () =>
    jumpTo(
      selectedImageIndex === images?.length
        ? images.length
        : selectedImageIndex + 1
    );
  const focusBack = () =>
    jumpTo(selectedImageIndex === 0 ? 0 : selectedImageIndex - 1);

  const keypressHandler = (e) => {
    switch (e.keyCode) {
      // Left
      case 37:
        focusBack();
        break;
      // Right
      case 39:
        focusNext();
        break;
      default:
        break;
    }
  };

  const NewPhotoButton = () => (
    <>
      <Button
        variant="contained"
        startIcon={<ImageAdd style={{ height: "20px" }} />}
        component="label"
      >
        Add new photo
        <input
          accept="image/*"
          type="file"
          hidden
          onChange={addPhoto}
          multiple
        ></input>
      </Button>
    </>
  );

  const SelectButton = () => (
    <Button
      variant="contained"
      component="label"
      onClick={(x) => selectPhoto(selectedVersion.src)}
      className="image-select-button"
      sx={{ position: "absolute", top: "35px", right: "10px" }}
    >
      Insert image
    </Button>
  );

  //console.log("CurrentImageVersions: ", currentImageVersions);
  //console.log("Selected Image:", theSelectedImage)

  // TODO: Add a focus button to the Image Thumbnails (highlight yellow or something like that?)
  //       Allow the user to jump to the thumbnail somehow (from the image modal viewer)?
  //
  //
  // TODO: Dynamically detect viewport size
  // TODO: Edit border size when in small mode
  return (
    <div>
      {mode === "edit" ? (
        <Grid container xs={12}>
          <Grid item xs={3} marginRight="5px" justifyContent="flex-end">
            {isMobile && (
              <VersionSelector
                imageVersions={imageVersions}
                selectedVersion={selectedVersion}
                onVersionChange={onVersionChange}
              />
            )}
          </Grid>
          <Grid item xs={8}>
            <NewPhotoButton />
          </Grid>
        </Grid>
      ) : (
        <SelectButton />
      )}
      {isMobile ? (
        <Box sx={{ width: "100vw", height: "65vh", textAlign: "center" }}>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            BackdropProps={{
              style: { backgroundColor: "rgba(0, 0, 40, 0.8)" },
            }}
          >
            <Box sx={{ backgroundColor: "white", opacity: 0.9 }}>
              <EditorPanel
                key={theSelectedImage?.name || "none-yet"}
                mode={mode}
                selectedImage={theSelectedImage}
                onVersionChange={onVersionChange}
                onEditPhoto={editPhoto}
                selectedVersion={selectedVersion}
                albums={albums}
                showVersionSelector={isMobile ? false : true}
              />
            </Box>
          </Modal>
          <Box sx={isMobile ? styleFocusSmall : styleFocus}>
            <FullImageCard
              image={selectedVersion || defaultImage}
              authToken={authToken}
              onClick={() => setModalOpen(true)}
            />
          </Box>
        </Box>
      ) : (
        <Box sx={{ width: "100vw", height: "75vh", textAlign: "center" }}>
          <Box sx={{ ...editorStyle, overflow: "scroll" }}>
            <EditorPanel
              key={theSelectedImage?.name || "none-yet"}
              mode={mode}
              selectedImage={theSelectedImage}
              onVersionChange={onVersionChange}
              onEditPhoto={editPhoto}
              selectedVersion={selectedVersion}
              albums={albums}
            />
          </Box>

          <Box sx={isMobile ? styleFocusSmall : styleFocus}>
            <FullImageCard
              image={selectedVersion || defaultImage}
              authToken={authToken}
            />
          </Box>
        </Box>
      )}
      <div>
        <Box>
          <Box sx={styleThumbnails}>
            {images &&
              images.map((image, index) => (
                <ImageThumbnail
                  image={image?.versions?.thumbnail}
                  authToken={authToken}
                  key={"tmb" + image?.versions?.thumbnail?.src}
                  onClick={() => jumpTo(index)}
                />
              ))}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export { ImageBrowser };
