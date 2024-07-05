"use strict";
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const globalErrorHandler = (error, req, res, next) => {
    console.error("globalErrorHandler", error);
    let message = "Something went wrong";
    // handling validation error from mongoose
    if ((error === null || error === void 0 ? void 0 : error.name) === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        message = simplifiedError.message;
    }
    // handling zod error
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        message = simplifiedError.message;
    }
    // handling other errors
    else if (error instanceof ApiError_1.default) {
        message = error.message;
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
    }
    res.status(400).json({
        success: false,
        message,
    });
};
exports.default = globalErrorHandler;
