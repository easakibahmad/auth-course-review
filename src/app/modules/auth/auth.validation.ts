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
  newPassword: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" })
    .refine((value) => /[a-zA-Z]/.test(value) && /\d/.test(value), {
      message: "New password must contain at least 1 character and 1 digit",
    }),
});
export const authValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
};
