import { request, uploadFile } from './client';
import type { Image } from '../types/image';

export interface EditPhotoPayload {
  photo_id: string;
  title?: string;
  description?: string;
  [key: string]: unknown;
}

export function getImageMetadata(token?: string): Promise<Image[]> {
  return request<Image[]>('/v2/photos', { token });
}

export function addPhoto(files: File[], token?: string): Promise<Image[]> {
  const formData = new FormData();
  for (const file of files) {
    formData.append(file.name, file);
  }
  return uploadFile<Image[]>('/v2/photos', formData, token);
}

export function editPhoto(payload: EditPhotoPayload, token?: string): Promise<Image> {
  const { photo_id, ...rest } = payload;
  return request<Image>(`/v2/photos/${photo_id}`, {
    method: 'PUT',
    body: rest,
    token,
  });
}
