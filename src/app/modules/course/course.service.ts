import { reviewModel } from "../review/review.model";
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
const updateCourseIntoDB = async (
  courseId: string,
  payload: Partial<TCourse>
) => {
  const { tags, details, ...remainingCourseData } = payload;

  const updatedData: Record<string, unknown> = {
    ...remainingCourseData,
  };

  //dynamically array element updating remained

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

// get course with review
const getSingleCourseWithReviewFromDB = async (courseId: string) => {
  const result = await courseModel.findById(courseId);
  const reviews = await reviewModel.find({ courseId: courseId });
  return { course: result, reviews: reviews };
};

// get best course
const getBestCourseFromDB = async () => {
  const result = await courseModel.find();

  let bestWeightedCourse = {
    courseId: "", //to retrieve course data
    averageRating: 0,
    reviewCount: 0,
    courseWeight: 0, //to determine which course is best
  };

  for (const course of result) {
    const reviews = await reviewModel.find({ courseId: course._id });

    let averageRating = 0;
    let reviewCount = 0;

    // calculate average rating
    if (reviews.length > 0) {
      averageRating =
        parseFloat(
          (
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length
          ).toFixed(1)
        ) || 0;

      reviewCount = reviews.length; // calculate review count
    }

    // i use this formula to calculate weight for each course to determine which one is best
    const courseWeight = averageRating * 0.8 + reviewCount * 0.2;

    if (courseWeight > bestWeightedCourse.courseWeight) {
      // if current course has higher courseWeight then update
      bestWeightedCourse = {
        courseId: course._id.toString(),
        averageRating,
        reviewCount,
        courseWeight,
      };
    }
  }

  const bestCourseFound = await courseModel.findById({
    _id: bestWeightedCourse.courseId,
  });

  ///
  return {
    course: bestCourseFound,
    averageRating: bestWeightedCourse.averageRating,
    reviewCount: bestWeightedCourse.reviewCount,
  };
};

export const courseServices = {
  createCourseIntoDB,
  updateCourseIntoDB,
  getSingleCourseWithReviewFromDB,
  getBestCourseFromDB,
};
