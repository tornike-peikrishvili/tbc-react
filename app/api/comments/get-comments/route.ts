// api/comments/get-comments.ts
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("blogId");

    if (blogId) {
      const result = await sql`
        SELECT c.id, c.content, c.created_at, u.name as user_name, u.image as user_image 
        FROM comments c
        JOIN users u ON c.user_id = u.user_id
        WHERE c.blog_id = ${blogId}
        ORDER BY c.created_at DESC
      `;
      return NextResponse.json(result.rows);
    } else {
      return NextResponse.json(
        { error: "BlogId is required" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error in GET comments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
