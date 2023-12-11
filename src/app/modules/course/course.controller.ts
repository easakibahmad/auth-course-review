import AppError from "../../errors/AppError";
import catchAsync from "../../utils/CatchAsync";
import SendResponse from "../../utils/SendResponse";
import { categoryModel } from "../category/category.model";
import { courseServices } from "./course.service";
import httpStatus from "http-status";

const createCourse = catchAsync(async (req, res) => {
  const courseData = req.body;

  const checkCategoryExistOrNot = await categoryModel.findOne({
    _id: courseData.categoryId,
  });
  if (!checkCategoryExistOrNot) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Course id is invalid, course not found!"
    );
  }

  const result = await courseServices.createCourseIntoDB(courseData);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Course created successfully",
    data: result,
  });
});

export const courseControllers = {
  createCourse,
};
