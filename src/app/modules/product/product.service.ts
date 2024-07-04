import { IProduct } from "./product.interface";
import { Product } from "./product.model";

// adding product to db
const addProduct = async (productData: IProduct) => {
  return await Product.create(productData);
};

// get all products
const getAllProducts = async (searchTerm: string) => {
  const query = [];

  if (searchTerm) {
    query.push({
      $match: {
        $or: [
          {
            name: {
              $regex: searchTerm,
              $options: "i",
            },
          },
          {
            description: {
              $regex: searchTerm,
              $options: "i",
            },
          },
        ],
      },
    });
  }

  const result = await Product.aggregate(
    query.length ? query : [{ $match: {} }]
  );
  return result;
};

// get single product
const getSingleProduct = async (productData: IProduct) => {
  return await Product.create(productData);
};
const updateProduct = async (productData: IProduct) => {
  return await Product.create(productData);
};
const deleteProduct = async (productData: IProduct) => {
  return await Product.create(productData);
};

export const ProductService = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
