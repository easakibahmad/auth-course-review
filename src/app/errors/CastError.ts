import mongoose from 'mongoose';
import { TErrorDetails, TGenericErrorResponse } from '../interface/ErrorInterface';

const CastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorDetails: TErrorDetails = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorDetails,
  };
};

export default CastError;
