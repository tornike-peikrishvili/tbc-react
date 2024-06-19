"use server";

export interface User {
  user_id: string;
  name: string;
  email: string;
  image: string;
  role: string[];
}

// Create Event

export async function createEvent(
  formData: FormData,
  userRole: string[],
  userId: string,
  userName: string,
) {
  formData.append("userId", userId);
  formData.append("userName", userName);
  formData.append("userRole", JSON.stringify(userRole));

  return await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/events/add`, {
    method: "POST",
    body: formData,
  });
}

// Delete Event
export async function deleteEvent(eventId: number) {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const userRole = user?.role;
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/events/delete/${eventId}`,
    {
      method: "DELETE",
      body: JSON.stringify({ userId, userRole }),
    },
  );
}

// Edit Event

export async function editEvent(formData: FormData) {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const userRole = user?.role;
  const userName = user?.name;
  const eventId = formData.get("id") as string;

  formData.append("userId", userId);
  formData.append("userName", userName);
  formData.append("userRole", JSON.stringify(userRole));

  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/events/edit/${eventId}`,
    {
      method: "PUT",
      body: formData,
    },
  );
}

// Get My Events

export async function getMyEvents() {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/events/my-events`,
    {
      method: "GET",
      headers: { Authorization: userId },
    },
  );
  const { events } = await response.json();

  return events.rows;
}

// Add To Cart

export async function addToCart(eventId: number) {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/add`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, eventId }),
    },
  );
  const data = await response.json();
  return data;
}

// Get Cart Items

export async function getCartItems(userId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/get`,
    { method: "POST", body: JSON.stringify({ userId }) },
  );
  const cartItems = await response.json();
  return cartItems.rows;
}

// Decrease Quantity

export async function decreaseQuantity(eventId: number) {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/deacrease-quantity`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, eventId }),
    },
  );
  const data = await response.json();
  return data;
}

// Increase Quantity

export async function increaseQuantity(eventId: number) {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/increase-quantity`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, eventId }),
    },
  );
  const data = await response.json();
  return data;
}

// Delete From Cart

export async function removeFromCart(eventId: number) {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/delete`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, eventId }),
    },
  );
  const data = await response.json();
  return data;
}

// Clear Cart

export async function clearCart() {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/clear`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    },
  );
  const data = await response.json();
  return data;
}

//////////////////////////////////

export async function getUsers() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-users`,
    { cache: "no-store" },
  );
  const { users } = await response.json();

  return users.rows;
}

export async function createUser(name: string, email: string, age: string) {
  ``;
  return await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/create-user`, {
    method: "POST",
    body: JSON.stringify({ name, email, age }),
  });
}

export async function updateUser(
  id: string,
  name: string,
  email: string,
  age: string,
) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/edit-user/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({ id, name, email, age }),
    },
  );
}

export async function getProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products/get-products`,
    { cache: "no-store" },
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

import { getSession } from "@auth0/nextjs-auth0";
import { sql } from "@vercel/postgres";

export async function getCartQuantitySum(user_id: string) {
  const { rows } =
    await sql`SELECT SUM(quantity) AS quantity_sum FROM cart WHERE user_id = ${user_id}`;

  return rows[0].quantity_sum;
}
