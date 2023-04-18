import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { Primitives } from "../../shared/domain/Primitives";

import { SuscriptionBilling } from "./SuscriptionBilling";
import { SuscriptionId } from "./SuscriptionId";
import { SuscriptionName } from "./SuscriptionName";
import { SuscriptionStartDate } from "./SuscriptionStartDate";

export class Suscription extends AggregateRoot {
	readonly id: SuscriptionId;
	readonly name: SuscriptionName;
	readonly billing: SuscriptionBilling;
	readonly startDate: SuscriptionStartDate;

	constructor(
		id: SuscriptionId,
		name: SuscriptionName,
		billing: SuscriptionBilling,
		startDate: SuscriptionStartDate
	) {
		super();
		this.id = id;
		this.name = name;
		this.billing = billing;
		this.startDate = startDate;
	}

	static create(
		id: SuscriptionId,
		name: SuscriptionName,
		billing: SuscriptionBilling,
		startDate: SuscriptionStartDate
	): Suscription {
		return new Suscription(id, name, billing, startDate);
	}

	static fromPrimitives(id: string, name: string, billing: string, startDate: Date): Suscription {
		return new Suscription(
			new SuscriptionId(id),
			new SuscriptionName(name),
			new SuscriptionBilling(billing),
			new SuscriptionStartDate(startDate)
		);
	}

	toPrimitives(): Primitives<Suscription> {
		return {
			id: this.id.value,
			name: this.name.value,
			billing: this.billing.value,
			startDate: this.startDate.value,
		};
	}
}
