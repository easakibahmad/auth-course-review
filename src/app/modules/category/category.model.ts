import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

export const categorySchema = new Schema<TCategory>(
  {
    name: { type: String, unique: true, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const categoryModel = model<TCategory>("Category", categorySchema);
