import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useAuth } from '../../auth/useAuth';
import { importRecipeFromUrl } from '../../api/recipes';
import type { AcquiredDraft } from '../../types/recipe';

interface Props {
  onDraft: (acquired: AcquiredDraft) => void;
}

export const UrlRecipeSource: React.FC<Props> = ({ onDraft }) => {
  const { token } = useAuth();
  const [url, setUrl] = useState('');

  const mutation = useMutation({
    mutationFn: () => importRecipeFromUrl(url, token),
    onSuccess: (draft) => onDraft({ draft, sourceUrl: url }),
  });

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <TextField
          fullWidth
          size="small"
          label="Import from URL"
          placeholder="https://…"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={() => mutation.mutate()}
          disabled={!url.trim() || mutation.isPending}
        >
          {mutation.isPending ? 'Importing…' : 'Import'}
        </Button>
      </Stack>
      {mutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Could not import this URL. Paste the recipe below instead.
        </Alert>
      )}
    </>
  );
};
