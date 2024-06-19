import { createEventAction } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

export default function EventForm({
  setOpenModal,
}: {
  setOpenModal: (openModal: boolean) => void;
}) {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState<string>("");

  const handleCategoryAdd = () => {
    if (categoryInput.trim()) {
      setCategories([...categories, categoryInput.trim()]);
      setCategoryInput("");
    }
  };

  const handleCategoryRemove = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formDataToSend = new FormData(event.currentTarget);
    formDataToSend.set("categories", JSON.stringify(categories));
    await createEventAction(formDataToSend);
    setOpenModal(false);
    router.refresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-[100]"
    >
      <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
      <motion.form
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        exit={{ y: "-100vh" }}
        onSubmit={handleSubmit}
        className="z-[101] bg-white rounded-xl p-8 flex flex-col gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="border border-gray-300 rounded-md p-2"
        />
        <div className="flex flex-col gap-2">
          <div className="flex">
            <input
              type="text"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              placeholder="Add a category"
              className="border border-gray-300 rounded-md p-2 flex-grow"
            />
            <button
              type="button"
              onClick={handleCategoryAdd}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-200 px-4 py-2 rounded-full flex items-center"
              >
                {category}
                <button
                  type="button"
                  onClick={() => handleCategoryRemove(index)}
                  className="ml-2 text-red-500"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          className="border border-gray-300 rounded-md p-2"
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setOpenModal(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Event
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
