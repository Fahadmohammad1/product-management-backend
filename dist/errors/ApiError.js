"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.default = ApiError;
