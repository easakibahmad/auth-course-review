/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { TRole } from "./user.constant";

// type for user password and password creating time 
export type TPasswordArrayElement = {
  password: string;
  passwordIssuingTime: string;
};

//user type
export interface TUser {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  passwordArray?: TPasswordArrayElement[]; // to track previous passwords for the purpose of reset password
}

// this is static methods to check user and to check password
export interface UserModelStatic extends Model<TUser> {
  // find user by username
  isUserExistsByUsername(username: string): Promise<TUser>;

  // find user by _id
  isUserExistsById(_id: string): Promise<TUser>;

  // check password matched or not
  isPasswordMatched(
    inputPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

// user role type ('user' and 'admin')
export type TUserRole = keyof typeof TRole;
