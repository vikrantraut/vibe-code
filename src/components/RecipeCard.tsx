import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  priority?: boolean;
}

export function RecipeCard({ recipe, priority }: RecipeCardProps) {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group block overflow-hidden rounded-xl border border-sage-200 bg-white shadow-sm transition hover:border-sage-300 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sage-100">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          unoptimized={recipe.image.startsWith("/images/")}
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {recipe.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-sage-700"
            >
              {cat.replace("-", " ")}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display font-semibold text-sage-800 transition group-hover:text-sage-600">
          {recipe.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-sage-600">{recipe.excerpt}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-sage-500">
          <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
          <span>{recipe.calories} cal</span>
          <span className="flex items-center gap-0.5">
            ★ {recipe.rating} ({recipe.reviewCount})
          </span>
        </div>
      </div>
    </Link>
  );
}
