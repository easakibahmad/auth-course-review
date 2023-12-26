import express from "express";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { createReviewValidationSchema } from "./review.validation";
import { reviewControllers } from "./review.controller";
import auth from "../../middlewares/auth";
import { TRole } from "../user/user.constant";

const router = express.Router();

// route to create review
router.post(
  "/",
  auth(TRole.user),
  ValidateRequest(createReviewValidationSchema),
  reviewControllers.createReview
);

export const reviewRoutes = router;
