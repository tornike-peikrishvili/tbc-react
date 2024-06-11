"use server";

import { revalidatePath } from "next/cache";
import {
  // createUser,
  // updateUser,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "./api";
import { sql } from "@vercel/postgres";

// export async function createUserAction(formData: FormData) {
//   const { name, email, age } = Object.fromEntries(formData);
//   createUser(name as string, email as string, age as string);
//   revalidatePath("/users");
// }

// export async function updateUserAction(formData: FormData) {
//   const { id, name, email, age } = Object.fromEntries(formData);
//   updateUser(id as string, name as string, email as string, age as string);
//   revalidatePath("/users");
// }

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

// Auth0Managment

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

// Delete User

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

// Create User

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
          connection: "Email-Password-Authentication",
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

// Update User

export async function updateUser(userId: string, formData: FormData) {
  const token = await AuthToken();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

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
      }
    );

    if (!response.ok) {
      console.log("Error");
    }
    const updatedUser = await response.json();
    console.log("Updated User:", updatedUser);

    await sql`UPDATE users SET name = ${name}, email = ${email} WHERE user_id = ${userId}`;

    return { message: "User has been updated", status: 200 };
  } catch (error) {
    console.log(error);
    return { message: "User update failed", status: 500 };
  }
}
