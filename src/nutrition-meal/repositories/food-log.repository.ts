// food-log.repository.ts
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFoodLogDto } from '../dtos/create-food-log.dto';
import { IFoodLog } from '../schemas/food-log.schema';

@Injectable()
export class FoodLogRepository {
  constructor(
    @InjectModel('FoodLog') private readonly foodLogModel: Model<IFoodLog>,
  ) {}

  async create(createFoodLogDto: CreateFoodLogDto): Promise<IFoodLog> {
    const createdFoodLog = new this.foodLogModel(createFoodLogDto);
    return createdFoodLog.save();
  }

  async findByUserId(userId: string): Promise<IFoodLog[]> {
    return this.foodLogModel.find({ user_id: userId }).exec();
  }
}
