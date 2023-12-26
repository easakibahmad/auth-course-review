/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from "../../utils/CatchAsync";
import SendResponse from "../../utils/SendResponse";
import httpStatus from "http-status";
import { categoryServices } from "./category.service";
import { createCategoryValidationSchema } from "./category.validation";
import AppError from "../../errors/AppError";

const createCategory = catchAsync(async (req, res) => {
  const categoryData = req.body; // get category data from request body

  const dataKeys = Object.keys(categoryData); // check data keys

  const updateSchemaKeys = Object.keys(createCategoryValidationSchema.shape); //check schema keys

  const invalidKeys = dataKeys.filter((key) => !updateSchemaKeys.includes(key)); //get invalid keys

  if (invalidKeys.length > 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid keys found");
  }

  categoryData.createdBy = req?.user?._id; // set creator reference

  const result = await categoryServices.createCategoryIntoDB(categoryData);

  //response data format
  const resultForResponse = {
    _id: result._id,
    name: result.name,
    createdBy: result.createdBy,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Category created successfully",
    data: resultForResponse,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategoriesFromDB();

  // response data format
  const resultForResponse = result.map((data: any) => ({
    _id: data._id,
    name: data.name,
    createdBy: {
      _id: data.createdBy?._id,
      username: data.createdBy?.username,
      email: data.createdBy?.email,
      role: data.createdBy?.role,
    },
    createdAt: data?.createdAt,
    updatedAt: data?.updatedAt,
  }));

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Categories retrieved successfully",
    data: { categories: resultForResponse },
  });
});
export const categoryControllers = {
  createCategory,
  getAllCategories,
};
