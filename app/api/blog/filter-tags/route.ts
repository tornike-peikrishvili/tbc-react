import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const result =
      await sql`SELECT DISTINCT jsonb_array_elements_text(tag) as tag FROM blogs WHERE tag IS NOT NULL;`;
    const tags = result.rows.map((row) => row.tag).filter(Boolean);
    return NextResponse.json({ tags }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
