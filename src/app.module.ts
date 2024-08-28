import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealPlanModule } from './meal-plan/meal-plan.module';
import { RecipeModule } from './recipe/recipe.module';
import { FoodLogModule } from './food-log/food-log.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MealPlanModule,
    RecipeModule,
    FoodLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor() {}

  async onModuleInit() {
    await this.setupMongooseConnectionListeners();
  }

  private async setupMongooseConnectionListeners() {
    const maxRetries = 5;
    let retries = 0;

    const connectWithRetry = () => {
      mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
          this.logger.log('Connected to MongoDB successfully');
        })
        .catch((err) => {
          if (retries < maxRetries) {
            retries++;
            this.logger.error(
              `Failed to connect to MongoDB (attempt ${retries}/${maxRetries})`,
              err,
            );
            setTimeout(connectWithRetry, 5000);
          } else {
            this.logger.error(
              'Could not connect to MongoDB after several attempts, exiting...',
            );
            process.exit(1);
          }
        });
    };

    connectWithRetry();

    mongoose.connection.on('disconnected', () => {
      this.logger.warn('MongoDB connection lost');
    });

    mongoose.connection.on('reconnected', () => {
      this.logger.log('Reconnected to MongoDB');
    });
  }
}
