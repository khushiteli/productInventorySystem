import Select from "react-select";

export default function Filters({
  search,
  setSearch,
  categories,
  selectedCategories,
  setSelectedCategories
}) {
  const hasFilters = search || selectedCategories.length > 0;

  const clearFilters = () => {
    setSearch("");
    setSelectedCategories([]);
  };

  const categoryOptions = categories.map((c) => ({
    value: c._id,
    label: c.name,
  }));

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4 items-end">
      {/* Search */}
      <div className="w-full md:w-1/2">
        Product Name:
        <input
          className="border rounded p-2 w-full"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category */}
       <div className="w-full md:w-1/2">
        <Select
          isMulti
          options={categoryOptions}
          value={categoryOptions.filter((o) =>
            selectedCategories.includes(o.value)
          )}
          onChange={(selected) =>
            setSelectedCategories(selected.map((o) => o.value))
          }
          placeholder="Filter by categories"
          className="text-sm"
        />
      </div>

      {/* Clear */}
      <button
        onClick={clearFilters}
        disabled={!hasFilters}
        className={`px-4 py-2 rounded border text-sm whitespace-nowrap
          ${hasFilters
            ? "border-red-500 text-red-600 hover:bg-red-50"
            : "border-gray-300 text-gray-400 cursor-not-allowed"
          }`}
      >
        Clear Filters
      </button>
    </div>
  );
}
