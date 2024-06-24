import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const userId = request.headers.get("authorization");

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const blogs = await sql`
      SELECT * FROM blogs WHERE author_id = ${userId};
    `;
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching blogs" },
      { status: 500 },
    );
  }
}
