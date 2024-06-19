"use client";
import { increaseQuantityAction } from "@/actions/actions";

interface AddToCartBtnProps {
  eventId: number;
}

function IncreaseBtn({ eventId }: AddToCartBtnProps) {
  return (
    <button onClick={() => increaseQuantityAction(eventId)}>
      <div className="h-4 w-4">+</div>
      <span className="sr-only">Increase Quantity</span>
    </button>
  );
}

export default IncreaseBtn;
