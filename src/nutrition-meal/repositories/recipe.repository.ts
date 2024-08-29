// recipe.repository.ts
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateRecipeDto } from '../dtos/create-recipe.dto';
import { IRecipe } from '../schemas/recipe.schema';

@Injectable()
export class RecipeRepository {
  constructor(
    @InjectModel('Recipe') private readonly recipeModel: Model<IRecipe>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<IRecipe> {
    const createdRecipe = new this.recipeModel(createRecipeDto);
    return createdRecipe.save();
  }

  async findAll(): Promise<IRecipe[]> {
    return this.recipeModel.find().exec();
  }
}
