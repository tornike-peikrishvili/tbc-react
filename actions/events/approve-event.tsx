"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";

export async function approveEvent(id: string) {
  revalidatePath("/admin");
  revalidatePath("/products");
  try {
    await sql`UPDATE events SET approved = true WHERE id = ${id}`;
    return { message: "Event approved", status: 200 };
  } catch (error) {
    console.log(error);
    return { message: "Failed to approve event", status: 500 };
  }
}
