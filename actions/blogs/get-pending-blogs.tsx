"use server";

import { sql } from "@vercel/postgres";

export async function getPendingBlogs() {
  try {
    const blogs = await sql`SELECT * FROM blogs WHERE approved = false;`;
    return { blogs: blogs.rows, status: 200 };
  } catch (error) {
    console.log(error);
    return { events: [], message: "Failed to fetch Blogs", status: 500 };
  }
}
