import { setUser } from "../config";
import { createUser, getUser } from "../lib/db/queries/users";


export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`Usage: ${cmdName} <username>`);
  }

  const username = args[0];

  const user = await getUser(username);
  if (!user) {
    throw new Error(`User does not exist "${username}".`);
  }

  setUser(user.name);
  console.log(`User has been set to "${username}".`);
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`Usage: ${cmdName} <username>`);
  }

  const username = args[0];

  const user = await createUser(username);
  if (!user) {
    throw new Error("Cannot create user.");
  }

  setUser(user.name);
  console.log(`New user created "${user.name}".`);
}

export async function handlerReset(cmdName: string, ...args: string[]) {
  if (args.length !== 0) {
    throw new Error(`Usage: ${cmdName}`);
  }

  await db.execute(sql`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`);
}

