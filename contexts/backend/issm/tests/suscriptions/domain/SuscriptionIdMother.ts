import { UuidMother } from "@manasub/shared-context/tests/domain/UuidMother";

import { SuscriptionId } from "../../../src/suscriptions/domain/SuscriptionId";

export class SuscriptionIdMother {
	static create(value: string): SuscriptionId {
		return new SuscriptionId(value);
	}

	static random(): SuscriptionId {
		return this.create(UuidMother.random());
	}
}
