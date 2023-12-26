import AppError from "../../errors/AppError";
import catchAsync from "../../utils/CatchAsync";
import SendResponse from "../../utils/SendResponse";
import httpStatus from "http-status";
import { createUserValidationSchema } from "./user.validation";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const userData = req.body; //user data from request body

  const userDataKeys = Object.keys(userData); // check updated data keys

  const userSchemaKeys = Object.keys(createUserValidationSchema.shape); //check schema keys

  const invalidKeys = userDataKeys.filter(
    (key) => !userSchemaKeys.includes(key)
  ); //get invalid keys

  if (invalidKeys.length > 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid keys found");
  }

  const result = await UserServices.createUserIntoDB(userData);

  // response data format
  const resultForResponse = {
    _id: result._id,
    username: result.username,
    email: result.email,
    role: result.role,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: resultForResponse,
  });
});

export const userControllers = {
  createUser,
};
