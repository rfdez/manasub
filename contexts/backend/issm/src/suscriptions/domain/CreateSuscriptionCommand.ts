import { Command } from "@manasub/shared-context/src/domain/command/Command";

type Params = {
	id: string;
	service: string;
};

export class CreateSuscriptionCommand extends Command {
	id: string;
	service: string;

	constructor({ id, service }: Params) {
		super();
		this.id = id;
		this.service = service;
	}
}
