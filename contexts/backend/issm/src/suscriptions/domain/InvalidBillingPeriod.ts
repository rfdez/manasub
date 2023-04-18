import { InvalidArgumentError } from "../../shared/domain/value-object/InvalidArgumentError";

export class InvalidBillingPeriod extends InvalidArgumentError {
	constructor(value: string) {
		super(`The billing period <${value}> is invalid`);
	}
}
