"use client";
import { increaseQuantityAction } from "@/actions";

interface AddToCartBtnProps {
  productId: number;
}

function IncreaseBtn({ productId }: AddToCartBtnProps) {
  return (
    <button onClick={() => increaseQuantityAction(4, productId)}>
      <div className="w-4 h-4">+</div>
      <span className="sr-only">Increase Quantity</span>
    </button>
  );
}

export default IncreaseBtn;
