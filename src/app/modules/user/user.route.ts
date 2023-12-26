import express from "express";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { createUserValidationSchema } from "./user.validation";
import { userControllers } from "./user.controller";

const router = express.Router();

// user registration route
router.post(
  "/register",
  ValidateRequest(createUserValidationSchema),
  userControllers.createUser
);

export const userRoutes = router;
