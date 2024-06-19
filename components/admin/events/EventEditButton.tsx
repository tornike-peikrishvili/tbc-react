"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import EventEditForm from "./EventEditForm";
import { EventProps } from "@/components/carousel/ThreeSlideCarousel";

export default function EventEditButton({
  eventData,
}: {
  eventData: EventProps;
}) {
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
          <EventEditForm eventData={eventData} setOpenModal={setOpenModal} />
        )}
      </AnimatePresence>
    </div>
  );
}
