import AppError from "../../errors/AppError";
import catchAsync from "../../utils/CatchAsync";
import SendResponse from "../../utils/SendResponse";
import { courseModel } from "../course/course.model";
import httpStatus from "http-status";
import { reviewServices } from "./review.service";
import { createReviewValidationSchema } from "./review.validation";
import { userModel } from "../user/user.model";

const createReview = catchAsync(async (req, res) => {
  const reviewData = req.body; // get review data from request body

  const dataKeys = Object.keys(reviewData); // check data keys

  const schemaKeys = Object.keys(createReviewValidationSchema.shape); //check schema keys

  const invalidKeys = dataKeys.filter((key) => !schemaKeys.includes(key)); //get invalid keys

  if (invalidKeys.length > 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid keys found");
  }

  // check user exists or not
  const checkCourseExistOrNot = await courseModel.findOne({
    _id: reviewData.courseId,
  });

  if (!checkCourseExistOrNot) {
    throw new AppError(httpStatus.NOT_FOUND, "Course id is invalid");
  }

  reviewData.createdBy = req?.user?._id; // set creator reference

  const result = await reviewServices.createReviewIntoDB(reviewData);

  //find creator data
  const creatorData = await userModel.findById(result.createdBy);

  // data format for response
  const responseCreatorData = {
    _id: creatorData?._id,
    username: creatorData?.username,
    email: creatorData?.email,
    role: creatorData?.role,
  };

  // response data format
  const resultForResponse = {
    _id: result._id,
    courseId: result.courseId,
    rating: result.rating,
    review: result.review,
    createdBy: responseCreatorData,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
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
