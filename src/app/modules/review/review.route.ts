import express from "express";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { createReviewValidationSchema } from "./review.validation";
import { reviewControllers } from "./review.controller";

const router = express.Router();

router.post(
  "/",
  ValidateRequest(createReviewValidationSchema),
  reviewControllers.createReview
);

export const reviewRoutes = router;
