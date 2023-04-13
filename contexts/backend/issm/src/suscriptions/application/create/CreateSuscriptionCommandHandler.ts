import { Service } from "diod";

import { Command } from "@manasub/shared-context/src/domain/command/Command";
import { CommandHandler } from "@manasub/shared-context/src/domain/command/CommandHandler";
import Logger from "@manasub/shared-context/src/domain/Logger";

import { CreateSuscriptionCommand } from "../../domain/CreateSuscriptionCommand";

@Service()
export class CreateSuscriptionCommandHandler implements CommandHandler<CreateSuscriptionCommand> {
	constructor(private readonly logger: Logger) {}

	subscribedTo(): Command {
		return CreateSuscriptionCommand;
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async handle(command: CreateSuscriptionCommand): Promise<void> {
		this.logger.info(`Suscription created: ${command.id} - ${command.service}`);
	}
}
