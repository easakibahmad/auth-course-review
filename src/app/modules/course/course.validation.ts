import { z } from "zod";

// creating validation schema

const dateFormat = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);

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
  startDate: z
    .string({
      required_error: "Start date is required",
    })
    .refine((value) => dateFormat(value), {
      message: "Invalid date format. Please use 'YYYY-MM-DD'.",
    }),
  endDate: z
    .string({
      required_error: "End date is required",
    })
    .refine((value) => dateFormat(value), {
      message: "Invalid date format. Please use 'YYYY-MM-DD'.",
    }),
  language: z.string({ required_error: "Course language is required" }),
  provider: z.string({ required_error: "Provider name is required" }),
  details: createDetailsValidationSchema,
});

// updating validation schema
export const updateTagValidationSchema = z.object({
  name: z.string({ required_error: "Tag name is required" }).optional(),
});

export const updateDetailsValidationSchema = z.object({
  level: z
    .string()
    .refine(
      (value) => ["Beginner", "Intermediate", "Advanced"].includes(value),
      {
        message:
          "Invalid course level. Must be one of: Beginner, Intermediate, Advanced",
      }
    )
    .optional(),
  description: z
    .string({ required_error: "Course description is required" })
    .optional(),
});

export const updateCourseValidationSchema = z.object({
  title: z.string({ required_error: "Course title is required" }).optional(),
  instructor: z
    .string({ required_error: "Instructor name is required" })
    .optional(),
  categoryId: z
    .string({ required_error: "Category ID is required" })
    .optional(),
  price: z.number({ required_error: "Course price is required" }).optional(),
  tags: z.array(updateTagValidationSchema).optional(),
  startDate: z
    .string({ required_error: "Start date is required" })
    .refine((value) => dateFormat(value), {
      message: "Invalid date format. Please use 'YYYY-MM-DD'.",
    })
    .optional(),
  endDate: z
    .string({ required_error: "End date is required" })
    .refine((value) => dateFormat(value), {
      message: "Invalid date format. Please use 'YYYY-MM-DD'.",
    })
    .optional(),
  language: z
    .string({ required_error: "Course language is required" })
    .optional(),
  provider: z
    .string({ required_error: "Provider name is required" })
    .optional(),
  details: updateDetailsValidationSchema.optional(),
});

export const courseValidationSchema = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
