import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/GlobalErrorhandler";
import notFound from "./app/middlewares/NotFoundRoute";
import { courseRoutes } from "./app/modules/course/course.route";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use( "/api", router );
app.use("/api", courseRoutes);


const test = async (req: Request, res: Response) => {
  res.send("Welcome to the review courses api with EA Sakib!!");
};

app.get("/", test);

//Global Error Handler
app.use(globalErrorHandler);

//Not Found Route
app.use(notFound);
export default app;
