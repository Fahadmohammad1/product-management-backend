/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleValidationError from "../../errors/handleValidationError";
import handleZodError from "../../errors/handleZodError";
import ApiError from "../../errors/ApiError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error("globalErrorHandler", error);

  let message = "Something went wrong";

  // handling validation error from mongoose
  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    message = simplifiedError.message;
  }
  // handling zod error
  else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    message = simplifiedError.message;
  }

  // handling other errors
  else if (error instanceof ApiError) {
    message = error.message;
  } else if (error instanceof Error) {
    message = error?.message;
  }

  res.status(400).json({
    success: false,
    message,
  });
};

export default globalErrorHandler;
