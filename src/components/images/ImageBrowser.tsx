import React from 'react';
import {
  Box,
  Button,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { ImageAdd } from '@styled-icons/boxicons-regular/ImageAdd';
import { Image, ImageVersion } from '@/types/image';
import { FullImageCard } from './FullImageCard';
import { ImageThumbnail } from './ImageThumbnail';
import { EditorPanel, EditPhotoPayload } from './EditorPanel';

export interface PhotoManager {
  addPhoto?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editPhoto?: (payload: EditPhotoPayload) => void;
  selectPhoto?: (src: string) => void;
  isUploading?: boolean;
  isSaving?: boolean;
}

export interface ImageBrowserProps {
  images: Image[];
  authToken?: string | null;
  startingImage?: number;
  photoManager?: PhotoManager;
  mode?: 'edit' | 'select';
}

const defaultImage: ImageVersion = {
  src: 'https://andrewslai.com/static/images/nav-bar/favicon.svg',
};

const defaultLogger = (e: React.ChangeEvent<HTMLInputElement>) =>
  console.log('Clicked!', e.target.files);

const NewPhotoButton: React.FC<{
  addPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading?: boolean;
}> = ({ addPhoto, isUploading = false }) => (
  <Button
    variant="contained"
    startIcon={<ImageAdd style={{ height: '20px' }} />}
    component="label"
    disabled={isUploading}
  >
    {isUploading ? 'Uploading…' : 'Add new photo'}
    <input accept="image/*" type="file" hidden onChange={addPhoto} multiple disabled={isUploading} />
  </Button>
);

const SelectButton: React.FC<{ selectPhoto: (src: string) => void; src: string }> = ({
  selectPhoto,
  src,
}) => (
  <Button variant="contained" onClick={() => selectPhoto(src)}>
    Insert image
  </Button>
);

export const ImageBrowser: React.FC<ImageBrowserProps> = ({
  images,
  authToken = null,
  startingImage = 0,
  photoManager = {},
  mode = 'edit',
}) => {
  const {
    addPhoto = defaultLogger,
    editPhoto = () => {},
    selectPhoto = () => {},
    isUploading = false,
    isSaving = false,
  } = photoManager;

  const [selectedImageIndex, setSelectedImageIndex] = React.useState(startingImage);
  const selectedImage = images[selectedImageIndex];

  const [selectedVersion, setSelectedVersion] = React.useState<ImageVersion | undefined>(
    selectedImage?.versions?.raw ?? defaultImage,
  );

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
    (): void => jumpTo(Math.min(selectedImageIndex + 1, images.length - 1)),
    [jumpTo, selectedImageIndex, images.length],
  );
  const focusBack = React.useCallback(
    (): void => jumpTo(Math.max(selectedImageIndex - 1, 0)),
    [jumpTo, selectedImageIndex],
  );

  const keypressHandler = React.useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === 'ArrowLeft') focusBack();
      else if (e.key === 'ArrowRight') focusNext();
    },
    [focusBack, focusNext],
  );

  React.useEffect(() => {
    window.addEventListener('keydown', keypressHandler);
    return () => window.removeEventListener('keydown', keypressHandler);
  }, [keypressHandler]);

  // ── Toolbar ───────────────────────────────────────────────────────────────

  const toolbar = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
      {mode === 'edit' ? (
        <NewPhotoButton addPhoto={addPhoto} isUploading={isUploading} />
      ) : (
        <SelectButton selectPhoto={selectPhoto} src={selectedVersion?.src ?? ''} />
      )}
    </Box>
  );

  // ── Empty state ───────────────────────────────────────────────────────────

  if (images.length === 0) {
    return (
      <Box>
        {toolbar}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 300,
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            color: 'text.secondary',
          }}
        >
          <Typography variant="body1">No photos yet.</Typography>
          <Typography variant="body2">Upload your first one above.</Typography>
        </Box>
      </Box>
    );
  }

  // ── Thumbnail strip ───────────────────────────────────────────────────────

  const thumbnailStrip = (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        gap: 0.5,
        py: 1,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      {images.map((image, index) => (
        <Box
          key={'tmb' + (image.versions?.thumbnail?.src ?? index)}
          sx={{
            flexShrink: 0,
            outline: index === selectedImageIndex ? '3px solid' : 'none',
            outlineColor: 'primary.main',
            borderRadius: 1,
          }}
        >
          <ImageThumbnail
            image={image.versions?.thumbnail ?? defaultImage}
            authToken={authToken}
            onClick={() => jumpTo(index)}
          />
        </Box>
      ))}
    </Box>
  );

  // ── Mobile layout ─────────────────────────────────────────────────────────

  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {toolbar}

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          slotProps={{
            backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.6)' } },
          }}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 1,
              p: 2,
              maxHeight: '90vh',
              overflowY: 'auto',
              width: 'min(400px, 92vw)',
            }}
          >
            <EditorPanel
              key={selectedImage?.name ?? 'none-yet'}
              mode={mode}
              selectedImage={selectedImage}
              onVersionChange={onVersionChange}
              onEditPhoto={editPhoto}
              selectedVersion={selectedVersion}
              showVersionSelector={false}
              isSaving={isSaving}
            />
          </Box>
        </Modal>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            cursor: mode === 'edit' ? 'pointer' : 'default',
          }}
          onClick={mode === 'edit' ? () => setModalOpen(true) : undefined}
        >
          <FullImageCard
            image={selectedVersion ?? defaultImage}
            authToken={authToken}
          />
        </Box>

        {thumbnailStrip}
      </Box>
    );
  }

  // ── Desktop layout ────────────────────────────────────────────────────────

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {toolbar}

      <Box sx={{ display: 'flex', flex: 1, minHeight: 0, gap: 1 }}>
        {/* Editor panel */}
        <Box
          sx={{
            width: 280,
            flexShrink: 0,
            overflowY: 'auto',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 1,
          }}
        >
          <EditorPanel
            key={selectedImage?.name ?? 'none-yet'}
            mode={mode}
            selectedImage={selectedImage}
            onVersionChange={onVersionChange}
            onEditPhoto={editPhoto}
            selectedVersion={selectedVersion}
            isSaving={isSaving}
          />
        </Box>

        {/* Full image */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <FullImageCard
            image={selectedVersion ?? defaultImage}
            authToken={authToken}
          />
        </Box>
      </Box>

      {thumbnailStrip}
    </Box>
  );
};
