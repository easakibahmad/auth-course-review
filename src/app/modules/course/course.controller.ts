import AppError from "../../errors/AppError";
import catchAsync from "../../utils/CatchAsync";
import SendResponse from "../../utils/SendResponse";
import { categoryModel } from "../category/category.model";
import { courseServices } from "./course.service";
import httpStatus from "http-status";
import { updateCourseValidationSchema } from "./course.validation";
import { courseModel } from "./course.model";

const createCourse = catchAsync(async (req, res) => {
  const courseData = req.body;

  const checkCategoryExistOrNot = await categoryModel.findOne({
    _id: courseData.categoryId,
  });

  if (!checkCategoryExistOrNot) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `${courseData.categoryId} (categoryId) is invalid`
    );
  }

  const result = await courseServices.createCourseIntoDB(courseData);

  //this will be the response when course created
  const resultForResponse = {
    _id: result._id,
    title: result.title,
    instructor: result.instructor,
    categoryId: result.categoryId,
    price: result.price,
    tags: result.tags.map((tag) => ({
      name: tag.name,
      isDeleted: tag.isDeleted,
    })),
    startDate: result.startDate,
    endDate: result.endDate,
    language: result.language,
    provider: result.provider,
    durationInWeeks: result.durationInWeeks,
    details: {
      level: result.details.level,
      description: result.details.description,
    },
  };

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Course created successfully",
    data: resultForResponse,
  });
});

// update course data
const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  // check courseId is valid or not
  const checkCourseExistOrNot = await courseModel.findOne({
    _id: courseId,
  });

  if (!checkCourseExistOrNot) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `${courseId} (courseId) is invalid`
    );
  }

  const courseDataForUpdate = req.body;

  const updatedDataKeys = Object.keys(courseDataForUpdate); // check updated data keys

  const updateSchemaKeys = Object.keys(updateCourseValidationSchema.shape); //check schema keys

  const invalidKeys = updatedDataKeys.filter(
    (key) => !updateSchemaKeys.includes(key)
  ); //get invalid keys

  if (invalidKeys.length > 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Invalid keys found for updating"
    );
  }

  const result = await courseServices.updateCourseIntoDB(
    courseId,
    courseDataForUpdate
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course updated successfully",
    data: result,
  });
});

const getSingleCourseWithReview = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  // check courseId is valid or not
  const checkCourseExistOrNot = await courseModel.findOne({
    _id: courseId,
  });

  if (!checkCourseExistOrNot) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `${courseId} (courseId) is invalid`
    );
  }

  const result = await courseServices.getSingleCourseWithReviewFromDB(courseId);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course and Reviews retrieved successfully",
    data: result,
  });
});

// get best course
const getBestCourse = catchAsync(async (req, res) => {
  const result = await courseServices.getBestCourseFromDB();

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Best course retrieved successfully",
    data: result,
  });
});
export const courseControllers = {
  createCourse,
  updateCourse,
  getSingleCourseWithReview,
  getBestCourse,
};
