import type { Category } from "@/types/recipe";

export const categories: Category[] = [
  {
    id: "healthy",
    name: "Healthy Salads",
    slug: "healthy",
    description: "Nutritious, balanced salads for everyday wellness",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    recipeCount: 12,
  },
  {
    id: "chicken",
    name: "Chicken Salads",
    slug: "chicken",
    description: "Protein-packed chicken salad recipes",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
    recipeCount: 8,
  },
  {
    id: "weight-loss",
    name: "Weight Loss Salads",
    slug: "weight-loss",
    description: "Low-calorie salads that support your goals",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80",
    recipeCount: 6,
  },
  {
    id: "high-protein",
    name: "High Protein Salads",
    slug: "high-protein",
    description: "Salads loaded with protein for muscle and satiety",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&q=80",
    recipeCount: 7,
  },
  {
    id: "quick",
    name: "Quick 10-Minute Salads",
    slug: "quick",
    description: "Fresh salads ready in 10 minutes or less",
    image: "https://images.unsplash.com/photo-1567331711402-509c12c41959?w=600&q=80",
    recipeCount: 10,
  },
  {
    id: "vegan",
    name: "Vegan Salads",
    slug: "vegan",
    description: "Plant-based salads, no animal products",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
    recipeCount: 9,
  },
];
