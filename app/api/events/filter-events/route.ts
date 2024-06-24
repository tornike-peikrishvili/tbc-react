import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const location = searchParams.get("location");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const date = searchParams.get("date");
  const rating = searchParams.get("rating");
  const eventType = searchParams.get("eventType");
  const search = searchParams.get("search");

  let query = "SELECT * FROM events WHERE approved = true";
  const values: any[] = [];

  if (category && category !== "All Categories") {
    query += ` AND category ? $${values.length + 1}`;
    values.push(category);
  }

  if (location && location !== "All Locations") {
    query += " AND location = $" + (values.length + 1);
    values.push(location);
  }

  if (minPrice) {
    query += " AND price >= $" + (values.length + 1);
    values.push(minPrice);
  }

  if (maxPrice) {
    query += " AND price <= $" + (values.length + 1);
    values.push(maxPrice);
  }

  if (date) {
    query += " AND DATE(starting) = $" + (values.length + 1);
    values.push(date);
  }

  if (rating && rating !== "All Ratings") {
    query += " AND rating >= $" + (values.length + 1);
    values.push(parseInt(rating));
  }

  if (eventType && eventType !== "All Types") {
    query += " AND event_type = $" + (values.length + 1);
    values.push(eventType);
  }

  if (search) {
    query +=
      " AND (title ILIKE $" +
      (values.length + 1) +
      " OR description ILIKE $" +
      (values.length + 1) +
      ")";
    values.push(`%${search}%`);
  }

  try {
    const result = await sql.query(query, values);
    return NextResponse.json({ events: result.rows }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
