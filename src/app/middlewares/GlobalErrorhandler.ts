import { ErrorRequestHandler } from "express";
import { TErrorDetails } from "../interface/ErrorInterface";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorDetails: TErrorDetails = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage: err.message,
    errorDetails,
    stack: err?.stack || null,
  });
};

export default globalErrorHandler;
