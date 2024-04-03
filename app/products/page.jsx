"use client";

import { useState } from "react";
import ProductCard from "@/app/products/ProductsCard";

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "Description of Product 1",
    price: 20.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description of Product 2",
    price: 25.49,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description of Product 3",
    price: 15.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Product 4",
    description: "Description of Product 4",
    price: 30.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Product 5",
    description: "Description of Product 5",
    price: 18.49,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "Product 6",
    description: "Description of Product 6",
    price: 22.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    name: "Product 7",
    description: "Description of Product 7",
    price: 28.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    name: "Product 8",
    description: "Description of Product 8",
    price: 19.99,
    image: "https://via.placeholder.com/150",
  },
];

const ProductsPage = () => {
  const [sortCriteria, setSortCriteria] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedProducts, setSortedProducts] = useState(products);
  const [prevSortCriteria, setPrevSortCriteria] = useState();

  const handleSort = () => {
    if (prevSortCriteria === sortCriteria) {
      setSortCriteria("name");
      setSortedProducts(products);
    } else {
      const sorted = [...sortedProducts];
      if (sortCriteria === "name") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortCriteria === "name_desc") {
        sorted.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortCriteria === "price") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortCriteria === "price_desc") {
        sorted.sort((a, b) => b.price - a.price);
      }
      setSortedProducts(sorted);
      setPrevSortCriteria(sortCriteria);
    }
  };

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  const handleSortCriteriaChange = (event) => {
    setSortCriteria(event.target.value);
  };

  let filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="w-full">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Our Products</h1>
        <div className="w-4/5 m-auto flex flex-wrap justify-between">
          <div className="w-full lg:w-1/5 px-2 mb-4">
            <h2 className="text-xl font-bold mb-2">Filters</h2>
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
          </div>
          <div className="w-full lg:w-4/5 px-2">
            <div className="mb-4 flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-gray-500 mr-2"
                onChange={handleDebouncedSearch}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
