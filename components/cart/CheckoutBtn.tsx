"use client";
import { checkout } from "@/api";
import { CartItem } from "@/app/[locale]/(dashboard)/(non-tranparent-header)/cart/page";

interface CheckoutBtnProps {
  cartItems: CartItem[];
  className?: string;
}

function CheckoutBtn({ cartItems, className }: CheckoutBtnProps) {
  const handleCheckout = async () => {
    await checkout(cartItems);
  };

  return (
    <button onClick={handleCheckout} className={className}>
      Proceed to Checkout
    </button>
  );
}

export default CheckoutBtn;
