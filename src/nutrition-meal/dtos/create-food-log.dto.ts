// create-food-log.dto.ts
export class CreateFoodLogDto {
  readonly user_id: string;
  readonly date: Date;
  readonly meals: {
    meal_type: string;
    recipe: string;
    quantity: number;
    calories: number;
  }[]; // Array of meal details
  readonly total_calories: number;
  readonly macronutrient_breakdown: {
    protein: number;
    carbs: number;
    fats: number;
  };
}
