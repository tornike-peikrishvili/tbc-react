import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, eventId } = await request.json();

  if (!userId || !eventId) {
    return NextResponse.json(
      { error: "Invalid user or event id" },
      { status: 400 },
    );
  }

  try {
    await sql`DELETE FROM cart WHERE event_id = ${eventId} AND user_id = ${userId}`;

    return NextResponse.json({ message: "Removed from cart" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to remove from cart" },
      { status: 500 },
    );
  }
}
