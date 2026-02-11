import express from "express";
import {
  createProduct,
  getProducts,
  deleteProduct
} from "../controllers/product.controller.js";
import { createProductValidator } from "../validators/product.validator.js";

const router = express.Router();

router.post("/", createProductValidator, createProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);

export default router;
