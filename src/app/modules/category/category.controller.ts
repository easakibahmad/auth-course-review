import catchAsync from "../../utils/CatchAsync";
import SendResponse from "../../utils/SendResponse";
import httpStatus from "http-status";
import { categoryServices } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
  const categoryData = req.body;

  const result = await categoryServices.createCategoryIntoDB(categoryData);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Category created successfully",
    data: result,
  });
});

export const categoryControllers = {
  createCategory,
};
