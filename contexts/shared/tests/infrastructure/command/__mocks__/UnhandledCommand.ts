import { Command } from "../../../../src/domain/command/Command";

export class UnhandledCommand extends Command {
	static COMMAND_NAME = "unhandled.command";
}
