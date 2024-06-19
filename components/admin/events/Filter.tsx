"use client";

import { useState } from "react";
// import CalendarFilter from "./CalendarFilter";

function Filter() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md transition-shadow hover:shadow-lg">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Filters</h1>
      <div className="mb-6">
        <label className="sr-only" htmlFor="search-events">
          Search events
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            name="search-events"
            id="search-events"
            placeholder="Search events..."
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 custom-input"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {/* <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 0v4m-4 4a4 4 0 100-8 4 4 0 000 8zm-6 8a6 6 0 1112 0H6z"
              />
            </svg> */}
          </div>
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 custom-select"
        >
          <option>All Categories</option>
          <option>Music</option>
          <option>Art</option>
          <option>Sports</option>
          <option>Theatre</option>
        </select>
      </div>
      <div className="mb-6">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <select
          id="location"
          name="location"
          className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 custom-select"
        >
          <option>All Locations</option>
          <option>New York, NY</option>
          <option>Los Angeles, CA</option>
          <option>Chicago, IL</option>
          <option>San Francisco, CA</option>
        </select>
      </div>
      <div className="mb-6">
        <label
          htmlFor="price-range"
          className="block text-sm font-medium text-gray-700"
        >
          Price Range
        </label>
        <input
          type="range"
          id="price-range"
          name="price-range"
          className="mt-1 block w-full"
          min="0"
          max="100"
          step="1"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="organizer"
          className="block text-sm font-medium text-gray-700"
        >
          Organizer
        </label>
        <select
          id="organizer"
          name="organizer"
          className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 custom-select"
        >
          <option>All Organizers</option>
          <option>Music Live</option>
          <option>Art World</option>
          <option>Sports Enthusiasts</option>
          <option>Theatre Group</option>
        </select>
      </div>
      {/* <CalendarFilter /> */}
      <button
        onClick={toggleExpand}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 hover:bg-indigo-700"
      >
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}

export default Filter;
