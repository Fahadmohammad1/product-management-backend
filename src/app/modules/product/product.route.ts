import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

router.get("/:productId", ProductController.getSingleProduct);

router.post("/", ProductController.addProduct);

router.get("/", ProductController.getAllProducts);

export const ProductRoutes = router;
