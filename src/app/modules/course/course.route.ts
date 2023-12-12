import express from "express";
import {
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from "./course.validation";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { courseControllers } from "./course.controller";

const router = express.Router();

router.post(
  "/course",
  ValidateRequest(createCourseValidationSchema),
  courseControllers.createCourse
);
router.put(
  "/courses/:courseId",
  ValidateRequest(updateCourseValidationSchema),
  courseControllers.updateCourse
);

router.get(
  "/courses/:courseId/reviews",
  courseControllers.getSingleCourseWithReview
);
router.get("/course/best", courseControllers.getBestCourse);
router.get("/courses", courseControllers.getAllCourses);

export const courseRoutes = router;
