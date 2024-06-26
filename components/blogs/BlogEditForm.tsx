import { z } from "zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BlogProps } from "../my-blogs/MyBlogs";

const blogEditSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  tags: z.array(z.string()),
  image: z.instanceof(File).optional(),
});

type BlogEditFormData = z.infer<typeof blogEditSchema>;

export default function BlogEditForm({
  setOpenModal,
  blogData,
}: {
  setOpenModal: (openModal: boolean) => void;
  blogData: BlogProps;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(blogData.title);
  const [description, setDescription] = useState(blogData.description);
  const [content, setContent] = useState(blogData.content);
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  useEffect(() => {
    setCategories(
      Array.isArray(blogData.category)
        ? blogData.category
        : blogData.category
          ? blogData.category.split(",").map((c) => c.trim())
          : [],
    );
    setTags(
      Array.isArray(blogData.tag)
        ? blogData.tag
        : blogData.tag
          ? blogData.tag.split(",").map((t) => t.trim())
          : [],
    );
  }, [blogData]);

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

    const blogDataToSend: BlogEditFormData = {
      title,
      description,
      content,
      categories,
      tags,
      image: image || undefined,
    };

    try {
      blogEditSchema.parse(blogDataToSend);

      const formDataToSend = new FormData();
      Object.entries(blogDataToSend).forEach(([key, value]) => {
        if (key === "categories" || key === "tags") {
          formDataToSend.set(key, JSON.stringify(value));
        } else if (key === "image" && value instanceof File) {
          formDataToSend.append(key, value);
        } else {
          formDataToSend.set(key, value as string);
        }
      });

      formDataToSend.set("blogId", blogData.id.toString());

      const response = await fetch(`/api/blog/edit/${blogData.id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update blog post");
      }

      const result = await response.json();
      console.log("Update result:", result);

      setOpenModal(false);
      router.refresh();
      toast.success("Blog post updated successfully!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(`${err.path.join(".")}: ${err.message}`);
        });
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Error updating blog:", error);
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-md border border-gray-300 p-2"
        />
        <textarea
          name="content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
              className="ml-2 rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-800"
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
            Update Blog Post
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
