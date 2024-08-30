import { IMealPlan } from '../schemas/meal-plan.schema';
import { CreateMealPlanDto } from '../dtos/create-meal-plan.dto';

export interface IMealPlanRepository {
  create(createMealPlanDto: CreateMealPlanDto): Promise<IMealPlan>;
  findAll(): Promise<IMealPlan[]>;
  findById(mealPlanId: string): Promise<IMealPlan | null>;
}
