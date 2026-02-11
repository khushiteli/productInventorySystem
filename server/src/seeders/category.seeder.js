import mongoose from "mongoose";
import Category from "../models/Category.js";
import dotenv from "dotenv";

dotenv.config();

const categories = [
  { name: "Electronics" },
  { name: "Clothing" },
  { name: "Books" },
  { name: "Furniture" },
  { name: "Grocery" },
  { name: "Home Appliances" }
];

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Category.insertMany(categories);
  console.log("Categories seeded");
  process.exit();
})();
