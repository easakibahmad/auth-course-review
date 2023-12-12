import mongoose from "mongoose";
import {
  TError,
  TErrorDetails,
} from "../interface/ErrorInterface";

const CastError = (err: mongoose.Error.CastError): TError => {
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
