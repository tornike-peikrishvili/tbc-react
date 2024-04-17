import React from "react";

function ProductSearch({ setSearchTerm }) {
  // Debounce
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
  }, 400);

  const handleDebouncedSearch = (event) => {
    const value = event.target.value;
    debouncedSearch(value);
  };

  return (
    <div className="mb-4 flex items-center">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-gray-500 mr-2"
        onChange={handleDebouncedSearch}
      />
    </div>
  );
}

export default ProductSearch;
