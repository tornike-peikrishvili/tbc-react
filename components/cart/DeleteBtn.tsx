"use client";

import { removeFromCartAction } from "@/actions";

interface AddToCartBtnProps {
  productId: number;
}

function DeleteBtn({ productId }: AddToCartBtnProps) {
  return (
    <button
      onClick={() => {
        removeFromCartAction(4, productId);
      }}
    >
      DELETE
    </button>
  );
}

export default DeleteBtn;
