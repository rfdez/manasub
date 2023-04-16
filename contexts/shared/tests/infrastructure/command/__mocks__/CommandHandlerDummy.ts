import { CommandHandler } from "../../../../src/domain/command/CommandHandler";

import { DummyCommand } from "./DummyCommand";

export class CommandHandlerDummy implements CommandHandler<DummyCommand> {
	subscribedTo(): DummyCommand {
		return DummyCommand;
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	async handle(_command: DummyCommand): Promise<void> {}
}
