"use server";

import { sql } from "@vercel/postgres";

export async function getApproveEvents() {
  try {
    const events = await sql`SELECT * FROM events WHERE approved = true;`;
    return { events: events.rows, status: 200 };
  } catch (error) {
    console.log(error);
    return { events: [], message: "Failed to fetch events", status: 500 };
  }
}
