/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from "./user.interface";
import { userModel } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const newUser: any = await userModel.create(payload);
  return newUser;
};

export const UserServices = {
  createUserIntoDB,
};
