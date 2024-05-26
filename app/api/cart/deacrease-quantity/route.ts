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
      SELECT quantity FROM cart 
      WHERE product_id = ${productId} 
      AND user_id = ${userId}`;

    const quantity = res.rows[0].quantity;

    if (quantity > 1) {
      await sql`
        UPDATE cart 
        SET quantity = quantity - 1 
        WHERE product_id = ${productId} 
        AND user_id = ${userId}`;
      return NextResponse.json(
        { message: "Quantity decreased" },
        { status: 200 }
      );
    } else {
      await sql`
        DELETE FROM cart 
        WHERE product_id = ${productId} 
        AND user_id = ${userId}`;
      return NextResponse.json(
        { message: "Item removed from cart" },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to decrease quantity" },
      { status: 500 }
    );
  }
}
