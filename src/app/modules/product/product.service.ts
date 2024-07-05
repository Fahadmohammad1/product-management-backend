import ApiError from "../../../errors/ApiError";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

// adding product to db
const addProduct = async (productData: IProduct) => {
  const result = await Product.create(productData);

  if (!result) {
    throw new ApiError("Failed to add product");
  }

  return result;
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

  if (!result) {
    throw new ApiError("Failed to fetch products");
  }

  return result;
};

// get single product
const getSingleProduct = async (id: string) => {
  const result = await Product.findOne({ _id: id });

  if (!result) {
    throw new ApiError("Failed to fetch product");
  }

  return result;
};

// update product
const updateProduct = async (productId: string, data: Partial<IProduct>) => {
  const { variants, inventory, ...productData } = data;

  const updatedProductData: Partial<IProduct> = { ...productData };

  if (inventory && Object.keys(inventory).length > 0) {
    Object.keys(inventory).forEach((key) => {
      const inventoryKey = `inventory.${key}` as keyof Partial<IProduct>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedProductData as any)[inventoryKey] =
        inventory[key as keyof typeof inventory];
    });
  }

  if (variants && variants.length > 0) {
    const findProduct = await Product.findById(productId).lean();
    if (findProduct && findProduct.variants) {
      updatedProductData["variants"] = [...findProduct.variants, ...variants];
    }
  }

  const result = await Product.findByIdAndUpdate(
    productId,
    { $set: updatedProductData },
    { new: true }
  );

  return result;
};

// delete product
const deleteProduct = async (productId: string) => {
  return await Product.deleteOne({ _id: productId });
};

export const ProductService = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
