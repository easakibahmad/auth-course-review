/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import {
  TPasswordArrayElement,
  TUser,
  UserModelStatic,
} from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

// password array element schema
const passwordArrayElementSchema = new Schema<TPasswordArrayElement>({
  password: {
    type: String,
    required: true,
  },
  passwordIssuingTime: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema<TUser, UserModelStatic>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    passwordArray: {
      //password array to track the passwords
      type: [passwordArrayElementSchema],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// hashing password field with bcrypt
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  // set the password as password array element
  const passwordArrayElementObject: TPasswordArrayElement = {
    password: user.password,
    passwordIssuingTime: new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " "), //format "YYYY-MM-DD HH:mm:ss"
  };

  user.passwordArray?.push(passwordArrayElementObject); //push into passwordArray

  next();
});

// check user exists in collection by username
userSchema.statics.isUserExistsByUsername = async function (username: string) {
  return await userModel.findOne({ username }).select("+password");
};

// check user exists in collection by _id
userSchema.statics.isUserExistsById = async function (_id: string) {
  return await userModel.findOne({ _id }).select("+password");
};

// check password match or not
userSchema.statics.isPasswordMatched = async function (
  inputPassword,
  hashedPassword
) {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

export const userModel = model<TUser, UserModelStatic>("User", userSchema);
