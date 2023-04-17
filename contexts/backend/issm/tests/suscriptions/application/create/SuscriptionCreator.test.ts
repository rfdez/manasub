import { InvalidArgumentError } from "../../../../src/shared/domain/value-object/InvalidArgumentError";
import { SuscriptionCreator } from "../../../../src/suscriptions/application/create/SuscriptionCreator";
import { SuscriptionNameLengthExceeded } from "../../../../src/suscriptions/domain/SuscriptionNameLengthExceeded";
import { SuscriptionRepositoryMock } from "../../__mocks__/CourseRepositoryMock";
import { SuscriptionBillingMother } from "../../domain/SuscriptionBillingMother";
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
			billing = SuscriptionBillingMother.random(),
			suscription = SuscriptionMother.from({
				id: id.value,
				name: name.value,
				billing: billing.value,
			});

		await creator.run({ id: id.value, name: name.value, billing: billing.value });

		repository.assertSaveHaveBeenCalledWith(suscription);
	});

	test("should throw an error if suscription name is exceeded", () => {
		expect(() => {
			const id = SuscriptionIdMother.random(),
				name = SuscriptionNameMother.invalidName(),
				billing = SuscriptionBillingMother.random(),
				suscription = SuscriptionMother.from({
					id: id.value,
					name,
					billing: billing.value,
				});

			void creator.run({ id: id.value, name, billing: billing.value });

			repository.assertSaveHaveBeenCalledWith(suscription);
		}).toThrow(SuscriptionNameLengthExceeded);
	});

	test("should throw an error if suscription billing period is invalid", () => {
		expect(() => {
			const id = SuscriptionIdMother.random(),
				name = SuscriptionNameMother.random(),
				billing = SuscriptionBillingMother.invalidBillingPeriod(),
				suscription = SuscriptionMother.from({ id: id.value, name: name.value, billing });

			void creator.run({ id: id.value, name: name.value, billing });

			repository.assertSaveHaveBeenCalledWith(suscription);
		}).toThrow(InvalidArgumentError);
	});
});
