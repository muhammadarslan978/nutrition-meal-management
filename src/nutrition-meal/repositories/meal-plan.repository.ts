import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateMealPlanDto } from '../dtos/create-meal-plan.dto';
import { IMealPlan } from '../schemas/meal-plan.schema';
import { IMealPlanRepository } from '../interfaces/meal-plan-repository.interface';

@Injectable()
export class MealPlanRepository implements IMealPlanRepository {
  constructor(
    @InjectModel('MealPlan') private readonly mealPlanModel: Model<IMealPlan>,
  ) {}

  async create(createMealPlanDto: CreateMealPlanDto): Promise<IMealPlan> {
    const createdMealPlan = new this.mealPlanModel(createMealPlanDto);
    return createdMealPlan.save();
  }

  async findAll(): Promise<IMealPlan[]> {
    return this.mealPlanModel.find().populate('recipes').exec(); // Populate recipe references
  }

  async findById(mealPlanId: string): Promise<IMealPlan | null> {
    return this.mealPlanModel
      .findOne({ mealplan_id: mealPlanId })
      .populate('recipes')
      .exec(); // Populate recipes
  }
}
