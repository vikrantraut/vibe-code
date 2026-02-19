import { recipes } from "@/data/recipes";
import type { Recipe } from "@/types/recipe";
import type { CategoryId } from "@/types/recipe";

export function getAllRecipes(): Recipe[] {
  return recipes;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function getFeaturedRecipes(): Recipe[] {
  return recipes.filter((r) => r.featured);
}

export function getTrendingRecipes(): Recipe[] {
  return recipes.filter((r) => r.trending);
}

export function getRecipesByCategory(categoryId: CategoryId): Recipe[] {
  return recipes.filter((r) => r.categories.includes(categoryId));
}

export interface RecipeFilters {
  category?: CategoryId;
  maxCalories?: number;
  maxPrepTime?: number;
  dietType?: string;
  search?: string;
}

export type SortOption = "popular" | "latest" | "rating";

export function filterAndSortRecipes(
  filters: RecipeFilters,
  sort: SortOption = "popular"
): Recipe[] {
  let result = [...recipes];

  if (filters.category) {
    result = result.filter((r) => r.categories.includes(filters.category!));
  }
  if (filters.maxCalories != null) {
    result = result.filter((r) => r.calories <= filters.maxCalories!);
  }
  if (filters.maxPrepTime != null) {
    result = result.filter((r) => r.totalTimeMinutes <= filters.maxPrepTime!);
  }
  if (filters.dietType) {
    result = result.filter(
      (r) => r.dietTypes?.some((d) => d.toLowerCase() === filters.dietType!.toLowerCase())
    );
  }
  if (filters.search?.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)) ||
        r.ingredients.some((i) => i.toLowerCase().includes(q))
    );
  }

  if (sort === "popular") {
    result.sort((a, b) => b.reviewCount - a.reviewCount);
  } else if (sort === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  } else {
    result.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  }

  return result;
}
