import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "courseModel",
    required: true,
  },
  rating: { type: Number, min: 1, max: 5, required: true },
  review: { type: String, required: true },
});
export const reviewModel = model<TReview>("Review", reviewSchema);
