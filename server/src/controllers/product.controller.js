import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  const exists = await Product.findOne({ name: req.body.name });
  if (exists) {
    return res.status(400).json({ message: "Product name already exists" });
  }

  const product = await Product.create(req.body);
  res.status(201).json({data: product, message: "Product added successfully."});
};

export const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, categories } = req.query;

    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (categories) {
      filter.categories = {
        $in: categories.split(","),
      };
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("categories", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter),
    ]);

    res.status(200).json({
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
