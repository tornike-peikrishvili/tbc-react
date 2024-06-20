"use server";

import { sql } from "@vercel/postgres";

export async function getPendingEvents() {
  try {
    const events = await sql`SELECT * FROM events WHERE approved = false;`;
    return { events: events.rows, status: 200 };
  } catch (error) {
    console.log(error);
    return { events: [], message: "Failed to fetch events", status: 500 };
  }
}
