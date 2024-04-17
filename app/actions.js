"use server";

import { cookies } from "next/headers";
import { AUTH_COOKIE_KEY } from "@/constants";

export async function login(username, password) {
  "use server";
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "kminchelle",
      password: "0lelplR",
    }),
  });

  const user = response.json();
  const cookieStore = cookies();
  if (username == "kminchelle" && password == "0lelplR") {
    cookieStore.set(AUTH_COOKIE_KEY, JSON.stringify(user));
  }
}
