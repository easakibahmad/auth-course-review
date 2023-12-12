import { ZodError, ZodIssue } from "zod";
import { TError, TErrorDetails } from "../interface/ErrorInterface";

const ZodErrorHandling = (err: ZodError): TError => {
  const errorDetails: TErrorDetails | any = {
    issues: err.issues,
    name: "ZodError",
  };

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorDetails,
  };
};

export default ZodErrorHandling;
