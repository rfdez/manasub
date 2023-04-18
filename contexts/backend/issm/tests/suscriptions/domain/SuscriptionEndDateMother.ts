import { SuscriptionEndDate } from "../../../src/suscriptions/domain/SuscriptionEndDate";
import { DateMother } from "../../shared/domain/DateMother";
import { WordMother } from "../../shared/domain/WordMother";

export class SuscriptionEndDateMother {
	static create(value: Date): SuscriptionEndDate {
		return new SuscriptionEndDate(value);
	}

	static random(): SuscriptionEndDate {
		return this.create(DateMother.random());
	}

	static after(startDate: Date): SuscriptionEndDate {
		return this.create(DateMother.after(startDate));
	}

	static before(endDate: Date): SuscriptionEndDate {
		return this.create(DateMother.before(endDate));
	}

	static invalidEndDate(): string {
		return WordMother.random({ maxLength: 5 });
	}
}
