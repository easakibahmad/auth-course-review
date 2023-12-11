import { TCourse } from "./course.interface";
import { courseModel } from "./course.model";
import { CalculateWeekDifference } from "./course.utils";

const createCourseIntoDB = async (payload: TCourse) => {
  payload.durationInWeeks = CalculateWeekDifference(
    payload.startDate,
    payload.endDate
  );

  const newCourse = await courseModel.create(payload);

  return newCourse;
};

// update course data
const updateCourseIntoDB = async (courseId: string, payload: Partial<TCourse>) => {
  const { tags, details, ...remainingCourseData } = payload;

  const updatedData: Record<string, unknown> = {
    ...remainingCourseData,
  };

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      updatedData[`details.${key}`] = value;
    }
  }

  const result = await courseModel.findByIdAndUpdate(courseId, updatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const courseServices = {
  createCourseIntoDB,
  updateCourseIntoDB,
};
