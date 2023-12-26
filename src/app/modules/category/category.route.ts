import express from "express";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { createCategoryValidationSchema } from "./category.validation";
import { categoryControllers } from "./category.controller";
import { TRole } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  auth(TRole.admin),
  ValidateRequest(createCategoryValidationSchema),
  categoryControllers.createCategory
);
router.get("/", categoryControllers.getAllCategories);

export const categoriesRoutes = router;
