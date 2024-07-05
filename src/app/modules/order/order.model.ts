import { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";
import { Product } from "../product/product.model";
import ApiError from "../../../errors/ApiError";

export const OrderSchema = new Schema<IOrder>(
  {
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
  },
  {
    timestamps: true,
  }
);

// pre save middleware
OrderSchema.pre("save", async function (next) {
  const findProduct = await Product.findOne({ _id: this.productId });

  if (findProduct && this.quantity > findProduct?.inventory?.quantity) {
    throw new ApiError("Insufficient quantity available in inventory");
  }

  next();
});

// post save middleware
OrderSchema.post("save", async function (doc, next) {
  if (doc._id) {
    const result = await Product.updateOne(
      { _id: doc.productId },
      { $inc: { "inventory.quantity": -doc.quantity } }
    );

    if (result.acknowledged) {
      const product = await Product.findOne({ _id: doc.productId });

      if (product?.inventory?.quantity === 0) {
        await Product.updateOne(
          { _id: doc.productId },
          { $set: { "inventory.inStock": false } }
        );
      }
    }
  }

  next();
});

export const Order = model<IOrder>("Order", OrderSchema);
