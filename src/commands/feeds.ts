import { readConfig } from "../config";
import { Feed, User } from "../lib/db/schema";
import { addFeed } from "../lib/db/queries/feeds";
import { getUser } from "../lib/db/queries/users";


export async function handlerAddfeed(cmdName: string, ...args: string[]) {
  if (args.length !== 2) {
    throw new Error(`Usage: ${cmdName} <feed name> <feed URL>`);
  }

  const feedName = args[0];
  const feedURL = args[1];

  const config = readConfig();
  const user = await getUser(config.currentUserName);
  if (!user) {
    throw new Error(`Current user does not exist "${config.currentUserName}".`);
  }

  const feed = await addFeed(feedName, feedURL, user.id);
  printFeed(feed, user);
}

function printFeed(feed: Feed, user: User) {
  console.log(`ID:       ${feed.id}`);
  console.log(`Created:  ${feed.createdAt}`);
  console.log(`Updated:  ${feed.updatedAt}`);
  console.log(`Name:     ${feed.name}`);
  console.log(`URL:      ${feed.url}`);
  console.log(`User:     ${user.name}`);
}

