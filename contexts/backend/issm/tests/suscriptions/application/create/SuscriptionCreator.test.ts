import { SuscriptionCreator } from "../../../../src/suscriptions/application/create/SuscriptionCreator";
import { InvalidBillingPeriod } from "../../../../src/suscriptions/domain/InvalidBillingPeriod";
import { SuscriptionEndDateBeforeStartDate } from "../../../../src/suscriptions/domain/SuscriptionEndDateBeforeStartDate";
import { SuscriptionNameLengthExceeded } from "../../../../src/suscriptions/domain/SuscriptionNameLengthExceeded";
import { SuscriptionRepositoryMock } from "../../__mocks__/CourseRepositoryMock";
import { SuscriptionBillingMother } from "../../domain/SuscriptionBillingMother";
import { SuscriptionEndDateMother } from "../../domain/SuscriptionEndDateMother";
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

	test("should create a valid suscription with end date", async () => {
		const id = SuscriptionIdMother.random(),
			name = SuscriptionNameMother.random(),
			billing = SuscriptionBillingMother.random(),
			startDate = SuscriptionStartDateMother.random(),
			endDate = SuscriptionEndDateMother.after(startDate.value),
			suscription = SuscriptionMother.from({
				id: id.value,
				name: name.value,
				billing: billing.value,
				startDate: startDate.value,
				endDate: endDate.value,
			});

		await creator.run({
			id: id.value,
			name: name.value,
			billing: billing.value,
			startDate: startDate.value,
			endDate: endDate.value,
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
		}).toThrow(InvalidBillingPeriod);
	});

	test("should throw an error if suscription start date is after end date", () => {
		expect(() => {
			const id = SuscriptionIdMother.random(),
				name = SuscriptionNameMother.random(),
				billing = SuscriptionBillingMother.random(),
				endDate = SuscriptionEndDateMother.random(),
				startDate = SuscriptionStartDateMother.after(endDate.value),
				suscription = SuscriptionMother.from({
					id: id.value,
					name: name.value,
					billing: billing.value,
					startDate: startDate.value,
					endDate: endDate.value,
				});

			void creator.run({
				id: id.value,
				name: name.value,
				billing: billing.value,
				startDate: startDate.value,
				endDate: endDate.value,
			});

			repository.assertSaveHaveBeenCalledWith(suscription);
		}).toThrow(SuscriptionEndDateBeforeStartDate);
	});

	test("should throw an error if suscription end date is before start date", () => {
		expect(() => {
			const id = SuscriptionIdMother.random(),
				name = SuscriptionNameMother.random(),
				billing = SuscriptionBillingMother.random(),
				startDate = SuscriptionStartDateMother.random(),
				endDate = SuscriptionEndDateMother.before(startDate.value),
				suscription = SuscriptionMother.from({
					id: id.value,
					name: name.value,
					billing: billing.value,
					startDate: startDate.value,
					endDate: endDate.value,
				});

			void creator.run({
				id: id.value,
				name: name.value,
				billing: billing.value,
				startDate: startDate.value,
				endDate: endDate.value,
			});

			repository.assertSaveHaveBeenCalledWith(suscription);
		}).toThrow(SuscriptionEndDateBeforeStartDate);
	});
});
