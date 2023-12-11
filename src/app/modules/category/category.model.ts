import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

export const categorySchema = new Schema<TCategory>({
  name: { type: String, unique: true, required: true },
});
export const categoryModel = model<TCategory>("Category", categorySchema);
