"use client";
import { clearCartAction } from "@/actions/actions";

function ClearBtn() {
  return (
    <button onClick={() => clearCartAction()}>
      <p className="mb-4 text-2xl font-bold">Clear Cart</p>
    </button>
  );
}

export default ClearBtn;
