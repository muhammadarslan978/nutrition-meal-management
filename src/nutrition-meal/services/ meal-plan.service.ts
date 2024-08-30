import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateMealPlanDto } from '../dtos/create-meal-plan.dto';
import { IMealPlan } from '../schemas/meal-plan.schema';
import { IMealPlanRepository } from '../interfaces/meal-plan-repository.interface';
import { IHttpClient } from '../interfaces/http-client.interface';

@Injectable()
export class MealPlanService {
  constructor(
    @Inject('IMealPlanRepository')
    private readonly mealPlanRepository: IMealPlanRepository,
    @Inject('IHttpClient') private readonly httpClient: IHttpClient,
  ) {}

  async createMealPlan(
    createMealPlanDto: CreateMealPlanDto,
  ): Promise<IMealPlan> {
    return this.mealPlanRepository.create(createMealPlanDto);
  }

  async getAllMealPlans(): Promise<IMealPlan[]> {
    return this.mealPlanRepository.findAll();
  }

  async selectMealPlanForUser(
    userId: string,
    mealPlanId: string,
  ): Promise<any> {
    const mealPlan = await this.mealPlanRepository.findById(mealPlanId);
    if (!mealPlan) {
      throw new Error('Meal Plan not found');
    }

    try {
      const response = await this.httpClient.post<any>(
        `http://localhost:3000/users/${userId}/meal-plan`,
        {
          mealplan_id: mealPlanId,
          title: mealPlan.title,
          start_date: new Date(),
        },
      );

      if (response) {
        return {
          message: `Meal Plan ${mealPlanId} selected for user ${userId}`,
        };
      } else {
        throw new HttpException(
          `Unexpected response from User Management Service`,
          HttpStatus.BAD_GATEWAY,
        );
      }
    } catch (error) {
      throw new HttpException(
        `Error selecting meal plan for user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
