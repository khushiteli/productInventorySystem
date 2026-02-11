import { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import Modal from "../components/Modal";
import { fetchCategories } from "../api/category.api";
import { fetchProducts } from "../api/product.api";

export default function Inventory() {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  // To Fetch Products
  useEffect(() => {
    fetchProducts({
      page,
      limit: 5,
      search,
      categories: selectedCategories,
    }).then((res) => {
      setProducts(res.data.data);
      setPagination(res.data.pagination);
    });
  }, [page, search, selectedCategories, refresh]);

  // To Fetch Categories
  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, selectedCategories]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      <Filters
        search={search}
        setSearch={setSearch}
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      <ProductList products={products} onDelete={() => setRefresh((prev) => !prev)} />

      <Pagination
        pagination={pagination}
        onPageChange={setPage}
      />

      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Add Product"
        >
          <ProductForm
            categories={categories}
            onSuccess={() => {
              setOpen(false);
              setRefresh((prev) => !prev);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
