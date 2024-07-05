import { NextFunction, Request, Response } from "express";
import { OrderService } from "./order.service";
import { sendResponse } from "../../../interfaces/common";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderData = req.body;
    //   const zodParsedData = ProductValidation.addProductSchema.parse(productData);

    const result = await OrderService.createOrder(orderData);

    sendResponse(res, {
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get order
const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.query;

    const result = await OrderService.getAllOrders(email as string);

    sendResponse(res, {
      success: true,
      message: email
        ? "Orders fetched successfully for user email!"
        : "Orders fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
