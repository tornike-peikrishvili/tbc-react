"use client";

import { removeFromCartAction } from "@/actions/actions";

interface AddToCartBtnProps {
  eventId: number;
}

function DeleteBtn({ eventId }: AddToCartBtnProps) {
  return (
    <button
      onClick={() => {
        removeFromCartAction(eventId);
      }}
    >
      DELETE
    </button>
  );
}

export default DeleteBtn;
