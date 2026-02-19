"use client";

import Image from "next/image";
import { getAssetUrl, type ContentstackAssetField } from "@/lib/contentstack";

interface ContentstackImageProps {
  /** Asset from Contentstack entry (object with .url) or string URL */
  field: ContentstackAssetField;
  alt: string;
  /** Optional fallback URL if field is empty */
  fallback?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Set to true for local /images/ paths to skip Next image optimization */
  unoptimized?: boolean;
}

/**
 * Renders an image from a Contentstack asset field or a plain URL string.
 * Use this when your data comes from the Content Delivery API so the
 * image field (object or string) works in one place.
 */
export function ContentstackImage({
  field,
  alt,
  fallback,
  fill,
  width,
  height,
  sizes,
  priority,
  className,
  unoptimized,
}: ContentstackImageProps) {
  const src = getAssetUrl(field, fallback);
  const useUnoptimized =
    unoptimized ?? (typeof src === "string" && src.startsWith("/images/"));

  if (!src) {
    return (
      <div
        className={className}
        style={{
          ...(fill ? { position: "absolute", inset: 0 } : {}),
          background: "var(--sage-100, #f0f0eb)",
          minHeight: fill ? undefined : 200,
        }}
        aria-label={alt}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        unoptimized={useUnoptimized}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={useUnoptimized}
    />
  );
}
