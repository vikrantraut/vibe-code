export type CategoryId =
  | "healthy"
  | "chicken"
  | "weight-loss"
  | "high-protein"
  | "quick"
  | "vegan";

export type DietType = "Keto" | "Vegan" | "High Protein" | "Low Carb" | "Paleo" | "Mediterranean";

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  calories: number;
  servings: number;
  ingredients: string[];
  instructions: { step: number; text: string }[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
  };
  categories: CategoryId[];
  tags: string[];
  dietTypes?: DietType[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
  trending?: boolean;
  createdAt: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  image: string;
  recipeCount: number;
}
