// nutrition.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MealPlanSchema } from './schemas/meal-plan.schema';
import { RecipeSchema } from './schemas/recipe.schema';
import { FoodLogSchema } from './schemas/food-log.schema';
import { MealPlanController } from './controllers/meal-plan.controller';
import { RecipeController } from './controllers/recipe.controller';
import { FoodLogController } from './controllers/food-log.controller';
import { RecipeService } from './services/recipe.service';
import { FoodLogService } from './services/food-log.service';
import { MealPlanRepository } from './repositories/meal-plan.repository';
import { RecipeRepository } from './repositories/recipe.repository';
import { FoodLogRepository } from './repositories/food-log.repository';
import { MealPlanService } from './services/ meal-plan.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MealPlan', schema: MealPlanSchema },
      { name: 'Recipe', schema: RecipeSchema },
      { name: 'FoodLog', schema: FoodLogSchema },
    ]),
  ],
  controllers: [MealPlanController, RecipeController, FoodLogController],
  providers: [
    MealPlanService,
    RecipeService,
    FoodLogService,
    MealPlanRepository,
    RecipeRepository,
    FoodLogRepository,
  ],
})
export class NutritionModule {}
