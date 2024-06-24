import {
  FaMusic,
  FaPaintBrush,
  FaUtensils,
  FaFutbol,
  FaLaugh,
  FaFilm,
  FaTree,
} from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";

const categories = [
  { name: "Music", icon: <FaMusic size={40} /> },
  { name: "Art", icon: <FaPaintBrush size={40} /> },
  { name: "Food", icon: <FaUtensils size={40} /> },
  { name: "Sports", icon: <FaFutbol size={40} /> },
  { name: "Comedy", icon: <FaLaugh size={40} /> },
  { name: "Film", icon: <FaFilm size={40} /> },
  { name: "Family", icon: <GiFamilyHouse size={40} /> },
  { name: "Outdoors", icon: <FaTree size={40} /> },
];

function EventCategories() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Event Categories
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Browse events by category to find the perfect fit for you.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex transform cursor-pointer flex-col items-center rounded-lg bg-white p-6 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-lg"
            >
              <div className="text-gray-600">{category.icon}</div>
              <div className="mt-4 text-xl font-medium text-gray-900">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventCategories;
