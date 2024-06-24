"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BlogEditForm from "./BlogEditForm";
import { BlogProps } from "../my-blogs/MyBlogs";

export default function EventEditButton({ blogData }: { blogData: BlogProps }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="rounded bg-indigo-600 px-4 py-3 font-bold text-white hover:bg-indigo-800 hover:duration-200 "
      >
        Edit
      </button>
      <AnimatePresence>
        {openModal && (
          <BlogEditForm blogData={blogData} setOpenModal={setOpenModal} />
        )}
      </AnimatePresence>
    </div>
  );
}
