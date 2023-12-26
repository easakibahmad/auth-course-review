/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { TLoginUser } from "./auth.interface";
import { userModel } from "../user/user.model";
import AppError from "../../errors/AppError";
import config from "../../config";
import jwt from "jsonwebtoken";

const loginUser = async (payload: TLoginUser) => {
  //check user exists or not by its username
  const existingUser: any = await userModel.isUserExistsByUsername(
    payload.username
  );

  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  //check password matched or not
  const checkPassword = await userModel.isPasswordMatched(
    payload?.password,
    existingUser?.password
  );

  if (!checkPassword) {
    throw new AppError(httpStatus.FORBIDDEN, "Incorrect password");
  }

  //jason web token payload format
  const jwtPayload = {
    _id: existingUser._id,
    role: existingUser.role,
    email: existingUser.email,
  };

  //generate jason web token
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  return { existingUser, accessToken };
};

export const authServices = {
  loginUser,
};
