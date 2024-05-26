import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  try {
    await sql`
      DELETE FROM cart 
      WHERE user_id = ${userId}`;

    return NextResponse.json({ message: "Cart cleared" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to clear cart" },
      { status: 500 }
    );
  }
}
