import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { Primitives } from "../../shared/domain/Primitives";

import { SuscriptionBilling } from "./SuscriptionBilling";
import { SuscriptionId } from "./SuscriptionId";
import { SuscriptionName } from "./SuscriptionName";

export class Suscription extends AggregateRoot {
	readonly id: SuscriptionId;
	readonly name: SuscriptionName;
	readonly billing: SuscriptionBilling;

	constructor(id: SuscriptionId, name: SuscriptionName, billing: SuscriptionBilling) {
		super();
		this.id = id;
		this.name = name;
		this.billing = billing;
	}

	static create(
		id: SuscriptionId,
		name: SuscriptionName,
		billing: SuscriptionBilling
	): Suscription {
		return new Suscription(id, name, billing);
	}

	static fromPrimitives(id: string, name: string, billing: string): Suscription {
		return new Suscription(
			new SuscriptionId(id),
			new SuscriptionName(name),
			new SuscriptionBilling(billing)
		);
	}

	toPrimitives(): Primitives<Suscription> {
		return {
			id: this.id.value,
			name: this.name.value,
			billing: this.billing.value,
		};
	}
}
