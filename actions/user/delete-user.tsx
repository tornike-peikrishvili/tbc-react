"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { AuthToken } from "../auth0/auth0-get-token";

export async function deleteUser(user_id: string) {
  const token = await AuthToken();
  try {
    const response = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
        redirect: "follow",
      }
    );

    revalidatePath("/admin");

    if (response.ok) {
      await sql`DELETE FROM users WHERE user_id = ${String(user_id)}`;
    }
    return { message: "User has been deleted", status: 200 };
  } catch (error) {
    console.log(error);
    return { message: "User deletion failed", status: 500 };
  }
}
