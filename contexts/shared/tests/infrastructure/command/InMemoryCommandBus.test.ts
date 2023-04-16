import { CommandNotRegisteredError } from "../../../src/domain/command/CommandNotRegisteredError";
import { CommandHandlers } from "../../../src/infrastructure/command/CommnadHandlers";
import { InMemoryCommandBus } from "../../../src/infrastructure/command/InMemoryCommandBus";

import { CommandHandlerDummy } from "./__mocks__/CommandHandlerDummy";
import { DummyCommand } from "./__mocks__/DummyCommand";
import { UnhandledCommand } from "./__mocks__/UnhandledCommand";

describe("InMemoryCommandBus", () => {
	test("throws an error if dispatches a command without handler", async () => {
		const unhandledCommand = new UnhandledCommand(),
			commandHandlers = new CommandHandlers([]),
			commandBus = new InMemoryCommandBus(commandHandlers);

		await expect(commandBus.dispatch(unhandledCommand)).rejects.toBeInstanceOf(
			CommandNotRegisteredError
		);
	});

	test("accepts a command with handler", async () => {
		const dummyCommand = new DummyCommand(),
			commandHandlerDummy = new CommandHandlerDummy(),
			commandHandlers = new CommandHandlers([commandHandlerDummy]),
			commandBus = new InMemoryCommandBus(commandHandlers);

		await commandBus.dispatch(dummyCommand);
	});
});
