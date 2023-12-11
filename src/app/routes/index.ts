import { Router } from "express";
import { courseRoutes } from "../modules/course/course.route";
import { categoriesRoutes } from "../modules/category/category.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
