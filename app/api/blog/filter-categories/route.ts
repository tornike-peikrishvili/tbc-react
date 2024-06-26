import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const result =
      await sql`SELECT DISTINCT jsonb_array_elements_text(category) as category FROM blogs WHERE category IS NOT NULL;`;
    const categories = result.rows.map((row) => row.category).filter(Boolean);
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
