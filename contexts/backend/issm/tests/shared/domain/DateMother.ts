import { MotherCreator } from "./MotherCreator";

export class DateMother {
	static random(): Date {
		return MotherCreator.random().date.between(
			MotherCreator.random().date.past(),
			MotherCreator.random().date.future()
		);
	}

	static after(date: Date): Date {
		return MotherCreator.random().date.soon(
			MotherCreator.random().datatype.number({ max: 999 }),
			date
		);
	}

	static before(date: Date): Date {
		return MotherCreator.random().date.recent(
			MotherCreator.random().datatype.number({ max: 999 }),
			date
		);
	}

	static between({ from, to }: { from: string | Date; to: string | Date }): Date {
		return MotherCreator.random().date.between(from, to);
	}
}
