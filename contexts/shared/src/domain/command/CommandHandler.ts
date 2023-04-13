import { Command } from "./Command";

export abstract class CommandHandler<T extends Command> {
	abstract subscribedTo(): Command;
	abstract handle(command: T): Promise<void>;
}
