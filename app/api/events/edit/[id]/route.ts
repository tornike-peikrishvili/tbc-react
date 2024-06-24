import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();

    const eventId = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const starting = formData.get("date") as string;
    const location = formData.get("location") as string;
    const price = formData.get("price") as string;
    const amount = formData.get("amount") as string;
    const categories = formData.get("categories") as string;
    const userRole = formData.get("userRole") as unknown as string[];
    const userId = formData.get("userId") as string;
    const existingImages = JSON.parse(
      (formData.get("existingImages") as string) || "[]",
    );

    const result =
      await sql`SELECT created_by FROM events WHERE id = ${eventId}`;
    const createdBy = result.rows[0]?.created_by;

    if (!userRole.includes("Admin") && userId !== createdBy) {
      return NextResponse.json(
        { message: "Permission denied" },
        { status: 403 },
      );
    }

    // Handle new images
    const newImageFiles = formData.getAll("newImage") as File[];
    const newImageUrls = await Promise.all(
      newImageFiles.map(async (file) => {
        if (file.size > 0) {
          const blob = await put(file.name, file, {
            access: "public",
          });
          return blob.url;
        }
        return null;
      }),
    );

    // Combine existing and new image URLs, filtering out null values
    const updatedImageUrls = [...existingImages, ...newImageUrls].filter(
      Boolean,
    );

    await sql`
      UPDATE events
      SET title = ${title}, starting = ${starting}, location = ${location},
          price = ${price}, amount = ${amount}, category = ${categories},
          description = ${description}, images = ${JSON.stringify(updatedImageUrls)}
      WHERE id = ${eventId}
    `;

    return NextResponse.json(
      { message: "Event has been updated" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Event update failed" },
      { status: 500 },
    );
  }
}
