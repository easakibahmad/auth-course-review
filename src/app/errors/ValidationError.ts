import mongoose from "mongoose";
import { TError, TErrorDetails } from "../interface/ErrorInterface";

const ValidationError = (err: mongoose.Error.ValidationError): TError => {
  const errorDetails: TErrorDetails | any = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
        name: mongoose.Error.ValidationError
          ? "Mongoose validation error"
          : "Mongoose cast error",
        detailedMessage: err?.message,
      };
    }
  );

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorDetails,
  };
};

export default ValidationError;
