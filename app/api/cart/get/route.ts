import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(request: NextRequest) {
  const { userId } = await request.json();
  try {
    const cartItems = await sql`
      SELECT 
      products.name,
      products.price,
      products.description,
      cart.quantity,
      cart.product_id,
      cart.id
      FROM cart 
      JOIN 
      products ON cart.product_id = products.id 
      WHERE cart.user_id = ${Number(userId)}
    `.catch((error) => console.log(error));
    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
