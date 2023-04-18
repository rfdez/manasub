import { StringValueObject } from "../../shared/domain/value-object/StringValueObject";

import { InvalidBillingPeriod } from "./InvalidBillingPeriod";

export enum BillingPeriod {
	MONTHLY = "monthly",
	YEARLY = "yearly",
}

export class SuscriptionBilling extends StringValueObject {
	constructor(value: string) {
		super(value);
		this.checkValueIsValid(value);
	}

	static fromValue(value: string): SuscriptionBilling {
		switch (value) {
			case BillingPeriod.MONTHLY:
				return new SuscriptionBilling(BillingPeriod.MONTHLY);
			case BillingPeriod.YEARLY:
				return new SuscriptionBilling(BillingPeriod.YEARLY);
			default:
				throw new InvalidBillingPeriod(value);
		}
	}

	inMonths(): number {
		switch (this.value) {
			case BillingPeriod.MONTHLY:
				return 1;
			case BillingPeriod.YEARLY:
				return 12;
			default:
				throw new InvalidBillingPeriod(this.value);
		}
	}

	private checkValueIsValid(value: string): void {
		switch (value) {
			case BillingPeriod.MONTHLY:
			case BillingPeriod.YEARLY:
				return;
			default:
				this.throwErrorForInvalidValue(value);
		}
	}

	private throwErrorForInvalidValue(value: string): void {
		throw new InvalidBillingPeriod(value);
	}
}
