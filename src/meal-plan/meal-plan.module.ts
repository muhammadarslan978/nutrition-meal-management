import { Module } from '@nestjs/common';
import { MealPlanController } from './controller/meal-plan.controller';
import { MealPlanService } from './service/meal-plan.service';

@Module({
  controllers: [MealPlanController],
  providers: [MealPlanService],
})
export class MealPlanModule {}
