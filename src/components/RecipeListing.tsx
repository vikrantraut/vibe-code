"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { RecipeCard } from "./RecipeCard";
import type { Recipe } from "@/types/recipe";
import { categories } from "@/data/categories";
import type { CategoryId } from "@/types/recipe";

interface RecipeListingProps {
  recipes: Recipe[];
  initialFilters: {
    category?: CategoryId;
    search: string;
    maxCalories: number | string;
    maxPrepTime: number | string;
    diet: string;
    sort: string;
  };
}

const SORT_OPTIONS = [
  { value: "popular", label: "Most popular" },
  { value: "latest", label: "Latest" },
  { value: "rating", label: "Highest rated" },
];

const DIET_OPTIONS = ["Vegan", "High Protein", "Keto", "Mediterranean"];

export function RecipeListing({ recipes, initialFilters }: RecipeListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (updates: Record<string, string | number | undefined>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "" || value === "all") {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });
      router.push(`/recipes?${next.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Filters sidebar */}
      <aside className="w-full shrink-0 lg:w-64">
        <div className="sticky top-24 space-y-6 rounded-xl border border-sage-200 bg-white p-4 shadow-sm">
          <h3 className="font-display font-semibold text-sage-800">Filters</h3>

          <div>
            <label className="block text-sm font-medium text-sage-700">Search</label>
            <input
              type="search"
              placeholder="Keyword..."
              defaultValue={initialFilters.search}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const target = e.target as HTMLInputElement;
                  updateParams({ search: target.value.trim() || undefined });
                }
              }}
              className="input-field mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sage-700">Category</label>
            <select
              value={initialFilters.category ?? "all"}
              onChange={(e) =>
                updateParams({ category: e.target.value === "all" ? undefined : e.target.value })
              }
              className="input-field mt-1"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-sage-700">Max calories</label>
            <select
              value={initialFilters.maxCalories ?? "all"}
              onChange={(e) => {
                const v = e.target.value;
                updateParams({ maxCalories: v === "all" ? undefined : v });
              }}
              className="input-field mt-1"
            >
              <option value="all">Any</option>
              <option value="200">Under 200</option>
              <option value="350">Under 350</option>
              <option value="450">Under 450</option>
              <option value="500">Under 500</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-sage-700">Max prep time (min)</label>
            <select
              value={initialFilters.maxPrepTime ?? "all"}
              onChange={(e) => {
                const v = e.target.value;
                updateParams({ maxPrepTime: v === "all" ? undefined : v });
              }}
              className="input-field mt-1"
            >
              <option value="all">Any</option>
              <option value="10">10 min</option>
              <option value="20">20 min</option>
              <option value="30">30 min</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-sage-700">Diet</label>
            <select
              value={initialFilters.diet ?? "all"}
              onChange={(e) =>
                updateParams({ diet: e.target.value === "all" ? undefined : e.target.value })
              }
              className="input-field mt-1"
            >
              <option value="all">Any</option>
              {DIET_OPTIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-sage-700">Sort by</label>
            <select
              value={initialFilters.sort}
              onChange={(e) => updateParams({ sort: e.target.value })}
              className="input-field mt-1"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </aside>

      {/* Results */}
      <div className="min-w-0 flex-1">
        {recipes.length === 0 ? (
          <div className="rounded-xl border border-sage-200 bg-sage-50/50 p-12 text-center">
            <p className="text-sage-600">No recipes match your filters. Try adjusting them.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
