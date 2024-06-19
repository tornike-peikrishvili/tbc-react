"use client";
import { decreaseQuantityAction } from "@/actions/actions";

interface AddToCartBtnProps {
  eventId: number;
}

function DecreaseBtn({ eventId }: AddToCartBtnProps) {
  return (
    <button onClick={() => decreaseQuantityAction(eventId)}>
      <div className="h-4 w-4">-</div>
      <span className="sr-only">Increase Quantity</span>
    </button>
  );
}

export default DecreaseBtn;
