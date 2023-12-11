import { z } from "zod";

export const createTagValidationSchema = z.object({
  name: z.string({ required_error: "Tag name is required" }),
});

export const createDetailsValidationSchema = z.object({
  level: z
    .string()
    .refine(
      (value) => ["Beginner", "Intermediate", "Advanced"].includes(value),
      {
        message:
          "Invalid course level. Must be one of: Beginner, Intermediate, Advanced",
      }
    ),
  description: z.string({ required_error: "Course description is required" }),
});

export const createCourseValidationSchema = z.object({
  title: z.string({ required_error: "Course title is required" }),
  instructor: z.string({ required_error: "Instructor name is required" }),
  categoryId: z.string({ required_error: "Category ID is required" }),
  price: z.number({ required_error: "Course price is required" }),
  tags: z.array(createTagValidationSchema),
  startDate: z.string({ required_error: "Start date is required" }),
  endDate: z.string({ required_error: "End date is required" }),
  language: z.string({ required_error: "Course language is required" }),
  provider: z.string({ required_error: "Provider name is required" }),
  details: createDetailsValidationSchema,
});

export const courseValidationSchema = { createCourseValidationSchema };
