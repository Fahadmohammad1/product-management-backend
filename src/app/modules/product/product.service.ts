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
const getSingleProduct = async (id: string) => {
  return await Product.findOne({ _id: id });
};

// update product
const updateProduct = async (productId: string, data: Partial<IProduct>) => {
  const { variants, inventory, ...productData } = data;

  const updatedProductData = { ...productData };

  if (variants?.length) {
    variants.map((variant) => {
      if (variant && Object.keys(variant).length > 0) {
        Object.keys(variant).forEach((key) => {
          const variantKey = `variant.${key}` as keyof Partial<IProduct>;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (updatedProductData as any)[variantKey] =
            variant[key as keyof typeof inventory];
        });
      }
    });
  }

  if (inventory && Object.keys(inventory).length > 0) {
    Object.keys(inventory).forEach((key) => {
      const inventoryKey = `inventory.${key}` as keyof Partial<IProduct>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedProductData as any)[inventoryKey] =
        inventory[key as keyof typeof inventory];
    });
  }
  const result = await Product.updateOne(
    { _id: productId },
    updatedProductData
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
