import React from 'react';
import {
  Box,
  Button,
  Modal,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import type { SelectChangeEvent } from '@mui/material';
import { ImageAdd } from '@styled-icons/boxicons-regular/ImageAdd';
import { Image, ImageVersion } from '@/types/image';
import { FullImageCard } from './FullImageCard';
import { ImageThumbnail } from './ImageThumbnail';
import { EditorPanel, EditPhotoPayload } from './EditorPanel';
import { VersionSelector } from './VersionSelector';

export interface PhotoManager {
  addPhoto?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editPhoto?: (payload: EditPhotoPayload) => void;
  selectPhoto?: (src: string) => void;
}

export interface ImageBrowserProps {
  images: Image[];
  authToken?: string | null;
  albums?: string[];
  startingImage?: number;
  photoManager?: PhotoManager;
  mode?: 'edit' | 'select';
}

const styleFocus = {
  width: 'auto',
  maxHeight: '95%',
  maxWidth: '75%',
  bgcolor: 'background.paper',
  height: '95%',
  boxShadow: 24,
  p: 4,
  display: 'inline-block',
};

const styleFocusSmall = {
  width: 'auto',
  maxHeight: '95%',
  maxWidth: '95%',
  bgcolor: 'background.paper',
  height: '95%',
  boxShadow: 24,
  p: 4,
  padding: '6px',
  display: 'inline-block',
};

const editorStyle = {
  top: '0%',
  left: '0%',
  width: '20vw',
  height: '65vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  padding: '4px',
  overflowY: 'scroll' as const,
  display: 'inline-block',
  float: 'left' as const,
};

const styleThumbnails = {
  bottom: '10px',
  left: '0%',
  height: '128px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  padding: '2px',
  overflowX: 'scroll' as const,
};

const defaultImage: ImageVersion = {
  src: 'https://andrewslai.com/static/images/nav-bar/favicon.svg',
};

const defaultLogger = (e: React.ChangeEvent<HTMLInputElement>) =>
  console.log('Clicked!', e.target.files);

const NewPhotoButton: React.FC<{ addPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({
  addPhoto,
}) => (
  <Button
    variant="contained"
    startIcon={<ImageAdd style={{ height: '20px' }} />}
    component="label"
  >
    Add new photo
    <input accept="image/*" type="file" hidden onChange={addPhoto} multiple />
  </Button>
);

const SelectButton: React.FC<{ selectPhoto: (src: string) => void; src: string }> = ({
  selectPhoto,
  src,
}) => (
  <Button
    variant="contained"
    component="label"
    onClick={() => selectPhoto(src)}
    className="image-select-button"
    sx={{ position: 'absolute', top: '35px', right: '10px' }}
  >
    Insert image
  </Button>
);

export const ImageBrowser: React.FC<ImageBrowserProps> = ({
  images,
  authToken = null,
  albums = [],
  startingImage = 0,
  photoManager = {},
  mode = 'edit',
}) => {
  const {
    addPhoto = defaultLogger,
    editPhoto = () => {},
    selectPhoto = () => {},
  } = photoManager;

  const [selectedImageIndex, setSelectedImageIndex] = React.useState(startingImage);

  const currentImage = images[selectedImageIndex];
  const currentImageVersions = currentImage?.versions;

  const [selectedVersion, setSelectedVersion] = React.useState<ImageVersion | undefined>(
    currentImageVersions?.raw ?? defaultImage,
  );

  const theSelectedImage = images[selectedImageIndex];
  const imageVersions = theSelectedImage?.versions as Record<string, ImageVersion> | undefined;

  const jumpTo = React.useCallback(
    (newIndex: number): void => {
      setSelectedImageIndex(newIndex);
      const newImage = images[newIndex];
      if (newImage) {
        setSelectedVersion(newImage.versions?.raw ?? defaultImage);
      }
    },
    [images],
  );

  const [modalOpen, setModalOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onVersionChange = (ev: SelectChangeEvent<ImageVersion>): void => {
    setSelectedVersion(ev.target.value as ImageVersion);
  };

  const focusNext = React.useCallback(
    (): void =>
      jumpTo(selectedImageIndex >= images.length - 1 ? images.length - 1 : selectedImageIndex + 1),
    [jumpTo, selectedImageIndex, images.length],
  );
  const focusBack = React.useCallback(
    (): void => jumpTo(selectedImageIndex === 0 ? 0 : selectedImageIndex - 1),
    [jumpTo, selectedImageIndex],
  );

  const keypressHandler = React.useCallback(
    (e: KeyboardEvent): void => {
      switch (e.key) {
        case 'ArrowLeft':
          focusBack();
          break;
        case 'ArrowRight':
          focusNext();
          break;
        default:
          break;
      }
    },
    [focusBack, focusNext],
  );

  React.useEffect(() => {
    window.addEventListener('keydown', keypressHandler);
    return () => {
      window.removeEventListener('keydown', keypressHandler);
    };
  }, [keypressHandler]);

  return (
    <div>
      {mode === 'edit' ? (
        <Grid container xs={12}>
          <Grid item xs={3} sx={{ marginRight: '5px', justifyContent: 'flex-end' }}>
            {isMobile && (
              <VersionSelector
                imageVersions={imageVersions}
                selectedVersion={selectedVersion}
                onVersionChange={onVersionChange}
              />
            )}
          </Grid>
          <Grid item xs={8}>
            <NewPhotoButton addPhoto={addPhoto} />
          </Grid>
        </Grid>
      ) : (
        <SelectButton selectPhoto={selectPhoto} src={selectedVersion?.src ?? ''} />
      )}
      {isMobile ? (
        <Box sx={{ width: '100vw', height: '65vh', textAlign: 'center' }}>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            slotProps={{
              backdrop: { style: { backgroundColor: 'rgba(0, 0, 40, 0.8)' } },
            }}
          >
            <Box sx={{ backgroundColor: 'white', opacity: 0.9 }}>
              <EditorPanel
                key={theSelectedImage?.name ?? 'none-yet'}
                mode={mode}
                selectedImage={theSelectedImage}
                onVersionChange={onVersionChange}
                onEditPhoto={editPhoto}
                selectedVersion={selectedVersion}
                albums={albums}
                showVersionSelector={false}
              />
            </Box>
          </Modal>
          <Box sx={isMobile ? styleFocusSmall : styleFocus}>
            <FullImageCard
              image={selectedVersion ?? defaultImage}
              authToken={authToken}
              onClick={() => setModalOpen(true)}
            />
          </Box>
        </Box>
      ) : (
        <Box sx={{ width: '100vw', height: '75vh', textAlign: 'center' }}>
          <Box sx={{ ...editorStyle, overflow: 'scroll' }}>
            <EditorPanel
              key={theSelectedImage?.name ?? 'none-yet'}
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
              image={selectedVersion ?? defaultImage}
              authToken={authToken}
            />
          </Box>
        </Box>
      )}
      <div>
        <Box>
          <Box sx={styleThumbnails}>
            {images.map((image, index) => (
              <ImageThumbnail
                image={image.versions.thumbnail ?? defaultImage}
                authToken={authToken}
                key={'tmb' + (image.versions.thumbnail?.src ?? index)}
                onClick={() => jumpTo(index)}
              />
            ))}
          </Box>
        </Box>
      </div>
    </div>
  );
};
