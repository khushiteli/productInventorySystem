import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: String,
    quantity: {
      type: Number,
      min: 0,
      required: true
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
      }
    ]
  },
  { timestamps: true }
);

productSchema.index({ name: 1 }); // for better search performance

export default mongoose.model("Product", productSchema);
