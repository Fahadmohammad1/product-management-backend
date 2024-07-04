import { z } from "zod";

const variantSchema = z.object({
  type: z.string(),
  value: z.string(),
});

const inventorySchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

const addProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantSchema),
  inventory: inventorySchema,
});

// update zod schema
const variantUpdateSchema = z.object({
  type: z.string().optional(),
  value: z.string().optional(),
});

const inventoryUpdateSchema = z.object({
  quantity: z.number().optional(),
  inStock: z.boolean().optional(),
});

const updateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  variants: z.array(variantUpdateSchema).optional(),
  inventory: inventoryUpdateSchema.optional(),
});

export const ProductValidation = {
  addProductSchema,
  updateProductSchema,
};
