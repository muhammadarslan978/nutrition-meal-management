// recipe.service.ts
import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';
import { IRecipe } from '../schemas/recipe.schema';
import { RecipeRepository } from '../repositories/recipe.repository';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<IRecipe> {
    return this.recipeRepository.create(createRecipeDto);
  }

  async getAllRecipes(): Promise<IRecipe[]> {
    return this.recipeRepository.findAll();
  }
}
