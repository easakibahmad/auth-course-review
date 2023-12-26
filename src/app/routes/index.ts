import { Router } from "express";
import { categoriesRoutes } from "../modules/category/category.route";
import { reviewRoutes } from "../modules/review/review.route";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { courseRoutes } from "../modules/course/course.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/categories",
    route: categoriesRoutes,
  },
  {
    path: "/reviews",
    route: reviewRoutes,
  },
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/",
    route: courseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
