import { editEventAction } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { toast } from "sonner";

interface EventData {
  id: number;
  title: string;
  description: string;
  starting: string;
  location: string;
  price: number;
  amount: number;
  category: string[];
  images: string[];
}

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be non-negative"),
  amount: z.number().int().min(1, "Amount must be at least 1"),
  location: z.string().min(1, "Location is required"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

export default function EventEditForm({
  setOpenModal,
  eventData,
}: {
  setOpenModal: (openModal: boolean) => void;
  eventData: EventData;
}) {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>(eventData.category);
  const [categoryInput, setCategoryInput] = useState<string>("");
  const [images, setImages] = useState<string[]>(eventData.images);
  const [newImages, setNewImages] = useState<File[]>([]);

  const handleCategoryAdd = () => {
    if (categoryInput.trim()) {
      setCategories([...categories, categoryInput.trim()]);
      setCategoryInput("");
    }
  };

  const handleCategoryRemove = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleNewImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNewImages(Array.from(event.target.files));
    }
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());

    try {
      eventSchema.parse({
        ...formDataObject,
        price: Number(formDataObject.price),
        amount: Number(formDataObject.amount),
      });

      const formDataToSend = new FormData(event.currentTarget);
      formDataToSend.set("id", eventData.id.toString());
      formDataToSend.set("categories", JSON.stringify(categories));
      formDataToSend.set("existingImages", JSON.stringify(images));
      newImages.forEach((image, index) => {
        formDataToSend.append(`newImage${index}`, image);
      });

      await editEventAction(formDataToSend);
      setOpenModal(false);
      router.refresh();
      toast.success("Event updated successfully");
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error("An error occurred while updating the event");
      }
    }
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
        className="dark:bg-primary z-[101] flex flex-col gap-4 rounded-xl bg-white p-8"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          defaultValue={eventData.title}
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          defaultValue={eventData.description}
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
              className="ml-2 rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-800"
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
          defaultValue={eventData.price}
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          defaultValue={eventData.amount}
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          defaultValue={eventData.location}
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          defaultValue={eventData.starting}
          className="rounded-md border border-gray-300 p-2"
        />
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {images.map((imageUrl, index) => (
              <div key={index} className="relative">
                <Image
                  src={imageUrl}
                  alt={`Event image ${index + 1}`}
                  width={100}
                  height={100}
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          name="newImage"
          accept="image/*"
          onChange={handleNewImageChange}
          multiple
          className="rounded-md border border-gray-300 p-2 dark:text-white"
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
            className="rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-800"
          >
            Update Event
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
