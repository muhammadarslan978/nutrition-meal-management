// food-log.controller.ts
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { FoodLogService } from '../services/food-log.service';
import { CreateFoodLogDto } from '../dtos/create-food-log.dto';
import { IFoodLog } from '../schemas/food-log.schema';

@Controller('food-logs')
export class FoodLogController {
  constructor(private readonly foodLogService: FoodLogService) {}

  @Post()
  async createFoodLog(
    @Body() createFoodLogDto: CreateFoodLogDto,
  ): Promise<IFoodLog> {
    return this.foodLogService.createFoodLog(createFoodLogDto);
  }

  @Get(':userId')
  async getUserFoodLogs(@Param('userId') userId: string): Promise<IFoodLog[]> {
    return this.foodLogService.getUserFoodLogs(userId);
  }
}
