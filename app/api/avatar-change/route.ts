import { put } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const file = formData.get("file") as File;
  const userId = formData.get("userId") as string;

  if (!file || !userId) {
    return NextResponse.json(
      { error: "No file or user provided" },
      { status: 400 },
    );
  }

  const blob = await put(
    `/users/${userId}/profile-picture/${file.name}`,
    file,
    {
      access: "public",
    },
  );

  const url = blob.url;

  try {
    await sql`UPDATE users SET image=${url} WHERE user_id=${userId};`;
    return NextResponse.json(
      { error: "Profile Picture Updated" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating database:", error);
    return NextResponse.json(
      { error: "Failed to update database" },
      { status: 500 },
    );
  }
}
