import { Module } from '@nestjs/common';
import { RecipeController } from './controller/recipe.controller';
import { RecipeService } from './service/recipe/recipe.service';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
