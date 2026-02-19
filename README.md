# HealthyBowl – Salad Recipe Website

A content-driven website for **healthy salad recipes**, chicken salads, and quick meal ideas. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Homepage**: Hero, featured recipes, categories, trending recipes, newsletter signup
- **Recipe listing**: Grid view with filters (category, calories, prep time, diet) and sorting (popular, latest, rating)
- **Recipe detail**: Full recipe with ingredients, instructions, nutrition, tags, share buttons (Facebook, Pinterest, WhatsApp), related recipes
- **SEO**: Recipe schema (JSON-LD), meta tags, sitemap, clean URLs (`/recipes/chicken-avocado-salad`)
- **UI**: Mobile-first, green/white/earthy theme (sage, mint)

## Requirements

- **Node.js** v18.17+ (v20 recommended; tested on Node v20 on macOS)

## Getting started (macOS / Node v20)

```bash
# From the project root
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & run production

```bash
npm run build
npm start
```

## Project structure

- `src/app/` – Next.js App Router (layout, homepage, recipes, recipe detail)
- `src/components/` – Header, Footer, RecipeCard, RecipeListing, ShareButtons, Newsletter, RecipeSchema
- `src/data/` – Categories and recipe seed data (replace with API/CMS later)
- `src/lib/` – Recipe helpers (filter, sort, get by slug)
- `src/types/` – Recipe and category types

## Images

- **Unsplash:** Some recipe and all category images use [Unsplash](https://unsplash.com) URLs.
- **Local placeholders:** Seven recipes use unique SVG placeholders in `public/images/recipes/` (e.g. `berry-spinach-salad.svg`, `classic-creamy-chicken-salad.svg`). Replace these with your own photos (e.g. `.jpg` or `.webp`) and update the `image` field in `src/data/recipes.ts` to the new path (e.g. `/images/recipes/berry-spinach-salad.jpg`).

## Next steps (from PRD)

- Connect to MongoDB or headless CMS for recipes
- Admin panel for create/edit/delete recipes
- User accounts, saved recipes, meal planner (Phase 2)
- AdSense, affiliate links, newsletter backend
