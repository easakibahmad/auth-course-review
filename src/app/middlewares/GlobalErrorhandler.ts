import { ErrorRequestHandler } from "express";
import { TErrorDetails } from "../interface/ErrorInterface";
import AppError from "../errors/AppError";
import CastError from "../errors/CastError";
import ZodErrorHandling from "../errors/ZodErrorHandling";
import { ZodError } from "zod";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessageGlobal = err.message;
  let errorDetails: TErrorDetails = [
    {
      stringValue: "",
      valueType: "",
      kind: "",
      value: "",
      path: "",
      reason: "{}",
      name: "",
      message: err.message,
    },
  ];

  if (err?.name === "CastError") {
    const foundedCastError = CastError(err);

    const specificMessageForId =
      foundedCastError?.errorDetails[0]?.message.match(/"([^"]+)"/);

    const invalidId = specificMessageForId ? specificMessageForId[1] : "";

    errorMessageGlobal = `${invalidId} is not a valid ID!`;

    statusCode = foundedCastError?.statusCode;
    message = foundedCastError?.message;
    errorDetails = foundedCastError?.errorDetails;
    errorDetails[0].value = invalidId;
    errorDetails[0].stringValue = invalidId;
  } else if (err instanceof ZodError) {
    const foundedZodError = ZodErrorHandling(err);

    const errors = err.issues
      .map((issue) => `${issue.path.join(" ")} is required`)
      .join(" | ");

    // console.log(err.message);
    errorMessageGlobal = errors;
    console.log();

    statusCode = foundedZodError?.statusCode;
    message = foundedZodError?.message;
    errorDetails = foundedZodError?.errorDetails;
  } else if (err instanceof AppError) {
    message = err.message;
    statusCode = err?.statusCode;
    errorDetails = [
      {
        stringValue: "",
        valueType: "",
        kind: "",
        value: "",
        path: "",
        reason: "",
        name: "AppError",
        message: err.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage: errorMessageGlobal ? errorMessageGlobal : err.message,
    errorDetails,
    stack: err?.stack || null,
  });
};

export default globalErrorHandler;
