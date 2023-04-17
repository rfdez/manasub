import { Suscription } from "../../../src/suscriptions/domain/Suscription";
import { SuscriptionId } from "../../../src/suscriptions/domain/SuscriptionId";
import { SuscriptionName } from "../../../src/suscriptions/domain/SuscriptionName";

import { SuscriptionIdMother } from "./SuscriptionIdMother";
import { SuscriptionNameMother } from "./SuscriptionNameMother";

export class SuscriptionMother {
	static create(id: SuscriptionId, name: SuscriptionName): Suscription {
		return new Suscription(id, name);
	}

	static from(primitives: { id: string; name: string }): Suscription {
		return this.create(
			SuscriptionIdMother.create(primitives.id),
			SuscriptionNameMother.create(primitives.name)
		);
	}

	static random(): Suscription {
		return this.create(SuscriptionIdMother.random(), SuscriptionNameMother.random());
	}
}
