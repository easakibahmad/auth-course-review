/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { TUser, UserModelStatic } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

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

  next();
});

// check user exists in collection
userSchema.statics.isUserExistsByUsername = async function (username: string) {
  return await userModel.findOne({ username }).select("+password");
};

// check password match or not
userSchema.statics.isPasswordMatched = async function (
  inputPassword,
  hashedPassword
) {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

export const userModel = model<TUser, UserModelStatic>("User", userSchema);
