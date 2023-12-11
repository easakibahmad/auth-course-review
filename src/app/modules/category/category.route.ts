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
router.get("/", categoryControllers.getAllCategories);

export const categoriesRoutes = router;
