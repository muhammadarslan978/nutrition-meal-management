// recipe.schema.ts
import { Document, Schema, model } from 'mongoose';

interface IRecipe extends Document {
  recipe_id: string;
  name: string;
  ingredients: { name: string; quantity: number; unit: string }[];
  instructions: string;
  calories: number;
  macronutrients: { protein: number; carbs: number; fats: number };
  created_at: Date;
  updated_at: Date;
}

const RecipeSchema = new Schema<IRecipe>({
  recipe_id: { type: String, required: true },
  name: { type: String, required: true },
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      unit: { type: String, required: true },
    },
  ],
  instructions: { type: String, required: true },
  calories: { type: Number, required: true },
  macronutrients: {
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

RecipeSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

const Recipe = model<IRecipe>('Recipe', RecipeSchema);
export { RecipeSchema, Recipe, IRecipe };
