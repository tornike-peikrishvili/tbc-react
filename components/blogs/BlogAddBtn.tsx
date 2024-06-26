"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BlogForm from "./BlogAddForm";
import { useScopedI18n } from "@/locales/client";

export default function BlogCreateButton({ userId }: { userId: string }) {
  const [openModal, setOpenModal] = useState(false);
  const t = useScopedI18n("blog");
  if (!userId) {
    return null;
  }

  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="rounded bg-indigo-600 px-4 py-3 font-bold text-white hover:bg-indigo-800 hover:duration-200"
      >
        {t("addBlog")}
      </button>
      <AnimatePresence>
        {openModal && <BlogForm setOpenModal={setOpenModal} />}
      </AnimatePresence>
    </div>
  );
}
