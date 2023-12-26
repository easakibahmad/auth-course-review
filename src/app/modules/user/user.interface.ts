/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { TRole } from "./user.constant";

//user type
export interface TUser {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

// this is static methods to check user and to check password
export interface UserModelStatic extends Model<TUser> {
  isUserExistsByUsername(username: string): Promise<TUser>;
  isPasswordMatched(
    inputPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

// user role type ('user' and 'admin')
export type TUserRole = keyof typeof TRole;
