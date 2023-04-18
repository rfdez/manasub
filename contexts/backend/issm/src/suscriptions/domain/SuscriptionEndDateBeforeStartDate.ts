import { InvalidArgumentError } from "../../shared/domain/value-object/InvalidArgumentError";

export class SuscriptionEndDateBeforeStartDate extends InvalidArgumentError {
	constructor(startDate: Date, endDate: Date) {
		super(
			`The end date <${endDate.toString()}> must be after the start date <${startDate.toString()}>`
		);
	}
}
