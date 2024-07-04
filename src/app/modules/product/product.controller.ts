import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { errorResponse, sendResponse } from "../../../interfaces/common";
import { ProductValidation } from "./product.validation";

// adding product to db
const addProduct = async (req: Request, res: Response) => {
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
    errorResponse(res, {
      success: false,
      message: "Failed to add product !",
    });
  }
};

export const ProductController = {
  addProduct,
};
