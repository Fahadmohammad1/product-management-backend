"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
// common api response
const sendResponse = (res, data) => {
    const responseData = {
        success: data.success,
        message: data.message || null,
        data: data.data || null,
    };
    res.status(200).json(responseData);
};
exports.sendResponse = sendResponse;
