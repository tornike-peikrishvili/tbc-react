import { ChangeEvent, Dispatch } from "react";
import { useScopedI18n } from "@/locales/client";

interface ProductSearchProps {
  setSearchTerm: Dispatch<string>;
}

function ProductSearch({ setSearchTerm }: ProductSearchProps) {
  // Debounce
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;

    return (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, 400);

  const handleDebouncedSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    debouncedSearch(value);
  };

  const scopedT = useScopedI18n("products");

  return (
    <div className="mb-4 flex items-center">
      <input
        type="text"
        placeholder={scopedT("search")}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-gray-500 mr-2 dark:border-white dark:bg-transparent dark:text-white"
        onChange={handleDebouncedSearch}
      />
    </div>
  );
}

export default ProductSearch;
