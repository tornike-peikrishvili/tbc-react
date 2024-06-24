"use client";
import { decreaseQuantityAction } from "@/actions/actions";
import { FaMinus } from "react-icons/fa";

interface DecreaseBtnProps {
  eventId: number;
  className?: string;
}

export default function DecreaseBtn({ eventId, className }: DecreaseBtnProps) {
  return (
    <button
      onClick={() => decreaseQuantityAction(eventId)}
      className={className}
    >
      <FaMinus className="h-4 w-4" />
      <span className="sr-only">Decrease Quantity</span>
    </button>
  );
}
