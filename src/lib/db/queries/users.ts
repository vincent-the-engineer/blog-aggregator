import { asc, eq, sql } from "drizzle-orm";

import { db } from "..";
import { users } from "../schema";


export async function createUser(name: string) {
  const [result] = await db
    .insert(users)
    .values({ name: name })
    .returning();
  return result;
}

export async function getUser(name: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(sql`lower(${users.name})`, name.toLowerCase()));

  if (result.length === 0) {
    return;
  }
  return result[0];
}

export async function getUsers() {
  return await db.select().from(users).orderBy(asc(users.name));
}

