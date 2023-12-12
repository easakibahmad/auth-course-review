import {
  TError,
  TErrorDetails,
} from "../interface/ErrorInterface";

const DuplicateError = (err: any): TError => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorDetails: TErrorDetails | any = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
      name: "DuplicateKeyError",
      detailedMessage: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Duplicate key",
    errorDetails,
  };
};

export default DuplicateError;
