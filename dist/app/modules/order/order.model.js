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
exports.Order = exports.OrderSchema = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("../product/product.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
exports.OrderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
// pre save middleware
exports.OrderSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const findProduct = yield product_model_1.Product.findOne({ _id: this.productId });
        if (findProduct && this.quantity > ((_a = findProduct === null || findProduct === void 0 ? void 0 : findProduct.inventory) === null || _a === void 0 ? void 0 : _a.quantity)) {
            throw new ApiError_1.default("Insufficient quantity available in inventory");
        }
        next();
    });
});
// post save middleware
exports.OrderSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (doc._id) {
            const result = yield product_model_1.Product.updateOne({ _id: doc.productId }, { $inc: { "inventory.quantity": -doc.quantity } });
            if (result.acknowledged) {
                const product = yield product_model_1.Product.findOne({ _id: doc.productId });
                if (((_a = product === null || product === void 0 ? void 0 : product.inventory) === null || _a === void 0 ? void 0 : _a.quantity) === 0) {
                    yield product_model_1.Product.updateOne({ _id: doc.productId }, { $set: { "inventory.inStock": false } });
                }
            }
        }
        next();
    });
});
exports.Order = (0, mongoose_1.model)("Order", exports.OrderSchema);
