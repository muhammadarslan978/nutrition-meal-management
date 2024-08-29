// meal-plan.controller.ts
import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateMealPlanDto } from '../dtos/create-meal-plan.dto';
import { MealPlanService } from '../services/ meal-plan.service';
import { IMealPlan } from '../schemas/meal-plan.schema';

@Controller('meal-plans')
export class MealPlanController {
  constructor(private readonly mealPlanService: MealPlanService) {}

  @Post()
  async createMealPlan(
    @Body() createMealPlanDto: CreateMealPlanDto,
  ): Promise<IMealPlan> {
    return this.mealPlanService.createMealPlan(createMealPlanDto);
  }

  @Get()
  async getAllMealPlans(): Promise<IMealPlan[]> {
    return this.mealPlanService.getAllMealPlans();
  }

  @Post('select')
  async selectMealPlan(@Body() body: { userId: string; mealPlanId: string }) {
    const { userId, mealPlanId } = body;
    return this.mealPlanService.selectMealPlanForUser(userId, mealPlanId);
  }
}
