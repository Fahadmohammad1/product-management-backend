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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const product_model_1 = require("./product.model");
// adding product to db
const addProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(productData);
    if (!result) {
        throw new ApiError_1.default("Failed to add product");
    }
    return result;
});
// get all products
const getAllProducts = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const query = [];
    if (searchTerm) {
        query.push({
            $match: {
                $or: [
                    {
                        name: {
                            $regex: searchTerm,
                            $options: "i",
                        },
                    },
                    {
                        description: {
                            $regex: searchTerm,
                            $options: "i",
                        },
                    },
                ],
            },
        });
    }
    const result = yield product_model_1.Product.aggregate(query.length ? query : [{ $match: {} }]);
    if (!result) {
        throw new ApiError_1.default("Failed to fetch products");
    }
    return result;
});
// get single product
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOne({ _id: id });
    if (!result) {
        throw new ApiError_1.default("Failed to fetch product");
    }
    return result;
});
// update product
const updateProduct = (productId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { variants, inventory } = data, productData = __rest(data, ["variants", "inventory"]);
    const updatedProductData = Object.assign({}, productData);
    if (inventory && Object.keys(inventory).length > 0) {
        Object.keys(inventory).forEach((key) => {
            const inventoryKey = `inventory.${key}`;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            updatedProductData[inventoryKey] =
                inventory[key];
        });
    }
    if (variants && variants.length > 0) {
        const findProduct = yield product_model_1.Product.findById(productId).lean();
        if (findProduct && findProduct.variants) {
            updatedProductData["variants"] = [...findProduct.variants, ...variants];
        }
    }
    const result = yield product_model_1.Product.findByIdAndUpdate(productId, { $set: updatedProductData }, { new: true });
    return result;
});
// delete product
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.deleteOne({ _id: productId });
});
exports.ProductService = {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
