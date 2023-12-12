import mongoose from "mongoose";
import {
  TErrorDetails,
  TGenericErrorResponse,
} from "../interface/ErrorInterface";

const CastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
  const errorDetails: TErrorDetails = [
    {
      stringValue: "",
      valueType: "string",
      kind: "ObjectId",
      value: "",
      path: err.path,
      reason: {},
      name: "CastError",
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid ID",
    errorDetails,
  };
};

export default CastError;
