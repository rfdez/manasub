import { CreateSuscriptionCommand } from "../../../../src/suscriptions/domain/CreateSuscriptionCommand";
import { SuscriptionId } from "../../../../src/suscriptions/domain/SuscriptionId";
import { SuscriptionName } from "../../../../src/suscriptions/domain/SuscriptionName";
import { SuscriptionIdMother } from "../../domain/SuscriptionIdMother";
import { SuscriptionNameMother } from "../../domain/SuscriptionNameMother";

export class CreateSuscriptionCommandMother {
	static create(id: SuscriptionId, name: SuscriptionName): CreateSuscriptionCommand {
		return {
			id: id.value,
			name: name.value,
		};
	}

	static random(): CreateSuscriptionCommand {
		return this.create(SuscriptionIdMother.random(), SuscriptionNameMother.random());
	}

	static invalid(): CreateSuscriptionCommand {
		return {
			id: SuscriptionIdMother.random().value,
			name: SuscriptionNameMother.invalidName(),
		};
	}
}
