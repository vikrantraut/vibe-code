/**
 * Contentstack helpers for Next.js.
 * Use these when fetching entries from the Content Delivery API (CDA)
 * so asset (file) fields resolve to URLs for <Image> or <img>.
 */

/** File/image field as returned by Contentstack Delivery API */
export interface ContentstackAsset {
  uid?: string;
  url?: string;
  filename?: string;
  content_type?: string;
  file_size?: number;
}

/** Asset field can be the CDN URL string or the asset object from the API */
export type ContentstackAssetField = string | ContentstackAsset | null | undefined;

/**
 * Returns a URL string for an asset from a Contentstack entry field.
 * Use this in components when the data comes from CDA so both
 * object (from API) and string (local/fallback) work.
 *
 * @param field - The image/file field from an entry (object with .url or string URL)
 * @param fallback - Optional fallback URL if field is empty
 * @returns URL string for use in next/image or img src
 */
export function getAssetUrl(
  field: ContentstackAssetField,
  fallback?: string
): string {
  if (field == null) {
    return fallback ?? "";
  }
  if (typeof field === "string") {
    return field || fallback ?? "";
  }
  if (field.url) {
    return field.url;
  }
  return fallback ?? "";
}

/**
 * Build Contentstack asset CDN URL from UID when the Delivery API
 * doesn't include the full url (e.g. you only have asset uid).
 * Requires env: NEXT_PUBLIC_CONTENTSTACK_API_KEY, NEXT_PUBLIC_CONTENTSTACK_CDN_URL.
 */
export function getAssetUrlFromUid(
  assetUid: string,
  filename: string = "image.jpg"
): string {
  const cdnUrl = process.env.NEXT_PUBLIC_CONTENTSTACK_CDN_URL ?? "https://images.contentstack.io";
  const apiKey = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
  if (!apiKey) {
    return "";
  }
  return `${cdnUrl}/v3/assets/${apiKey}/${assetUid}/${filename}`;
}
