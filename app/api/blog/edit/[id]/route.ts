import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();

    const id = formData.get("blogId") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const description = formData.get("description") as string;
    const categories = formData.get("categories") as string;
    const tags = formData.get("tags") as string;

    let imageUrl = null;
    const imageFile = formData.get("image") as File | null;
    if (imageFile && imageFile instanceof File) {
      const blob = await put(imageFile.name, imageFile, {
        access: "public",
      });
      imageUrl = blob.url;
    }

    let result;
    if (imageUrl) {
      // If a new image is uploaded, update the image column
      result = await sql`
        UPDATE blogs
        SET title = ${title}, 
            content = ${content}, 
            description = ${description},
            category = ${categories}, 
            tag = ${tags},
            image = ${JSON.stringify({ url: imageUrl })}
        WHERE id = ${id}
        RETURNING *;
      `;
    } else {
      // If no new image is uploaded, don't update the image column
      result = await sql`
        UPDATE blogs
        SET title = ${title}, 
            content = ${content}, 
            description = ${description},
            category = ${categories}, 
            tag = ${tags}
        WHERE id = ${id}
        RETURNING *;
      `;
    }

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Blog post has been updated", blog: result.rows[0] },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { message: "Blog post update failed", error: (error as Error).message },
      { status: 500 },
    );
  }
}
