import { eq, asc } from "drizzle-orm";

import { db } from "..";
import { feeds, users } from "../schema";


export async function addFeed(name: string, url: string, userId: string) {
  const [result] = await db
    .insert(feeds)
    .values({ name: name, url: url, userId: userId })
    .returning();
  return result;
}

export async function getFeeds() {
  const result = await db
    .select({
      feedName: feeds.name,
      feedURL: feeds.url,
      userName: users.name,
    })
    .from(feeds)
    .innerJoin(users, eq(users.id, feeds.userId))
    .orderBy(
      asc(users.name),
      asc(feeds.name)
    );

  return result;
}

