import express from "express";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { createCategoryValidationSchema } from "./category.validation";
import { categoryControllers } from "./category.controller";

const router = express.Router();

router.post(
  "/",
  ValidateRequest(createCategoryValidationSchema),
  categoryControllers.createCategory
);

export const categoriesRoutes = router;
