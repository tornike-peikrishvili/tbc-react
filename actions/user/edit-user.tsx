"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { AuthToken } from "../auth0/auth0-get-token";

export async function updateUser(userId: string, formData: FormData) {
  const token = await AuthToken();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const age = formData.get("age") as string;
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const address = formData.get("address") as string;

  try {
    const response = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: name,
        }),
      },
    );

    revalidatePath("/admin");

    if (!response.ok) {
      console.log("Error");
    }
    const updatedUser = await response.json();
    console.log("Updated User:", updatedUser);

    await sql`UPDATE users SET name = ${name}, age = ${Number(age)}, firstname = ${firstname}, lastname = ${lastname}, address = ${address}, email = ${email} WHERE user_id = ${userId}`;

    return { message: "User has been updated", status: 200 };
  } catch (error) {
    console.log(error);
    return { message: "User update failed", status: 500 };
  }
}
