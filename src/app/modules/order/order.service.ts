import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (orderInfo: IOrder) => {
  return await Order.create(orderInfo);
};

export const OrderService = {
  createOrder,
};
