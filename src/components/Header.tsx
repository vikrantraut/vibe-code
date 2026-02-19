"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-sage-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-xl font-bold text-sage-700 transition hover:text-sage-600"
        >
          HealthyBowl
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-sage-600 transition hover:text-sage-800"
          >
            Home
          </Link>
          <Link
            href="/recipes"
            className="text-sm font-medium text-sage-600 transition hover:text-sage-800"
          >
            Recipes
          </Link>
          <Link
            href="/recipes?category=healthy"
            className="text-sm font-medium text-sage-600 transition hover:text-sage-800"
          >
            Categories
          </Link>
        </nav>

        <form
          onSubmit={handleSearch}
          className="flex flex-1 max-w-md items-center gap-2 sm:ml-4"
        >
          <input
            type="search"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field flex-1 py-2 text-sm"
            aria-label="Search recipes"
          />
          <button type="submit" className="btn-primary py-2">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
