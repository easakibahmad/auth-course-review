import express from "express";
import {
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from "./course.validation";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { courseControllers } from "./course.controller";
import auth from "../../middlewares/auth";
import { TRole } from "../user/user.constant";

const router = express.Router();

// route to create new course
router.post(
  "/courses",
  auth(TRole.admin),
  ValidateRequest(createCourseValidationSchema),
  courseControllers.createCourse
);

// route to update course data
router.put(
  "/courses/:courseId",
  auth(TRole.admin),
  ValidateRequest(updateCourseValidationSchema),
  courseControllers.updateCourse
);

// route to get single course with reviews
router.get(
  "/courses/:courseId/reviews",
  courseControllers.getSingleCourseWithReview
);

// route to get best course
router.get("/course/best", courseControllers.getBestCourse);

// route to get all courses
router.get("/courses", courseControllers.getAllCourses);

export const courseRoutes = router;
