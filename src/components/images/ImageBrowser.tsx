import React from 'react';
import { Box, Button, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { alpha } from '@mui/material/styles';
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

const defaultImage: ImageVersion = { src: '' };

const DEFAULT_PANEL_WIDTH = 320;
const MIN_PANEL_WIDTH = 240;
const MAX_PANEL_WIDTH = 640;

const defaultLogger = (e: React.ChangeEvent<HTMLInputElement>) =>
  console.log('Clicked!', e.target.files);

const NewPhotoButton: React.FC<{
  addPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading?: boolean;
}> = ({ addPhoto, isUploading = false }) => (
  <Button
    variant="contained"
    startIcon={<AddPhotoAlternateIcon sx={{ fontSize: 20 }} />}
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

  const selectTile = (index: number): void => {
    jumpTo(index);
    if (isMobile) setModalOpen(true);
  };

  // Draggable divider: widen the detail panel by dragging its handle left.
  const [panelWidth, setPanelWidth] = React.useState(DEFAULT_PANEL_WIDTH);

  const startResize = React.useCallback(
    (e: React.MouseEvent): void => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = panelWidth;
      const onMove = (ev: MouseEvent): void => {
        const delta = startX - ev.clientX; // drag left → positive → wider panel
        setPanelWidth(
          Math.min(MAX_PANEL_WIDTH, Math.max(MIN_PANEL_WIDTH, startWidth + delta)),
        );
      };
      const onUp = (): void => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.body.style.userSelect = '';
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      document.body.style.userSelect = 'none';
    },
    [panelWidth],
  );

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

  // ── Empty state ─────────────────────────────────────────────────────────
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

  // ── Gallery grid ────────────────────────────────────────────────────────
  const gallery = (
    <Box
      data-testid="image-gallery"
      sx={{
        flex: 1,
        minWidth: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(112px, 1fr))',
        gap: 1,
        p: 1,
        alignContent: 'start',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      {images.map((image, index) => (
        <ImageThumbnail
          key={image.name ?? index}
          image={image.versions?.thumbnail ?? defaultImage}
          authToken={authToken}
          selected={index === selectedImageIndex}
          onClick={() => selectTile(index)}
        />
      ))}
    </Box>
  );

  // ── Detail (large image + editor) ───────────────────────────────────────────
  const detailImage = (
    <Box
      sx={{
        height: 200,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      <FullImageCard image={selectedVersion ?? defaultImage} authToken={authToken} />
    </Box>
  );

  const editor = (showVersionSelector: boolean) => (
    <EditorPanel
      key={selectedImage?.name ?? 'none-yet'}
      mode={mode}
      selectedImage={selectedImage}
      onVersionChange={onVersionChange}
      onEditPhoto={editPhoto}
      selectedVersion={selectedVersion}
      showVersionSelector={showVersionSelector}
      isSaving={isSaving}
    />
  );

  // ── Mobile layout: grid + detail modal ──────────────────────────────────────
  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {toolbar}
        {gallery}
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          slotProps={{
            backdrop: {
              sx: (t) => ({ backgroundColor: alpha(t.palette.common.black, 0.6) }),
            },
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
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {detailImage}
            {editor(false)}
          </Box>
        </Modal>
      </Box>
    );
  }

  // ── Desktop layout: grid + side detail panel ─────────────────────────────────
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {toolbar}
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0, gap: 1 }}>
        {gallery}
        <Box
          data-testid="panel-resize-handle"
          role="separator"
          aria-orientation="vertical"
          onMouseDown={startResize}
          sx={{
            width: '6px',
            flexShrink: 0,
            cursor: 'col-resize',
            borderRadius: 1,
            bgcolor: 'divider',
            transition: 'background-color 0.15s',
            '&:hover': { bgcolor: 'primary.main' },
          }}
        />
        <Box
          data-testid="detail-panel"
          style={{ width: panelWidth }}
          sx={{
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowY: 'auto',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 1,
          }}
        >
          {detailImage}
          {editor(true)}
        </Box>
      </Box>
    </Box>
  );
};
