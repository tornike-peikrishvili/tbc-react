"use server";

import { revalidatePath } from "next/cache";
import {
  createUser,
  deleteUser,
  updateUser,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "./api";

export async function createUserAction(formData: FormData) {
  const { name, email, age } = Object.fromEntries(formData);
  createUser(name as string, email as string, age as string);
  revalidatePath("/users");
}

export async function deleteUserAction(id: number) {
  await deleteUser(id);
  revalidatePath("/users");
}

export async function updateUserAction(formData: FormData) {
  const { id, name, email, age } = Object.fromEntries(formData);
  updateUser(id as string, name as string, email as string, age as string);
  revalidatePath("/users");
}

export async function addToCartAction(userId: number, productId: number) {
  await addToCart(userId, productId);
  revalidatePath("/cart");
}

export async function removeFromCartAction(userId: number, productId: number) {
  await removeFromCart(userId, productId);
  revalidatePath("/cart");
}

export async function increaseQuantityAction(
  userId: number,
  productId: number
) {
  await increaseQuantity(userId, productId);
  revalidatePath("/cart");
}

export async function decreaseQuantityAction(
  userId: number,
  productId: number
) {
  await decreaseQuantity(userId, productId);
  revalidatePath("/cart");
}

export async function clearCartAction(userId: number) {
  await clearCart(userId);
  revalidatePath("/cart");
}
