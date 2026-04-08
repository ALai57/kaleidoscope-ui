/**
 * Converts an article title to a URL-safe slug.
 * Ports title->url from kaleidoscope.cljs.
 */
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[!.()|[\]]/g, '')
    .replace(/ /g, '-');
}
