import { CreateSuscriptionCommandHandler } from "../../../../src/suscriptions/application/create/CreateSuscriptionCommandHandler";
import { SuscriptionCreator } from "../../../../src/suscriptions/application/create/SuscriptionCreator";
import { SuscriptionNameLengthExceeded } from "../../../../src/suscriptions/domain/SuscriptionNameLengthExceeded";
import { SuscriptionRepositoryMock } from "../../__mocks__/CourseRepositoryMock";
import { SuscriptionMother } from "../../domain/SuscriptionMother";

import { CreateSuscriptionCommandMother } from "./CreateSuscriptionCommandMother";

let creator: SuscriptionCreator,
	handler: CreateSuscriptionCommandHandler,
	repository: SuscriptionRepositoryMock;

beforeEach(() => {
	repository = new SuscriptionRepositoryMock();
	creator = new SuscriptionCreator(repository);
	handler = new CreateSuscriptionCommandHandler(creator);
});

describe("CreateSuscriptionCommandHandler", () => {
	test("should create a valid suscription", async () => {
		const command = CreateSuscriptionCommandMother.random(),
			suscription = SuscriptionMother.from(command);

		await handler.handle(command);

		repository.assertSaveHaveBeenCalledWith(suscription);
	});

	test("should throw an error if suscription name is exceeded", () => {
		expect(() => {
			const command = CreateSuscriptionCommandMother.invalid(),
				suscription = SuscriptionMother.from(command);

			void handler.handle(command);

			repository.assertSaveHaveBeenCalledWith(suscription);
		}).toThrow(SuscriptionNameLengthExceeded);
	});
});
