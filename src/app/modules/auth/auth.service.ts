/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { TLoginUser } from "./auth.interface";
import { userModel } from "../user/user.model";
import AppError from "../../errors/AppError";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

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

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // check the user exists or not
  const userExists = await userModel.isUserExistsById(userData._id);

  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const checkPassword = await userModel.isPasswordMatched(
    payload?.oldPassword,
    userExists?.password
  );
  //check current password matched or not
  if (!checkPassword) {
    throw new AppError(httpStatus.FORBIDDEN, "Old Password is incorrect");
  }

  //hash password that will be set as updated password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );
  // console.log(userData);
  await userModel.findOneAndUpdate(
    {
      _id: userData._id,
      role: userData.role,
    },
    {
      password: newHashedPassword,
    }
  );

  return null;
};
export const authServices = {
  loginUser,
  changePassword,
};
