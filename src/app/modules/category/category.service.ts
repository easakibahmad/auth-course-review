import { TCategory } from "./category.interface";
import { categoryModel } from "./category.model";

const createCategoryIntoDB = async (payload: TCategory) => {
  const newCategory = await categoryModel.create(payload);

  return newCategory;
};

export const categoryServices = {
  createCategoryIntoDB,
};
