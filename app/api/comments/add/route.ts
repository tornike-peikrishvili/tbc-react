// api/comments/add.ts
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
  const { blogId, userId, content } = await request.json();

  try {
    const result = await sql`
      INSERT INTO comments (blog_id, user_id, content)
      VALUES (${blogId}, ${userId}, ${content})
      RETURNING id, content, created_at, user_id
    `;

    const userInfo = await sql`
      SELECT name, image FROM users WHERE user_id = ${userId}
    `;

    const comment = {
      ...result.rows[0],
      user_name: userInfo.rows[0].name,
      user_image: userInfo.rows[0].image,
    };

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
