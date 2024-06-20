"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import EventForm from "./EventAddForm";

export default function EventCreateButton() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="bg-indigo-600 hover:bg-indigo-800 hover:duration-200 text-white font-bold py-3 px-4 rounded"
      >
        Create Event
      </button>
      <AnimatePresence>
        {openModal && <EventForm setOpenModal={setOpenModal} />}
      </AnimatePresence>
    </div>
  );
}
