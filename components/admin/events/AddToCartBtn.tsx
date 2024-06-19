"use client";

import { FaCartPlus } from "react-icons/fa";
import { addToCartAction } from "@/actions/actions";

interface AddToCartBtnProps {
  eventId: number;
  isEventStarted: boolean;
}

function AddToCartBtn({ eventId, isEventStarted }: AddToCartBtnProps) {
  const handleAddToCart = async () => {
    await addToCartAction(eventId);
  };
  return (
    <button
      onClick={handleAddToCart}
      disabled={isEventStarted}
      className={`flex items-center rounded-md px-4 py-2 ${
        isEventStarted
          ? "cursor-not-allowed bg-gray-400"
          : "bg-indigo-600 text-white"
      }`}
    >
      <FaCartPlus className="mr-2" />
      {isEventStarted ? "Event Started" : "Buy Ticket"}
    </button>
  );
}

export default AddToCartBtn;
