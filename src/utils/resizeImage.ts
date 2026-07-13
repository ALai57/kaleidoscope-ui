import { MAX_IMAGE_BYTES } from './imagePolicy';

const MAX_DIMENSION = 2048; // long-edge cap before quality reduction
const MAX_ATTEMPTS = 6;

function toJpegName(name: string): string {
  return name.replace(/\.[^./\\]+$/, '') + '.jpg';
}

function encode(bitmap: ImageBitmap, scale: number, quality: number): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('canvas.toBlob returned null'))),
      'image/jpeg',
      quality
    );
  });
}

// The transform kept separate from imagePolicy: only called on files the policy
// flagged oversize, and only with the user's visibility (chip + summary in the UI).
export async function resizeImage(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  let scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  let quality = 0.9;
  let blob = await encode(bitmap, scale, quality);

  for (let attempt = 1; attempt < MAX_ATTEMPTS && blob.size > MAX_IMAGE_BYTES; attempt++) {
    if (quality > 0.5) {
      quality -= 0.15;
    } else {
      scale *= 0.8;
    }
    blob = await encode(bitmap, scale, quality);
  }

  bitmap.close?.();
  return new File([blob], toJpegName(file.name), { type: 'image/jpeg' });
}
