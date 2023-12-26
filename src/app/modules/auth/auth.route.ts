import express from "express";
import { authControllers } from "./auth.controller";
import { authValidation } from "./auth.validation";
import validateRequest from "../../middlewares/ValidateRequest";
import { TRole } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router = express.Router();

//user login route
router.post(
  "/login",
  validateRequest(authValidation.loginValidationSchema),
  authControllers.loginUser
);


// user password change route
router.post(
  "/change-password",
  auth(TRole.admin, TRole.user),
  validateRequest(authValidation.changePasswordValidationSchema),
  authControllers.changePassword
);

export const authRoutes = router;
