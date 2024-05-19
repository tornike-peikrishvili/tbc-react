"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

type Product = {
  id: number;
  name: string;
  quantity: number;
};

type Action =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "REMOVE_FROM_CART"; productId: number }
  | { type: "CLEAR_CART" }
  | { type: "UPDATE_QUANTITY"; productId: number; quantity: number };

type CartState = {
  products: Product[];
};

type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<Action>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProductIndex = state.products.findIndex(
        (p) => p.id === action.product.id
      );
      if (existingProductIndex !== -1) {
        const updatedProducts = [...state.products];
        updatedProducts[existingProductIndex].quantity +=
          action.product.quantity;
        return { products: updatedProducts };
      }
      return { products: [...state.products, action.product] };
    case "REMOVE_FROM_CART":
      return {
        products: state.products.filter((p) => p.id !== action.productId),
      };
    case "CLEAR_CART":
      return { products: [] };
    case "UPDATE_QUANTITY":
      return {
        products: state.products.map((p) =>
          p.id === action.productId ? { ...p, quantity: action.quantity } : p
        ),
      };

    default:
      return state;
  }
};

const useCartReducer = () => {
  const [storedState, setStoredState] = useLocalStorage("cart", {
    products: [],
  });
  const [state, dispatch] = useReducer(cartReducer, storedState);

  const dispatchWithLocalStorage = (action: Action) => {
    dispatch(action);
    setStoredState(state);
  };

  return { state, dispatch: dispatchWithLocalStorage };
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { state, dispatch } = useCartReducer();

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
