import { z } from "zod";

// login validation with username and password
export const loginValidationSchema = z.object({
  username: z.string({ required_error: "Username is required." }),
  password: z.string({ required_error: "Password is required" }),
});

// change password validation
const changePasswordValidationSchema = z.object({
  oldPassword: z.string({
    required_error: "Old password is required",
  }),
  newPassword: z.string({ required_error: "New password is required" }),
});
export const authValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
};
