/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { reviewModel } from "../review/review.model";
import { TCourse } from "./course.interface";
import { courseModel } from "./course.model";
import { CalculateWeekDifference } from "./course.utils";

// create new course
const createCourseIntoDB = async (payload: TCourse) => {
  //calculate week difference using utils function CalculateWeekDifference
  payload.durationInWeeks = CalculateWeekDifference(
    payload.startDate,
    payload.endDate
  );

  const newCourse: any = await courseModel.create(payload);

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

  // to update details
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      updatedData[`details.${key}`] = value;
    }
  }

  // send the updated data
  const result: any = await courseModel
    .findByIdAndUpdate(courseId, updatedData, {
      new: true,
      runValidators: true,
    })
    .populate("createdBy");
  return result;
};

// get course with review
const getSingleCourseWithReviewFromDB = async (courseId: string) => {
  const result: any = await courseModel
    .findById(courseId)
    .populate("createdBy");
  const reviews: any = await reviewModel
    .find({ courseId: courseId })
    .populate("createdBy");
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

  const bestCourseFound: any = await courseModel
    .findById({
      _id: bestWeightedCourse.courseId,
    })
    .populate("createdBy");

  return {
    course: bestCourseFound,
    averageRating: bestWeightedCourse.averageRating,
    reviewCount: bestWeightedCourse.reviewCount,
  };
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const {
    page = 1,
    limit = 10, //default limit value is 10
    sortBy,
    language,
    provider,
    durationInWeeks,
    level,
    tags,
    startDate,
    endDate,
    minPrice,
    maxPrice,
    sortOrder,
  } = query;

  const applyFiltering: any = {}; //for filtering

  const applySort: any = {}; //for sorting

  //specified sortBy values
  const SortByValues = {
    TITLE: "title",
    PRICE: "price",
    START_DATE: "startDate",
    END_DATE: "endDate",
    LANGUAGE: "language",
    DURATION: "durationInWeeks",
  };

  //specified sortOrder values
  const AscOrDscOrder = {
    ASC: "asc",
    DSC: "desc",
  };

  //for sorting
  if (Object.values(SortByValues).includes(sortBy as string)) {
    // check sortOrder is in specified values
    if (Object.values(AscOrDscOrder).includes(sortOrder as string)) {
      sortOrder === "asc"
        ? (applySort[sortBy as string] = 1)
        : (applySort[sortBy as string] = -1);
    }

    //set default sorting as ascending order when sortOrder is not in query
    else {
      applySort[sortBy as string] = 1;
    }
  }

  //filtering
  if (language) {
    applyFiltering.language = language;
  }

  if (provider) {
    applyFiltering.provider = provider;
  }

  if (durationInWeeks) {
    applyFiltering.durationInWeeks = parseInt(durationInWeeks as string);
  }

  if (level) {
    applyFiltering["details.level"] = level;
  }

  if (tags) {
    applyFiltering["tags.name"] = tags;
  }

  if (startDate && endDate) {
    applyFiltering.startDate = { $gte: startDate as string };
    applyFiltering.endDate = { $lte: endDate as string };
  }

  if (startDate) {
    applyFiltering.startDate = { $gte: startDate as string };
  }

  if (endDate) {
    applyFiltering.endDate = { $lte: endDate as string };
  }

  if (minPrice) {
    applyFiltering.price = { $gte: parseFloat(minPrice as string) };
  }

  if (maxPrice) {
    applyFiltering.price = { $lte: parseFloat(maxPrice as string) };
  }

  if (minPrice && maxPrice) {
    applyFiltering.price = {
      $gte: parseFloat(minPrice as string),
      $lte: parseFloat(maxPrice as string),
    };
  }

  let limitAsNumber = parseInt(limit as string);
  let pageAsNumber = parseInt(page as string);
  let dataWithPageAndLimit = (pageAsNumber - 1) * limitAsNumber;

  const retrievedCourseByFiltering: any = await courseModel
    .find(applyFiltering)
    .populate("createdBy")
    .sort(applySort)
    .skip(dataWithPageAndLimit)
    .limit(limitAsNumber);

  if (!retrievedCourseByFiltering) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "query filtering failed to load courses data!"
    );
  }

  const totalCourses = await courseModel.find({});

  const total = totalCourses?.length; // calculated total length where query applied. To set as a meta property(total)

  return {
    result: retrievedCourseByFiltering,
    pageAsNumber,
    limitAsNumber,
    total,
  };
};

export const courseServices = {
  createCourseIntoDB,
  updateCourseIntoDB,
  getSingleCourseWithReviewFromDB,
  getBestCourseFromDB,
  getAllCoursesFromDB,
};
