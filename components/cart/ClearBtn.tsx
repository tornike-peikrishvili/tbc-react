// ClearBtn.tsx
"use client";
import { useState } from "react";
import { clearCartAction } from "@/actions/actions";

interface ClearBtnProps {
  className?: string;
  children?: React.ReactNode;
}

function ClearBtn({ className, children }: ClearBtnProps) {
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCart = async () => {
    setIsClearing(true);
    try {
      const result = await clearCartAction();
      if (result.success) {
        console.log("Cart cleared successfully");
      } else {
        console.error("Failed to clear cart:", result.error);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <button
      onClick={handleClearCart}
      className={className}
      disabled={isClearing}
    >
      {isClearing ? "Clearing..." : children}
    </button>
  );
}

export default ClearBtn;
