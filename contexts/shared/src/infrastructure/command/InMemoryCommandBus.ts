import { Service } from "diod";

import { Command } from "../../domain/command/Command";
import { CommandBus } from "../../domain/command/CommandBus";

import { CommandHandlers } from "./CommnadHandlers";

@Service()
export class InMemoryCommandBus implements CommandBus {
	constructor(private readonly commandHandlers: CommandHandlers) {}

	async dispatch(command: Command): Promise<void> {
		const handler = this.commandHandlers.get(command);

		await handler.handle(command);
	}
}
