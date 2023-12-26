/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { TErrorDetails } from "../interface/ErrorInterface";
import AppError from "../errors/AppError";
import CastError from "../errors/CastError";
import ZodErrorHandling from "../errors/ZodErrorHandling";
import { ZodError } from "zod";
import DuplicateError from "../errors/DuplicateError";
import ValidationError from "../errors/ValidationError";
import JWTError from "../errors/JWTError";
import { JsonWebTokenError } from "jsonwebtoken";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err instanceof JsonWebTokenError ? 401 : 500;
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

  // for cast error
  if (err?.name === "CastError") {
    const foundedCastError: any = CastError(err);

    const specificMessageForId =
      foundedCastError?.errorDetails[0]?.message.match(/"([^"]+)"/);

    const invalidId = specificMessageForId ? specificMessageForId[1] : "";

    errorMessageGlobal = `${invalidId} is not a valid ID!`;

    statusCode = foundedCastError?.statusCode;
    message = foundedCastError?.message;
    errorDetails = foundedCastError?.errorDetails;
    if (errorDetails !== null) {
      errorDetails[0].value = invalidId;
      errorDetails[0].stringValue = invalidId;
    }
  }

  // for zod error
  else if (err instanceof ZodError) {
    const foundedZodError = ZodErrorHandling(err);

    const errors = err.issues
      .map((issue) => `${issue.path.join(" ")} is required`)
      .join(" | ");

    errorMessageGlobal = errors;

    statusCode = foundedZodError?.statusCode;
    message = foundedZodError?.message;
    errorDetails = foundedZodError?.errorDetails;
  }

  // for 11000 error code
  else if (err?.code === 11000) {
    const foundedDuplicateError = DuplicateError(err);

    const match = err.message.match(/dup key: { (\w+): "([^"]+)" }/);

    if (match) {
      const field = match[1];
      const value = match[2];
      errorMessageGlobal = `${field} is not assignable with value '${value}'`;
    }

    statusCode = foundedDuplicateError?.statusCode;
    message = foundedDuplicateError?.message;
    errorDetails = foundedDuplicateError?.errorDetails;
  }

  // for validation error
  else if (err?.name === "ValidationError") {
    const foundedValidationError = ValidationError(err);
    statusCode = foundedValidationError?.statusCode;
    message = foundedValidationError?.message;
    errorDetails = foundedValidationError?.errorDetails;
  }

  // for App error
  else if (err instanceof AppError) {
    message = "App Error";
    statusCode = err?.statusCode;
    errorDetails = [
      {
        name: "AppError",
        message: err.message,
      },
    ];
  }

  // custom JWT error checking
  else if (err instanceof JWTError) {
    message = "Unauthorized Access";
    statusCode = err?.statusCode;

    errorMessageGlobal =
      "You do not have the necessary permissions to access this resource.";
    errorDetails = null;
  }

  // error from JsonWebToken
  else if (err instanceof JsonWebTokenError) {
    message = "Unauthorized Access";
    errorMessageGlobal =
      "You do not have the necessary permissions to access this resource.";
    errorDetails = null;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage: errorMessageGlobal ? errorMessageGlobal : err.message,
    errorDetails,
    stack:
      err instanceof JWTError || err instanceof JsonWebTokenError
        ? null
        : err?.stack || null,
  });
};

export default globalErrorHandler;
