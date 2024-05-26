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
    const res = await sql`
      UPDATE cart 
      SET quantity = quantity + 1 
      WHERE product_id = ${productId} 
      AND user_id = ${userId}
      RETURNING *`;

    return NextResponse.json(
      { message: "Quantity increased", item: res.rows[0] },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to increase quantity" },
      { status: 500 }
    );
  }
}
