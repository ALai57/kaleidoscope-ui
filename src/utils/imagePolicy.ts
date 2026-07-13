// Anthropic's supported image set — must match the backend handler's allow-list.
export const SUPPORTED_IMAGE_TYPES: readonly string[] = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

export const MAX_IMAGES = 5;
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export interface ImageRejection {
  file: File;
  reason: string;
}

export interface ClassifiedImages {
  accepted: File[]; // supported type, within the byte limit
  oversize: File[]; // supported type, over the byte limit — will be resized before upload
  rejected: ImageRejection[]; // unsupported type, or beyond the per-import cap
}

export function isSupportedImageType(type: string): boolean {
  return SUPPORTED_IMAGE_TYPES.includes(type);
}

// Pure: classifies a selection. Never mutates or resizes — that is resizeImage's job.
export function checkImages(files: File[]): ClassifiedImages {
  const accepted: File[] = [];
  const oversize: File[] = [];
  const rejected: ImageRejection[] = [];
  let kept = 0;

  for (const file of files) {
    if (!isSupportedImageType(file.type)) {
      rejected.push({ file, reason: 'Unsupported type — use JPEG, PNG, WebP or GIF.' });
      continue;
    }
    if (kept >= MAX_IMAGES) {
      rejected.push({ file, reason: `Only ${MAX_IMAGES} images per import.` });
      continue;
    }
    kept += 1;
    if (file.size > MAX_IMAGE_BYTES) {
      oversize.push(file);
    } else {
      accepted.push(file);
    }
  }

  return { accepted, oversize, rejected };
}
