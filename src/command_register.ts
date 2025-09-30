import { DrizzleError } from "drizzle-orm/errors";
import type { PostgresError } from "postgres";

import { setUser } from "./config.js";
import { createUser } from "./lib/db/queries/users.js";


export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`Usage: ${cmdName} <username>`);
  }

  const username = args[0];

  try {
    const result = await createUser(username);
  } catch (error) {
    const pg = (error instanceof DrizzleError ? (error as any).cause : error) as Partial<PostgresError> | any;
    const code = pg?.code ?? pg?.cause?.code;
    if (code === "23505") {
      throw new Error(`Cannot register an existing username: ${username}`);
    }
    throw new Error("Failed to register user");
  }
  setUser(username);
  console.log(`New user created "${username}".`);
}

