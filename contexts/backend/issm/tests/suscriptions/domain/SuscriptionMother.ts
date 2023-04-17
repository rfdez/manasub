import { Suscription } from "../../../src/suscriptions/domain/Suscription";
import { SuscriptionBilling } from "../../../src/suscriptions/domain/SuscriptionBilling";
import { SuscriptionId } from "../../../src/suscriptions/domain/SuscriptionId";
import { SuscriptionName } from "../../../src/suscriptions/domain/SuscriptionName";

import { SuscriptionBillingMother } from "./SuscriptionBillingMother";
import { SuscriptionIdMother } from "./SuscriptionIdMother";
import { SuscriptionNameMother } from "./SuscriptionNameMother";

export class SuscriptionMother {
	static create(
		id: SuscriptionId,
		name: SuscriptionName,
		billing: SuscriptionBilling
	): Suscription {
		return new Suscription(id, name, billing);
	}

	static from(primitives: { id: string; name: string; billing: string }): Suscription {
		return this.create(
			SuscriptionIdMother.create(primitives.id),
			SuscriptionNameMother.create(primitives.name),
			SuscriptionBillingMother.create(primitives.billing)
		);
	}

	static random(): Suscription {
		return this.create(
			SuscriptionIdMother.random(),
			SuscriptionNameMother.random(),
			SuscriptionBillingMother.random()
		);
	}
}
