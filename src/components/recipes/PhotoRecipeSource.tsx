import React, { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../auth/useAuth';
import { importRecipeFromPhoto } from '../../api/recipes';
import { ApiError } from '../../api/client';
import type { AcquiredDraft } from '../../types/recipe';
import { checkImages, MAX_IMAGE_BYTES, type ImageRejection } from '../../utils/imagePolicy';
import { resizeImage } from '../../utils/resizeImage';
import { useObjectUrls } from './useObjectUrls';

interface Props {
  onDraft: (acquired: AcquiredDraft) => void;
}

const SUPPORTED_ACCEPT = 'image/jpeg,image/png,image/webp,image/gif';

export const PhotoRecipeSource: React.FC<Props> = ({ onDraft }) => {
  const { token } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [rejections, setRejections] = useState<ImageRejection[]>([]);
  const previews = useObjectUrls(files);

  const addFiles = (incoming: File[]): void => {
    const combined = [...files, ...incoming];
    const { accepted, oversize, rejected } = checkImages(combined);
    const kept = new Set<File>([...accepted, ...oversize]);
    setFiles(combined.filter((f) => kept.has(f))); // preserve selection order
    setRejections(rejected);
  };

  const removeAt = (index: number): void => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const prepared = await Promise.all(
        files.map((f) => (f.size > MAX_IMAGE_BYTES ? resizeImage(f) : Promise.resolve(f)))
      );
      return importRecipeFromPhoto(prepared, token);
    },
    onSuccess: (draft) => onDraft({ draft, sourceUrl: null }),
  });

  const oversizeCount = files.filter((f) => f.size > MAX_IMAGE_BYTES).length;
  const errorMessage =
    (mutation.error as ApiError | null)?.status === 422
      ? "We couldn't find a recipe in these photos. Try clearer images, or add the details below manually."
      : 'Could not import these photos. Add the details below instead.';

  return (
    <>
      <Box
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(Array.from(e.dataTransfer.files));
        }}
        sx={{
          position: 'relative',
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: 1,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: 'action.hover',
        }}
      >
        <Typography variant="body2">Drag photos here, or click to browse</Typography>
        <Typography variant="caption" sx={{
          color: "text.secondary"
        }}>
          JPEG, PNG, WebP or GIF · up to 5 images
        </Typography>
        <input
          ref={inputRef}
          type="file"
          hidden
          multiple
          accept={SUPPORTED_ACCEPT}
          onChange={(e) => {
            addFiles(Array.from(e.target.files ?? []));
            e.target.value = ''; // allow re-selecting the same file
          }}
        />
        {mutation.isPending && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              bgcolor: 'background.paper',
              opacity: 0.9,
            }}
          >
            <CircularProgress size={24} />
            <Typography variant="body2">Reading your photos…</Typography>
          </Box>
        )}
      </Box>
      {previews.length > 0 && (
        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
          {files.map((file, i) => (
            <Box key={`${file.name}-${i}`} sx={{ position: 'relative' }}>
              <Box
                component="img"
                src={previews[i]}
                alt={file.name}
                sx={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 1 }}
              />
              <IconButton
                size="small"
                aria-label={`Remove ${file.name}`}
                onClick={() => removeAt(i)}
                sx={{ position: 'absolute', top: -8, right: -8, bgcolor: 'background.paper' }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              {file.size > MAX_IMAGE_BYTES && (
                <Chip size="small" label="will be resized" sx={{ position: 'absolute', bottom: 2, left: 2 }} />
              )}
            </Box>
          ))}
        </Stack>
      )}
      {oversizeCount > 0 && (
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            display: 'block',
            mt: 0.5
          }}>
          {oversizeCount} photo{oversizeCount > 1 ? 's' : ''} will be resized before upload.
        </Typography>
      )}
      {rejections.map((r, i) => (
        <Alert key={i} severity="warning" sx={{ mt: 1 }}>
          {r.file.name}: {r.reason}
        </Alert>
      ))}
      <Button
        variant="outlined"
        sx={{ mt: 1 }}
        onClick={() => mutation.mutate()}
        disabled={files.length === 0 || mutation.isPending}
      >
        {mutation.isPending ? 'Reading…' : `Import (${files.length})`}
      </Button>
      {mutation.isError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {errorMessage}
        </Alert>
      )}
    </>
  );
};
