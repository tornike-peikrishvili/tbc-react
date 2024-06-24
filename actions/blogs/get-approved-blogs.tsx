"use server";

import { sql } from "@vercel/postgres";

export async function getApprovedBlogs() {
  try {
    const blogs = await sql`SELECT * FROM blogs WHERE approved = true;`;
    return { blogs: blogs.rows, status: 200 };
  } catch (error) {
    console.log(error);
    return { events: [], message: "Failed to fetch blogs", status: 500 };
  }
}
