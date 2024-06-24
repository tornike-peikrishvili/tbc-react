import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const description = formData.get("description") as string;
    const authorId = formData.get("userId") as string;

    let imageUrl = null;
    const imageFile = formData.get("image") as File | null;
    if (imageFile) {
      const blob = await put(imageFile.name, imageFile.stream(), {
        access: "public",
      });
      imageUrl = blob.url;
    }
    await sql`
      INSERT INTO blogs (title, content, author_id, description, image)
      VALUES (${title}, ${content}, ${authorId}, ${description}, ${imageUrl ? JSON.stringify({ url: imageUrl }) : null})
    `;

    return NextResponse.json(
      { message: "Blog post has been created" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Blog post creation failed" },
      { status: 500 },
    );
  }
}
