import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { productId } = await request.json();

  if (!productId) {
    return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
  }

  try {
    await sql`DELETE FROM products WHERE id = ${productId}`;

    return NextResponse.json({ message: "Product removed" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to remove product" },
      { status: 500 }
    );
  }
}
