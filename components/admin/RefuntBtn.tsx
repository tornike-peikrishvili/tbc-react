"use client";
import { createRefund } from "@/actions/actions";
import React from "react";

export default function RefundBtn({
  id,
  refunded,
}: {
  id: string;
  refunded: boolean;
}) {
  const refundHandler = async (charge: string) => {
    await createRefund(charge);
  };

  return (
    <>
      {refunded ? (
        <button
          type="button"
          disabled
          className="flex w-[150px] items-center justify-center gap-2 rounded-lg bg-gray-400 p-1 px-[25px] text-[18px] font-medium text-white"
        >
          Refunded
        </button>
      ) : (
        <button
          onClick={() => refundHandler(id)}
          type="button"
          className="flex w-[150px] items-center justify-center gap-2 rounded-lg bg-indigo-600 p-1 px-[25px] text-[18px] font-medium text-white"
        >
          Refund
        </button>
      )}
    </>
  );
}
