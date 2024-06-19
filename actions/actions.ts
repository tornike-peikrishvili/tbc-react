"use server";

import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  createEvent,
  deleteEvent,
  editEvent,
} from "../api";
import { revalidatePath } from "next/cache";

// Create Event

export async function createEventAction(formData: FormData) {
  const session = await getSession();
  const user = session?.user;
  const userRole = user?.role;
  const userId = user?.sub;
  const userName = user?.name;

  await createEvent(formData, userRole, userId, userName);
  revalidatePath("/admin");
}

// Delete Event

export async function deleteEventAction(eventId: number) {
  await deleteEvent(eventId);
  revalidatePath("/product");
  revalidatePath("/admin");
}

// Edit Event

export async function editEventAction(formData: FormData) {
  await editEvent(formData);
  revalidatePath("/product");
  revalidatePath("/admin");
}

// Add To Cart

export async function addToCartAction(eventId: number) {
  await addToCart(eventId);
  revalidatePath("/cart");
}

// Decrease Quantity

export async function decreaseQuantityAction(eventId: number) {
  await decreaseQuantity(eventId);
  revalidatePath("/cart");
}

// Increase Quantity

export async function increaseQuantityAction(eventId: number) {
  await increaseQuantity(eventId);
  revalidatePath("/cart");
}

// Delete From Cart

export async function removeFromCartAction(eventId: number) {
  await removeFromCart(eventId);
  revalidatePath("/cart");
}

// Clear Cart

export async function clearCartAction() {
  await clearCart();
  revalidatePath("/cart");
}

//////////////////////////////////////////////////////

import { getSession } from "@auth0/nextjs-auth0";
import { sql } from "@vercel/postgres";

export async function saveUserDetails(formData: FormData) {
  const session = await getSession();
  const userId = session?.user?.sub;

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const image = formData.get("image") as string;
  const role = formData.get("role") as string;

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  await sql`
    INSERT INTO users (user_id, name, email, image, role, profile_complete)
    VALUES (${userId}, ${name}, ${email}, ${image}, ${role}, true)
    ON CONFLICT (user_id) DO UPDATE SET
      name = EXCLUDED.name,
      email = EXCLUDED.email,
      image = EXCLUDED.image,
      role = EXCLUDED.role,
      profile_complete = EXCLUDED.profile_complete
  `;
}
