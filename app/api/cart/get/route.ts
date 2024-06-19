import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(request: NextRequest) {
  const { userId } = await request.json();
  try {
    const cartItems = await sql`
      SELECT 
      events.title,
      events.price,
      events.description,
      cart.quantity,
      cart.event_id,
      cart.id
      FROM cart 
      JOIN 
      events ON cart.event_id = events.id 
      WHERE cart.user_id = ${userId}
    `.catch((error) => console.log(error));
    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
