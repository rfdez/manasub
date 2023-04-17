import {
	BillingPeriod,
	SuscriptionBilling,
} from "../../../src/suscriptions/domain/SuscriptionBilling";
import { WordMother } from "../../shared/domain/WordMother";

export class SuscriptionBillingMother {
	static create(value: string): SuscriptionBilling {
		return new SuscriptionBilling(value);
	}

	static random(): SuscriptionBilling {
		const randomIndex = Math.floor(Math.random() * Object.keys(BillingPeriod).length),
			randomBillingPeriod = Object.values(BillingPeriod)[randomIndex];

		return this.create(randomBillingPeriod);
	}

	static invalidBillingPeriod(): string {
		return WordMother.random({ maxLength: 5 });
	}
}
