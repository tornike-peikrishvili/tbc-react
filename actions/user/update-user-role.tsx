"use server";

// import { revalidatePath } from "next/cache";
import { AuthToken } from "../auth0/auth0-get-token";
import { getSession } from "@auth0/nextjs-auth0";

export async function assignRoleToUser(formData: FormData) {
  const token = await AuthToken();
  const session = await getSession();
  const user = session?.user;

  const roleId = formData.get("role") as string;
  let roleToSet;
  if (roleId === "Organizer") {
    roleToSet = "rol_OcRZlkc7Y6kPF8v9";
  } else if (roleId === "Member") {
    roleToSet = "rol_dHvkFCr7UgAp7HH5";
  }
  try {
    const response = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/roles/${roleToSet}/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
        body: JSON.stringify({
          users: [user?.user_id],
        }),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error:", errorDetails);
      throw new Error(`Failed to assign role: ${errorDetails.message}`);
    }

    return { success: true, message: "User role assigned successfully" };
  } catch (error) {
    console.error("Error assigning user role:", error);
    return { success: false, message: "User role assignment failed" };
  }
}
