// meal-plan.controller.ts
import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { CreateMealPlanDto } from '../dtos/create-meal-plan.dto';
import { MealPlanService } from '../services/ meal-plan.service';
import { IMealPlan } from '../schemas/meal-plan.schema';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/constants';

@Controller('meal-plans')
export class MealPlanController {
  constructor(private readonly mealPlanService: MealPlanService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.TRAINER)
  async createMealPlan(
    @Body() createMealPlanDto: CreateMealPlanDto,
    @Req() req: any,
  ): Promise<IMealPlan> {
    const nutritionist_id = req.user._id;
    createMealPlanDto.nutritionist_id = nutritionist_id;
    return this.mealPlanService.createMealPlan(createMealPlanDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllMealPlans(): Promise<IMealPlan[]> {
    return this.mealPlanService.getAllMealPlans();
  }

  @Post('select')
  @UseGuards(JwtAuthGuard)
  async selectMealPlan(@Body() body: { mealPlanId: string }, @Req() req: any) {
    const { mealPlanId } = body;
    const user_id = req.user._id;
    return this.mealPlanService.selectMealPlanForUser(user_id, mealPlanId);
  }
}
