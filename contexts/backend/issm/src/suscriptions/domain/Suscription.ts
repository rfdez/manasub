import { AggregateRoot } from "@manasub/shared-context/src/domain/AggregateRoot";
import { Primitives } from "@manasub/shared-context/src/domain/Primitives";

import { SuscriptionId } from "./SuscriptionId";
import { SuscriptionName } from "./SuscriptionName";

export class Suscription extends AggregateRoot {
	readonly id: SuscriptionId;
	readonly name: SuscriptionName;

	constructor(id: SuscriptionId, name: SuscriptionName) {
		super();
		this.id = id;
		this.name = name;
	}

	static create(id: SuscriptionId, name: SuscriptionName): Suscription {
		return new Suscription(id, name);
	}

	static fromPrimitives(id: string, name: string): Suscription {
		return new Suscription(new SuscriptionId(id), new SuscriptionName(name));
	}

	toPrimitives(): Primitives<Suscription> {
		return {
			id: this.id.value,
			name: this.name.value,
		};
	}
}
