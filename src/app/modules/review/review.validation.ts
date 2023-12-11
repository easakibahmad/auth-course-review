import { z } from "zod";

export const createReviewValidationSchema = z.object({
  courseId: z.string({ required_error: "Course ID is required" }),
  rating: z
    .number()
    .int()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  review: z.string().refine((val) => val.trim().length > 0, {
    message: "Review text is required",
  }),
});

export const reviewValidationSchema = { createReviewValidationSchema };
