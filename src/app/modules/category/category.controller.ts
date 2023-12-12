import catchAsync from "../../utils/CatchAsync";
import SendResponse from "../../utils/SendResponse";
import httpStatus from "http-status";
import { categoryServices } from "./category.service";
import { createCategoryValidationSchema } from "./category.validation";
import AppError from "../../errors/AppError";

const createCategory = catchAsync(async (req, res) => {
  const categoryData = req.body;

  const updatedDataKeys = Object.keys(categoryData); // check updated data keys

  const updateSchemaKeys = Object.keys(createCategoryValidationSchema.shape); //check schema keys

  const invalidKeys = updatedDataKeys.filter(
    (key) => !updateSchemaKeys.includes(key)
  ); //get invalid keys

  if (invalidKeys.length > 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Invalid keys found for category creating"
    );
  }

  const result = await categoryServices.createCategoryIntoDB(categoryData);

  //after category creation this response will send to data
  const resultForResponse = {
    _id: result._id,
    name: result.name,
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

  // response data
  const resultForResponse = result.map((data) => ({
    _id: data._id,
    name: data.name,
  }));

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Categories retrieved successfully",
    data: resultForResponse,
  });
});
export const categoryControllers = {
  createCategory,
  getAllCategories,
};
