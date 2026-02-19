import type { Metadata } from "next";
import { RecipeListing } from "@/components/RecipeListing";
import { filterAndSortRecipes } from "@/lib/recipes";
import type { CategoryId } from "@/types/recipe";

export const metadata: Metadata = {
  title: "Salad Recipes – Healthy, Chicken, Vegan & Quick Ideas",
  description:
    "Browse our collection of healthy salad recipes. Filter by category, calories, prep time, and diet. Find chicken salads, vegan bowls, and 10-minute options.",
};

interface PageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    maxCalories?: string;
    maxPrepTime?: string;
    diet?: string;
    sort?: string;
  }>;
}

export default async function RecipesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = (params.category as CategoryId) || undefined;
  const search = params.search || undefined;
  const maxCalories = params.maxCalories ? Number(params.maxCalories) : undefined;
  const maxPrepTime = params.maxPrepTime ? Number(params.maxPrepTime) : undefined;
  const diet = params.diet || undefined;
  const sort = (params.sort as "popular" | "latest" | "rating") || "popular";

  const filtered = filterAndSortRecipes(
    { category, search, maxCalories, maxPrepTime, dietType: diet },
    sort
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-sage-800">Salad recipes</h1>
        <p className="mt-1 text-sage-600">
          {filtered.length} recipe{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>
      <RecipeListing
        recipes={filtered}
        initialFilters={{
          category,
          search: search ?? "",
          maxCalories: maxCalories ?? "",
          maxPrepTime: maxPrepTime ?? "",
          diet: diet ?? "",
          sort,
        }}
      />
    </div>
  );
}
