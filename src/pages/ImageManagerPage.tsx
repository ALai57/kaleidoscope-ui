import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { NavBar } from '../components/layout/NavBar';
import { LoadingScreen } from '../components/layout/LoadingScreen';
import { ImageBrowser } from '../components/images/ImageBrowser';
import { useAuth } from '../auth/useAuth';
import { getImageMetadata, addPhoto, editPhoto } from '../api/images';
import type { EditPhotoPayload } from '../components/images/EditorPanel';

const ImageManagerPage: React.FC = () => {
  const { token, isAuthenticated, userProfile, login, logout } = useAuth();
  const queryClient = useQueryClient();

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  const { data: images = [], isLoading } = useQuery({
    queryKey: ['images'],
    queryFn: () => getImageMetadata(token),
  });

  const addPhotoMutation = useMutation({
    mutationFn: (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      return addPhoto(files, token);
    },
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['images'] }),
  });

  const editPhotoMutation = useMutation({
    mutationFn: (payload: EditPhotoPayload) =>
      editPhoto(
        {
          photo_id: payload.photo_title, // EditorPanel uses photo_title as identifier
          title: payload.photo_title,
          description: payload.description,
        },
        token
      ),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['images'] }),
  });

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <Box sx={{ m: '10px' }}>
        <Typography variant="h4" gutterBottom>
          Image Manager
        </Typography>

        {isLoading && <LoadingScreen />}

        {!isLoading && (
          <ImageBrowser
            images={images}
            authToken={token ?? null}
            mode="edit"
            photoManager={{
              addPhoto: (e) => addPhotoMutation.mutate(e),
              editPhoto: (payload) => editPhotoMutation.mutate(payload),
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ImageManagerPage;
