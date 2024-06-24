import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();

    const id = formData.get("blogId") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const description = formData.get("description") as string;
    const userId = formData.get("userId") as string;

    await sql`
      UPDATE blogs
      SET title = ${title}, content = ${content}, description = ${description}
      WHERE id = ${id};
    `;

    const result = await sql`SELECT author_id FROM blogs WHERE id = ${id}`;
    const authorId = result.rows[0]?.author_id;

    if (userId !== authorId) {
      return NextResponse.json(
        { message: "Permission denied" },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { message: "Blog post has been updated" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Blog post update failed" },
      { status: 500 },
    );
  }
}
