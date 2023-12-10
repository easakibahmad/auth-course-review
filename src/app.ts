import cors from "cors";
import express, { Application, Request, Response } from "express";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

const test = async (req: Request, res: Response) => {
  res.send("Welcome to the review courses api with EA Sakib!!");
};

app.get("/", test);

export default app;
