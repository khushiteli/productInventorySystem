export default function ConfirmBox({ onCancel, onConfirm }) {
  return (
    <div className="text-center space-y-4">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <span className="text-red-600 text-xl">⚠️</span>
      </div>

      <h3 className="text-lg font-semibold text-gray-800">
        Delete Product
      </h3>

      <p className="text-sm text-gray-600">
        Are you sure you want to delete this product?
        <br />
        This action cannot be undone.
      </p>

      <div className="flex justify-center gap-3 pt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
