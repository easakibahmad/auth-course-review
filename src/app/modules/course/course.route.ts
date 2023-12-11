import express from "express";
import { createCourseValidationSchema, updateCourseValidationSchema } from "./course.validation";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { courseControllers } from "./course.controller";

const router = express.Router();

router.post(
  "/",
  ValidateRequest(createCourseValidationSchema),
  courseControllers.createCourse
);
router.put(
  "/:courseId",
  ValidateRequest(updateCourseValidationSchema),
  courseControllers.updateCourse
);

export const courseRoutes = router;
