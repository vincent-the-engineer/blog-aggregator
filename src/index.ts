import {
  handlerAddfeed,
} from "./commands/feeds";
import {
  handlerAgg,
} from "./commands/aggregate";
import {
  type CommandsRegistry,
  registerCommand,
  runCommand
} from "./commands/commands";
import {
  handlerReset,
} from "./commands/reset";
import {
  handlerLogin,
  handlerRegister,
  handlerUsers,
} from "./commands/users";


async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: cli <command> [args...]");
    process.exit(1);
  }

  const cmdName = args[0];
  const cmdArgs = args.slice(1);


  const cmdsRegistry: CommandsRegistry = {};
  registerCommand(cmdsRegistry, "addfeed", handlerAddfeed);
  registerCommand(cmdsRegistry, "agg", handlerAgg);
  registerCommand(cmdsRegistry, "login", handlerLogin);
  registerCommand(cmdsRegistry, "register", handlerRegister);
  registerCommand(cmdsRegistry, "reset", handlerReset);
  registerCommand(cmdsRegistry, "users", handlerUsers);

  try {
    await runCommand(cmdsRegistry, cmdName, ...cmdArgs);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error running command ${cmdName}: ${err.message}`);
    } else {
      console.error(`Error running command ${cmdName}: ${err}`);
    }
    process.exit(1);
  }
  process.exit(0);
}


main();

