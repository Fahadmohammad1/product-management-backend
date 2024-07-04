import { IProduct } from "./product.interface";
import { Product } from "./product.model";

// adding product to db
const addProduct = async (productData: IProduct) => {
  return await Product.create(productData);
};

export const ProductService = {
  addProduct,
};
