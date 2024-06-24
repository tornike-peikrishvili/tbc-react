import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.replace("/api/events/get-event/", "");
  try {
    if (!id) {
      throw new Error("Event not found");
    }
    const events = await sql`SELECT * FROM events WHERE id = ${Number(id)}`;
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
