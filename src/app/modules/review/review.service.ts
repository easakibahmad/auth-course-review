import { TReview } from "./review.interface";
import { reviewModel } from "./review.model";

const createReviewIntoDB = async (payload: TReview) => {
  const newReview = await reviewModel.create(payload);

  return newReview;
};

export const reviewServices = {
  createReviewIntoDB,
};
