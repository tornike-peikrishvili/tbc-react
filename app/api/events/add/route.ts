import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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
    const userName = formData.get("userName") as string;

    if (!userRole.includes("Admin") && !userRole.includes("Organizer")) {
      return NextResponse.json(
        { message: "Permission denied" },
        { status: 403 },
      );
    }

    await sql`
      INSERT INTO events (title, description, starting, organizer, category, price, amount, location, approved, created_by)
      VALUES (${title}, ${description}, ${starting}, ${userName}, ${categories},  ${Number(price)}, ${Number(amount)}, ${location}, false, ${userId})
    `;

    return NextResponse.json(
      { message: "Event has been submitted for approval" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Event creation failed" },
      { status: 500 },
    );
  }
}
