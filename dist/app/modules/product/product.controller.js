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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const common_1 = require("../../../interfaces/common");
const product_validation_1 = require("./product.validation");
// adding product to db
const addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const zodParsedData = product_validation_1.ProductValidation.addProductSchema.parse(productData);
        const result = yield product_service_1.ProductService.addProduct(zodParsedData);
        (0, common_1.sendResponse)(res, {
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// get all products
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const result = yield product_service_1.ProductService.getAllProducts(searchTerm);
        (0, common_1.sendResponse)(res, {
            success: true,
            message: searchTerm
                ? `Products matching search term '${searchTerm}' fetched successfully!`
                : "Product fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// get single product
const getSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.getSingleProduct(productId);
        (0, common_1.sendResponse)(res, {
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const productData = req.body;
        const result = yield product_service_1.ProductService.updateProduct(productId, productData);
        (0, common_1.sendResponse)(res, {
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.deleteProduct(productId);
        (0, common_1.sendResponse)(res, {
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.ProductController = {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
