import { InvalidArgumentError } from "../../../../src/shared/domain/value-object/InvalidArgumentError";
import { SuscriptionCreator } from "../../../../src/suscriptions/application/create/SuscriptionCreator";
import { SuscriptionNameLengthExceeded } from "../../../../src/suscriptions/domain/SuscriptionNameLengthExceeded";
import { SuscriptionRepositoryMock } from "../../__mocks__/CourseRepositoryMock";
import { SuscriptionBillingMother } from "../../domain/SuscriptionBillingMother";
import { SuscriptionIdMother } from "../../domain/SuscriptionIdMother";
import { SuscriptionMother } from "../../domain/SuscriptionMother";
import { SuscriptionNameMother } from "../../domain/SuscriptionNameMother";
import { SuscriptionStartDateMother } from "../../domain/SuscriptionStartDateMother";

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
			startDate = SuscriptionStartDateMother.random(),
			suscription = SuscriptionMother.from({
				id: id.value,
				name: name.value,
				billing: billing.value,
				startDate: startDate.value,
			});

		await creator.run({
			id: id.value,
			name: name.value,
			billing: billing.value,
			startDate: startDate.value,
		});

		repository.assertSaveHaveBeenCalledWith(suscription);
	});

	test("should throw an error if suscription name is exceeded", () => {
		expect(() => {
			const id = SuscriptionIdMother.random(),
				name = SuscriptionNameMother.invalidName(),
				billing = SuscriptionBillingMother.random(),
				startDate = SuscriptionStartDateMother.random(),
				suscription = SuscriptionMother.from({
					id: id.value,
					name,
					billing: billing.value,
					startDate: startDate.value,
				});

			void creator.run({
				id: id.value,
				name,
				billing: billing.value,
				startDate: startDate.value,
			});

			repository.assertSaveHaveBeenCalledWith(suscription);
		}).toThrow(SuscriptionNameLengthExceeded);
	});

	test("should throw an error if suscription billing period is invalid", () => {
		expect(() => {
			const id = SuscriptionIdMother.random(),
				name = SuscriptionNameMother.random(),
				billing = SuscriptionBillingMother.invalidBillingPeriod(),
				startDate = SuscriptionStartDateMother.random(),
				suscription = SuscriptionMother.from({
					id: id.value,
					name: name.value,
					billing,
					startDate: startDate.value,
				});

			void creator.run({
				id: id.value,
				name: name.value,
				billing,
				startDate: startDate.value,
			});

			repository.assertSaveHaveBeenCalledWith(suscription);
		}).toThrow(InvalidArgumentError);
	});
});
