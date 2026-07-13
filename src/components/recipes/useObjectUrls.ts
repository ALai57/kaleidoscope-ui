import { useEffect, useState } from 'react';

// Object URLs are a mutable place with a lifecycle, not a value. This hook owns
// that place: create one URL per file, revoke the previous set when `files`
// changes (effect cleanup), and revoke everything on unmount.
export function useObjectUrls(files: File[]): string[] {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const next = files.map((file) => URL.createObjectURL(file));
    setUrls(next);
    return () => next.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  return urls;
}
