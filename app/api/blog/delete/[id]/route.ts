import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.replace("/api/blog/delete/", "");
    const { userId, userRole } = await request.json();

    const result = await sql`SELECT * FROM blogs WHERE id = ${id}`;
    const blog = result.rows[0];

    if (userRole !== "Admin" && userId !== blog?.author_id) {
      return NextResponse.json(
        { message: "Permission denied" },
        { status: 403 },
      );
    }

    await sql`DELETE FROM blogs WHERE id = ${id}`;

    return NextResponse.json(
      { message: "Blog post has been deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Blog post deletion failed" },
      { status: 500 },
    );
  }
}
