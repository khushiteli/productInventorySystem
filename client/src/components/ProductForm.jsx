import { useState } from "react";
import Select from "react-select";
import { createProduct } from "../api/product.api";

export default function ProductForm({ categories = [], onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    quantity: "",
    categories: [], // will store category IDs
  });

  const submit = async (e) => {
    e.preventDefault();

    await createProduct({
      ...form,
      categories: form.categories, // already array of IDs
    });

    onSuccess();
  };

  // 🔁 Convert DB categories → react-select options
  const categoryOptions = categories.map((c) => ({
    value: c._id,
    label: c.name,
  }));

  return (
    <form onSubmit={submit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Add Product
      </h3>

      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Product Name
        </label>
        <input
          required
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Quantity
        </label>
        <input
          type="number"
          min="0"
          required
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({
              ...form,
              quantity: Number(e.target.value),
            })
          }
        />
      </div>

      {/* Categories (react-select) */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Categories
        </label>

        <Select
          isMulti
          required
          options={categoryOptions}
          placeholder="Select categories..."
          className="react-select-container"
          classNamePrefix="react-select"
          onChange={(selected) =>
            setForm({
              ...form,
              categories: selected
                ? selected.map((s) => s.value)
                : [],
            })
          }
        />

        <p className="text-xs text-gray-500 mt-1">
          You can select multiple categories
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Save Product
      </button>
    </form>
  );
}
