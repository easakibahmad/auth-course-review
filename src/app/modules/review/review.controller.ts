import AppError from "../../errors/AppError";
import catchAsync from "../../utils/CatchAsync";
import SendResponse from "../../utils/SendResponse";
import { courseModel } from "../course/course.model";
import httpStatus from "http-status";
import { reviewServices } from "./review.service";

const createReview = catchAsync(async (req, res) => {
  const reviewData = req.body;

  const checkCourseExistOrNot = await courseModel.findOne({
    _id: reviewData.courseId,
  });

  if (!checkCourseExistOrNot) {
    throw new AppError(httpStatus.NOT_FOUND, "Course id is invalid");
  }

  const result = await reviewServices.createReviewIntoDB(reviewData);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review created successfully",
    data: result,
  });
});

export const reviewControllers = {
  createReview,
};
