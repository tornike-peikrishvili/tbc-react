"use client";
import { addToCartAction } from "@/actions";
import { FaCartPlus } from "react-icons/fa";

interface AddToCartBtnProps {
  productId: number;
}

function AddToCartBtn({ productId }: AddToCartBtnProps) {
  return (
    <button
      onClick={() => {
        addToCartAction(4, productId);
      }}
      className="btn px-2 py-1 border-black text-black hover:text-white hover:border-black hover:bg-black dark:text-white dark:border-white hover:dark:bg-[#fafafa] hover:dark:text-black"
    >
      <FaCartPlus />
    </button>
  );
}

export default AddToCartBtn;
