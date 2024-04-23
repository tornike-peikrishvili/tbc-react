"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/products/ProductsCard";
import ProductSort from "@/components/products/ProductSort";
import ProductSearch from "@/components/products/ProductSearch";

async function fetchProducts() {
  const response = await fetch("https://dummyjson.com/products", {
    cache: "force-cache",
  });
  const products = await response.json();

  return products;
}

function ProductsPage() {
  const [sortCriteria, setSortCriteria] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [prevSortCriteria, setPrevSortCriteria] = useState();
  const [originalProducts, setOriginalProducts] = useState([]);

  const fetchData = async () => {
    const products = await fetchProducts();
    setSortedProducts(products.products);
    setOriginalProducts(products.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let filteredProducts = sortedProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Our Products</h1>
        <div className="w-4/5 m-auto flex flex-wrap justify-between">
          <div className="w-full lg:w-1/5 px-2 mb-4">
            <h2 className="text-xl font-bold mb-2">Filters</h2>
            <ProductSort
              setSortCriteria={setSortCriteria}
              searchTerm={searchTerm}
              sortedProducts={sortedProducts}
              setSortedProducts={setSortedProducts}
              prevSortCriteria={prevSortCriteria}
              originalProducts={originalProducts}
              setPrevSortCriteria={setPrevSortCriteria}
              sortCriteria={sortCriteria}
            />
          </div>
          <div className="w-full lg:w-4/5 px-2">
            <ProductSearch setSearchTerm={setSearchTerm} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.title}
                  description={product.description}
                  price={product.price}
                  image={product.thumbnail}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
