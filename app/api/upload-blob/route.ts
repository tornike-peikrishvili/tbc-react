import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const filename = searchParams.get("filename");
  console.log("Received upload request for:", filename);

  if (!filename || !request.body) {
    console.error("No file provided");
    return NextResponse.json(new Error("No file provided"), { status: 400 });
  }

  try {
    const blob = await put(filename, request.body, {
      access: "public",
    });
    console.log("Blob created:", blob);
    return NextResponse.json(blob);
  } catch (error) {
    console.error("Error creating blob:", error);
    return NextResponse.json(
      { error: "Failed to create blob" },
      { status: 500 },
    );
  }
}
