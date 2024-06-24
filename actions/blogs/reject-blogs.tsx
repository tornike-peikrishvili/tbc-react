"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";

export async function rejectBlog(id: string) {
  revalidatePath("/admin");
  try {
    await sql`DELETE FROM blogs WHERE id = ${id}`;
    return { message: "Event rejected", status: 200 };
  } catch (error) {
    console.log(error);
    return { message: "Failed to reject event", status: 500 };
  }
}
