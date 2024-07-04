import { ErrorRequestHandler } from "express";
import config from "../config";
import { ZodError } from "zod";
import handleValidationError from "../../errors/handleValidationError";
import handleZodError from "../../errors/handleZodError";
import ApiError from "../../errors/ApiError";
import { IErrorMessage } from "../../interfaces/common";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error("globalErrorHandler", error);

  let statusCode = 500;
  let message = "Something went wrong";
  let errorMessages: IErrorMessage[] = [];

  // handling validation error from mongoose
  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // handling zod error
  else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  // handling other errors
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error.stack : undefined,
  });
};

export default globalErrorHandler;
