import { fetchFeed } from "../rss";


export async function handlerAgg(cmdName: string, ...args: string[]) {
  if (args.length !== 0) {
    throw new Error(`Usage: ${cmdName}`);
  }

  const feedURL = "https://www.wagslane.dev/index.xml";

  const feed = await fetchFeed(feedURL);
  const jsonString = JSON.stringify(feed, null, 2);
  console.log(jsonString);
}

