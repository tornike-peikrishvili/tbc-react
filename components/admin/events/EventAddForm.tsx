import { z } from "zod";
import { createEventAction } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  amount: z.number().int().positive("Amount must be a positive integer"),
  location: z.string().min(1, "Location is required"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function EventForm({
  setOpenModal,
}: {
  setOpenModal: (openModal: boolean) => void;
}) {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);

  const handleCategoryAdd = () => {
    if (categoryInput.trim()) {
      setCategories([...categories, categoryInput.trim()]);
      setCategoryInput("");
    }
  };

  const handleCategoryRemove = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const eventData: EventFormData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      amount: Number(formData.get("amount")),
      location: formData.get("location") as string,
      date: formData.get("date") as string,
      categories,
      images,
    };

    try {
      eventSchema.parse(eventData);

      const formDataToSend = new FormData();
      Object.entries(eventData).forEach(([key, value]) => {
        if (key === "categories") {
          formDataToSend.set(key, JSON.stringify(value));
        } else if (key === "images") {
          if (Array.isArray(value)) {
            value.forEach((image, index) => {
              formDataToSend.append(`image${index}`, image);
            });
          }
        } else {
          formDataToSend.set(key, value.toString());
        }
      });

      await createEventAction(formDataToSend);
      setOpenModal(false);
      router.refresh();
      toast.success("Event created successfully! Wait for Approval!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(`${err.path.join(".")}: ${err.message}`);
        });
      } else {
        toast.error("An unexpected error occurred");
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
        className="z-[101] flex flex-col gap-4 rounded-xl bg-white p-8"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
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
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          multiple
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
            Create Event
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
