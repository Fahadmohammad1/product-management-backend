import ApiError from "../../../errors/ApiError";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (orderInfo: IOrder) => {
  return await Order.create(orderInfo);
};

const getAllOrders = async (email: string) => {
  let query = {};

  if (email) {
    query = { email: email };
  }

  const result = await Order.find(query);

  if (result.length < 1) {
    throw new ApiError("Order not found");
  }

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
