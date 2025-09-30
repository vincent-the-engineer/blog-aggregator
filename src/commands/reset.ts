import { resetDatabase } from "../lib/db/queries/reset";


export async function handlerReset(cmdName: string, ...args: string[]) {
  if (args.length !== 0) {
    throw new Error(`Usage: ${cmdName}`);
  }

  await resetDatabase();
}

