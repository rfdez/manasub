import { Suscription } from "../../../src/suscriptions/domain/Suscription";
import { SuscriptionBilling } from "../../../src/suscriptions/domain/SuscriptionBilling";
import { SuscriptionEndDate } from "../../../src/suscriptions/domain/SuscriptionEndDate";
import { SuscriptionId } from "../../../src/suscriptions/domain/SuscriptionId";
import { SuscriptionName } from "../../../src/suscriptions/domain/SuscriptionName";
import { SuscriptionStartDate } from "../../../src/suscriptions/domain/SuscriptionStartDate";

import { SuscriptionBillingMother } from "./SuscriptionBillingMother";
import { SuscriptionEndDateMother } from "./SuscriptionEndDateMother";
import { SuscriptionIdMother } from "./SuscriptionIdMother";
import { SuscriptionNameMother } from "./SuscriptionNameMother";
import { SuscriptionStartDateMother } from "./SuscriptionStartDateMother";

export class SuscriptionMother {
	static create(
		id: SuscriptionId,
		name: SuscriptionName,
		billing: SuscriptionBilling,
		startDate: SuscriptionStartDate,
		endDate?: SuscriptionEndDate
	): Suscription {
		return new Suscription(id, name, billing, startDate, endDate);
	}

	static from(primitives: {
		id: string;
		name: string;
		billing: string;
		startDate: Date;
		endDate?: Date;
	}): Suscription {
		return this.create(
			SuscriptionIdMother.create(primitives.id),
			SuscriptionNameMother.create(primitives.name),
			SuscriptionBillingMother.create(primitives.billing),
			SuscriptionStartDateMother.create(primitives.startDate),
			primitives.endDate ? SuscriptionStartDateMother.create(primitives.endDate) : undefined
		);
	}

	static random(): Suscription {
		const startDate = SuscriptionStartDateMother.random(),
			endDate = SuscriptionEndDateMother.after(startDate.value);

		return this.create(
			SuscriptionIdMother.random(),
			SuscriptionNameMother.random(),
			SuscriptionBillingMother.random(),
			startDate,
			endDate
		);
	}
}
