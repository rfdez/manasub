import { SuscriptionCreator } from "../../../../src/suscriptions/application/create/SuscriptionCreator";
import { SuscriptionNameLengthExceeded } from "../../../../src/suscriptions/domain/SuscriptionNameLengthExceeded";
import { SuscriptionRepositoryMock } from "../../__mocks__/CourseRepositoryMock";
import { SuscriptionIdMother } from "../../domain/SuscriptionIdMother";
import { SuscriptionMother } from "../../domain/SuscriptionMother";
import { SuscriptionNameMother } from "../../domain/SuscriptionNameMother";

let creator: SuscriptionCreator, repository: SuscriptionRepositoryMock;

beforeEach(() => {
	repository = new SuscriptionRepositoryMock();
	creator = new SuscriptionCreator(repository);
});

describe("SuscriptionCreator", () => {
	test("should create a valid suscription", async () => {
		const id = SuscriptionIdMother.random(),
			name = SuscriptionNameMother.random(),
			suscription = SuscriptionMother.from({ id: id.value, name: name.value });

		await creator.run({ id: id.value, name: name.value });

		repository.assertSaveHaveBeenCalledWith(suscription);
	});

	test("should throw an error if suscription name is exceeded", () => {
		expect(() => {
			const id = SuscriptionIdMother.random(),
				name = SuscriptionNameMother.invalidName(),
				suscription = SuscriptionMother.from({ id: id.value, name });

			void creator.run({ id: id.value, name });

			repository.assertSaveHaveBeenCalledWith(suscription);
		}).toThrow(SuscriptionNameLengthExceeded);
	});
});
