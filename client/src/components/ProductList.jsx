import { useState } from "react";
import { deleteProduct } from "../api/product.api";
import Modal from "./Modal";
import ConfirmBox from "./ConfirmBox";

export default function ProductList({ products = [], onDelete }) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  if (!products.length) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No products found
      </p>
    );
  }

  const openConfirm = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    await deleteProduct(selectedId);
    setOpen(false);
    setSelectedId(null);
    onDelete();
  };

  return (
    <>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Product Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Categories
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Created At
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-2 font-medium">
                  {p.name}
                </td>

                <td className="px-4 py-2">
                  <div className="flex flex-wrap gap-1">
                    {p.categories.map((c) => (
                      <span
                        key={c._id}
                        className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="px-4 py-2 text-sm text-gray-500">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => openConfirm(p._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirm Delete Modal */}
      {open && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <ConfirmBox onCancel={() => setOpen(false)} onConfirm={handleDelete} />
        </Modal>
      )}
    </>
  );
}
