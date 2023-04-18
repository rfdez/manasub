import { MotherCreator } from "./MotherCreator";

export class DateMother {
	static between({ from, to }: { from: string | Date; to: string | Date }): Date {
		return MotherCreator.random().date.between(from, to);
	}

	static random(): Date {
		return MotherCreator.random().date.between(
			MotherCreator.random().date.past(),
			MotherCreator.random().date.future()
		);
	}
}
