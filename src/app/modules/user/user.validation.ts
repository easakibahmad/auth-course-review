import { z } from "zod";

export const createUserValidationSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" })
    .refine((value) => /[a-zA-Z]/.test(value) && /\d/.test(value), {
      message: "Password must contain at least 1 character and 1 digit",
    }),
  role: z.enum(["user", "admin"]).default("user"),
});
export const userValidationSchema = { createUserValidationSchema };
