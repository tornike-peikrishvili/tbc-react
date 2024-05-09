import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.replace("/api/edit-user/", "");
  const { name, email, age } = await request.json();

  try {
    if (!name || !email || !age || !id)
      throw new Error("Name, Email, Age, Id are required");

    await sql`UPDATE users SET name = ${name}, email = ${email}, age = ${age} WHERE id = ${Number(id)};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const users = await sql`SELECT * FROM users;`;
  return NextResponse.json({ users }, { status: 200 });
  ``;
}
