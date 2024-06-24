import { createBlogAction } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

export default function BlogForm({
  setOpenModal,
}: {
  setOpenModal: (openModal: boolean) => void;
}) {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formDataToSend = new FormData(event.currentTarget);
    if (image) {
      formDataToSend.append("image", image);
    }
    await createBlogAction(formDataToSend);
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
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="rounded-md border border-gray-300 p-2"
        />

        <input
          type="text"
          name="content"
          placeholder="Content"
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="text"
          name="Author"
          placeholder="Author"
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
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
