import { Module } from '@nestjs/common';
import { FoodLogController } from './controller/food-log.controller';
import { FoodLogService } from './service/food-log.service';

@Module({
  controllers: [FoodLogController],
  providers: [FoodLogService],
})
export class FoodLogModule {}
