"use client";
import { decreaseQuantityAction } from "@/actions";

interface AddToCartBtnProps {
  productId: number;
}

function DecreaseBtn({ productId }: AddToCartBtnProps) {
  return (
    <button onClick={() => decreaseQuantityAction(4, productId)}>
      <div className="w-4 h-4">-</div>
      <span className="sr-only">Increase Quantity</span>
    </button>
  );
}

export default DecreaseBtn;
