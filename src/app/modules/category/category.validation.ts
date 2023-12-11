import { z } from "zod";

export const createCategoryValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
});

export const categoryValidationSchema = { createCategoryValidationSchema };
