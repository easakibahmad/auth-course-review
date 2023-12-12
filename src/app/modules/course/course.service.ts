import httpStatus from "http-status";
import AppError from "../../errors/AppError";
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

  const findTags = await courseModel.findById(courseId);

  //retrieve tags
  const tagsFromCourse = findTags?.tags;

  if (Array.isArray(tagsFromCourse) && Array.isArray(tags)) {
    //filter through tags and check tag.name is not matched with tagFromCourse.name from 'tagsFromCourse', and tag.isDeleted is false then push this into 'tagsFromCourse'
    const newTags = tags
      .filter(
        (tag) =>
          !tagsFromCourse?.some(
            (existingTag) => existingTag.name === tag.name && !tag.isDeleted
          )
      )
      .filter((tag) => !tag.isDeleted);

    tagsFromCourse?.push(...newTags);

    //map through tags and check tag.name is match with tagFromCourse.name from 'tagsFromCourse', and tag.isDeleted is true then delete this from 'tagsFromCourse'
    const updatedTags = tagsFromCourse.map((tagFromCourse) => {
      const matchingTag = tags.find((tag) => tag.name === tagFromCourse.name);

      if (matchingTag && matchingTag.isDeleted) {
        return null;
      }
      return tagFromCourse;
    });
    updatedData.tags = updatedTags.filter((tag) => tag !== null);
  }

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

    // I use this formula to calculate weight for each course to determine which one is best
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

  return {
    course: bestCourseFound,
    averageRating: bestWeightedCourse.averageRating,
    reviewCount: bestWeightedCourse.reviewCount,
  };
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const { page = 1, limit = 4 } = query;

  const applyFiltering = {};

  let limitAsNumber = parseInt(limit as string);
  let pageAsNumber = parseInt(page as string);

  let skippedDataWithPageAndLimit = (pageAsNumber - 1) * limitAsNumber;

  const retrievedCourseByFiltering = await courseModel
    .find(applyFiltering)
    .skip(skippedDataWithPageAndLimit)
    .limit(limitAsNumber);

  if (!retrievedCourseByFiltering) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "query filtering failed to load courses data!"
    );
  }

  return retrievedCourseByFiltering;
};

export const courseServices = {
  createCourseIntoDB,
  updateCourseIntoDB,
  getSingleCourseWithReviewFromDB,
  getBestCourseFromDB,
  getAllCoursesFromDB,
};
