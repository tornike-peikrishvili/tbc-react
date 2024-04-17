function ProductSort({
  setSortCriteria,
  sortCriteria,
  setSortedProducts,
  sortedProducts,
  prevSortCriteria,
  originalProducts,
  setPrevSortCriteria,
}) {
  const handleSort = () => {
    if (prevSortCriteria === sortCriteria) {
      setSortCriteria("name");
      setPrevSortCriteria();
      setSortedProducts(originalProducts);
    } else {
      const sorted = [...sortedProducts];
      if (sortCriteria === "name") {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortCriteria === "name_desc") {
        sorted.sort((a, b) => b.title.localeCompare(a.title));
      } else if (sortCriteria === "price") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortCriteria === "price_desc") {
        sorted.sort((a, b) => b.price - a.price);
      }
      setSortedProducts(sorted);
      setPrevSortCriteria(sortCriteria);
    }
  };

  const handleSortCriteriaChange = (event) => {
    setSortCriteria(event.target.value);
  };

  return (
    <div className="bg-white shadow p-4 mb-4 rounded">
      <h3 className="text-lg font-bold mb-2">Sort By</h3>
      <select
        className="w-full mb-2"
        onChange={handleSortCriteriaChange}
        value={sortCriteria}
      >
        <option value="name">Name: A to Z</option>
        <option value="name_desc">Name: Z to A</option>
        <option value="price">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
      <button
        className="btn w-full mt-2 border-black text-black hover:text-white hover:border-black hover:bg-black"
        onClick={handleSort}
      >
        Sort
      </button>
    </div>
  );
}

export default ProductSort;