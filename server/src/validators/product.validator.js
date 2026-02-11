import { body } from "express-validator";

export const createProductValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("quantity").isInt({ min: 0 }).withMessage("Quantity must be >= 0"),
  body("categories").isArray().withMessage("Categories must be array")
];
