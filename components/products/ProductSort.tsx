import React from "react";
import { Product } from "@/app/[locale]/(dashboard)/page";
import { Dispatch } from "react";
import { useScopedI18n } from "@/locales/client";

interface SortProps {
  setSortCriteria: Dispatch<string>;
  sortCriteria: string;
  setSortedProducts: Dispatch<Product[]>;
  searchTerm: string;
  sortedProducts: Product[];
  prevSortCriteria: string;
  originalProducts: Product[];
  setPrevSortCriteria: Dispatch<string | undefined>;
}

async function ProductSort({
  setSortCriteria,
  sortCriteria,
  setSortedProducts,
  sortedProducts,
  prevSortCriteria,
  originalProducts,
  setPrevSortCriteria,
}: SortProps) {
  const handleSort = () => {
    if (prevSortCriteria === sortCriteria) {
      setSortCriteria("name");
      setPrevSortCriteria("");
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

  const handleSortCriteriaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortCriteria(event.target.value);
  };
  const scopedT = await useScopedI18n("sorts");

  return (
    <div className="bg-white shadow p-4 mb-4 rounded dark:bg-[#232B36] dark:text-white dark:shadow-drk-shdw">
      <h3 className="text-lg font-bold mb-2 dark:text-white ">Sort By</h3>
      <select
        className="w-full mb-2 dark:border-white dark:bg-transparent"
        onChange={handleSortCriteriaChange}
        value={sortCriteria}
      >
        <option className="dark:text-black" value="name">
          {scopedT("sortName")}
        </option>
        <option className="dark:text-black" value="name_desc">
          {scopedT("sortName2")}
        </option>
        <option className="dark:text-black" value="price">
          {scopedT("sortByPrice1")}
        </option>
        <option className="dark:text-black" value="price_desc">
          {scopedT("sortByPrice2")}
        </option>
      </select>
      <button
        className="btn w-full mt-2 border-black text-black hover:text-white hover:border-black hover:bg-black dark:text-white dark:border-white hover:dark:bg-[#fafafa] hover:dark:text-black"
        onClick={handleSort}
      >
        {scopedT("sortBtn")}
      </button>
    </div>
  );
}

export default ProductSort;
