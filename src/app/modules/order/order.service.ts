import { Product } from "../product/product.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (orderInfo: IOrder) => {
  const result = await Order.create(orderInfo);

  const findProduct = await Product.findOne({ _id: orderInfo.productId });

  if (result && findProduct) {
    await Product.updateOne(
      { _id: orderInfo.productId },
      { $inc: { "inventory.quantity": -orderInfo.quantity } }
    );
  }

  return result;
};

const getAllOrders = async (email: string) => {
  let query = {};

  if (email) {
    query = { email: email };
  }

  const result = await Order.find(query);

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
