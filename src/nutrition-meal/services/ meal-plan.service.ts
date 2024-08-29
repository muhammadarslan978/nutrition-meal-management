// meal-plan.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMealPlanDto } from '../dtos/create-meal-plan.dto';
import { IMealPlan } from '../schemas/meal-plan.schema';
import { MealPlanRepository } from '../repositories/meal-plan.repository';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class MealPlanService {
  constructor(
    private readonly mealPlanRepository: MealPlanRepository,
    private readonly httpService: HttpService,
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
    // Logic to associate meal plan with user profile (via User Management Service)
    try {
      const response = await firstValueFrom(
        this.httpService
          .post(`http://localhost:3000/users/test`, {
            mealplan_id: mealPlanId,
            start_date: new Date(),
          })
          .pipe(
            catchError((error: AxiosError) => {
              throw new HttpException(
                `Failed to update user meal plan: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }),
          ),
      );

      // Check for 200 or 201 status code
      if (response.status === 200 || response.status === 201) {
        return {
          message: `Meal Plan ${mealPlanId} selected for user ${userId}`,
        };
      } else {
        throw new HttpException(
          `Unexpected response from User Management Service: ${response.status}`,
          HttpStatus.BAD_GATEWAY,
        );
      }
    } catch (error) {
      // Handle errors
      console.log(error);
      throw new HttpException(
        `Error selecting meal plan for user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
