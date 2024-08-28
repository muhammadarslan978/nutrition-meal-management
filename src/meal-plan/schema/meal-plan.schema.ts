import { Document, Schema, model, Types } from 'mongoose';

interface IMealPlan extends Document {
  mealplan_id: string;
  title: string;
  description?: string;
  diet_type?: string;
  calories?: number;
  recipes: Types.ObjectId[];
  nutritionist_id: string;
  created_at: Date;
  updated_at: Date;
}

const MealPlanSchema = new Schema<IMealPlan>({
  mealplan_id: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  diet_type: String,
  calories: Number,
  recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  nutritionist_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

MealPlanSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

const MealPlan = model<IMealPlan>('MealPlan', MealPlanSchema);
export { MealPlanSchema, MealPlan, IMealPlan };
