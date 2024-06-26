"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import EventForm from "./EventAddForm";
import { useScopedI18n } from "@/locales/client";

export default function EventCreateButton() {
  const [openModal, setOpenModal] = useState(false);
  const t = useScopedI18n("events");

  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="rounded bg-indigo-600 px-4 py-3 font-bold text-white hover:bg-indigo-800 hover:duration-200"
      >
       {t("createEvent")}
      </button>
      <AnimatePresence>
        {openModal && <EventForm setOpenModal={setOpenModal} />}
      </AnimatePresence>
    </div>
  );
}
