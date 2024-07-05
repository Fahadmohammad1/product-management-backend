import { Response } from "express";

export type IErrorMessage = {
  path: string | number;
  message: string;
};

type IApiResponse<T> = {
  success: boolean;
  message?: string | null;
  data?: T | null;
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
