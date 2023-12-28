/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { TLoginUser } from "./auth.interface";
import { userModel } from "../user/user.model";
import AppError from "../../errors/AppError";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { passwordArrayTracker } from "./auth.utils";

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

//change password
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

  let flagForTrack: boolean = false; 
  let message: string = "";
  // check password match with current and previous 2 passwords or not
  if (Array.isArray(userExists.passwordArray)) {
    // check each element in password Array
    for (const previousPassword of userExists.passwordArray) {
      const isMatched = await userModel.isPasswordMatched(
        payload?.newPassword,
        previousPassword.password
      );

      if (isMatched) {
        const formattedDate = previousPassword.passwordIssuingTime.slice(0, 10); // "yyyy-MM-DD"

        const formattedTime = previousPassword.passwordIssuingTime.slice(
          11,
          16
        ); // "HH:MM"

        const hourPart = parseInt(formattedTime.slice(0, 2)); // get hour part
        const minutePart = parseInt(formattedTime.slice(3, 5)); // get minute part

        const formattedForAMPM = `${hourPart % 12 || 12}:${minutePart} ${
          hourPart < 12 ? "AM" : "PM"
        }`; // get am or pm format

        message = `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${formattedDate} at ${formattedForAMPM}.)`;

        flagForTrack = true; // if password not valid to change
      }
    }
  }

  if (flagForTrack) {
    const result: any = {
      message: message,
    };
    return result;
  } else {
    //hash password that will be set as updated password
    const newHashedPassword = await bcrypt.hash(
      payload.newPassword,
      Number(config.bcrypt_salt_rounds)
    );
    //set new password into last element of passwordArray
    if (Array.isArray(userExists.passwordArray)) {
      passwordArrayTracker(userExists.passwordArray, newHashedPassword);
    }

    //finally update current password and passwordArray
    const result: any = await userModel.findOneAndUpdate(
      {
        _id: userData._id,
        role: userData.role,
      },
      {
        password: newHashedPassword,
        passwordArray: userExists?.passwordArray,
      },
      { new: true }
    );

    return result;
  }
};
export const authServices = {
  loginUser,
  changePassword,
};
