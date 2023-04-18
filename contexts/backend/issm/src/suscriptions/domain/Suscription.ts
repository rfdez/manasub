import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { Primitives } from "../../shared/domain/Primitives";

import { SuscriptionBilling } from "./SuscriptionBilling";
import { SuscriptionEndDate } from "./SuscriptionEndDate";
import { SuscriptionEndDateBeforeStartDate } from "./SuscriptionEndDateBeforeStartDate";
import { SuscriptionId } from "./SuscriptionId";
import { SuscriptionName } from "./SuscriptionName";
import { SuscriptionStartDate } from "./SuscriptionStartDate";

export class Suscription extends AggregateRoot {
	readonly id: SuscriptionId;
	readonly name: SuscriptionName;
	readonly billing: SuscriptionBilling;
	readonly startDate: SuscriptionStartDate;
	readonly endDate?: SuscriptionEndDate;

	constructor(
		id: SuscriptionId,
		name: SuscriptionName,
		billing: SuscriptionBilling,
		startDate: SuscriptionStartDate,
		endDate?: SuscriptionEndDate
	) {
		super();
		this.id = id;
		this.name = name;
		this.billing = billing;
		this.startDate = startDate;
		this.endDate = endDate;

		this.ensureEndDateIsAfterStartDate();
	}

	static create(
		id: SuscriptionId,
		name: SuscriptionName,
		billing: SuscriptionBilling,
		startDate: SuscriptionStartDate,
		endDate?: SuscriptionEndDate
	): Suscription {
		return new Suscription(id, name, billing, startDate, endDate);
	}

	static fromPrimitives(
		id: string,
		name: string,
		billing: string,
		startDate: Date,
		endDate?: Date
	): Suscription {
		return new Suscription(
			new SuscriptionId(id),
			new SuscriptionName(name),
			new SuscriptionBilling(billing),
			new SuscriptionStartDate(startDate),
			endDate ? new SuscriptionEndDate(endDate) : undefined
		);
	}

	toPrimitives(): Primitives<Suscription> {
		return {
			id: this.id.value,
			name: this.name.value,
			billing: this.billing.value,
			startDate: this.startDate.value,
			endDate: this.endDate ? this.endDate.value : undefined,
		};
	}

	private ensureEndDateIsAfterStartDate(): void {
		if (this.endDate && this.endDate.value < this.startDate.value) {
			throw new SuscriptionEndDateBeforeStartDate(this.startDate.value, this.endDate.value);
		}
	}
}
