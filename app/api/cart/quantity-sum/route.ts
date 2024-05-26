import { sql } from "@vercel/postgres";

export async function getCartQuantitySum(user_id: string) {
  const { rows } =
    await sql`SELECT SUM(quantity) AS quantity_sum FROM cart WHERE user_id = ${user_id}`;

  return rows[0].quantity_sum;
}
