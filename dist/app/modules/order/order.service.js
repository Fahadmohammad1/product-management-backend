"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const order_model_1 = require("./order.model");
const createOrder = (orderInfo) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.create(orderInfo);
});
const getAllOrders = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (email) {
        query = { email: email };
    }
    const result = yield order_model_1.Order.find(query);
    if (result.length < 1) {
        throw new ApiError_1.default("Order not found");
    }
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
};
