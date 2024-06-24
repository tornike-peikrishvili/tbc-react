"use client";

import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  increaseQuantityAction,
  decreaseQuantityAction,
} from "@/actions/actions";

interface QuantityControlsProps {
  eventId: number;
  initialQuantity: number;
}

function QuantityControls({ eventId, initialQuantity }: QuantityControlsProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = async (action: "increase" | "decrease") => {
    setIsLoading(true);

    try {
      if (action === "increase") {
        await increaseQuantityAction(eventId);
        setQuantity((prev) => prev + 1);
      } else {
        await decreaseQuantityAction(eventId);
        setQuantity((prev) => Math.max(prev - 1, 0));
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center rounded-full bg-gray-100 p-1 dark:bg-gray-700">
      <button
        onClick={() => handleQuantityChange("decrease")}
        className="rounded-full p-1 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800 disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
        disabled={isLoading || quantity <= 1}
      >
        <FaMinus className="h-4 w-4" />
        <span className="sr-only">Decrease Quantity</span>
      </button>
      <span className="mx-2 min-w-[24px] text-center text-gray-700 dark:text-gray-300">
        {quantity}
      </span>
      <button
        onClick={() => handleQuantityChange("increase")}
        className="rounded-full p-1 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800 disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
        disabled={isLoading}
      >
        <FaPlus className="h-4 w-4" />
        <span className="sr-only">Increase Quantity</span>
      </button>
    </div>
  );
}

export default QuantityControls;
