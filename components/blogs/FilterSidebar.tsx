import Link from "next/link";

export default function FilterSidebar() {
  return (
    <div className=" rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Filters</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="w-full pr-3">
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full  rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-800 hover:duration-200">
            S
          </button>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-700">Sort By</h3>
          <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            Categories
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {["Events", "Food", "Party", "Festivals", "Music", "Sport"].map(
              (category) => (
                <Link
                  key={category}
                  href="#"
                  className="text-sm text-gray-600 transition-colors duration-200 hover:text-blue-600"
                >
                  {category}
                </Link>
              ),
            )}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-700">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Events",
              "Food",
              "Party",
              "Festivals",
              "Music",
              "Technology",
              "Sport",
            ].map((tag) => (
              <Link
                key={tag}
                href="#"
                className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
