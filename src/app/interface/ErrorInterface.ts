export type TErrorDetails = {
  stringValue: string;
  valueType: string;
  kind: string;
  value: string;
  path: string | number;
  reason: {};
  name: string;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorDetails: TErrorDetails;
};
