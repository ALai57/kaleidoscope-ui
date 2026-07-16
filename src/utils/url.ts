/**
 * Converts an article title to a URL-safe slug.
 */
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[!.()|[\]]/g, '')
    .replace(/ /g, '-');
}

/** Normalize arbitrary text into a URL slug: lowercase, non-alphanumerics to
 *  single hyphens, no leading/trailing hyphens. Mirrors the backend `->slug`. */
export function slugify(input: string): string {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
