import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const userId = request.headers.get("authorization");

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const events = await sql`
      SELECT * FROM events WHERE created_by = ${userId};
    `;
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
