"use server";
import { cookies } from "next/headers";

export async function setTheme(theme: string) {
  cookies().set("theme", theme, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  });
}
