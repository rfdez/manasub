import { Service } from "diod";

import { Command } from "@manasub/shared-context/src/domain/command/Command";
import { CommandHandler } from "@manasub/shared-context/src/domain/command/CommandHandler";

import { CreateSuscriptionCommand } from "../../domain/CreateSuscriptionCommand";
import { SuscriptionId } from "../../domain/SuscriptionId";
import { SuscriptionName } from "../../domain/SuscriptionName";

import { SuscriptionCreator } from "./SuscriptionCreator";

@Service()
export class CreateSuscriptionCommandHandler implements CommandHandler<CreateSuscriptionCommand> {
	constructor(private readonly suscriptionCreator: SuscriptionCreator) {}

	subscribedTo(): Command {
		return CreateSuscriptionCommand;
	}

	async handle(command: CreateSuscriptionCommand): Promise<void> {
		const id = new SuscriptionId(command.id),
			name = new SuscriptionName(command.name);

		await this.suscriptionCreator.run({ id, name });
	}
}
