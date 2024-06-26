"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BlogForm from "./BlogAddForm";

export default function BlogCreateButton({ userId }: { userId: string }) {
  const [openModal, setOpenModal] = useState(false);

  if (!userId) {
    return null;
  }

  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="rounded bg-indigo-600 px-4 py-3 font-bold text-white hover:bg-indigo-800 hover:duration-200"
      >
        Add Blog
      </button>
      <AnimatePresence>
        {openModal && <BlogForm setOpenModal={setOpenModal} />}
      </AnimatePresence>
    </div>
  );
}
