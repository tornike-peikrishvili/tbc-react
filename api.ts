"use server";

export interface User {
  user_id: string;
  name: string;
  email: string;
  role: string;
}

export async function getUsers() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-users`
  );
  const { users } = await response.json();

  return users.rows;
}

export async function createUser(name: string, email: string, age: string) {
  return await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/create-user`, {
    method: "POST",
    body: JSON.stringify({ name, email, age }),
  });
}

export async function updateUser(
  id: string,
  name: string,
  email: string,
  age: string
) {
  "use server";
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/edit-user/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({ id, name, email, age }),
    }
  );
}

export async function getProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products/get-products`,
    { cache: "no-store" }
  );
  const products = await response.json();

  return products.rows;
}

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
}

export async function addToCart(userId: number, productId: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/add`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    }
  );
  const data = await response.json();
  return data;
}

export async function removeFromCart(userId: number, productId: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/delete`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    }
  );
  const data = await response.json();
  return data;
}

export async function increaseQuantity(userId: number, productId: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/increase-quantity`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    }
  );
  const data = await response.json();
  return data;
}

export async function decreaseQuantity(userId: number, productId: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/deacrease-quantity`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    }
  );
  const data = await response.json();
  return data;
}

export async function clearCart(userId: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/clear`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    }
  );
  const data = await response.json();
  return data;
}

export async function getCartItems(userId: Number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/get`,
    { method: "POST", body: JSON.stringify({ userId }) }
  );
  const cartItems = await response.json();
  return cartItems.rows;
}

import { sql } from "@vercel/postgres";

export async function getCartQuantitySum(user_id: string) {
  const { rows } =
    await sql`SELECT SUM(quantity) AS quantity_sum FROM cart WHERE user_id = ${user_id}`;

  return rows[0].quantity_sum;
}
