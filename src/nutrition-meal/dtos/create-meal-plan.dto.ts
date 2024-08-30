// create-meal-plan.dto.ts
export class CreateMealPlanDto {
  readonly title: string;
  readonly description: string;
  readonly diet_type: string;
  readonly calories: number;
  readonly recipes: string[];
  nutritionist_id: string;
}
