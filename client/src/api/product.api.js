import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({ baseURL: "http://localhost:8080/api" });

export const fetchProducts = ({ page, limit, search, categories }) => {
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);
  if (search) params.append("search", search);
  if (categories?.length) {
    params.append("categories", categories.join(","));
  }

  return API.get(`/products?${params.toString()}`);
};

export const createProduct = async (data) => {
  try {
    const res = await API.post("/products", data);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        "Failed to add product"
    );
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await API.delete(`/products/${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        "Failed to delete product"
    );
    throw error;
  }
};
