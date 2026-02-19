import type { Recipe } from "@/types/recipe";

interface RecipeSchemaProps {
  recipe: Recipe;
}

export function RecipeSchema({ recipe }: RecipeSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.excerpt,
    image: recipe.image,
    prepTime: `PT${recipe.prepTimeMinutes}M`,
    cookTime: `PT${recipe.cookTimeMinutes}M`,
    totalTime: `PT${recipe.totalTimeMinutes}M`,
    recipeYield: recipe.servings,
    nutrition: {
      "@type": "NutritionInformation",
      calories: `${recipe.nutrition.calories} calories`,
      proteinContent: `${recipe.nutrition.protein}g`,
      carbohydrateContent: `${recipe.nutrition.carbs}g`,
      fatContent: `${recipe.nutrition.fat}g`,
    },
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((i) => ({
      "@type": "HowToStep",
      step: i.step,
      text: i.text,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: recipe.rating,
      reviewCount: recipe.reviewCount,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
