import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, productId } = await request.json();

  if (!userId || !productId) {
    return NextResponse.json(
      { error: "Invalid user or product id" },
      { status: 400 }
    );
  }

  try {
    await sql`DELETE FROM cart WHERE product_id = ${productId} AND user_id = ${userId}`;

    return NextResponse.json({ message: "Removed from cart" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to remove from cart" },
      { status: 500 }
    );
  }
}
