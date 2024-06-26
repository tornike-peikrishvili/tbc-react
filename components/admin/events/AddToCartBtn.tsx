"use client";

import { FaCartPlus } from "react-icons/fa";
import { addToCartAction } from "@/actions/actions";
import { toast } from "sonner";
import { useScopedI18n } from "@/locales/client";

interface AddToCartBtnProps {
  eventId: number;
  isEventStarted: boolean;
  eventTitle: string;
}

function AddToCartBtn({
  eventId,
  isEventStarted,
  eventTitle,
}: AddToCartBtnProps) {
  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const toastId = toast.loading("Adding to cart...", {
      description: `Adding ${eventTitle} to your cart`,
    });

    try {
      await addToCartAction(eventId);
      toast.success(`${eventTitle} added to cart`, {
        id: toastId,
        description: "The ticket has been added to your cart successfully.",
      });
    } catch (error) {
      toast.error("Failed to add to cart", {
        id: toastId,
        description:
          "There was an error adding the ticket to your cart. Please try again.",
      });
    }
  };
  const t = useScopedI18n("events");

  return (
    <button
      onClick={handleAddToCart}
      disabled={isEventStarted}
      className={`flex items-center rounded-md px-4 py-2 ${
        isEventStarted
          ? "cursor-not-allowed bg-gray-400"
          : "bg-indigo-600 text-white"
      }`}
    >
      <FaCartPlus className="mr-2" />
      {isEventStarted ? `${t("eventStarted")}` : `${t("bookNow")}`}
    </button>
  );
}

export default AddToCartBtn;
