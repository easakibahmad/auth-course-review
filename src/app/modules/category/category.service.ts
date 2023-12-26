/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCategory } from "./category.interface";
import { categoryModel } from "./category.model";

// create category
const createCategoryIntoDB = async (payload: TCategory) => {
  const newCategory: any = await categoryModel.create(payload);
  return newCategory;
};

// get all categories
const getAllCategoriesFromDB = async () => {
  const result: any = await categoryModel.find().populate("createdBy");
  return result;
};

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};
