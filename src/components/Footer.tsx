import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-sage-200 bg-sage-800 text-sage-200">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-display text-lg font-bold text-white">
              HealthyBowl
            </Link>
            <p className="mt-2 text-sm text-sage-300">
              Fresh, healthy salad recipes for every goal. Eat well, feel great.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Recipes</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/recipes" className="transition hover:text-white">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=chicken" className="transition hover:text-white">
                  Chicken Salads
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=vegan" className="transition hover:text-white">
                  Vegan Salads
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=quick" className="transition hover:text-white">
                  Quick Salads
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">Categories</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/recipes?category=healthy" className="transition hover:text-white">
                  Healthy Salads
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=weight-loss" className="transition hover:text-white">
                  Weight Loss
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=high-protein" className="transition hover:text-white">
                  High Protein
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">Company</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#" className="transition hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-sage-700 pt-8 text-center text-sm text-sage-400">
          © {new Date().getFullYear()} HealthyBowl. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
