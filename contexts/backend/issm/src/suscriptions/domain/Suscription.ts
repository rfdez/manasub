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

	nextPayment(): Date {
		if (this.startDate.value > new Date()) {
			return this.startDate.value;
		}

		const interval = this.billing.inMonths(),
			startDate = this.startDate.value;

		let nextPayment = new Date(startDate.setMonth(startDate.getMonth() + interval));

		while (nextPayment < new Date()) {
			nextPayment = new Date(nextPayment.setMonth(nextPayment.getMonth() + interval));
		}

		if (this.endDate && this.endDate.value <= nextPayment) {
			return this.endDate.value;
		}

		return nextPayment;
	}

	remaningTime(): string {
		const nextPayment = this.nextPayment(),
			diff = nextPayment.getTime() - new Date().getTime(),
			days = Math.ceil(diff / (1000 * 60 * 60 * 24)),
			months = Math.floor(days / 30),
			monthsText = `${months} month${months > 1 ? "s" : ""}`,
			daysText = `${days} day${days > 1 ? "s" : ""}`,
			remaningTimeText = `${months > 0 ? `${monthsText}${days > 0 ? " " : ""}` : ""}${
				days > 0 ? daysText : ""
			}`;

		return remaningTimeText;
	}

	private ensureEndDateIsAfterStartDate(): void {
		if (this.endDate && this.endDate.value < this.startDate.value) {
			throw new SuscriptionEndDateBeforeStartDate(this.startDate.value, this.endDate.value);
		}
	}
}
