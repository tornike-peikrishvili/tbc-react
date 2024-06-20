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
    const res =
      await sql`SELECT * FROM cart WHERE event_id = ${eventId} AND user_id = ${userId}`;

    if (res.rowCount > 0) {
      await sql`UPDATE cart SET quantity = quantity + 1 WHERE event_id = ${eventId} AND user_id = ${userId}`;
    } else {
      await sql`INSERT INTO cart (user_id, event_id, quantity) VALUES (${userId}, ${eventId}, 1)`;
    }

    return NextResponse.json({ message: "Added to cart" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to Add in cart" },
      { status: 500 },
    );
  }
}
