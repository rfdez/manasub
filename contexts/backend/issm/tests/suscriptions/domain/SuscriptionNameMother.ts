import { WordMother } from "@manasub/shared-context/tests/domain/WordMother";

import { SuscriptionName } from "../../../src/suscriptions/domain/SuscriptionName";

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
