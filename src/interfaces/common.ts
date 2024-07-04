export type IErrorMessage = {
  path: string | number;
  message: string;
};

export type IErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IErrorMessage[];
};
