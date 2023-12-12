import { ZodError, ZodIssue } from "zod";
import {
  TErrorDetails,
  TGenericErrorResponse,
} from "../interface/ErrorInterface";

const ZodErrorHandling = (err: ZodError): TGenericErrorResponse => {
  const errorDetails: TErrorDetails | any = { issues: err.issues };

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorDetails,
  };
};

export default ZodErrorHandling;
