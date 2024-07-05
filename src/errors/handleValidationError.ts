import mongoose from "mongoose";

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  const errors = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );

  return {
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleValidationError;
