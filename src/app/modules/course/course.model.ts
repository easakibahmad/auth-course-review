import { Schema, model } from "mongoose";
import { TCourse, TDetails, TTag } from "./course.interface";

const tagSchema = new Schema<TTag>({
  name: {
    type: String,
    required: true,
  },
  isDeleted: { type: Boolean, default: false },
});

const detailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  instructor: { type: String, required: true },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "categoryModel",
    required: true,
  },
  price: { type: Number, required: true },
  tags: { type: [tagSchema], required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  language: { type: String, required: true },
  provider: { type: String, required: true },
  durationInWeeks: { type: Number, required: true },
  details: { type: detailsSchema, required: true },
});

export const courseModel = model<TCourse>("Course", courseSchema);
