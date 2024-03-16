import ProductCard from "./ProductCard";

const ProductsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="flex flex-wrap -mx-2">
        {/* Filter Section */}
        <div className="w-full lg:w-1/4 px-2 mb-4">
          <h2 className="text-xl font-bold mb-2">Filters</h2>
          {/* Category filter */}
          <div className="bg-white shadow p-4 mb-4 rounded">
            <h3 className="text-lg font-bold mb-2">Category</h3>
            <ul>
              <li className="mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <span className="ml-2">Electronics</span>
                </label>
              </li>
              <li className="mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <span className="ml-2">Clothing</span>
                </label>
              </li>
              {/* Add more category options */}
            </ul>
          </div>
          {/* Price range filter */}
          <div className="bg-white shadow p-4 mb-4 rounded">
            <h3 className="text-lg font-bold mb-2">Price Range</h3>
            <input type="range" className="w-full mb-2" />
            <div className="flex justify-between text-sm">
              <span>$0</span>
              <span>$1000+</span>
            </div>
          </div>
          {/* Sorting options */}
          <div className="bg-white shadow p-4 mb-4 rounded">
            <h3 className="text-lg font-bold mb-2">Sort By</h3>
            <select className="w-full mb-2">
              <option value="price">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
            </select>
          </div>
        </div>
        {/* Product Cards Section */}
        <div className="w-full lg:w-3/4 px-2">
          {/* Search bar */}
          <div className="mb-4 flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mr-2"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
              Search
            </button>
          </div>
          {/* Product Cards */}
          <div className="overflow-auto max-h-96 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
