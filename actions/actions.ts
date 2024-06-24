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
  createBlog,
  deleteBlog,
  editBlog,
} from "../api";
import { revalidatePath } from "next/cache";
import { getSession } from "@auth0/nextjs-auth0";
import { sql } from "@vercel/postgres";

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
  revalidatePath("/products");
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
  try {
    await clearCart();
    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return { success: false, error: error };
  }
}

// Create Blog
export async function createBlogAction(formData: FormData) {
  const session = await getSession();
  const user = session?.user;
  const userRole = user?.role;
  const userId = user?.sub;
  const userName = user?.name;

  formData.append("userId", userId);
  formData.append("userName", userName);
  formData.append("userRole", JSON.stringify(userRole));

  await createBlog(formData, userRole, userId, userName);
  revalidatePath("/admin");
  revalidatePath("/blog");
}

// Delete Blog
export async function deleteBlogAction(blogId: number) {
  await deleteBlog(blogId);
  revalidatePath("/blogs");
  revalidatePath("/my-blogs");
  revalidatePath("/admin");
}

// Edit Blog
export async function editBlogAction(formData: FormData) {
  await editBlog(formData);
  revalidatePath("/blogs");
  revalidatePath("/my-blogs");
  revalidatePath("/admin");
}

// Save User Details

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
