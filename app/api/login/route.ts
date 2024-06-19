import { getSession } from "@auth0/nextjs-auth0";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: NextRequest) => {
  const data = await getSession();

  let id, email, image, name;

  if (data) {
    id = data.user.sub;
    email = data.user.email;
    image = data.user.picture;
    name = data.user.nickname;
  }

  try {
    const res = await sql`SELECT * FROM users WHERE user_id = ${String(id)}`;
    if (res.rowCount === 0) {
      await sql`INSERT INTO users (user_id, name, email, image) VALUES (${String(id)}, ${String(name)}, ${String(email)}, ${String(image)})`;
    }
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }

  return redirect("/");
};
