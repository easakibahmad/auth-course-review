/* eslint-disable @typescript-eslint/no-explicit-any */
import { TReview } from "./review.interface";
import { reviewModel } from "./review.model";

// create review
const createReviewIntoDB = async (payload: TReview) => {
  const newReview: any = await reviewModel.create(payload);
  return newReview;
};

export const reviewServices = {
  createReviewIntoDB,
};
