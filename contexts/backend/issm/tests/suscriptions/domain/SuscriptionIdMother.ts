import { SuscriptionId } from "../../../src/suscriptions/domain/SuscriptionId";
import { UuidMother } from "../../shared/domain/UuidMother";

export class SuscriptionIdMother {
	static create(value: string): SuscriptionId {
		return new SuscriptionId(value);
	}

	static random(): SuscriptionId {
		return this.create(UuidMother.random());
	}
}
