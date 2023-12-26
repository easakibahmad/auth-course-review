import { Router } from "express";
import { categoriesRoutes } from "../modules/category/category.route";
import { reviewRoutes } from "../modules/review/review.route";
import { userRoutes } from "../modules/user/user.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
