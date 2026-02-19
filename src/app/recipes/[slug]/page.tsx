import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeBySlug, getAllRecipes } from "@/lib/recipes";
import { categories } from "@/data/categories";
import { RecipeCard } from "@/components/RecipeCard";
import { ShareButtons } from "@/components/ShareButtons";
import { RecipeSchema } from "@/components/RecipeSchema";

export async function generateStaticParams() {
  const recipes = getAllRecipes();
  return recipes.map((r) => ({ slug: r.slug }));
}

function getBaseUrl() {
  return typeof process.env.NEXT_PUBLIC_BASE_URL === "string"
    ? process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "")
    : "https://healthybowl.com";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return { title: "Recipe not found" };
  const imageUrl = recipe.image.startsWith("/")
    ? `${getBaseUrl()}${recipe.image}`
    : recipe.image;
  return {
    title: recipe.title,
    description: recipe.excerpt,
    openGraph: {
      title: recipe.title,
      description: recipe.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const categoryNames = recipe.categories
    .map((id) => categories.find((c) => c.id === id)?.name)
    .filter(Boolean);

  const related = getAllRecipes()
    .filter((r) => r.id !== recipe.id && r.categories.some((c) => recipe.categories.includes(c)))
    .slice(0, 3);

  const shareUrl = `${getBaseUrl()}/recipes/${slug}`;

  return (
    <>
      <RecipeSchema recipe={recipe} />
      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <Link
            href="/recipes"
            className="text-sm font-medium text-sage-600 transition hover:text-sage-800"
          >
            ← Back to recipes
          </Link>
        </div>

        <header className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categoryNames.map((name) => (
              <span
                key={name}
                className="rounded-full bg-sage-200 px-3 py-1 text-xs font-medium text-sage-700"
              >
                {name}
              </span>
            ))}
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold text-sage-900 sm:text-4xl">
            {recipe.title}
          </h1>
          <p className="mt-2 text-lg text-sage-600">{recipe.excerpt}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-sage-600">
            <span>Prep: {recipe.prepTimeMinutes} min</span>
            <span>Cook: {recipe.cookTimeMinutes} min</span>
            <span>Total: {recipe.totalTimeMinutes} min</span>
            <span>{recipe.calories} cal</span>
            <span>{recipe.servings} servings</span>
            <span className="flex items-center gap-1">
              ★ {recipe.rating} ({recipe.reviewCount} reviews)
            </span>
          </div>
        </header>

        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-sage-100">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            unoptimized={recipe.image.startsWith("/images/")}
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-sage-200 pb-6">
          <ShareButtons recipe={recipe} shareUrl={shareUrl} />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <section>
              <h2 className="font-display text-xl font-semibold text-sage-800">Ingredients</h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-sage-700">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="font-display text-xl font-semibold text-sage-800">Instructions</h2>
              <ol className="mt-4 space-y-4">
                {recipe.instructions.map(({ step, text }) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-600 text-sm font-medium text-white">
                      {step}
                    </span>
                    <span className="text-sage-700">{text}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <div>
            <div className="sticky top-24 rounded-xl border border-sage-200 bg-sage-50/50 p-6">
              <h3 className="font-display font-semibold text-sage-800">Nutrition (per serving)</h3>
              <ul className="mt-4 space-y-2 text-sm text-sage-700">
                <li>Calories: {recipe.nutrition.calories}</li>
                <li>Protein: {recipe.nutrition.protein}g</li>
                <li>Carbs: {recipe.nutrition.carbs}g</li>
                <li>Fat: {recipe.nutrition.fat}g</li>
                {recipe.nutrition.fiber != null && (
                  <li>Fiber: {recipe.nutrition.fiber}g</li>
                )}
              </ul>
              {recipe.tags.length > 0 && (
                <>
                  <h3 className="mt-6 font-display font-semibold text-sage-800">Tags</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {recipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-sage-200 px-2.5 py-0.5 text-xs text-sage-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Comments placeholder */}
        <section className="mt-14 border-t border-sage-200 pt-10">
          <h2 className="font-display text-xl font-semibold text-sage-800">Comments</h2>
          <p className="mt-2 text-sage-600">
            Comments and ratings will be available in a future update. For now, enjoy the recipe!
          </p>
        </section>

        {/* Related recipes */}
        {related.length > 0 && (
          <section className="mt-14 border-t border-sage-200 pt-10">
            <h2 className="font-display text-2xl font-bold text-sage-800">Related recipes</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <RecipeCard key={r.id} recipe={r} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
