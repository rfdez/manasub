import { Newable } from "../../../domain/Newable";
import { PrimitiveTypes, ValueObject } from "../../../domain/value-object/ValueObject";

export const NullableValueObjectTransformer: <T extends PrimitiveTypes>(
	ValueObject: Newable<ValueObject<T>>
) => {
	to: (value?: ValueObject<T>) => T | undefined;
	from: (value?: T) => ValueObject<T> | undefined;
} = <T extends PrimitiveTypes>(ValueObject: Newable<ValueObject<T>>) => {
	return {
		to: (value?: ValueObject<T>): T | undefined => (value ? value.value : undefined),
		from: (value?: T): ValueObject<T> | undefined =>
			value ? new ValueObject(value) : undefined,
	};
};

export const ValueObjectTransformer: <T extends PrimitiveTypes>(
	ValueObject: Newable<ValueObject<T>>
) => {
	to: (value: ValueObject<T>) => T;
	from: (value: T) => ValueObject<T>;
} = <T extends PrimitiveTypes>(ValueObject: Newable<ValueObject<T>>) => {
	return {
		to: (value: ValueObject<T>): T => value.value,
		from: (value: T): ValueObject<T> => new ValueObject(value),
	};
};
