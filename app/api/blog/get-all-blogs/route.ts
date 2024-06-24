import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET() {
  try {
    const result = await sql`SELECT * FROM blogs;`;
    return NextResponse.json({ blogs: result.rows }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
