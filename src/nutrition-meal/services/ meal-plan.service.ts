// meal-plan.service.ts
import { Injectable } from '@nestjs/common';
import { CreateMealPlanDto } from '../dtos/create-meal-plan.dto';
import { IMealPlan } from '../schemas/meal-plan.schema';
import { MealPlanRepository } from '../repositories/meal-plan.repository';

@Injectable()
export class MealPlanService {
  constructor(private readonly mealPlanRepository: MealPlanRepository) {}

  async createMealPlan(
    createMealPlanDto: CreateMealPlanDto,
  ): Promise<IMealPlan> {
    return this.mealPlanRepository.create(createMealPlanDto);
  }

  async getAllMealPlans(): Promise<IMealPlan[]> {
    return this.mealPlanRepository.findAll();
  }

  async selectMealPlanForUser(
    userId: string,
    mealPlanId: string,
  ): Promise<any> {
    const mealPlan = await this.mealPlanRepository.findById(mealPlanId);
    if (!mealPlan) {
      throw new Error('Meal Plan not found');
    }

    // Logic to associate meal plan with user profile (via User Management Service)...
    return { message: `Meal Plan ${mealPlanId} selected for user ${userId}` };
  }
}
