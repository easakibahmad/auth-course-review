import { ErrorRequestHandler } from "express";
import { TErrorDetails } from "../interface/ErrorInterface";
import AppError from "../errors/AppError";
import CastError from "../errors/CastError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorDetails: TErrorDetails = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof AppError) {
    message = err.message;
    statusCode = err?.statusCode;
    errorDetails = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err?.name === "CastError") {
    const foundedCastError = CastError(err);
    statusCode = foundedCastError?.statusCode;
    message = foundedCastError?.message;
    errorDetails = foundedCastError?.errorDetails;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage: err.message,
    errorDetails,
    stack: err?.stack || null,
  });
};

export default globalErrorHandler;
