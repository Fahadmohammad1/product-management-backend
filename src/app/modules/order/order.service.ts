import ApiError from "../../../errors/ApiError";
import { Product } from "../product/product.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (orderInfo: IOrder) => {
  const findProduct = await Product.findOne({ _id: orderInfo.productId });

  if (findProduct && orderInfo.quantity > findProduct?.inventory?.quantity) {
    throw new ApiError("Insufficient quantity available in inventory");
  }

  const result = await Order.create(orderInfo);

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

  if (result.length < 1) {
    throw new ApiError("Order not found");
  }

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
