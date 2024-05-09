"use server";

import { revalidatePath } from "next/cache";
import { createUser, deleteUser, updateUser } from "./api";

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
  console.log("action id:" + id);
  updateUser(id as string, name as string, email as string, age as string);
  revalidatePath("/users");
}
