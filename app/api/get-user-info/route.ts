import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const userId = request.headers.get("authorization");

  try {
    const user = await sql`
      SELECT * FROM users WHERE user_id = ${userId};
    `;
    return NextResponse.json({ user: user.rows[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
