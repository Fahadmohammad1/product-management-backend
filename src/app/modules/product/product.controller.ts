/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ProductService } from "./product.service";
import { sendResponse } from "../../../interfaces/common";
import { ProductValidation } from "./product.validation";

// adding product to db
const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productData = req.body;
    const zodParsedData = ProductValidation.addProductSchema.parse(productData);

    const result = await ProductService.addProduct(zodParsedData);

    sendResponse(res, {
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get all products
const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { searchTerm } = req.query;

    const result = await ProductService.getAllProducts(searchTerm as string);

    sendResponse(res, {
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get single product
const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;

    const result = await ProductService.getSingleProduct(productId);

    sendResponse(res, {
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    const zodParsedData =
      ProductValidation.updateProductSchema.parse(productData);

    const result = await ProductService.updateProduct(productId, productData);

    sendResponse(res, {
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;

    const result = await ProductService.deleteProduct(productId);

    sendResponse(res, {
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const ProductController = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
