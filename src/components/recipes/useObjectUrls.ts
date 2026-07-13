import { useEffect, useState } from 'react';

// Object URLs are a mutable place with a lifecycle, not a value. This hook owns
// that place: create one URL per file, revoke the previous set when `files`
// changes (effect cleanup), and revoke everything on unmount.
export function useObjectUrls(files: File[]): string[] {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const next = files.map((file) => URL.createObjectURL(file));
    // Creating the URLs must happen in an effect so they can be revoked on
    // cleanup; computing them during render (e.g. useMemo) would leak the
    // URLs from StrictMode's discarded double-render. Storing the result in
    // state is the correct pattern here, so the set-state-in-effect rule is a
    // false positive.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUrls(next);
    return () => next.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  return urls;
}
