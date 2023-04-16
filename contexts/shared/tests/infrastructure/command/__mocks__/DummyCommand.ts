import { Command } from "../../../../src/domain/command/Command";

export class DummyCommand extends Command {
	static COMMAND_NAME = "handled.command";
}
