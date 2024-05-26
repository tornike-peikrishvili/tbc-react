import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, description, price } = await request.json();

  if (!name || price == null) {
    return NextResponse.json(
      { error: "Invalid product data" },
      { status: 400 }
    );
  }

  try {
    await sql`INSERT INTO products (name, description, price) VALUES (${name}, ${description}, ${price})`;

    return NextResponse.json({ message: "Product added" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to add product" },
      { status: 500 }
    );
  }
}
