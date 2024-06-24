"use client";

import { FaCartPlus } from "react-icons/fa";
import { addToCartAction } from "@/actions/actions";

interface AddToCartBtnProps {
  eventId: number;
}

function AddToCartBtn({ eventId }: AddToCartBtnProps) {
  const handleAddToCart = async () => {
    await addToCartAction(eventId);
  };
  return (
    <button
      onClick={handleAddToCart}
      className="w-full  rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    >
      <FaCartPlus className="mr-2 inline" />
      Add to Bookings
    </button>
  );
}

export default AddToCartBtn;
