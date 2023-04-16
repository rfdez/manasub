import { Newable } from "diod";

import {
	PrimitiveTypes,
	ValueObject,
} from "@manasub/shared-context/src/domain/value-object/ValueObject";

export const ValueObjectTransformer: <T extends PrimitiveTypes>(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ValueObject: Newable<ValueObject<any>>
) => {
	to: (value: ValueObject<T>) => T;
	from: (value: T) => ValueObject<T>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
} = <T extends PrimitiveTypes>(ValueObject: Newable<ValueObject<any>>) => {
	return {
		to: (value: ValueObject<T>): T => value.value,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		from: (value: T): ValueObject<T> => new ValueObject(value),
	};
};
