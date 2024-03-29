/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/CatchAsync";
import SendResponse from "../../utils/SendResponse";
import { categoryModel } from "../category/category.model";
import { courseServices } from "./course.service";
import httpStatus from "http-status";
import { updateCourseValidationSchema } from "./course.validation";
import { courseModel } from "./course.model";

const createCourse = catchAsync(async (req, res) => {
  const courseData = req.body; //get course data from request body

  //check user exists or not
  const checkCategoryExistOrNot = await categoryModel.findOne({
    _id: courseData.categoryId,
  });

  if (!checkCategoryExistOrNot) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `${courseData.categoryId} (categoryId) is invalid`
    );
  }

  //add user _id as createdBy reference
  courseData.createdBy = req?.user?._id;

  const result = await courseServices.createCourseIntoDB(courseData);

  //response data format
  const resultForResponse = {
    _id: result._id,
    title: result.title,
    instructor: result.instructor,
    categoryId: result.categoryId,
    price: result.price,
    tags: result.tags.map((tag: any) => ({
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
    createdBy: result.createdBy,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
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
  const { courseId } = req.params; // get courseId from param

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

  const courseDataForUpdate = req.body; // get updating data from request body

  const updatedDataKeys = Object.keys(courseDataForUpdate); // check updated data keys

  const updateSchemaKeys = Object.keys(updateCourseValidationSchema.shape); //check schema keys

  const invalidKeys = updatedDataKeys.filter(
    (key) => !updateSchemaKeys.includes(key)
  ); //get invalid keys

  if (invalidKeys.length > 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid keys found");
  }

  const result = await courseServices.updateCourseIntoDB(
    courseId,
    courseDataForUpdate
  );

  // response data format
  const resultForResponse = {
    _id: result?._id,
    title: result?.title,
    instructor: result?.instructor,
    categoryId: result?.categoryId,
    price: result?.price,
    tags: result?.tags.map((tag: any) => ({
      name: tag.name,
      isDeleted: tag.isDeleted,
    })),
    startDate: result?.startDate,
    endDate: result?.endDate,
    language: result?.language,
    provider: result?.provider,
    durationInWeeks: result?.durationInWeeks,
    details: {
      level: result?.details.level,
      description: result?.details.description,
    },
    createdBy: {
      _id: result.createdBy?._id,
      username: result.createdBy?.username,
      email: result.createdBy?.email,
      role: result.createdBy?.role,
    },
    createdAt: result?.createdAt,
    updatedAt: result?.updatedAt,
  };

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course updated successfully",
    data: resultForResponse,
  });
});

const getSingleCourseWithReview = catchAsync(async (req, res) => {
  const { courseId } = req.params; // get courseId from request params

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

  // reviews data for response
  const resultForReviewResponse = result?.reviews.map((review: any) => ({
    _id: review._id,
    courseId: review.courseId,
    rating: review.rating,
    review: review.review,
    createdBy: {
      _id: review.createdBy?._id,
      username: review.createdBy?.username,
      email: review.createdBy?.email,
      role: review.createdBy?.role,
    },
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
  }));

  // course data for response
  const resultForCourseResponse = {
    _id: result?.course?._id,
    title: result?.course?.title,
    instructor: result?.course?.instructor,
    categoryId: result?.course?.categoryId,
    price: result?.course?.price,
    tags: result?.course?.tags.map((tag: any) => ({
      name: tag.name,
      isDeleted: tag.isDeleted,
    })),
    startDate: result?.course?.startDate,
    endDate: result?.course?.endDate,
    language: result?.course?.language,
    provider: result?.course?.provider,
    durationInWeeks: result?.course?.durationInWeeks,
    details: {
      level: result?.course?.details.level,
      description: result?.course?.details.description,
    },
    createdBy: {
      _id: result?.course?.createdBy?._id,
      username: result?.course?.createdBy?.username,
      email: result?.course?.createdBy?.email,
      role: result?.course?.createdBy?.role,
    },
    createdAt: result?.course?.createdAt,
    updatedAt: result?.course?.updatedAt,
  };

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course with reviews retrieved successfully",
    data: { course: resultForCourseResponse, reviews: resultForReviewResponse },
  });
});

// get best course
const getBestCourse = catchAsync(async (req, res) => {
  const result = await courseServices.getBestCourseFromDB();

  // response data format
  const resultForCourseResponse = {
    _id: result?.course?._id,
    title: result?.course?.title,
    instructor: result?.course?.instructor,
    categoryId: result?.course?.categoryId,
    price: result?.course?.price,
    tags: result?.course?.tags.map((tag: any) => ({
      name: tag.name,
      isDeleted: tag.isDeleted,
    })),
    startDate: result?.course?.startDate,
    endDate: result?.course?.endDate,
    language: result?.course?.language,
    provider: result?.course?.provider,
    durationInWeeks: result?.course?.durationInWeeks,
    details: {
      level: result?.course?.details.level,
      description: result?.course?.details.description,
    },
    createdBy: {
      _id: result?.course?.createdBy?._id,
      username: result?.course?.createdBy?.username,
      email: result?.course?.createdBy?.email,
      role: result?.course?.createdBy?.role,
    },
    createdAt: result?.course?.createdAt,
    updatedAt: result?.course?.updatedAt,
  };

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Best course retrieved successfully",
    data: {
      course: resultForCourseResponse,
      averageRating: result.averageRating,
      reviewCount: result.reviewCount,
    },
  });
});

// get courses
const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCoursesFromDB(req.query);

  // response data format
  const resultForResponse = result.result.map((data: any) => {
    const course = {
      _id: data._id,
      title: data?.title,
      instructor: data.instructor,
      categoryId: data.categoryId,
      price: data.price,
      tags: data.tags.map((tag: any) => ({
        name: tag.name,
        isDeleted: tag.isDeleted,
      })),
      startDate: data.startDate,
      endDate: data.endDate,
      language: data.language,
      provider: data.provider,
      durationInWeeks: data.durationInWeeks,
      details: {
        level: data.details.level,
        description: data.details.description,
      },
      createdBy: {
        _id: data.createdBy?._id,
        username: data.createdBy?.username,
        email: data.createdBy?.email,
        role: data.createdBy?.role,
      },
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
    };
    return course;
  });

  // meta data for response
  const metaData = {
    page: result.pageAsNumber,
    limit: result.limitAsNumber,
    total: result.total,
  };

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Courses retrieved successfully",
    meta: metaData,
    data: { courses: resultForResponse },
  });
});
export const courseControllers = {
  createCourse,
  updateCourse,
  getSingleCourseWithReview,
  getBestCourse,
  getAllCourses,
};
