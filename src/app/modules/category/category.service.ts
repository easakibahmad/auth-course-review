import { TCategory } from "./category.interface";
import { categoryModel } from "./category.model";

const createCategoryIntoDB = async (payload: TCategory) => {
  const newCategory = await categoryModel.create(payload);

  return newCategory;
};

const getAllCategoriesFromDB = async () => {
  const result = await categoryModel.find();
  return result;
};

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};
