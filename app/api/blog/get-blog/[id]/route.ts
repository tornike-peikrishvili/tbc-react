import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.replace("/api/blog/get-blog/", "");
  try {
    if (!id) {
      throw new Error("Blog not found");
    }
    const blogs = await sql`SELECT * FROM blogs WHERE id = ${Number(id)}`;
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
