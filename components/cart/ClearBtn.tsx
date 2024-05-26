"use client";
import { clearCartAction } from "@/actions";

function ClearBtn() {
  return (
    <button onClick={() => clearCartAction(4)}>
      <p className="text-2xl font-bold mb-4">Clear Cart</p>
    </button>
  );
}

export default ClearBtn;
