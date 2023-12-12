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

export type TError = {
  statusCode: number;
  message: string;
  errorDetails: TErrorDetails ;
};

