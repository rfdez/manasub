import { DateValueObject } from "../../shared/domain/value-object/DateValueObject";
import { InvalidArgumentError } from "../../shared/domain/value-object/InvalidArgumentError";

export class SuscriptionEndDate extends DateValueObject {
	static fromValue(value: string): SuscriptionEndDate {
		const date = new Date(value);

		if (isNaN(date.getTime())) {
			throw new InvalidArgumentError(`The value <${value}> is not a valid date`);
		}

		return new SuscriptionEndDate(date);
	}
}
