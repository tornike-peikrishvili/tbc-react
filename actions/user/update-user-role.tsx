"use server";

import { AuthToken } from "../auth0/auth0-get-token";
import { getSession } from "@auth0/nextjs-auth0";

export async function assignRoleToUser(formData: FormData) {
  const token = await AuthToken();
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;

  const roleId = formData.get("role") as string;
  let roles;
  if (roleId === "Organizer") {
    roles = "rol_OcRZlkc7Y6kPF8v9";
  } else if (roleId === "Member") {
    roles = "rol_dHvkFCr7UgAp7HH5";
  } else {
    return { success: false, message: "Invalid role provided" };
  }
  try {
    const response = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
        body: JSON.stringify({
          roles: [roles],
        }),
      },
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
