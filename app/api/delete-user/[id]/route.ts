import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const revalidate = 0;

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.replace("/api/delete-user/", "");
  try {
    if (!id) throw new Error("ID is required");
    await sql`DELETE FROM users WHERE id = ${Number(id)};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  const users = await sql`SELECT * FROM users;`;
  return NextResponse.json({ users }, { status: 200 });
}
