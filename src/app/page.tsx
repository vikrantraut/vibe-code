import Image from "next/image";
import Link from "next/link";
import { getFeaturedRecipes, getTrendingRecipes } from "@/lib/recipes";
import { categories } from "@/data/categories";
import { RecipeCard } from "@/components/RecipeCard";
import { Newsletter } from "@/components/Newsletter";

export default function HomePage() {
  const featured = getFeaturedRecipes();
  const trending = getTrendingRecipes();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sage-700">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&q=80"
            alt="Fresh healthy salads"
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-sage-800/60" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Healthy salads, made simple
            </h1>
            <p className="mt-4 text-lg text-sage-100">
              Discover easy, nutritious salad recipes—from chicken salads to quick 10-minute bowls.
              Fresh ingredients, clear steps, real results.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/recipes" className="btn-primary bg-white text-sage-700 hover:bg-sage-50">
                Browse recipes
              </Link>
              <Link
                href="/recipes?category=quick"
                className="rounded-lg border-2 border-white/80 bg-transparent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Quick 10-min salads
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured recipes */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-sage-800">Featured recipes</h2>
        <p className="mt-1 text-sage-600">Hand-picked salads you’ll love</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((recipe, i) => (
            <RecipeCard key={recipe.id} recipe={recipe} priority={i < 3} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-sage-200 bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-sage-800">Browse by category</h2>
          <p className="mt-1 text-sage-600">Find the right salad for your goal</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/recipes?category=${cat.id}`}
                className="group flex overflow-hidden rounded-xl border border-sage-200 bg-sage-50/50 transition hover:border-sage-300 hover:shadow-md"
              >
                <div className="relative h-28 w-32 shrink-0 overflow-hidden sm:h-32 sm:w-36">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="144px"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-4">
                  <h3 className="font-display font-semibold text-sage-800 group-hover:text-sage-600">
                    {cat.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-sage-600">{cat.description}</p>
                  <span className="mt-2 text-xs font-medium text-sage-500">
                    {cat.recipeCount} recipes
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-sage-800">Trending now</h2>
        <p className="mt-1 text-sage-600">Popular picks this week</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <Newsletter />
      </section>
    </div>
  );
}
