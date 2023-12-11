import { Router } from 'express';
import { courseRoutes } from '../modules/course/course.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/course',
    route: courseRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
