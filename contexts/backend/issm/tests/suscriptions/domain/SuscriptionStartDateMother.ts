import { SuscriptionStartDate } from "../../../src/suscriptions/domain/SuscriptionStartDate";
import { DateMother } from "../../shared/domain/DateMother";
import { WordMother } from "../../shared/domain/WordMother";

export class SuscriptionStartDateMother {
	static create(value: Date): SuscriptionStartDate {
		return new SuscriptionStartDate(value);
	}

	static random(): SuscriptionStartDate {
		return this.create(DateMother.random());
	}

	static after(startDate: Date): SuscriptionStartDate {
		return this.create(DateMother.after(startDate));
	}

	static invalidStartDate(): string {
		return WordMother.random({ maxLength: 5 });
	}
}
