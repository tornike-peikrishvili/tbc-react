import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.replace("/api/events/delete/", "");
    const { userId, userRole } = await request.json();

    const result = await sql`SELECT * FROM events WHERE id = ${id}`;
    const event = result.rows[0];

    if (userRole !== "Admin" && userId !== event?.created_by) {
      return NextResponse.json(
        { message: "Permission denied" },
        { status: 403 }
      );
    }

    await sql`DELETE FROM events WHERE id = ${id}`;

    return NextResponse.json(
      { message: "Event has been deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Event deletion failed" },
      { status: 500 }
    );
  }
}
