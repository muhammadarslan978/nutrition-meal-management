// recipe.controller.ts
import { Controller, Post, Get, Body } from '@nestjs/common';
import { RecipeService } from '../services/recipe.service';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';
import { IRecipe } from '../schemas/recipe.schema';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<IRecipe> {
    return this.recipeService.createRecipe(createRecipeDto);
  }

  @Get()
  async getAllRecipes(): Promise<IRecipe[]> {
    return this.recipeService.getAllRecipes();
  }
}
