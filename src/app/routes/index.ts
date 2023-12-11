import { Router } from "express";
import { courseRoutes } from "../modules/course/course.route";
import { categoriesRoutes } from "../modules/category/category.route";
import { reviewRoutes } from "../modules/review/review.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/course",
    route: courseRoutes,
  },
  {
    path: "/categories",
    route: categoriesRoutes,
  },
  {
    path: "/reviews",
    route: reviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
