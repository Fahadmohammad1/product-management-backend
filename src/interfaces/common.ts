import { Response } from "express";

export type IErrorMessage = {
  path: string | number;
  message: string;
};

export type IErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IErrorMessage[];
};

type IApiResponse<T> = {
  success: boolean;
  message?: string | null;
  data?: T | null;
};

type IApiError = {
  success: boolean;
  message?: string | null;
};

// common api response
export const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  };
  res.status(200).json(responseData);
};

// common error response
export const errorResponse = (res: Response, error: IApiError): void => {
  const responseData: IApiError = {
    success: error.success,
    message: error.message || null,
  };
  res.status(500).json(responseData);
};
