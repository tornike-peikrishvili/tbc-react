"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "All Categories",
    sortBy: "Any Time",
    tag: "All Tags",
  });

  useEffect(() => {
    fetch("/api/blog/filter-categories")
      .then((response) => response.json())
      .then((data) => setCategories(["All Categories", ...data.categories]))
      .catch((error) => console.error("Error fetching categories:", error));

    fetch("/api/blog/filter-tags")
      .then((response) => response.json())
      .then((data) => setTags(["All Tags", ...data.tags]))
      .catch((error) => console.error("Error fetching tags:", error));

    setFilters({
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "All Categories",
      sortBy: searchParams.get("sortBy") || "Any Time",
      tag: searchParams.get("tag") || "All Tags",
    });
  }, [searchParams]);

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (
        value &&
        value !== "All Categories" &&
        value !== "Any Time" &&
        value !== "All Tags"
      ) {
        queryParams.append(key, value);
      }
    });
    router.push(`/blog?${queryParams.toString()}`);
    setIsLoading(false);
  };

  const handleReset = () => {
    setFilters({
      search: "",
      category: "All Categories",
      sortBy: "Any Time",
      tag: "All Tags",
    });
    router.push("/blog");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="dark:bg-secondary rounded-lg bg-white p-6 shadow-md "
    >
      <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
        Filters
      </h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="w-full pr-3">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search blogs..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-800 hover:duration-200"
          >
            {isLoading ? "..." : "Search"}
          </button>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">
            Sort By
          </h3>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Any Time">Any Time</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => setFilters((prev) => ({ ...prev, category }))}
                className={`cursor-pointer rounded-full px-2 py-1 text-center text-sm ${
                  filters.category === category
                    ? "bg-indigo-600 text-white hover:bg-indigo-800"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                onClick={() => setFilters((prev) => ({ ...prev, tag }))}
                className={`cursor-pointer rounded-full px-2 py-1 text-center text-sm ${
                  filters.tag === tag
                    ? "bg-indigo-600 text-white hover:bg-indigo-800"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-800 hover:duration-200"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="dark:bg-tertiary rounded bg-gray-300 px-4 py-2 font-bold text-gray-700 hover:bg-gray-400 hover:duration-200 dark:text-white"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </form>
  );
}
