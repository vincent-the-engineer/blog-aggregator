import { sql } from "drizzle-orm";

import { db } from "..";


export async function resetDatabase() {
  await db.execute(sql`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`);
}

