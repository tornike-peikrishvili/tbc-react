import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy");
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");

  let query = "SELECT * FROM blogs WHERE approved = true";
  const values: any[] = [];

  if (search) {
    query +=
      " AND (title ILIKE $" +
      (values.length + 1) +
      " OR description ILIKE $" +
      (values.length + 1) +
      ")";
    values.push(`%${search}%`);
  }

  if (category && category !== "All Categories") {
    query += ` AND category ? $${values.length + 1}`;
    values.push(category);
  }

  if (tag && tag !== "All Tags") {
    query += ` AND tag ? $${values.length + 1}`;
    values.push(tag);
  }

  if (sortBy === "newest") {
    query += " ORDER BY published_at DESC";
  } else if (sortBy === "oldest") {
    query += " ORDER BY published_at ASC";
  }

  try {
    const result = await sql.query(query, values);
    return NextResponse.json({ blogs: result.rows }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
