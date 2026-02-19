import type { MetadataRoute } from "next";
import { getAllRecipes } from "@/lib/recipes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://healthybowl.com";
  const recipes = getAllRecipes();

  const recipeUrls = recipes.map((r) => ({
    url: `${baseUrl}/recipes/${r.slug}`,
    lastModified: new Date(r.createdAt),
    changeFrequency: "weekly" as const,
    priority: r.featured ? 0.9 : 0.7,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/recipes`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    ...recipeUrls,
  ];
}
