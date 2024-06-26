import { z } from "zod";
import { createBlogAction } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  tags: z.array(z.string()),
  image: z.instanceof(File).optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function BlogForm({
  setOpenModal,
}: {
  setOpenModal: (openModal: boolean) => void;
}) {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  const handleCategoryAdd = () => {
    if (categoryInput.trim()) {
      setCategories([...categories, categoryInput.trim()]);
      setCategoryInput("");
    }
  };

  const handleCategoryRemove = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleTagAdd = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagRemove = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const blogData: BlogFormData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      content: formData.get("content") as string,
      author: formData.get("author") as string,
      categories,
      tags,
      image: image || undefined,
    };

    try {
      blogSchema.parse(blogData);

      const formDataToSend = new FormData();
      Object.entries(blogData).forEach(([key, value]) => {
        if (key === "categories" || key === "tags") {
          formDataToSend.set(key, JSON.stringify(value));
        } else if (key === "image" && value instanceof File) {
          formDataToSend.append(key, value);
        } else {
          formDataToSend.set(key, value as string);
        }
      });

      await createBlogAction(formDataToSend);
      setOpenModal(false);
      router.refresh();
      toast.success("Blog post created successfully!");
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
        className="dark:bg-secondary z-[101] flex flex-col gap-4 rounded-xl bg-white p-8"
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
        <textarea
          name="content"
          placeholder="Content"
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
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
        <div className="flex flex-col gap-2">
          <div className="flex">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag"
              className="flex-grow rounded-md border border-gray-300 p-2"
            />
            <button
              type="button"
              onClick={handleTagAdd}
              className="hover:bg-inidgo-800 ml-2 rounded bg-indigo-600 px-4 py-2 font-bold text-white"
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center rounded-full bg-gray-200 px-4 py-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleTagRemove(index)}
                  className="ml-2 text-red-500"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
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
            Create Blog Post
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
