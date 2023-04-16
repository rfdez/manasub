import { StringValueObject } from "@manasub/shared-context/src/domain/value-object/StringValueObject";

import { SuscriptionNameLengthExceeded } from "./SuscriptionNameLengthExceeded";

export class SuscriptionName extends StringValueObject {
	constructor(value: string) {
		super(value);
		this.ensureLengthIsLessThan30Characters(value);
	}

	private ensureLengthIsLessThan30Characters(value: string): void {
		if (value.length > 30) {
			throw new SuscriptionNameLengthExceeded(
				`The Suscription Name <${value}> has more than 30 characters`
			);
		}
	}
}
