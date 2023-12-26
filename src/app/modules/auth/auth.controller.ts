import httpStatus from "http-status";
import SendResponse from "../../utils/SendResponse";
import { authServices } from "./auth.service";
import catchAsync from "../../utils/CatchAsync";
import AppError from "../../errors/AppError";
import { loginValidationSchema } from "./auth.validation";

const loginUser = catchAsync(async (req, res) => {
  const loginData = req.body; // login data from request body

  const loginDataKeys = Object.keys(loginData); // check data keys

  const loginSchemaKeys = Object.keys(loginValidationSchema.shape); //check schema keys

  const invalidKeys = loginDataKeys.filter(
    (key) => !loginSchemaKeys.includes(key)
  ); //get invalid keys

  if (invalidKeys.length > 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid keys found");
  }
  const result = await authServices.loginUser(loginData);

  //response data format
  const foundedUserData = {
    _id: result.existingUser._id,
    username: result.existingUser.username,
    email: result.existingUser.email,
    role: result.existingUser.role,
  };

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User login successful",
    data: { user: foundedUserData, token: result.accessToken },
  });
});

export const authControllers = {
  loginUser,
};