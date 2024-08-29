// create-recipe.dto.ts
export class CreateRecipeDto {
  readonly name: string;
  readonly ingredients: { name: string; quantity: number; unit: string }[];
  readonly instructions: string;
  readonly calories: number;
  readonly macronutrients: { protein: number; carbs: number; fats: number };
}
