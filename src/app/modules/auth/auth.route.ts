import express from "express";
import { authControllers } from "./auth.controller";
import { authValidation } from "./auth.validation";
import validateRequest from "../../middlewares/ValidateRequest";

const router = express.Router();

//user login route
router.post(
  "/login",
  validateRequest(authValidation.loginValidationSchema),
  authControllers.loginUser
);

export const authRoutes = router;
