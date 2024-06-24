"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";
import { useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "All Categories",
    location: "All Locations",
    minPrice: "",
    maxPrice: "",
    date: "",
    rating: "All Ratings",
    eventType: "All Types",
  });
  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    // Fetch categories
    fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/events/filter-categories`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched categories:", data.categories);
        if (Array.isArray(data.categories) && data.categories.length > 0) {
          setCategories(["All Categories", ...data.categories]);
        } else {
          console.error("No categories found or categories is not an array");
          setCategories(["All Categories"]);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories(["All Categories"]);
      });

    // Initialize filters from URL params
    setFilters({
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "All Categories",
      location: searchParams.get("location") || "All Locations",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      date: searchParams.get("date") || "",
      rating: searchParams.get("rating") || "All Ratings",
      eventType: searchParams.get("eventType") || "All Types",
    });
  }, [searchParams]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    if (filtersApplied) {
      setFilters({
        search: "",
        category: "All Categories",
        location: "All Locations",
        minPrice: "",
        maxPrice: "",
        date: "",
        rating: "All Ratings",
        eventType: "All Types",
      });
      router.push(`/products`);
      setFiltersApplied(false);
    } else {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (
          value &&
          value !== "All Categories" &&
          value !== "All Locations" &&
          value !== "All Ratings" &&
          value !== "All Types"
        ) {
          queryParams.append(key, value);
        }
      });
      router.push(`/products?${queryParams.toString()}`);
      setFiltersApplied(true);
    }
  };

  return (
    <div className="mx-auto max-w-full rounded-lg bg-white px-6 pt-6 shadow-lg transition-shadow hover:shadow-xl">
      <h1 className="text-3xl font-extrabold text-gray-900">Filters</h1>
      <div className="grid grid-cols-1 items-center gap-6 p-1 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700"
          >
            Search
          </label>
          <input
            type="text"
            name="search"
            id="search"
            value={filters.search}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Search events..."
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <select
            id="location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option>All Locations</option>
            <option>Tbilisi</option>
            <option>Batumi</option>
            <option>Rustavi</option>
            <option>Kutaisi</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="price-range"
            className="block text-sm font-medium text-gray-700"
          >
            Price Range
          </label>
          <div className="flex items-center">
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="mr-2 block w-1/2 rounded-lg border border-gray-300 p-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Min"
            />
            <span className="text-gray-700">to</span>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="ml-2 block w-1/2 rounded-lg border border-gray-300 p-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 grid grid-cols-1 gap-6 p-1 md:grid-cols-2 lg:grid-cols-4"
          >
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700"
              >
                Rating
              </label>
              <select
                id="rating"
                name="rating"
                value={filters.rating}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option>All Ratings</option>
                <option>1 Star</option>
                <option>2 Stars</option>
                <option>3 Stars</option>
                <option>4 Stars</option>
                <option>5 Stars</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="eventType"
                className="block text-sm font-medium text-gray-700"
              >
                Event Type
              </label>
              <select
                id="eventType"
                name="eventType"
                value={filters.eventType}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option>All Types</option>
                <option>In-person</option>
                <option>Online</option>
                <option>Hybrid</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={toggleExpand}
        className="m-auto flex w-full items-center py-5 text-center text-4xl text-black"
      >
        {isExpanded ? (
          <RiArrowUpWideLine className="m-auto" />
        ) : (
          <RiArrowDownWideLine className="m-auto" />
        )}
      </button>
      <button
        onClick={applyFilters}
        className="mb-5 w-full rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        {filtersApplied ? "Reset Filters" : "Apply Filters"}
      </button>
    </div>
  );
}

export default Filter;
