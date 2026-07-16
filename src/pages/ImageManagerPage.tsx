import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '../components/layout/AdminLayout';
import { LoadingScreen } from '../components/layout/LoadingScreen';
import { Snackbar } from '../components/layout/Snackbar';
import { ImageBrowser } from '../components/images/ImageBrowser';
import { useAuth } from '../auth/useAuth';
import { getImageMetadata, addPhoto, editPhoto } from '../api/images';
import type { EditPhotoPayload } from '../components/images/EditorPanel';

interface Notification {
  key: number;
  message: string;
  level: 'success' | 'error';
}

const ImageManagerPage: React.FC = () => {
  const { token, isAuthenticated, userProfile, login } = useAuth();
  const queryClient = useQueryClient();
  const [notification, setNotification] = useState<Notification | null>(null);

  const notify = (message: string, level: 'success' | 'error'): void =>
    setNotification({ key: Date.now(), message, level });

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
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['images'] });
      notify('Photo uploaded successfully', 'success');
    },
    onError: () => notify('Upload failed — please try again', 'error'),
  });

  const editPhotoMutation = useMutation({
    mutationFn: (payload: EditPhotoPayload) =>
      editPhoto(
        {
          photo_id: payload['photo-id'],
          title: payload.photo_title,
          description: payload.description,
        },
        token
      ),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['images'] });
      notify('Changes saved', 'success');
    },
    onError: () => notify('Save failed — please try again', 'error'),
  });

  return (
    <>
      <AdminLayout title="Images" user={user} isAuthenticated={isAuthenticated} login={login}>
        {isLoading && <LoadingScreen />}

        {!isLoading && (
          <ImageBrowser
            images={images}
            authToken={token ?? null}
            mode="edit"
            photoManager={{
              addPhoto: (e) => addPhotoMutation.mutate(e),
              editPhoto: (payload) => editPhotoMutation.mutate(payload),
              isUploading: addPhotoMutation.isPending,
              isSaving: editPhotoMutation.isPending,
            }}
          />
        )}
      </AdminLayout>

      {notification && (
        <Snackbar
          key={notification.key}
          message={notification.message}
          level={notification.level}
        />
      )}
    </>
  );
};

export default ImageManagerPage;
