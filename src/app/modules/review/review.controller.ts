import AppError from "../../errors/AppError";
import catchAsync from "../../utils/CatchAsync";
import SendResponse from "../../utils/SendResponse";
import { courseModel } from "../course/course.model";
import httpStatus from "http-status";
import { reviewServices } from "./review.service";
import { createReviewValidationSchema } from "./review.validation";

const createReview = catchAsync(async (req, res) => {
    const reviewData = req.body;
    
    const updatedDataKeys = Object.keys(reviewData); // check updated data keys

    const updateSchemaKeys = Object.keys(createReviewValidationSchema.shape); //check schema keys

    const invalidKeys = updatedDataKeys.filter(
      (key) => !updateSchemaKeys.includes(key)
    ); //get invalid keys

    if (invalidKeys.length > 0) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Invalid keys found for review creating"
      );
    }

  const checkCourseExistOrNot = await courseModel.findOne({
    _id: reviewData.courseId,
  });

  if (!checkCourseExistOrNot) {
    throw new AppError(httpStatus.NOT_FOUND, "Course id is invalid");
  }

  const result = await reviewServices.createReviewIntoDB(reviewData);

  // response data
  const resultForResponse = {
    _id: result._id,
    courseId: result.courseId,
    rating: result.rating,
    review: result.review,
  };

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review created successfully",
    data: resultForResponse,
  });
});

export const reviewControllers = {
  createReview,
};
