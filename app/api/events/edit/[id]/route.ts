import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const starting = formData.get("date") as string;
    const location = formData.get("location") as string;
    const price = formData.get("price") as string;
    const amount = formData.get("amount") as string;
    const categories = formData.get("categories") as string;
    const userRole = formData.get("userRole") as unknown as string[];
    const userId = formData.get("userId") as string;
    const eventId = formData.get("id") as string;

    await sql`
      UPDATE events
      SET title = ${title}, starting = ${starting}, location = ${location}, price = ${price}, amount = ${amount}, category = ${categories}, description = ${description}
      WHERE id = ${eventId};
    `;

    const result =
      await sql`SELECT created_by FROM events WHERE id = ${eventId}`;
    const createdBy = result.rows[0]?.created_by;

    if (!userRole.includes("Admin") && userId !== createdBy) {
      return NextResponse.json(
        { message: "Permission denied" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { message: "Event has been updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Event update failed" },
      { status: 500 }
    );
  }
}
