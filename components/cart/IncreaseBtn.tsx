"use client";
import { increaseQuantityAction } from "@/actions/actions";
import { FaPlus } from "react-icons/fa";

interface IncreaseBtnProps {
  eventId: number;
  className?: string;
}

export default function IncreaseBtn({ eventId, className }: IncreaseBtnProps) {
  return (
    <button
      onClick={() => increaseQuantityAction(eventId)}
      className={className}
    >
      <FaPlus className="h-4 w-4" />
      <span className="sr-only">Increase Quantity</span>
    </button>
  );
}
