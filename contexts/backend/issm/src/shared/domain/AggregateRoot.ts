import { Primitives } from "./Primitives";

export abstract class AggregateRoot {
	abstract toPrimitives(): Primitives<AggregateRoot>;
}
