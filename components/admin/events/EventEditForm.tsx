import { editEventAction } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { EventProps } from "@/components/carousel/ThreeSlideCarousel";

export default function EventEditForm({
  setOpenModal,
  eventData,
}: {
  setOpenModal: (openModal: boolean) => void;
  eventData: EventProps;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(eventData.title);
  const [description, setDescription] = useState(eventData.description);
  const [categories, setCategories] = useState<string[]>(eventData.category);
  const [categoryInput, setCategoryInput] = useState<string>("");
  const [price, setPrice] = useState(eventData.price);
  const [amount, setAmount] = useState(eventData.amount);
  const [location, setLocation] = useState(eventData.location);

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
    formDataToSend.set("categories", JSON.stringify(categories)); // Add categories as JSON string
    await editEventAction(formDataToSend);
    setOpenModal(false);
    router.refresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center"
    >
      <div className="absolute inset-0 bg-gray-800 bg-opacity-75"></div>
      <motion.form
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        exit={{ y: "-100vh" }}
        onSubmit={handleSubmit}
        className="z-[101] flex flex-col gap-4 rounded-xl bg-white p-8"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-md border border-gray-300 p-2"
        />
        <input type="number" name="id" value={eventData.id} hidden />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-md border border-gray-300 p-2"
        />
        <div className="flex flex-col gap-2">
          <div className="flex">
            <input
              type="text"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              placeholder="Add a category"
              className="flex-grow rounded-md border border-gray-300 p-2"
            />
            <button
              type="button"
              onClick={handleCategoryAdd}
              className="ml-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex items-center rounded-full bg-gray-200 px-4 py-2"
              >
                {category}
                <button
                  type="button"
                  onClick={() => handleCategoryRemove(index)}
                  className="ml-2 text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          className="rounded-md border border-gray-300 p-2"
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setOpenModal(false)}
            className="rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Edit Event
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
