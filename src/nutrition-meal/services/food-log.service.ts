// food-log.service.ts
import { Injectable } from '@nestjs/common';
import { FoodLogRepository } from '../repositories/food-log.repository';
import { CreateFoodLogDto } from '../dtos/create-food-log.dto';
import { IFoodLog } from '../schemas/food-log.schema';

@Injectable()
export class FoodLogService {
  constructor(private readonly foodLogRepository: FoodLogRepository) {}

  async createFoodLog(createFoodLogDto: CreateFoodLogDto): Promise<IFoodLog> {
    return this.foodLogRepository.create(createFoodLogDto);
  }

  async getUserFoodLogs(userId: string): Promise<IFoodLog[]> {
    return this.foodLogRepository.findByUserId(userId);
  }
}
