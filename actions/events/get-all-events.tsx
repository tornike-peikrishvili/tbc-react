"use server";

import { sql } from "@vercel/postgres";

export async function getAllEvents() {
  try {
    const events = await sql`SELECT * FROM events`;

    return { events: events.rows, status: 200 };
  } catch (error) {
    console.log(error);
    return { events: [], message: "Failed to fetch events", status: 500 };
  }
}
