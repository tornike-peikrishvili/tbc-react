"use server";

import { revalidatePath } from "next/cache";

export async function AuthToken() {
  try {
    const response = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
          grant_type: "client_credentials",
        }),
      }
    );

    revalidatePath("/admin");

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in fetching", error);
    return null;
  }
}
