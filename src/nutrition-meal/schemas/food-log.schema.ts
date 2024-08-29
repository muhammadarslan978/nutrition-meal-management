// food-log.schema.ts
import { Document, Schema, model, Types } from 'mongoose';

interface IFoodLog extends Document {
  foodlog_id: string;
  user_id: string;
  date: Date;
  meals: {
    meal_type: string;
    recipe: Types.ObjectId; // Reference to Recipe document
    quantity: number;
    calories: number;
  }[];
  total_calories: number;
  macronutrient_breakdown: {
    protein: number;
    carbs: number;
    fats: number;
  };
  created_at: Date;
}

const FoodLogSchema = new Schema<IFoodLog>({
  foodlog_id: { type: String, required: true },
  user_id: { type: String, required: true },
  date: { type: Date, required: true },
  meals: [
    {
      meal_type: { type: String, required: true },
      recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' }, // Reference to Recipe documents
      quantity: { type: Number, required: true },
      calories: { type: Number, required: true },
    },
  ],
  total_calories: { type: Number, required: true },
  macronutrient_breakdown: {
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
  },
  created_at: { type: Date, default: Date.now },
});

FoodLogSchema.pre('save', function (next) {
  this.created_at = new Date();
  next();
});

const FoodLog = model<IFoodLog>('FoodLog', FoodLogSchema);
export { FoodLogSchema, FoodLog, IFoodLog };
