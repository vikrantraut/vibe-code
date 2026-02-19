"use client";

import type { Recipe } from "@/types/recipe";

interface ShareButtonsProps {
  recipe: Recipe;
  shareUrl: string;
}

function getShareUrl(platform: string, url: string, title: string, text?: string): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  switch (platform) {
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case "pinterest":
      return `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`;
    case "whatsapp":
      return `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
    default:
      return url;
  }
}

export function ShareButtons({ recipe, shareUrl }: ShareButtonsProps) {
  const title = recipe.title;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-sage-600">Share:</span>
      <a
        href={getShareUrl("facebook", shareUrl, title)}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm text-sage-700 transition hover:bg-sage-50"
        aria-label="Share on Facebook"
      >
        Facebook
      </a>
      <a
        href={getShareUrl("pinterest", shareUrl, title)}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm text-sage-700 transition hover:bg-sage-50"
        aria-label="Share on Pinterest"
      >
        Pinterest
      </a>
      <a
        href={getShareUrl("whatsapp", shareUrl, title)}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm text-sage-700 transition hover:bg-sage-50"
        aria-label="Share on WhatsApp"
      >
        WhatsApp
      </a>
    </div>
  );
}
