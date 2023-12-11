import express from "express";
import { createCourseValidationSchema } from "./course.validation";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { courseControllers } from "./course.controller";

const router = express.Router();

router.post(
  "/",
  ValidateRequest(createCourseValidationSchema),
  courseControllers.createCourse
);

export const courseRoutes = router;
