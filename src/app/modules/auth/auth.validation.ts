import { z } from "zod";

// login validation with username and password
export const loginValidationSchema = z.object({
  username: z.string({ required_error: "Username is required." }),
  password: z.string({ required_error: "Password is required" }),
});

export const authValidation = {
  loginValidationSchema,
};
