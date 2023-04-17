import { InvalidArgumentError } from "./InvalidArgumentError";

export type PrimitiveTypes = string | string | number | boolean | boolean | Date;

export abstract class ValueObject<T extends PrimitiveTypes> {
	readonly value: T;

	constructor(value: T) {
		this.value = value;
		this.ensureValueIsDefined(value);
	}

	equals(other: ValueObject<T>): boolean {
		return other.constructor.name === this.constructor.name && other.value === this.value;
	}

	toString(): string {
		return this.value.toString();
	}

	private ensureValueIsDefined(value: T): void {
		if (!value) {
			throw new InvalidArgumentError("Value must be defined");
		}
	}
}
