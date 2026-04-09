import { request, uploadFile } from './client';
import type { Image } from '../types/image';

export interface EditPhotoPayload {
  photo_id: string;
  title?: string;
  description?: string;
  [key: string]: unknown;
}

// Keys are snake_case because client.ts converts kebab-case API keys on the way in
interface PhotoApiEntry {
  photo_id: string;
  photo_title: string | null;
  description: string | null;
  created_at: string;
  image_category: string;
  path: string;
}

function groupPhotoVersions(entries: PhotoApiEntry[]): Image[] {
  const groups = new Map<string, Image>();

  for (const entry of entries) {
    const id = entry.photo_id;
    if (!groups.has(id)) {
      groups.set(id, {
        name: id,
        title: entry.photo_title ?? '',
        description: entry.description ?? '',
        creator: '',
        created_at: entry.created_at,
        versions: {},
      });
    }
    const image = groups.get(id)!;
    image.versions[entry.image_category] = { src: entry.path };
  }

  return Array.from(groups.values());
}

export async function getImageMetadata(token?: string): Promise<Image[]> {
  const entries = await request<PhotoApiEntry[]>('/v2/photos', { token });
  return groupPhotoVersions(entries);
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
