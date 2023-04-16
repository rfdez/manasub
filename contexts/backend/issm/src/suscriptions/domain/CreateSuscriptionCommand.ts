import { Command } from "@manasub/shared-context/src/domain/command/Command";

type Params = {
	id: string;
	name: string;
};

export class CreateSuscriptionCommand extends Command {
	id: string;
	name: string;

	constructor({ id, name }: Params) {
		super();
		this.id = id;
		this.name = name;
	}
}
