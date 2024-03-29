/* eslint-disable @typescript-eslint/ban-types */

export type TObj = {
  stringValue?: string;
  valueType?: string;
  kind?: string;
  value?: string;
  path?: string | number;
  reason?: {};
  name: string;
  message: string;
}[];
export type TErrorDetails = TObj | null;

export type TError = {
  statusCode: number;
  message: string;
  errorDetails: TErrorDetails;
};
