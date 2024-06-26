"use server";

import { cookies } from "next/headers";

export async function retrieveTheme() {
  const theme = cookies().get("theme");

  return theme?.value ? theme.value : "system";
}
