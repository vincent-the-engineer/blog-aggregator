import {
  type CommandsRegistry,
  registerCommand,
  runCommand
} from "./commands.js";
import { handlerLogin } from "./command_login.js";


function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: cli <command> [args...]");
    process.exit(1);
  }

  const cmdName = args[0];
  const cmdArgs = args.slice(1);


  const cmdsRegistry: CommandsRegistry = {};
  registerCommand(cmdsRegistry, "login", handlerLogin);

  try {
    runCommand(cmdsRegistry, cmdName, ...cmdArgs);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error running command ${cmdName}: ${err.message}`);
    } else {
      console.error(`Error running command ${cmdName}: ${err}`);
    }
    process.exit(1);
  }
}


main();

