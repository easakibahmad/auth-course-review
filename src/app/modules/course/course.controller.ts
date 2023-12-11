import catchAsync from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import { courseServices } from "./course.service";
import httpStatus from "http-status";

const createCourse = catchAsync(async (req, res) => {
  const courseData = req.body;

  const result = await courseServices.createCourseIntoDB(courseData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Course created successfully",
    data: result,
  });
});

export const courseControllers = {
  createCourse,
};
