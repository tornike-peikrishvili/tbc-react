"use client";
import React from "react";
import { useCart } from "@/utils/CartContext";

const CheckoutPage: React.FC = () => {
  const { state, dispatch } = useCart();

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    productId: number
  ) => {
    const quantity = parseInt(event.target.value, 10);
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handleClearCart}>Clear Cart</button>
      <ul>
        {state?.products?.map((product) => (
          <li key={product.id}>
            {product.name}{" "}
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => handleQuantityChange(e, product.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckoutPage;
