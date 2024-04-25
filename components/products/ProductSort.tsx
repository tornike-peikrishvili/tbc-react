import React from "react";
import { Product } from "@/app/(dashboard)/page";
import { Dispatch } from "react";
import { useTranslation } from "react-i18next";

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

function ProductSort({
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

  const { t } = useTranslation();

  return (
    <div className="bg-white shadow p-4 mb-4 rounded dark:bg-[#232B36] dark:text-white dark:shadow-drk-shdw">
      <h3 className="text-lg font-bold mb-2 dark:text-white ">Sort By</h3>
      <select
        className="w-full mb-2 dark:border-white dark:bg-transparent"
        onChange={handleSortCriteriaChange}
        value={sortCriteria}
      >
        <option className="dark:text-black" value="name">
          {t("sortName")}
        </option>
        <option className="dark:text-black" value="name_desc">
          {t("sortName2")}
        </option>
        <option className="dark:text-black" value="price">
          {t("sortByPrice1")}
        </option>
        <option className="dark:text-black" value="price_desc">
          {t("sortByPrice2")}
        </option>
      </select>
      <button
        className="btn w-full mt-2 border-black text-black hover:text-white hover:border-black hover:bg-black dark:text-white dark:border-white hover:dark:bg-[#fafafa] hover:dark:text-black"
        onClick={handleSort}
      >
        {t("sortBtn")}
      </button>
    </div>
  );
}

export default ProductSort;
