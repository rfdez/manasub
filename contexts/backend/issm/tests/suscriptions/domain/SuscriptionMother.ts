import { CreateSuscriptionCommand } from "../../../src/suscriptions/domain/CreateSuscriptionCommand";
import { Suscription } from "../../../src/suscriptions/domain/Suscription";
import { SuscriptionId } from "../../../src/suscriptions/domain/SuscriptionId";
import { SuscriptionName } from "../../../src/suscriptions/domain/SuscriptionName";

import { SuscriptionIdMother } from "./SuscriptionIdMother";
import { SuscriptionNameMother } from "./SuscriptionNameMother";

export class SuscriptionMother {
	static create(id: SuscriptionId, name: SuscriptionName): Suscription {
		return new Suscription(id, name);
	}

	static from(command: CreateSuscriptionCommand): Suscription {
		return this.create(
			SuscriptionIdMother.create(command.id),
			SuscriptionNameMother.create(command.name)
		);
	}

	static random(): Suscription {
		return this.create(SuscriptionIdMother.random(), SuscriptionNameMother.random());
	}
}
