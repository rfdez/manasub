import { SuscriptionName } from "../../../src/suscriptions/domain/SuscriptionName";
import { WordMother } from "../../shared/domain/WordMother";

export class SuscriptionNameMother {
	static create(value: string): SuscriptionName {
		return new SuscriptionName(value);
	}

	static random(): SuscriptionName {
		return this.create(WordMother.random({ maxLength: 20 }));
	}

	static invalidName(): string {
		return "a".repeat(40);
	}
}
