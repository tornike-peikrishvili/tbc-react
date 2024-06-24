import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get("commentId");
    const userId = searchParams.get("userId");

    if (!commentId) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 },
      );
    }

    const result = await sql`
      SELECT 
        (SELECT COUNT(*) FROM reactions WHERE comment_id = ${commentId} AND type = 'like') AS likes,
        (SELECT COUNT(*) FROM reactions WHERE comment_id = ${commentId} AND type = 'dislike') AS dislikes,
        (SELECT type FROM reactions WHERE comment_id = ${commentId} AND user_id = ${userId}) AS user_reaction
    `;

    const { likes, dislikes, user_reaction } = result.rows[0];

    return NextResponse.json({
      likes: parseInt(likes),
      dislikes: parseInt(dislikes),
      userReaction: user_reaction,
    });
  } catch (error) {
    console.error("Error fetching reaction counts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { commentId, userId, type } = await request.json();

    const result = await sql`
      INSERT INTO reactions (comment_id, user_id, type)
      VALUES (${commentId}, ${userId}, ${type})
      ON CONFLICT (comment_id, user_id)
      DO UPDATE SET type = ${type}
      RETURNING id, type
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error in reaction API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
