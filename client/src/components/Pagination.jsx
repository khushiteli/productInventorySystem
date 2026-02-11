export default function Pagination({ pagination, onPageChange }) {
  if (!pagination?.totalPages) return null;

  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: pagination.totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 border rounded ${
            pagination.page === i + 1
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
