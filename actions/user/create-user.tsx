"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { AuthToken } from "../auth0/auth0-get-token";

export async function createUser(formData: FormData) {
  const token = await AuthToken();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  try {
    const response = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          connection: "Username-Password-Authentication",
          email: email,
          password: password,
          name: name,
        }),
      }
    );

    revalidatePath("/admin");

    if (!response.ok) {
      console.log("Error");
    }

    const createdUser = await response.json();
    console.log("Created User:", createdUser);

    await sql`INSERT INTO users (user_id, name, email, role) VALUES (${createdUser.user_id}, ${name}, ${email}, ${role})`;

    return { message: "User has been created", status: 201 };
  } catch (error) {
    console.log(error);
    return { message: "User creation failed", status: 500 };
  }
}
